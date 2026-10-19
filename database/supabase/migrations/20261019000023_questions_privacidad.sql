-- correct_index y explanation dejan de ser legibles por el cliente; la corrección la hace una función.
revoke select on public.questions from authenticated, anon;
grant select (id, topic_id, stem, options, source_pages, difficulty, reviewed) on public.questions to authenticated;

create or replace function public.finish_quiz_attempt(p_attempt_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_attempt public.quiz_attempts%rowtype;
  v_ids uuid[];
  v_item jsonb;
  v_qid uuid;
  v_chosen int;
  v_chosen_map jsonb := '{}'::jsonb;
  v_correct int := 0;
  v_wrong int := 0;
  v_total int;
  v_blank int;
  v_review jsonb := '[]'::jsonb;
  v_stored jsonb := '[]'::jsonb;
  r record;
begin
  if v_uid is null then
    raise exception 'Sesión no válida' using errcode = '42501';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'array' then
    raise exception 'Respuestas no válidas' using errcode = '22023';
  end if;

  select * into v_attempt from public.quiz_attempts
   where id = p_attempt_id and user_id = v_uid for update;
  if not found then
    raise exception 'Intento no encontrado' using errcode = '42501';
  end if;
  if v_attempt.finished_at is not null then
    raise exception 'El intento ya está terminado' using errcode = '55000';
  end if;

  select array_agg((e ->> 'question_id')::uuid) into v_ids
    from jsonb_array_elements(v_attempt.answers) e;
  v_ids := coalesce(v_ids, '{}');

  for v_item in select * from jsonb_array_elements(p_answers) loop
    v_qid := (v_item ->> 'question_id')::uuid;
    if not (v_qid = any (v_ids)) then
      raise exception 'Respuesta a una pregunta ajena al intento' using errcode = '22023';
    end if;
    if v_item -> 'chosen_index' is null or jsonb_typeof(v_item -> 'chosen_index') = 'null' then
      v_chosen := null;
    else
      v_chosen := (v_item ->> 'chosen_index')::int;
      if v_chosen < 0 or v_chosen > 3 then
        raise exception 'Opción no válida' using errcode = '22023';
      end if;
    end if;
    v_chosen_map := v_chosen_map || jsonb_build_object(v_qid::text, to_jsonb(v_chosen));
  end loop;

  v_total := coalesce(array_length(v_ids, 1), 0);

  for r in
    select q.id, q.correct_index, q.explanation, u.ord
      from unnest(v_ids) with ordinality as u(qid, ord)
      join public.questions q on q.id = u.qid
     order by u.ord
  loop
    v_chosen := case when jsonb_typeof(v_chosen_map -> r.id::text) = 'number'
                     then (v_chosen_map ->> r.id::text)::int else null end;
    if v_chosen is not null then
      if v_chosen = r.correct_index then v_correct := v_correct + 1; else v_wrong := v_wrong + 1; end if;
    end if;
    v_review := v_review || jsonb_build_object(
      'question_id', r.id,
      'chosen_index', to_jsonb(v_chosen),
      'correct_index', r.correct_index,
      'correct', case when v_chosen is null then null else v_chosen = r.correct_index end,
      'explanation', r.explanation
    );
    v_stored := v_stored || jsonb_build_object(
      'question_id', r.id, 'chosen_index', to_jsonb(v_chosen),
      'correct', coalesce(v_chosen = r.correct_index, false)
    );
  end loop;

  if jsonb_array_length(v_review) <> v_total then
    raise exception 'No se pudieron leer las preguntas' using errcode = '22023';
  end if;
  v_blank := v_total - v_correct - v_wrong;

  update public.quiz_attempts
     set correct = v_correct, wrong = v_wrong, blank = v_blank,
         answers = v_stored, finished_at = now()
   where id = p_attempt_id;

  return jsonb_build_object(
    'result', jsonb_build_object(
      'total', v_total, 'correct', v_correct, 'wrong', v_wrong, 'blank', v_blank,
      'pct', case when v_total = 0 then 0 else round(v_correct * 100.0 / v_total)::int end
    ),
    'review', v_review
  );
end;
$$;

revoke execute on function public.finish_quiz_attempt(uuid, jsonb) from public, anon;
grant execute on function public.finish_quiz_attempt(uuid, jsonb) to authenticated;
