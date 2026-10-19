-- Contenido propio del Tema 8 (Factores humanos en ATM).
-- Redactado a partir de docs/fuentes/enaire/t8.pdf (ENAIRE, jul. 2023). reviewed=false: pendiente de revisión humana.
-- topic_id fijo del tema 8 (migración 20261019000002_roadmap.sql).

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000008-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006008', 1, 'Definiciones: factores humanos, actuaciones humanas y ergonomía', 'Estos tres términos se confunden con frecuencia, incluso en textos normativos. OACI los distingue en su **Doc. 10151**.

| Término | Idea clave |
|---|---|
| **Actuaciones humanas** (*human performance*) | Cómo las personas realizan sus actividades. Es la **contribución humana** al funcionamiento del sistema. |
| **Factores humanos** (*human factors*) | Aplicación del conocimiento sobre las personas (capacidades, características y limitaciones) al **diseño del equipamiento**, a los **entornos** y a las **actividades**. |
| **Ergonomía** | Fuera de la aviación se usa casi como sinónimo; se asocia más a los aspectos **físicos o fisiológicos**, mientras que los factores humanos se asocian más a los **psicológicos**. |

**Disciplinas que aportan:** psicología (cognitiva, organizacional y social), psicología conductual, sociología, antropología, ciencias médicas, diseño e ingeniería, informática y estadística.

**Para qué sirve en ATM.** Permite comprobar si el diseño de la tecnología, la selección del personal, la formación, los procedimientos, los roles y la gestión de la organización garantizan un **rendimiento óptimo del sistema** y una **gestión de riesgos eficiente**.', 'p. 4', false),
  ('10000008-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006008', 2, 'Modelos de Reason y de Rasmussen', '**James Reason (mediados de los 90).** Introdujo la visión sistémica de la seguridad: los accidentes resultan de la acción humana **combinada con otras fallas del sistema**, no solo del error individual.
- **Queso suizo.** Cada capa de protección es una loncha con **agujeros** (debilidades). El suceso ocurre cuando **los agujeros se alinean**.
- Introdujo el concepto de **accidente organizacional**: la cultura y las políticas de la organización crean **condiciones latentes** que debilitan (o refuerzan) las defensas.
- Su aportación menos conocida: la investigación del error, con el modelo de clasificación **GEMS**, sin juicios de valor y centrado en los procesos cognitivos y el contexto.
- También estudió las actuaciones sobresalientes, que salvan situaciones críticas.

**Rasmussen: tres modos de conducta**, según el grado de control de la situación (y, por tanto, tres tipos de error).
| Conducta | Cuándo se da | Ejemplo del tema |
|---|---|---|
| **Basada en habilidades** (*skill-based*) | Tarea muy conocida y rutinaria; procesos **automatizados**, sin pensar. | Conducir con experiencia |
| **Basada en reglas** (*rule-based*) | Situaciones conocidas pero no frecuentes; se **eligen reglas** de forma consciente. | Aplicar procedimientos operativos en frecuencia |
| **Basada en conocimiento** (*knowledge-based*) | No hay reglas almacenadas; gran **esfuerzo consciente** de análisis. | Emergencia o situación inusual |', 'pp. 5-7', false),
  ('10000008-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006008', 3, 'Modelo SHELL-O', 'Propuesto formalmente por OACI como modelo conceptual de factores humanos en su **Circular 216** (basado en Edwards 1972 y Hawkins 1993). La versión actualizada añade la **O** de organización.

- **S** = *Software* (soporte lógico: procedimientos)
- **H** = *Hardware* (soporte físico: sistemas técnicos)
- **E** = *Environment* (entorno)
- **L** = *Liveware* (elemento humano)
- **O** = *Organization* (organización)

El **ser humano (L)** está en el centro: es el componente **más flexible** y el resto de componentes deben ajustarse a él.

**Interacciones**
- **L-S:** controlador y reglamentos, manuales, listas de verificación y procedimientos normalizados.
- **L-H:** interfaz persona-máquina (consolas, pantallas, alarmas, ergonomía).
- **L-E:** entorno interno (temperatura, ruido, ambiente de la empresa) y externo (meteorología).
- **L-L:** relación con otras personas: liderazgo, cooperación, trabajo en equipo (TRM), cultura empresarial.
- **O:** las políticas de la organización pesan más en el sistema; determinan cómo se gestionan procedimientos, cambios, sistemas técnicos y personas.

**Factores que afectan al desempeño:** físicos y fisiológicos (visión, audición, luz, ruido, ritmos circadianos), psicológicos (formación, motivación, toma de decisiones, fatiga, carga de trabajo) y **psicosociales** (presiones del entorno social del individuo, dentro y fuera del trabajo).', 'pp. 7-8', false),
  ('10000008-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006008', 4, 'Visión sistémica y los 10 principios de EUROCONTROL', '**La aviación es un sistema sociotécnico complejo.** El comportamiento no es lineal y es en parte impredecible, pero esa complejidad da gran capacidad de adaptación.
- El ser humano es el componente **más flexible, adaptable y valioso**, pero también el más **vulnerable**.
- La expresión "error humano" no ayuda a gestionar el riesgo: debe ser **el punto de partida** para ver dónde colapsa el sistema.
- Muy rara vez un error individual aislado precipita un accidente: varios factores convergen en tiempo y espacio.
- El enfoque sistémico en la investigación de sucesos fue adoptado formalmente por OACI (**1994**) en el **Anexo 13**.
- Clasificar algo como "error" depende más de las **consecuencias** que de la actuación (una instrucción errónea corregida a tiempo rara vez se considera error).

**Factores organizacionales (8):** adecuación de recursos humanos, selección, formación, bienestar laboral, eficiencia en procesos y proyectos, planificación del personal, gestión de riesgos, y cultura y comunicación.

**10 principios sistémicos (EUROCONTROL, 2014)**
1. **Implicación de los expertos** en la materia (conocer el *Work-as-Done*).
2. **Racionalidad local:** cada persona actúa según sus objetivos, limitaciones y contexto.
3. **Cultura justa:** confianza, empatía y lenguaje sin juicios de valor.
4. **Demanda y presión.**
5. **Recursos y limitaciones.**
6. **Interacciones y flujos** (visión *end-to-end*).
7. **Contrapartidas** (*trade-offs*) ante objetivos contrapuestos.
8. **Variabilidad del rendimiento.**
9. **Emergencia del sistema:** una pequeña acción puede tener grandes efectos.
10. **Equivalencia:** éxito y fracaso se originan en los mismos procesos.', 'pp. 9-12', false),
  ('10000008-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006008', 5, 'Safety-I frente a Safety-II; Work-as-Done frente a Work-as-Imagined', '**Safety-I** (EUROCONTROL 2013, desarrollada entre los años 60 y 80, con menos tráfico y sistemas más simples): la seguridad se define por la **ausencia de accidentes e incidentes**.

| | **Safety-I** | **Safety-II** |
|---|---|---|
| Definición | Que **el mínimo posible de cosas salgan mal** | Que **el máximo posible de cosas salgan bien** |
| Gestión | **Reactiva** | **Proactiva**, anticipándose a los eventos |
| Visión del humano | Predominantemente una **amenaza** | **Recurso** necesario para la resiliencia y flexibilidad |
| Investigación | Identificar **causas** de fallos | Entender cómo las cosas **normalmente salen bien** para explicar cuándo salen mal |

**Ideas de apoyo**
- Rasmussen: el error es el desequilibrio entre las exigencias del trabajo y los recursos mentales; las raíces del éxito y del fracaso son las mismas.
- Simon (1957): **racionalidad limitada** (*bounded rationality*) por información, capacidad mental y tiempo limitados.
- Los controladores afrontan **trade-offs** continuos (por ejemplo, más seguro o más eficiente).
- En Safety-II, la capacidad de las personas de **ajustar su rendimiento** al entorno explica por qué los sistemas funcionan.

**Work-as-Imagined (WAI) frente a Work-as-Done (WAD)**
- WAI: lo que debería ocurrir según el diseño. WAD: lo que ocurre de verdad en el día a día.
- El diseñador ve "aparente simplicidad"; el profesional ve "complejidad real".
- Implantar un sistema nuevo de forma prematura provoca comportamientos inesperados y obliga a revisar cómo se opera en la práctica.
- Shorrock añade otras variantes: *prescribed, disclosed, analysed, observed, simulated, instructed, measured, judged*.', 'pp. 13-15', false),
  ('10000008-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006008', 6, 'Normativa sobre fatiga, estrés y sustancias psicoactivas', '**Reglamento de Ejecución (UE) 2017/373** (requisitos comunes para proveedores de ATM/ANS). Los requisitos de factores humanos de los ATCO están en el **Anexo IV, Sección 3 (ATS.OR.300 a 320)**. Se complementan con las *Easy Rules* de EASA (AMC y GM).

| Requisito | Contenido |
|---|---|
| **ATS.OR.300** | Ámbito: limitar el riesgo por **uso problemático de sustancias psicoactivas**, **estrés** y **fatiga**. |
| **ATS.OR.305** | Política y procedimientos sobre sustancias; procedimiento de detección **objetivo, transparente y no discriminador**, aprobado por la **autoridad competente**. |
| **ATS.OR.310** | Política de gestión del **estrés**, con programa para **incidentes críticos**, y formación e información sobre prevención. |
| **ATS.OR.315** | Política de gestión de la **fatiga** y programas de información. |
| **ATS.OR.320** | **Sistema de turnos** que alterne con seguridad servicio y descanso, consultado con los controladores o sus representantes. |

**El sistema de turnos debe especificar:** máximo de días consecutivos de servicio; máximo de horas por período; duración máxima del servicio sin descansos; relación servicio-descanso; descansos mínimos; máximo de períodos consecutivos con noche; mínimo de descansos tras servicio nocturno; mínimo de descansos en un ciclo.

**Otras normas**
- La política de fatiga debe considerar la privación de sueño, la alteración circadiana, los horarios nocturnos, el tiempo de actividad acumulado y el reparto de tareas.
- Los cambios en el sistema funcional exigen evaluación de seguridad que considere el impacto en el **factor humano**.
- **Reglamento (UE) 2015/340:** licencias y certificados de ATCO; fija los conocimientos de factores humanos, tanto en formación básica como en cursos de habilitación (psicológicos y cognitivos, fatiga y *fitness*, TRM, estrés, error humano, trabajo colaborativo).
- **Reglamento (UE) 2015/1018:** sucesos de notificación obligatoria; incluye la **fatiga** que repercuta o pueda repercutir en la seguridad. ENAIRE cuenta con el sistema **FSRMS** (riesgos de fatiga y estrés).', 'pp. 15-19, 44-45', false),
  ('10000008-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006008', 7, 'Integración de los factores humanos en la organización', '**Idea central:** el sistema ATM es sociotécnico; "el ser humano es el *por qué* y la tecnología el *cómo*".

**Beneficios de integrarlos bien:** más seguridad, optimización de la organización y su personal, más capacidad y eficiencia, menos costes y cumplimiento normativo. También mejoran el compromiso, la motivación, la comunicación y el diálogo social.

**Si no se gestionan, se resienten:** el compromiso de los empleados, el rendimiento, los incidentes por error humano, el absentismo, la satisfacción del cliente y la imagen de la organización.

**Gestión de riesgos y cultura**
- Favorecen la detección **proactiva** de amenazas y la gestión del cambio con participación del personal operativo.
- Permiten establecer **KPIs** específicos que vinculan calidad y rendimiento humano.
- En un clima de **cultura justa** los controladores notifican con confianza, lo que hace el sistema más robusto y resiliente.

**Proyectos y SESAR**
- SESAR parte de que el factor humano es **pilar fundamental** de los futuros sistemas ATM.
- Hay que incorporar el análisis del impacto humano desde la **fase de conceptualización**.
- Aproximadamente el **70 % del coste final** del proyecto queda fijado en el **primer 10 %** del ciclo de vida (EUROCONTROL-FAA 2010). Es mucho más eficaz cambiar el diseño al inicio que con el sistema ya operativo.

**Por qué importa a la empresa:** prevenir daños, anticiparse a nuevos requisitos legales, evitar sanciones y mejorar la imagen pública e interna.', 'pp. 19-22', false),
  ('10000008-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006008', 8, 'Trabajo en equipo y TRM', '**Equipo:** grupo de personas que interactúan, son interdependientes y tienen un objetivo común, con distintas funciones y roles.

| Grupo | Equipo |
|---|---|
| Alto control externo | Alta **autonomía** |
| Énfasis en el resultado | Le importan **resultado y proceso** |
| Comunicación limitada al superior inmediato | **Comunicación abierta** y participación |

**Objetivos al formar equipos:** reforzar la seguridad; mejorar el reparto del trabajo; que cada miembro conozca y acepte sus funciones y las de los demás (con **flexibilidad**); **monitorización mutua**; comunicación constante **en bucle cerrado**; sentido de interdependencia; sinergias en la resolución de problemas.

**TRM (Team Resource Management)**
- Derivado del **CRM** (*Cockpit/Crew Resource Management*) de la aviación y trasladado al control. Se usa también en sanidad, energía nuclear y operaciones militares.
- Filosofía que maximiza la eficiencia de las interacciones y del uso de los recursos personales, partiendo de que los humanos **cometemos errores que no se pueden eliminar del todo**.
- **Seis categorías de habilidades:** trabajo en equipo; gestión de roles; comunicación interpersonal; conciencia situacional; resolución de problemas y toma de decisiones; gestión del estrés. Todas son de naturaleza conductual.

**Beneficios:** más cooperación y comunicación (menos probabilidad de error), mayor eficiencia, mejor uso de los recursos humanos y reparto de cargas, continuidad, flexibilidad, formación común y mayor motivación.', 'pp. 22-24', false),
  ('10000008-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006008', 9, 'Cognición, conciencia situacional y carga de trabajo mental', '**Cognición**
- La **memoria a corto plazo** (de trabajo) guarda poca información durante **20 a 30 segundos**; la **memoria a largo plazo** tiene capacidad ilimitada pero necesita más tiempo. El ensayo repetitivo consolida la información.
- La atención es limitada; con la experiencia se forman **modelos mentales**.

**Conciencia situacional (SA), según Endsley:** percepción de los elementos del entorno en un volumen de tiempo y espacio, comprensión de su significado y **proyección** de su estado en un futuro próximo. **Tres niveles:** 1) percepción, 2) comprensión, 3) proyección.
- Los controladores la describen como "ver el tráfico" o "adelantarse al tráfico"; su pérdida es "ir por detrás del tráfico" o "perder el control".
- No es una foto fija sino un **modelo mental dinámico**. Cuando falta información, la mente la **rellena con asunciones**; **la mayoría de los incidentes ATC presentan alguna asunción**. El equipo es fuente vital de información.

**Carga de trabajo mental.** Tres dimensiones: **presión temporal**, **recursos cognitivos** que exige la tarea y **aspectos emocionales**.
- UNE-EN ISO 10075-2: **presión mental** (influencias externas) frente a **tensión mental** (efecto inmediato de esa presión en la persona).
- **Ley de Yerkes-Dodson:** relación en **U invertida** entre activación y rendimiento; el óptimo se da con activación moderadamente elevada. Con tareas complejas el máximo se alcanza **antes** que con tareas sencillas.
- La atención sostenida en **baja densidad** de tráfico puede causar tanta o más fatiga que la alta carga. Tras una "vara" de tráfico hay más riesgo de error.

**Complejidad:** impulsa la carga mental y limita la capacidad ATC. Influyen el espacio aéreo, el volumen y tipo de tráfico, la frecuencia, la meteorología, los sistemas, las coordinaciones, el trabajo en equipo y factores personales. Con alta complejidad el controlador prioriza, simplifica, usa separación vertical y prefiere soluciones con menos coordinaciones, a costa de calidad de servicio.', 'pp. 24-31', false),
  ('10000008-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006008', 10, 'La comunicación humana', '**Proceso:** un **emisor** transmite un **mensaje** a un **receptor** por un **canal** y con un **código común**. Puede haber **barreras** o ruido. El **feedback** es la respuesta del receptor (el silencio también es un mensaje).
- Puede haber comunicación **correcta pero no eficaz**. De ahí la **colación**: comprobar que las interferencias no merman la ejecución.
- Quien comunica **es responsable de asegurarse** de que el mensaje llegó; si no, debe buscar vías alternativas. Quien mejor comunica es quien mejor escucha.
- En las organizaciones la comunicación es **persuasiva**: busca generar una acción común.

**Escucha activa.** Combina oír, comprender, retener y actuar. Favorecen: contacto visual, pequeños resúmenes, preguntas abiertas. Dificultan: abusar de distracciones, dejar temas a medias, interrumpir constantemente, comentarios cortantes.

**Barreras a la comunicación verbal**
| Tipo | Ejemplos |
|---|---|
| **Ambientales** | Ruidos, iluminación, calor, interrupciones |
| **Cognitivas** | Hablar muy rápido, lengua materna distinta, semántica, desconocer términos, carga de trabajo, pocas referencias del receptor |
| **Fisiológicas** | Voz débil, sordera, problemas visuales |
| **Psicológicas** | Miedo, tristeza, ira, estrés |

**Antídotos:** la **empatía** (ponerse en el lugar del otro) y la **asertividad** (defender la postura propia sin atacar a la otra parte).

**Comunicación no verbal.** Según Pease se usan tres recursos: verbal (palabras), no verbal (gestos, posturas) y paraverbal (volumen, tono). El no verbal puede suponer más del 50 % y, con el paraverbal, un 80 %.

**Emociones básicas:** tristeza, asco, sorpresa, ira, alegría y miedo (cada una con su lado positivo y negativo).', 'pp. 31-38', false),
  ('10000008-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006008', 11, 'La fatiga y el sueño', '**Definición (OACI, Doc. 9966):** estado fisiológico de **reducción de la capacidad de desempeño** mental o físico por falta de sueño, vigilia prolongada, fase circadiana o carga de trabajo, que puede menoscabar el estado de alerta y la seguridad.
- **Fatiga** = estado objetivo y fisiológico. **Cansancio** = elemento **subjetivo** de la fatiga (la sensación).
- Es un mecanismo biológico que no puede suprimirse; ignorarlo degrada el rendimiento cognitivo.

**Sueño**
- Un adulto de **18 a 64 años** necesita de media **8 horas** (OMS y National Sleep Foundation); cuenta también la calidad.
- Ciclo de **90/100 minutos** con cinco fases: **no-REM** (fases I a IV) y **REM**, que ocupa los últimos 20-30 minutos del ciclo.
  - **I:** sueño ligero, poco reparador. **II:** ocupa el **50 %** del sueño adulto. **III y IV:** sueño profundo (delta), esenciales para la recuperación; su déficit causa somnolencia diurna.
  - **REM:** sueños con argumento y **atonía muscular**.
- El sueño del CTA en el puesto durante la noche es más ligero y a menudo interrumpido.

**Pérdida de sueño.** Perder cantidad o calidad, aunque sea una noche, reduce el desempeño y aumenta la somnolencia. La **deuda de sueño** se acumula. Los **microsueños** duran unos segundos y pueden pasar desapercibidos.

**Tres procesos reguladores**
| Proceso | Qué es |
|---|---|
| **Circadiano (C)** | Reloj interno de unas 24 h. Mínimo en la segunda parte de la noche (**3 a 6 h**, WOCL), con mayor somnolencia y menor desempeño. |
| **Homeostático (S)** | Impulso de dormir que crece con las horas de vigilia. |
| **Vigilia (W)** | **Inercia del sueño** tras despertar; conviene esperar antes de tareas exigentes. |

**Síntomas:** alteración de atención y memoria, irritabilidad, peor percepción del riesgo, visión borrosa, ojos irritados, dolores de cabeza.

**Trabajo a turnos:** afecta al sueño, a la salud y a la vida familiar y social. El sueño nocturno es el auténticamente reparador. La tolerancia varía según edad, sexo y condición física. Mejor rendimiento con **carga media** (la baja causa monotonía y somnolencia; la alta desborda). Estrategias de primer nivel previenen la fatiga (siesta, cafeína); las de segundo nivel mitigan sus efectos.', 'pp. 38-48', false),
  ('10000008-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006008', 12, 'El estrés', '**Definición.** Respuesta psicofisiológica a un estímulo cuando el organismo considera que sus recursos **no bastan** para adaptarse. Reduce la eficacia, modifica la conducta y causa problemas de salud.
- **Componentes:** endocrino, autónomo y conductual.
- **Tipos:** **agudo** (puntual) y **crónico** (presiones prolongadas, de naturaleza emocional).
- Según Lazarus y Folkman: si hay expectativa de poder gestionarlo, **eustrés**; si no, **distrés**.
- Modelo transaccional de **Cox-Mackay**: considera demanda, capacidad real y **autopercepción**.

**Síntomas:** fisiológicos (palpitaciones, sudoración, trastornos gastrointestinales, contracturas), psicológicos (afectivos y cognitivos) y conductuales (automedicación, absentismo, aislamiento, peor desempeño).

**Estados de estrés en el control**
- **Hipoestrés:** aburrimiento o rutina; desempeño pobre.
- **Eustrés:** tensión positiva; **zona de mejor rendimiento**.
- **Hiperestrés:** sobrecarga o pérdida de control; la memoria de trabajo no maneja **más de seis o siete ítems**; se tiende a fijarse en las señales más frecuentes.
- **Distrés:** procedimientos nuevos aún no dominados.

**Tres fuentes de estrés (EASA, GM1 ATS.OR.310):**
1. **Ambientales o físicos:** calor, ruido, iluminación, calidad del aire. Importa la **duración** de la exposición, no solo la intensidad.
2. **Relacionados con la tarea:** carga sostenida, tráfico heterogéneo, equipos poco fiables, ambigüedad de roles, incidentes.
3. **Relativos al individuo:** salud, vida personal y grandes eventos vitales. Pensar que se pueden dejar en casa es un **mito**.

**Efectos en el controlador:** problemas de concentración, errores y omisiones, procedimiento "más rápido o fácil", fijación mental, posponer decisiones, no tener "plan B", asumir más riesgos, precipitación (adrenalina) y, con estrés alto, usar procedimientos obsoletos, olvidar la fraseología y hablar en lengua materna.

**Medidas:** política de estrés y programa para incidentes críticos, gestión proactiva, formación e información, mecanismos de actuación si el estrés impide tareas críticas.', 'pp. 48-55', false),
  ('10000008-0000-4000-8001-000000000013', '00000000-0000-4000-8000-000000006008', 13, 'Gestión del estrés por incidente crítico: programa CISM', '**CISM** (*Critical Incident Stress Management*): protocolo estructurado y reconocido para dar **apoyo psicológico** al personal operativo y evitar el estrés postraumático. Es **confidencial, voluntario y educativo** y se conoce como **"primeros auxilios psicológicos"**.

**Incidente crítico:** evento repentino o inesperado que, según la persona, puede causar **distrés severo** e inhabilitar para el ejercicio de sus funciones en ese momento o después.

**Ejemplos en ATC:** accidentes, desastres, aeronaves en emergencia, sucesos con fallecimiento, vulneraciones de separación mínima, cuasi-accidentes, violencia, delitos, agresiones y amenazas, y la muerte de familiares o compañeros.

**Modelo de ENAIRE: Peers.** El *peer* es un **controlador de apoyo voluntario**, con amplia experiencia, seleccionado y formado en CISM (estándares de la **ICISF**). Tareas: intervención inmediata, asesoramiento a compañeros y organizar apoyo profesional de salud mental si hace falta.
- **Perfil (EUROCONTROL):** estable emocionalmente, que sepa escuchar, fiable, respetado, que entienda la confidencialidad, empático y consciente de que ofrece **primeros auxilios, no asistencia profesional**.

**Cinco fases**
1. Comunicación y divulgación del programa.
2. Selección y formación de los *peers* y grupos de interés.
3. **Intervención** del *peer* con el controlador.
4. **Derivación** a un profesional médico cuando proceda.
5. **Evaluación periódica** (cuestionarios anónimos e informe anual, con estadísticas de activaciones).', 'pp. 55-58', false),
  ('10000008-0000-4000-8001-000000000014', '00000000-0000-4000-8000-000000006008', 14, 'Error humano: modelo GEMS y modelo TEM', '**Error:** situación en la que una secuencia planificada de acciones **no consigue el objetivo**. Es inevitable y también necesario para aprender; no se elimina, pero se pueden identificar los contextos que lo facilitan.

**GEMS de Reason.** Clasifica los errores en **no intencionales** y **intencionales**.
| Tipo | Naturaleza | Se mitiga con |
|---|---|---|
| **Deslices** (*slips*) | No intencionales; fallo de **atención** (omisión, inversión, alteración del orden o del tiempo) | Entrenamiento procedimental y atencional, monitorización mutua, procedimientos y *checklists* |
| **Lapsus** | No intencionales; fallo de **memoria** (olvidar una intención). Es el tipo **más frecuente** | Refrescos de información y ayudas externas (anotar en la ficha o etiqueta) |
| **Equivocaciones** | **Intencionales**; errores de planificación (regla correcta mal aplicada o aplicada donde no corresponde) | Procedimientos, estandarización y conciencia de los sesgos |

- Los **sesgos cognitivos** nacen de procesos **heurísticos** (reglas rápidas "si A, entonces B"). Ejemplos: continuidad de plan, expectativa y familiaridad. Hay cuatro familias de sesgos.

**TEM (Threat and Error Management), desarrollado por OACI.** Tres componentes:
- **Amenazas:** incidencias externas que aumentan la complejidad sin que las propicie el controlador (indicativos similares, meteorología, congestión). Pueden ser **previsibles** (meteorología adversa) o **imprevistas** (un piloto copia la instrucción dirigida a otro).
- **Errores:** decisiones u omisiones del controlador que comprometen los márgenes de seguridad.
- **Estados no deseados:** situaciones en que falló la planificación y se reducen los márgenes (aeronave a un nivel no autorizado). Mientras se está en ellas se pueden resolver; un **desenlace** ya no tiene vuelta atrás.

El TEM parte de que errores y amenazas **no son eliminables**. No siempre hay una relación lineal amenaza-error-estado no deseado.', 'pp. 58-62', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000008-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006008', 'Según el Doc. 10151 de OACI, ¿qué son las «actuaciones humanas» (human performance)?', '["La aplicación del conocimiento sobre las personas al diseño del equipamiento y de los entornos", "Cómo las personas realizan sus actividades, es decir, la contribución humana al funcionamiento del sistema", "El conjunto de sanciones aplicables al personal que incumple los procedimientos operativos", "La medición del tiempo de reacción de cada persona ante los estímulos de su puesto"]'::jsonb, 1, 'OACI define las actuaciones humanas como la forma en que las personas realizan sus actividades. La definición del diseño de equipos y entornos corresponde a los factores humanos (p. 4).', 'p. 4', 1, false),
  ('10000008-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006008', '¿Con qué tipo de aspectos se asocian más a menudo los factores humanos, a diferencia de la ergonomía?', '["Los factores humanos, con los físicos; la ergonomía, con los psicológicos y sociales", "Los factores humanos, con los psicológicos; la ergonomía, con los físicos o fisiológicos", "Ambos se asocian exclusivamente con el diseño de las consolas y las pantallas", "Los factores humanos, con los económicos; la ergonomía, con los legales"]'::jsonb, 1, 'Fuera de la aviación los términos se intercambian, pero los factores humanos se asocian más a lo psicológico y la ergonomía a lo físico o fisiológico (p. 4).', 'p. 4', 2, false),
  ('10000008-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006008', 'En el modelo del «queso suizo» de Reason, ¿cuándo ocurre el suceso?', '["Cuando una sola capa de protección desaparece por completo", "Cuando el operador de primera línea comete el primer error de la cadena", "Cuando los agujeros de las distintas capas de protección se alinean", "Cuando la organización no dispone de ninguna política de seguridad escrita"]'::jsonb, 2, 'Cada capa de defensa tiene debilidades (agujeros) y el suceso se produce cuando estas se alinean, lo que ilustra el papel de las condiciones latentes (p. 5).', 'p. 5', 1, false),
  ('10000008-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006008', '¿Cuál es la aportación de Reason que el tema describe como la mayor y menos conocida?', '["La definición de los cinco niveles de la pirámide de necesidades", "Su investigación sobre el error humano, que dio lugar al modelo de clasificación GEMS", "El modelo SHELL de interacciones entre el humano y su entorno", "El principio de equivalencia entre el éxito y el fracaso"]'::jsonb, 1, 'El tema señala que su mayor y menos conocida aportación fue su trabajo sobre los errores humanos, con el modelo GEMS (p. 6).', 'p. 6', 2, false),
  ('10000008-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006008', 'Según Rasmussen, ¿qué caracteriza a la conducta basada en habilidades (skill-based)?', '["Se eligen conscientemente reglas almacenadas para situaciones conocidas pero poco frecuentes", "Se realiza con procesos automatizados, sin pensar de forma consciente, en tareas muy conocidas y rutinarias", "Exige un gran esfuerzo de análisis porque no hay reglas ni secuencias de acciones guardadas", "Solo aparece cuando el controlador trabaja bajo supervisión de un instructor"]'::jsonb, 1, 'La conducta basada en habilidades es automática y se da en tareas rutinarias; la basada en reglas y la basada en conocimiento implican procesos conscientes (pp. 6-7).', 'pp. 6-7', 1, false),
  ('10000008-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006008', '¿En qué tipo de conducta de Rasmussen se opera ante una emergencia o una situación inusual en frecuencia?', '["Conducta basada en habilidades (skill-based)", "Conducta basada en conocimiento (knowledge-based)", "Conducta basada en reglas (rule-based)", "Conducta basada en rutinas automáticas (routine-based)"]'::jsonb, 1, 'Cuando no hay reglas ni secuencias almacenadas se requiere un gran esfuerzo consciente de análisis: es el modo basado en conocimiento (p. 7).', 'p. 7', 2, false),
  ('10000008-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006008', 'En el modelo SHELL-O, ¿qué representa la relación L-H (elemento humano y soporte físico)?', '["La relación entre el controlador y los reglamentos, manuales y listas de verificación", "La relación con otras personas del lugar de trabajo, incluido el liderazgo", "La interfaz entre la persona y la máquina: consolas, pantallas, alarmas y ergonomía del equipo", "La relación con la temperatura, el ruido y las condiciones meteorológicas"]'::jsonb, 2, 'L-H es la interfaz humano-máquina. Los reglamentos y manuales corresponden a L-S, las personas a L-L y el entorno a L-E (p. 8).', 'p. 8', 2, false),
  ('10000008-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006008', '¿Qué expresa el tema sobre el uso del término «error humano» en la gestión del riesgo?', '["Es la causa raíz que debe identificarse y sancionarse en toda investigación", "Es el único término válido para clasificar los fallos en un entorno ATM", "Solo debe usarse cuando el error provoca un accidente con víctimas", "No ayuda a gestionar el riesgo; debería ser el punto de partida para ver dónde se produce un colapso del sistema"]'::jsonb, 3, 'El tema indica que «error humano» no ayuda a gestionar el riesgo y debe ser el punto de partida para señalar el colapso del sistema (p. 9).', 'p. 9', 2, false),
  ('10000008-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006008', '¿Qué documento de OACI adoptó formalmente en 1994 el enfoque sistémico en la investigación de sucesos?', '["El Anexo 2", "El Anexo 11", "El Anexo 19", "El Anexo 13"]'::jsonb, 3, 'El enfoque sistémico en la investigación de sucesos fue adoptado formalmente por OACI (1994) en su Anexo 13 (p. 10).', 'p. 10', 2, false),
  ('10000008-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006008', 'Según el principio de racionalidad local de EUROCONTROL, ¿cómo debe entenderse la aportación de cada experto?', '["Desde su propia perspectiva, porque cada persona actúa según sus objetivos, limitaciones y contexto", "Desde la perspectiva del supervisor, que es quien conoce mejor el conjunto", "Desde las normas escritas, ignorando el contexto particular de cada persona", "Desde los resultados obtenidos, juzgando la acción según sus consecuencias"]'::jsonb, 0, 'El principio 2 pide analizar cada aportación desde la perspectiva de quien actúa, con sus propios objetivos, limitaciones y contexto (p. 11).', 'p. 11', 2, false),
  ('10000008-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006008', '¿Qué establece el principio 10 de EUROCONTROL, «Equivalencia»?', '["Que el éxito y el fracaso se originan en los mismos procesos", "Que todos los controladores deben recibir la misma formación y el mismo salario", "Que cada sector debe tener la misma capacidad en cualquier circunstancia", "Que la tecnología y el factor humano tienen idéntico coste de implantación"]'::jsonb, 0, 'El principio de equivalencia indica que éxito y fracaso proceden de los mismos procesos, por lo que hay que entender también la variabilidad diaria del sistema (p. 12).', 'p. 12', 2, false),
  ('10000008-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006008', '¿Cómo define el término «safety» la visión Safety-II?', '["Que el mínimo posible de cosas salgan mal", "Que no se produzca ningún accidente en un periodo determinado", "Que todos los procedimientos se cumplan al pie de la letra", "Que el máximo posible de cosas salgan bien"]'::jsonb, 3, 'Safety-I se define por que el mínimo de cosas salgan mal; Safety-II, por que el máximo de cosas salgan bien (p. 14).', 'p. 14', 1, false),
  ('10000008-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006008', 'En la visión Safety-I, ¿cómo se considera predominantemente al ser humano en la gestión de la seguridad?', '["Como un recurso necesario para la resiliencia y la flexibilidad", "Como un elemento neutro que no influye en los resultados", "Como una amenaza", "Como el único componente que no puede fallar"]'::jsonb, 2, 'En Safety-I el humano se ve como una amenaza; en Safety-II, como un recurso necesario para la resiliencia y flexibilidad del sistema (p. 14).', 'p. 14', 2, false),
  ('10000008-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006008', '¿Qué diferencia hay entre Work-as-Imagined y Work-as-Done?', '["El primero es el trabajo en simulador; el segundo, el trabajo en sala de control", "El primero es lo que debería ocurrir según el diseño; el segundo, lo que realmente sucede en la operación diaria", "El primero es el trabajo del controlador; el segundo, el del supervisor", "El primero es el trabajo medido por indicadores; el segundo, el trabajo inspeccionado"]'::jsonb, 1, 'Work-as-Imagined es lo que se concibe que debería ocurrir y Work-as-Done es lo que sucede de verdad. El diseñador ve simplicidad aparente y el profesional, complejidad real (pp. 14-15).', 'pp. 14-15', 1, false),
  ('10000008-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006008', '¿Qué tres cuestiones cubre el ámbito (ATS.OR.300) de los requisitos de desempeño humano del Reglamento (UE) 2017/373 para los servicios de control?', '["Licencias, habilitaciones y certificados médicos", "Fraseología, idioma inglés y procedimientos de emergencia", "Cartas de acuerdo, capacidad de sector y gestión de afluencia", "Uso problemático de sustancias psicoactivas, estrés y fatiga"]'::jsonb, 3, 'ATS.OR.300 se refiere a prevenir y limitar los riesgos del uso problemático de sustancias psicoactivas, del estrés y de la fatiga (p. 16).', 'p. 16', 2, false),
  ('10000008-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006008', 'Según ATS.OR.305, ¿qué características debe tener el procedimiento para detectar el uso problemático de sustancias psicoactivas?', '["Ser confidencial, aleatorio y decidido por el supervisor de cada dependencia", "Ser voluntario, anónimo y gestionado por la representación sindical", "Ser objetivo, transparente y no discriminador, y estar aprobado por la autoridad competente", "Ser anual, general y aprobado por el propio proveedor de servicios"]'::jsonb, 2, 'El procedimiento debe ser objetivo, transparente y no discriminador, y debe aprobarlo la autoridad competente (p. 16).', 'p. 16', 2, false),
  ('10000008-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006008', '¿Cuál de los siguientes elementos debe especificar el proveedor en el sistema de turnos exigido por ATS.OR.320?', '["El salario mínimo por hora de servicio nocturno", "El número máximo de aeronaves por sector y hora", "El número máximo de días hábiles consecutivos de servicio", "La edad máxima para prestar servicio en turno de noche"]'::jsonb, 2, 'ATS.OR.320 enumera, entre otros, el número máximo de días hábiles consecutivos de servicio, de horas por período y los descansos mínimos (pp. 17-18).', 'pp. 17-18', 2, false),
  ('10000008-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006008', 'Según el Reglamento de Ejecución (UE) 2015/1018, ¿qué sucesos relacionados con la fatiga son de notificación obligatoria?', '["Únicamente la fatiga que haya provocado un accidente con daños", "La fatiga que repercuta, o pueda repercutir, en la capacidad de ejercer de forma segura las funciones de tránsito aéreo", "Toda sensación de cansancio, aunque no afecte al desempeño", "Solo la fatiga detectada en las pruebas médicas periódicas"]'::jsonb, 1, 'El anexo III obliga a notificar la fatiga que repercuta o pueda repercutir en el ejercicio seguro de las funciones, tanto al proveedor como al controlador (pp. 44-45).', 'pp. 44-45', 3, false),
  ('10000008-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006008', '¿Qué porcentaje aproximado del coste final de un proyecto queda fijado en el primer 10 % de su ciclo de vida (EUROCONTROL-FAA 2010)?', '["Aproximadamente el 70 %", "Aproximadamente el 30 %", "Aproximadamente el 50 %", "Aproximadamente el 90 %"]'::jsonb, 0, 'El tema recoge que alrededor del 70 % del coste final se fija en el primer 10 % del ciclo, por lo que conviene integrar los factores humanos desde el inicio (p. 21).', 'p. 21', 2, false),
  ('10000008-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006008', '¿Qué diferencia a un equipo de un simple grupo, según el tema?', '["El equipo trabaja con alto control externo y se centra solo en el resultado", "El equipo limita la comunicación de cada miembro al superior inmediato", "El equipo actúa con alto grado de autonomía y cuida tanto el resultado como el proceso", "El equipo no tiene roles definidos para evitar la rigidez"]'::jsonb, 2, 'El grupo tiene alto control externo y comunicación limitada al superior; el equipo tiene autonomía, comunicación abierta y se ocupa del proceso además del resultado (p. 22).', 'p. 22', 1, false),
  ('10000008-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006008', '¿Cuáles son los tres niveles de conciencia situacional de Endsley?', '["Atención, memoria y decisión", "Detección, identificación y resolución del conflicto", "Percepción de la situación, comprensión de la situación y proyección en el futuro", "Observación, planificación y ejecución de la maniobra"]'::jsonb, 2, 'Endsley define la conciencia situacional como percepción de los elementos, comprensión de su significado y proyección de su estado en un futuro próximo (p. 25).', 'p. 25', 1, false),
  ('10000008-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006008', '¿Qué rasgo común presenta la mayoría de los incidentes de tránsito aéreo en relación con la conciencia situacional?', '["Que el controlador ignoró deliberadamente un procedimiento publicado", "Que hubo un fallo técnico del sistema de vigilancia en todos los casos", "Que el controlador estaba en el primer año de ejercicio profesional", "Que incluyen alguna asunción, porque la mente rellena la información que falta con experiencias pasadas"]'::jsonb, 3, 'Cuando al modelo mental le falta información la mente la rellena con asunciones, y la mayoría de los incidentes ATC presentan alguna (p. 27).', 'p. 27', 2, false),
  ('10000008-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006008', '¿Cuáles son las tres dimensiones fundamentales que afectan a la carga de trabajo mental?', '["Edad, experiencia y horas de sueño", "Presión temporal, recursos cognitivos de procesamiento y aspectos emocionales", "Número de aeronaves, tipo de espacio y meteorología", "Motivación, salario y relación con los compañeros"]'::jsonb, 1, 'Los estudios señalan la presión temporal de la tarea, los recursos cognitivos que demanda y los aspectos emocionales (p. 28).', 'p. 28', 2, false),
  ('10000008-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006008', '¿Qué plantea la Ley de Yerkes-Dodson sobre la relación entre activación y rendimiento?', '["Que el rendimiento aumenta de forma lineal con el nivel de activación", "Que el rendimiento es máximo cuando la activación es lo más baja posible", "Que el rendimiento es independiente de la activación en tareas complejas", "Que tiene forma de U invertida: el rendimiento es óptimo con un nivel de activación moderadamente elevado"]'::jsonb, 3, 'Si la activación es demasiado alta o demasiado baja, el rendimiento empeora; el óptimo está en un nivel moderadamente elevado (p. 28).', 'p. 28', 1, false),
  ('10000008-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006008', 'Según la figura de Yerkes-Dodson comentada en el tema, ¿qué ocurre cuando la tarea es compleja frente a una sencilla?', '["El umbral de rendimiento máximo se alcanza más tarde", "El rendimiento máximo es siempre superior al de una tarea sencilla", "La curva desaparece y el rendimiento no depende de la activación", "El umbral de rendimiento máximo se alcanza antes"]'::jsonb, 3, 'Con tareas complejas el punto de máximo rendimiento se alcanza antes que con tareas sencillas (p. 29).', 'p. 29', 3, false),
  ('10000008-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006008', '¿Qué efecto puede tener mantener atención vigilante en periodos de baja densidad de tráfico?', '["Puede causar un grado de fatiga tan alto o más que en periodos de alta carga de trabajo mental", "No tiene ningún efecto relevante para el análisis de factores humanos", "Reduce la fatiga porque el controlador puede relajarse por completo", "Mejora siempre la detección de señales relevantes"]'::jsonb, 0, 'El tema indica que es un error pensar que la baja densidad no importa: la atención sostenida puede fatigar tanto o más que la alta carga (p. 29).', 'p. 29', 2, false),
  ('10000008-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006008', 'En el ejemplo del destornillador del tema, ¿qué concepto se ilustra cuando el mensaje fue bien expresado pero el receptor no reaccionó por el ruido?', '["Una comunicación correcta pero no eficaz, que da origen al concepto de colación", "Una comunicación eficaz pero incorrecta, que se corrige con feedback silencioso", "Una barrera cognitiva atribuible siempre a la falta de formación del receptor", "Un fallo de código que se resuelve cambiando de canal de comunicación"]'::jsonb, 0, 'La comunicación fue correcta pero no eficaz por el ruido; de ahí nace la colación, que comprueba que las interferencias no merman la ejecución del mensaje (p. 32).', 'p. 32', 2, false),
  ('10000008-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006008', '¿Cuáles son los dos «grandes antídotos» para salvar las barreras de la comunicación, según el tema?', '["La fraseología y la colación", "La autoridad y la disciplina", "El humor y la informalidad", "La empatía y la asertividad"]'::jsonb, 3, 'La empatía permite ponerse en el lugar del otro y la asertividad defender la postura propia sin atacar a la otra parte (p. 36).', 'p. 36', 1, false),
  ('10000008-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006008', '¿En qué horas se sitúa aproximadamente el mínimo de la ventana circadiana (WOCL), con mayor somnolencia y menor desempeño?', '["Entre las 22 y las 24 horas", "Entre las 9 y las 12 de la mañana", "Entre las 3 y las 6 de la madrugada", "Entre las 14 y las 17 horas"]'::jsonb, 2, 'El proceso circadiano alcanza su mínimo en la segunda parte de la noche, aproximadamente entre las 3 y las 6 a.m. (p. 42).', 'p. 42', 2, false),
  ('10000008-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006008', '¿Qué describe el proceso homeostático (S) en la regulación del sueño y la vigilia?', '["El impulso de dormir, que es mayor cuanto más tiempo se lleva despierto", "El reloj interno de unas 24 horas que regula la temperatura corporal", "La inercia del sueño inmediatamente posterior al despertar", "La fase del sueño en la que aparecen los sueños con argumento"]'::jsonb, 0, 'El proceso S genera el impulso de dormir en función de las horas de vigilia. El reloj de 24 h es el proceso C y la inercia es el proceso W (p. 42).', 'p. 42', 2, false),
  ('10000008-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006008', '¿Qué es el cansancio en relación con la fatiga?', '["Un estado fisiológico objetivo causado exclusivamente por la falta de sueño", "El elemento subjetivo de la fatiga, la sensación del individuo respecto a su nivel de fatiga", "Un trastorno del sueño diagnosticado por pruebas médicas", "Un sinónimo de hipoestrés en tareas rutinarias"]'::jsonb, 1, 'La fatiga es objetiva y fisiológica; el cansancio es su componente subjetivo y puede estar o no presente (p. 45).', 'p. 45', 2, false),
  ('10000008-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006008', '¿Qué es un microsueño?', '["Una siesta planificada de unos veinte minutos para recuperar la alerta", "La fase REM más corta del ciclo, con atonía muscular", "Un despertar breve durante la fase III del sueño profundo", "Un episodio de unos pocos segundos en que el cerebro desconecta y la persona se duerme, a veces sin darse cuenta"]'::jsonb, 3, 'Los microsueños duran segundos, pueden pasar desapercibidos y son especialmente peligrosos en tareas relacionadas con la seguridad (p. 41).', 'p. 41', 2, false),
  ('10000008-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006008', 'En la clasificación de estados de estrés en el control, ¿cuál se asocia a la zona de mejor rendimiento?', '["Eustrés", "Hipoestrés", "Hiperestrés", "Distrés"]'::jsonb, 0, 'El eustrés es la tensión positiva que se da cuando se puede uno concentrar sin que la presión desborde, y corresponde a la zona de mejor rendimiento (p. 51).', 'p. 51', 1, false),
  ('10000008-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006008', '¿Cuáles son las tres fuentes principales de estrés en el ámbito del control aéreo, según EASA (GM1 ATS.OR.310)?', '["Estresores económicos, políticos y tecnológicos", "Estresores ambientales o físicos, relacionados con la tarea y relativos al individuo", "Estresores agudos, crónicos y postraumáticos", "Estresores de la frecuencia, del sector y de la aeronave"]'::jsonb, 1, 'El tema distingue estresores ambientales o físicos, estresores de la tarea y estresores del individuo (p. 52).', 'p. 52', 2, false),
  ('10000008-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006008', '¿Cómo se conoce habitualmente al programa CISM y qué carácter tiene?', '["«Evaluación de la aptitud»; es obligatorio, público y sancionador", "«Seguimiento clínico»; es obligatorio, anónimo y sustitutivo de la baja médica", "«Primeros auxilios psicológicos»; es confidencial, voluntario y educativo", "«Auditoría de seguridad»; es confidencial, obligatorio y punitivo"]'::jsonb, 2, 'El CISM es confidencial, voluntario y educativo, y se suele conocer como primeros auxilios psicológicos (p. 55).', 'p. 55', 1, false),
  ('10000008-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006008', 'En el modelo de ENAIRE para el CISM, ¿quiénes son los «peers»?', '["Controladores voluntarios con amplia experiencia, seleccionados y formados para apoyar a compañeros tras un incidente crítico", "Psicólogos profesionales contratados para evaluar a los controladores tras un incidente", "Inspectores de la autoridad competente que investigan el suceso", "Controladores en prácticas asignados como acompañantes del afectado"]'::jsonb, 0, 'Los peers son controladores voluntarios y con amplia experiencia, formados en CISM, que complementan la asistencia profesional cuando es necesaria (p. 56).', 'p. 56', 2, false),
  ('10000008-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006008', 'En el modelo GEMS de Reason, ¿qué son los deslices (slips)?', '["Acciones no intencionales resultantes de un fallo en la atención", "Acciones no intencionales resultantes de un fallo de memoria", "Acciones intencionales resultantes de un error de planificación", "Acciones deliberadas que incumplen un procedimiento conocido"]'::jsonb, 0, 'Los deslices son no intencionales y se deben a fallos de atención; los lapsus lo son de memoria y las equivocaciones son intencionales (p. 59).', 'p. 59', 1, false),
  ('10000008-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006008', '¿Qué tipo de error describe el tema como el más frecuente, relacionado con el olvido de una intención?', '["Los lapsus", "Los deslices", "Las equivocaciones", "Las transgresiones"]'::jsonb, 0, 'Los lapsus, fallos de memoria o de gestión de la información en la memoria de trabajo, son el tipo más frecuente y se mitigan con ayudas cognitivas externas (p. 59).', 'p. 59', 2, false),
  ('10000008-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006008', '¿Cómo se caracterizan las equivocaciones en el modelo GEMS?', '["Son acciones no intencionales causadas por la omisión de un paso de la secuencia", "Son olvidos de intenciones previstas para más adelante", "Son respuestas automáticas sin decisión consciente", "Son acciones intencionales con errores de planificación, como aplicar mal una regla correcta o una regla en una situación inadecuada"]'::jsonb, 3, 'Las equivocaciones parten de decisiones conscientes basadas en conocimiento y modelos mentales previos, y son errores de planificación (p. 59).', 'p. 59', 2, false),
  ('10000008-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006008', '¿Cuáles son los tres componentes básicos del modelo TEM en el trabajo diario del controlador?', '["Amenazas, vulnerabilidades y consecuencias", "Peligros, riesgos y barreras", "Amenazas, errores y estados no deseados", "Errores, deslices y lapsus"]'::jsonb, 2, 'El TEM distingue amenazas, errores y estados no deseados (pp. 61-62).', 'pp. 61-62', 1, false)
on conflict (id) do nothing;
