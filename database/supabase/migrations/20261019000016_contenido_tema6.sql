-- Contenido propio del Tema 6 (Plan de vuelo y gestión de la capacidad y afluencia de tráfico).
-- Redactado a partir de docs/fuentes/enaire/t6.pdf (ENAIRE). reviewed=false: pendiente de revisión humana.

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000006-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006006', 1, 'Plan de vuelo: concepto y función', '**Qué es.** Es la información que se somete a las dependencias ATS sobre un vuelo proyectado, o sobre una parte de él. Es una **declaración de intenciones**: el piloto expone lo que va a hacer y **solicita unos servicios ATS** que garanticen la seguridad.

**Para qué sirve**
- Se presenta para su **aceptación y tramitación**, de modo que las dependencias de **control, alerta e información de vuelo** tengan los datos necesarios.
- Es hoy uno de los instrumentos básicos para **regular el tránsito** en el espacio aéreo.

**Contexto.** El aumento del tráfico en el área **ECAC** obligó a equilibrar **demanda y capacidad**. Las funciones centrales de proceso de planes y **ATFM** las ejerce el **NMOC** (EUROCONTROL).', 'pp. 4', false),
  ('10000006-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006006', 2, 'FPL: quién debe presentarlo', '**FPL (Filed Flight Plan).** Debe presentarse para:
- todo vuelo, o parte de él, al que se preste **control de tránsito aéreo**;
- todo vuelo **IFR**;
- todo **VFR que cruce fronteras internacionales** (Schengen **no** exime);
- **VFR nocturno** que se aleje del aeródromo de salida, **VFR en espacio B, C, D y E**, o con origen, destino o alternativo en aeródromo controlado o **AFIS**.

**Exentos**
- Vuelos militares en misiones tácticas o de defensa aérea.
- Vuelos de búsqueda y salvamento en misión de urgencia.
- Vuelos expresamente autorizados por la autoridad competente.', 'p. 5', false),
  ('10000006-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006006', 3, 'FPL: dónde, direccionamiento y plazos', '**Dónde se presenta**
- Web o app de **ICARO**, o en la **oficina ARO centralizada** (teléfono, SITA u otros medios).
- **Directamente al IFPS** (EUROCONTROL) si el vuelo es **IFR y GAT**.
- En casos excepcionales, en vuelo, como **AFIL** a una estación de telecomunicaciones aeronáuticas.

**Direccionamiento.** Se transmite a **todas las unidades ATS afectadas**; el piloto envía a la misma dependencia los mensajes asociados.

**Plazos** (vuelos que cruzan fronteras o con servicio de control o asesoramiento)
| Caso | Plazo |
|---|---|
| Máximo | no más de **120 h** antes de la EOBT |
| Posible medida de afluencia (ATFM) | al menos **3 h** antes de la EOBT |
| Resto de vuelos | al menos **60 min** antes de la salida |
| Presentado en vuelo | al menos **10 min** antes de la hora estimada en el punto de entrada al área de control o de cruce con la aerovía |', 'pp. 5-6', false),
  ('10000006-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006006', 4, 'FPL: contenido y plan de vuelo que reemplaza (RFP)', '**Contenido.** Identificación, reglas y tipo de vuelo, aeronave y estela, equipos, salida y EOBT, velocidad y nivel, ruta, destino, alternativas, autonomía, personas a bordo y equipo de emergencia. Formulario **normalizado OACI**.

**RFP (Replacement Flight Plan)**
- Afecta a vuelos **sujetos a medidas ATFCM** que, antes del vuelo, eligen una **ruta distinta** entre los mismos aeródromos para evitar demoras.
- La **etapa previa al vuelo** es la **EOBT menos 4 horas**. El **último RFP** se presenta al menos **30 min antes de la EOBT**.
- El plan lleva el indicativo original, la nueva ruta completa en la **casilla 15** y, como último elemento de la **casilla 18**, **RFP/Qn** (n = número de RFP).
- Si ya había un FPL: primero un **CNL inmediato**, excepcionalmente con prioridad **DD**, y después el FPL de reemplazo con un intervalo **no inferior a 5 min**.', 'pp. 6-7', false),
  ('10000006-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006006', 5, 'Mensajes AFTN: prioridades', '**AFTN.** Red mundial de circuitos fijos aeronáuticos. Las **letras de prioridad** fijan el orden de transmisión.
| Prioridad | Tipo de mensaje |
|---|---|
| **SS** | Socorro |
| **DD** | Urgencia |
| **FF** | Plan de vuelo; movimiento y control; SIGMET y aeronotificaciones especiales |
| **GG** | Pronósticos y observaciones meteorológicas, regularidad de vuelo, AIS |
| **KK** | Administrativos aeronáuticos |

**Orden de transmisión:** 1.º **SS**; 2.º **DD y FF**; 3.º **GG y KK**. A igual prioridad se respeta el **orden de recepción**.', 'pp. 9-10', false),
  ('10000006-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006006', 6, 'Mensajes de emergencia: fases de incertidumbre, alerta y peligro', 'Los mensajes de **socorro** (fase de peligro) llevan prioridad **SS**. Los de **urgencia**, incluidos los de alerta y los de incertidumbre, llevan **DD**.

**Incertidumbre**
- Sin comunicación en **30 min** desde cuando debía recibirse, o desde un intento infructuoso, lo que ocurra antes.
- La aeronave no llega **30 min después** de la última hora prevista de llegada.

**Alerta**
- Autorizada a aterrizar y **no aterriza 5 min después** de la hora prevista, sin comunicación.
- Eficiencia afectada sin aterrizaje forzoso probable, o interferencia ilícita.

**Peligro**
- **Combustible agotado o insuficiente** para llegar a un lugar seguro.
- Eficiencia afectada hasta hacer **probable un aterrizaje forzoso**, o aterrizaje forzoso inminente o ya realizado.', 'pp. 10-11', false),
  ('10000006-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006006', 7, 'Mensajes de movimiento y control, y suplementarios', '**Grupos:** FPL presentado (DLA, CHG, CNL, DEP, ARR); coordinación (CPL, EST, CDN, ACP, LAM); suplementarios (RQP, RQS, SPL); control.

- **DLA:** se envía si la salida se retrasa respecto a la **EOBT** del plan.
- **CHG:** cambia datos básicos de un FPL ya transmitido. **No** puede cambiar **identificación, aeródromo de salida ni de destino**: en esos casos se cancela y se presenta uno nuevo.
- **CNL:** vuelo cancelado. Lo envía la dependencia ATS del **aeródromo de salida**. Con **DD** si va seguido de un FPL nuevo.
- **DEP:** inmediatamente después de la salida, desde el aeródromo de salida a los destinatarios del FPL.
- **ARR:** lo envía la dependencia del aeródromo de llegada. Para **VFR** se transmite siempre y para **IFR** solo **previa petición**.
- **RQP:** solicita datos de FPL, por ejemplo ante una aeronave de la que no se tienen datos básicos.
- **RQS:** solicita datos suplementarios, a la ARO de salida.
- **SPL:** respuesta de la ARO de salida con la información adicional pedida.', 'pp. 12-15', false),
  ('10000006-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006006', 8, 'Network Manager y organización de la afluencia en España', '**NM (Network Manager).** En la región EUR, EUROCONTROL tiene una **unidad central única** de ATFM, hoy integrada en el NM por encargo de la Comisión Europea.
- Lo gobierna el **Network Manager Board (NMB)**, con representantes de autoridades, proveedores ANSP, etc.
- Su **Plan estratégico operativo** abarca **cinco años**.

**En España** el NM coordina con:
- la **Dirección de Operaciones ATM**, a través de la **UATM/UCATM**;
- las **FMP** de los centros de control, atendidas por **técnicos de control de afluencia (TCA)** y siempre bajo la responsabilidad del **Jefe de Sala del ACC**;
- la **AMC**, unidad civil/militar que gestiona en fase pretáctica la asignación temporal del espacio y elabora el **AUP/UUP**.

**Sistemas del NM:** **ETFMS** (monitoriza y aplica medidas), **CASA** (slots), **ENV** (base de datos) e **IFPS** (planes).

**UCATM.** Supervisa las fases ATFM, centraliza las FMP si no operan y actúa como **célula de crisis**.', 'pp. 15-17', false),
  ('10000006-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006006', 9, 'Fases de la actividad ATFCM', '| Fase | Cuándo | Qué se hace |
|---|---|---|
| **Estratégica** | Hasta **7 días** antes | Análisis de demanda prevista y medidas para equilibrarla. Es cooperativa y produce el **NOP** (Network Operational Plan) europeo. |
| **Pretáctica** | Los **6 días** previos | Afinar la previsión y decidir las medidas. Se recogen en el **Plan Diario ATFCM (ADP)**. |
| **Táctica** | El **día de la operación** | Tiempo real: tormentas, fallos de radioayudas. Se actualiza el ADP. Es clave la coordinación de **Jefes de Sala y Supervisores** con los **TCA**. |
| **Post-operacional** | Desde el **día siguiente** | Mide y analiza lo ocurrido, recoge *feedback* y produce **mejores prácticas** que realimentan las tres fases anteriores. |', 'pp. 18-19', false),
  ('10000006-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006006', 10, 'IFPS: tratamiento de los planes de vuelo', '**IFPS.** Es la unidad del NM que trata los planes de vuelo. Tiene **dos centros redundantes: Bruselas y Bretigny (París)**. España depende, por lo general, del francés.

**Funciones:** recibir, validar y distribuir los planes en el área **ECAC**.

**Resultado de la validación** (contraste automático con la base **ENV**)
- **REJ (rechazado):** contiene información contraria a ENV. **No llega a ATC** y el operador u originador debe actuar.
- **ACK (aceptado):** es correcto o el error se corrige manualmente. Se envía a los ANSP.
- **FLS (suspendido):** un plan ya aceptado se suspende con un mensaje de suspensión. En la dependencia ATS implica inicialmente **no autorizar la salida**.', 'pp. 19-21', false),
  ('10000006-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006006', 11, 'Demanda y capacidad', '**Demanda.** Número de vuelos que notifican su intención de volar en un espacio aéreo y periodo. Se calcula con los **planes presentados**, sin VFR ni vuelos operacionales. Para compararla con la capacidad ATC se cuentan todos los **IFR**, incluida la parte IFR de los mixtos.

**Capacidad.** Volumen de tránsito **operacionalmente aceptable** por periodo (entradas a un sector, sobrevuelos, despegues y aterrizajes).

**Tipos**
- **Sostenible:** la máxima alcanzable de forma mantenida, con seguridad y demora media aceptable. Es el **factor principal de planificación**.
- **Máxima:** puede ser sensiblemente superior a la sostenible, pero **no más de 60 min**.
- **Declarada:** la notificada a los organismos, basada en la sostenible.
- **Disponible:** la real en cada momento. En condiciones óptimas coincide con la declarada.

**Quién la determina**
- **Declarada y máxima:** la **Dirección de Operaciones**.
- **Disponible en táctica:** cada unidad ATS. Responde el **Jefe de Sala**; si no hay, el **Supervisor**; si tampoco, el **CTA con habilitación más antigua** de servicio.

**Monitorización.** El **TCA** vigila la carga de los volúmenes de tráfico (**HEC**, **OCC Peak**, **OCC Sustained**). Hay sobredemanda cuando se superan **todos** los parámetros aplicables. En pretáctica, o con más de **3 h** de antelación, se usa solo el **HEC**.', 'pp. 21-24', false),
  ('10000006-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006006', 12, 'Acciones ante sobredemanda y técnicas sin regulación', '**Orden de actuación:**
1. Ver si se puede **adaptar la capacidad** a la demanda.
2. Aplicar medidas sin regulación (**STAM**).
3. **Último recurso:** regular con **CTOT** y actuar sobre el tráfico en vuelo.

Decide siempre el **Jefe de Sala**.

| Técnica | Idea clave |
|---|---|
| **Configuración dinámica** | Ajustar en táctica el número de sectores y posiciones a la demanda. |
| **Level capping** | Restringe niveles de vuelo utilizables en un ACC o entre dos adyacentes. Se refleja en el plan de vuelo. |
| **Rerouting** | Cambiar la ruta del plan para repartir tráfico. En pretáctica lo gestiona el **FMP Manager** y requiere nuevo FPL. Avisar a los AO con **3 h** de antelación. Existe el **rerouting táctico** (ATC). |
| **MDI** | Espaciar despegues: solo en **táctica**, si se satura un sector o baja la capacidad de golpe. Como máximo **5 min** entre salidas durante unos **30 min**. |
| **Miles in trail** | Separación en millas dentro de un flujo entre unidades adyacentes, a corto plazo. |
| **Cherry picking** | Medidas ATFCM solo sobre vuelos seleccionados, para picos cortos (1 h a 1 h 30 min) en zonas congestionadas. |', 'pp. 24-27', false),
  ('10000006-0000-4000-8001-000000000013', '00000000-0000-4000-8000-000000006006', 13, 'Regulaciones, CTOT y vuelos exentos', '**Regulación.** Adecua la demanda a la capacidad limitando los vuelos que entran en un espacio o aeródromo mediante **CTOT**, que retrasan el despegue.
- La **FMP** coordina con el **NMOC** y toma la decisión final de implantar, modificar o cancelar.
- El **Jefe de Sala del ACC** aprueba las medidas, que deben estar justificadas y **por escrito**. Sin Jefe de Sala, las propone el supervisor y las aprueba el Jefe de Sala. Si ENAIRE no es el proveedor, se coordina directamente con la FMP.

**Sectores sin OTMV** (excepto TMA de Barcelona y Madrid)
- Se monitoriza con la capacidad declarada **+10 %** la primera hora, si en los **120 min** siguientes no se supera la declarada.
- Entre la declarada y +10 %: no se regula si luego no se rebasa la declarada.
- Por encima de +10 %: se regula la primera hora a ese valor y después a la declarada.
- Si se supera la declarada en los 120 min siguientes: se regula a la **declarada** desde el inicio.

**Sectores con OTMV:** rate igual o superior a la declarada.

**CTOT.** Forma parte de la **autorización ATC**. Ante un plan suspendido, TWR contacta con la FMP.

**Exentos y excluidos**
- **Exentos:** de todas las regulaciones, autorizados por los **Estados**: jefes de Estado, SAR, ambulancias con vidas en juego, extinción de incendios.
- **Excluidos:** solo de una regulación o volumen concretos, autorizados por los **proveedores de servicio**.

**Cancelación.** Cuando deja de ser necesaria; el Jefe de Sala es el último responsable.', 'pp. 27-30', false),
  ('10000006-0000-4000-8001-000000000014', '00000000-0000-4000-8000-000000006006', 14, 'FUA: uso flexible del espacio aéreo', '**Concepto.** El espacio no es civil ni militar, sino **único y continuo** y se usa según necesidades. Toda segregación debe ser **temporal**.

**Tres niveles de gestión**
1. **Estratégico:** política nacional a largo plazo, civil/militar.
2. **Pretáctico:** gestión del día anterior a través de la **AMC**.
3. **Táctico:** gestión en tiempo real.

**Estructuras flexibles**
- **TSA** (temporalmente segregada): reserva temporal; **no** se permite tránsito de otros tráficos.
- **TRA** (temporalmente restringida): se puede permitir otro tráfico **con autorización ATC**.
- **CDR** (ruta condicional): ruta no permanente que se usa solo en los periodos publicados (ENR 3.5-1) y con **ruta alternativa** asociada. Solo queda la categoría **CDR 1**, fijada en fase estratégica y planificable en FPL. Si el AUP la cierra, hay que cancelar el FPL y presentar otro con la alternativa en la casilla 15.

**AUP.** La **AMC** (civil/militar) lo distribuye a EUROCONTROL, ACC/FMP y AMC adyacentes **antes de las 14:00 UTC** del día anterior, con validez de **24 h desde las 06:00 UTC** del día siguiente. Se actualiza con el **UUP**.', 'pp. 30-32', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000006-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006006', '¿Cómo se caracteriza el plan de vuelo en el tema?', '["Una autorización ATC vinculante que sustituye a la clearance", "Un informe posterior al vuelo sobre la ruta realmente volada", "Un documento exclusivo de los vuelos IFR comerciales", "Una declaración de intenciones del piloto, junto con el requerimiento de unos servicios ATS"]'::jsonb, 3, 'El plan de vuelo es una declaración de intenciones y a la vez la petición de servicios ATS que garanticen la seguridad (p. 4).', 'p. 4', 1, false),
  ('10000006-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006006', '¿Qué organismo desempeña las funciones centrales de proceso de planes de vuelo y de gestión de afluencia (ATFM)?', '["La oficina ARO centralizada de ENAIRE", "La OACI desde su sede de Montreal", "El ACC de cada Estado de forma independiente", "El NMOC, Centro de Operaciones del Gestor de la Red de EUROCONTROL"]'::jsonb, 3, 'Esas funciones centrales las realiza el NMOC de EUROCONTROL (p. 4).', 'p. 4', 1, false),
  ('10000006-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006006', '¿Cuál de estos vuelos está obligado a presentar un FPL?', '["Un vuelo militar en misión táctica", "Un vuelo VFR que cruza una frontera internacional, aunque sea dentro del espacio Schengen", "Un vuelo de búsqueda y salvamento en misión de urgencia", "Un vuelo expresamente autorizado por la autoridad competente a no presentarlo"]'::jsonb, 1, 'Todo VFR que cruce fronteras internacionales debe presentar FPL y Schengen no exime. Los otros tres supuestos son exenciones (p. 5).', 'p. 5', 1, false),
  ('10000006-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006006', '¿Cuál de estos vuelos está exento de presentar plan de vuelo?', '["Un vuelo IFR de circulación aérea general", "Un vuelo VFR nocturno que abandona las proximidades del aeródromo de salida", "Un vuelo de búsqueda y salvamento en misión de urgencia", "Un vuelo VFR en espacio aéreo controlado clase D"]'::jsonb, 2, 'Están exentos los militares en misión táctica o de defensa, los SAR en urgencia y los expresamente autorizados (p. 5).', 'p. 5', 2, false),
  ('10000006-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006006', '¿En qué consiste el level capping?', '["En espaciar los despegues de un aeródromo en intervalos regulares", "En mantener una separación en millas entre las aeronaves de un flujo", "En seleccionar vuelos concretos y aplicarles medidas ATFCM", "En restringir los niveles de vuelo utilizables dentro de un ACC o entre dos ACC adyacentes para reducir la demanda por encima o por debajo de un nivel"]'::jsonb, 3, 'El level capping limita los niveles utilizables para aliviar la sobrecarga por encima o por debajo de un nivel determinado (p. 25).', 'p. 25', 2, false),
  ('10000006-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006006', '¿A quién se presenta directamente el FPL de un vuelo IFR de circulación aérea general (GAT)?', '["Al IFPS de EUROCONTROL", "Solo a la torre del aeródromo de salida", "A la AMC", "A la FMP del ACC correspondiente"]'::jsonb, 0, 'Los vuelos IFR y GAT pueden presentar el FPL directamente al IFPS (p. 5).', 'p. 5', 2, false),
  ('10000006-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006006', '¿Con qué antelación máxima respecto a la EOBT puede presentarse un FPL?', '["120 horas", "48 horas", "72 horas", "24 horas"]'::jsonb, 0, 'El FPL no puede presentarse más de 120 horas antes de la hora prevista de fuera calzos (p. 5).', 'pp. 5-6', 2, false),
  ('10000006-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006006', '¿Con qué antelación mínima sobre la EOBT debe presentarse el FPL de un vuelo que pueda estar sujeto a medidas de gestión de afluencia?', '["Al menos 60 minutos", "Al menos 2 horas", "Al menos 6 horas", "Al menos 3 horas"]'::jsonb, 3, 'Para vuelos que puedan estar sujetos a ATFM, el plazo es de al menos tres horas antes de la EOBT (p. 6).', 'p. 6', 2, false),
  ('10000006-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006006', 'Para un vuelo que cruza fronteras y no puede estar sujeto a ATFM, ¿cuál es el plazo mínimo de presentación del FPL?', '["Al menos sesenta minutos antes de la salida", "Al menos treinta minutos antes de la salida", "Al menos dos horas antes de la EOBT", "Al menos tres horas antes de la EOBT"]'::jsonb, 0, 'Los demás vuelos presentan el plan al menos sesenta minutos antes de la salida (p. 6).', 'p. 6', 2, false),
  ('10000006-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006006', 'Si el FPL se presenta durante el vuelo, ¿con qué antelación mínima debe garantizarse su recepción respecto a la hora estimada en el punto de entrada al área de control?', '["Al menos cinco minutos", "Al menos veinte minutos", "Al menos diez minutos", "Al menos treinta minutos"]'::jsonb, 2, 'En vuelo, debe presentarse al menos diez minutos antes de la hora estimada de llegada al punto de entrada del área de control o de cruce con la aerovía (p. 6).', 'p. 6', 2, false),
  ('10000006-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006006', 'En el procedimiento RFP, ¿cómo se define la etapa previa al vuelo?', '["La EOBT menos 4 horas", "La EOBT menos 2 horas", "La EOBT menos 6 horas", "El momento de la puesta en marcha"]'::jsonb, 0, 'La etapa previa al vuelo se define como la EOBT menos 4 horas, y el último RFP debe presentarse al menos 30 minutos antes de la EOBT (p. 6).', 'p. 6', 3, false),
  ('10000006-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006006', 'Si ya hay un FPL presentado y se elige una ruta alternativa entre los mismos aeródromos, ¿qué debe hacerse?', '["Enviar un CHG con la nueva ruta completa", "Enviar un CNL de inmediato, con prioridad DD, y después el FPL de reemplazo con un intervalo no inferior a 5 minutos", "Enviar un DLA y mantener el FPL original", "Enviar el FPL de reemplazo antes del CNL, con menos de un minuto de diferencia"]'::jsonb, 1, 'Primero se cancela el plan (CNL, excepcionalmente con DD) y después se transmite el FPL que reemplaza, no antes de 5 minutos (pp. 6-7).', 'pp. 6-7', 3, false),
  ('10000006-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006006', '¿Qué indicador de prioridad AFTN llevan los mensajes de plan de vuelo y los de movimiento y control?', '["SS", "GG", "FF", "KK"]'::jsonb, 2, 'Los mensajes de plan de vuelo, movimiento y control llevan prioridad FF (p. 9).', 'p. 9', 2, false),
  ('10000006-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006006', '¿Qué indicador de prioridad AFTN se transmite en primer lugar?', '["DD", "FF", "SS", "GG"]'::jsonb, 2, 'El orden de transmisión es SS, después DD y FF, y por último GG y KK (p. 10).', 'p. 10', 1, false),
  ('10000006-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006006', '¿Cuál de estas situaciones corresponde a la fase de incertidumbre?', '["El combustible a bordo se considera agotado", "La aeronave autorizada a aterrizar no lo ha hecho 5 minutos después de la hora prevista", "No se ha recibido comunicación de la aeronave en 30 minutos desde cuando debía recibirse", "Se cree que la aeronave es objeto de interferencia ilícita"]'::jsonb, 2, 'La falta de comunicación durante 30 minutos inicia la fase de incertidumbre. Las otras situaciones son de alerta o peligro (pp. 10-11).', 'pp. 10-11', 2, false),
  ('10000006-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006006', '¿Cuál de estas situaciones corresponde a la fase de alerta?', '["No hay comunicación durante 30 minutos desde la última esperada", "El combustible a bordo se considera agotado o insuficiente", "Se tiene certeza razonable de un aterrizaje forzoso inminente", "La aeronave, autorizada a aterrizar, no lo ha hecho 5 minutos después de la hora prevista y no se ha restablecido la comunicación"]'::jsonb, 3, 'No aterrizar a los 5 minutos de la hora prevista, sin comunicación, es un supuesto de alerta (p. 11).', 'p. 11', 2, false),
  ('10000006-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006006', '¿Cuál de estas situaciones corresponde a la fase de peligro?', '["La aeronave no llega 30 minutos después de la última hora prevista de llegada", "No hay comunicación durante 30 minutos desde la última esperada", "La aeronave autorizada a aterrizar no lo hace 5 minutos después de la hora prevista", "El combustible a bordo se considera agotado o insuficiente para llegar a un lugar seguro"]'::jsonb, 3, 'El combustible agotado o insuficiente es un supuesto de la fase de peligro (p. 11).', 'p. 11', 2, false),
  ('10000006-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006006', '¿Qué datos del FPL no pueden modificarse mediante un mensaje CHG?', '["La identificación de la aeronave, el aeródromo de salida y el aeródromo de destino", "La hora prevista de fuera calzos, la ruta y el nivel de crucero", "La velocidad de crucero y el número de personas a bordo", "El equipo de la aeronave y la autonomía"]'::jsonb, 0, 'Esos tres campos obligan a cancelar el FPL y presentar uno nuevo (p. 13).', 'p. 13', 2, false),
  ('10000006-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006006', '¿Cuál es la diferencia entre una TSA y una TRA?', '["En la TSA se permite el tránsito con autorización ATC; en la TRA no puede transitar otro tráfico", "En la TSA no puede transitar otro tráfico; en la TRA se puede permitir tránsito bajo autorización ATC", "Ambas permiten el tránsito libre de otros tráficos, pero la TSA es solo militar", "La TSA es permanente y la TRA es una ruta condicional"]'::jsonb, 1, 'La TSA es una reserva temporal sin tránsito de terceros. En la TRA se puede autorizar otro tráfico (p. 31).', 'p. 31', 2, false),
  ('10000006-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006006', '¿Cuándo se transmite el mensaje DEP, salvo acuerdo regional en contra?', '["Con 30 minutos de antelación a la EOBT", "Al recibir el informe de llegada", "Cuando la salida sufre una demora respecto a la EOBT", "Inmediatamente después de la salida de la aeronave"]'::jsonb, 3, 'El DEP se transmite inmediatamente después de la salida, desde la dependencia del aeródromo de salida (p. 13).', 'p. 13', 1, false),
  ('10000006-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006006', '¿Cuándo se transmite el mensaje ARR de un vuelo IFR?', '["Siempre, de forma automática", "Previa petición", "Nunca, solo se usa en VFR", "Solo si aterriza en un aeródromo de alternativa"]'::jsonb, 1, 'El ARR se envía para los vuelos VFR y, en los IFR, previa petición (p. 14).', 'p. 14', 2, false),
  ('10000006-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006006', '¿Para qué se utiliza la regulación Cherry Pick?', '["Para regular de forma permanente todos los vuelos de un sector durante el día", "Para resolver picos cortos de un número limitado de vuelos en zonas congestionadas, seleccionando vuelos concretos", "Para cerrar rutas condicionales CDR 1", "Para ajustar en táctica el número de sectores abiertos"]'::jsonb, 1, 'Se aplica a picos cortos (1 h o 1 h 30 min) y solo a los vuelos seleccionados (p. 27).', 'p. 27', 2, false),
  ('10000006-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006006', '¿Qué principio básico establece el FUA sobre el espacio aéreo?', '["Que se divide en espacio civil y militar permanente", "Que no es civil ni militar, sino único y continuo, y toda segregación debe ser temporal", "Que solo los militares pueden segregarlo", "Que la segregación es siempre permanente y publicada en AIP"]'::jsonb, 1, 'El FUA considera el espacio único y continuo, usado según necesidades, con segregaciones temporales (p. 30).', 'p. 30', 1, false),
  ('10000006-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006006', '¿Qué órgano gobierna el Network Manager?', '["El Consejo de la OACI", "El Network Manager Board (NMB), con representantes de las distintas ramas de la aviación", "La Dirección de Operaciones ATM de ENAIRE", "La oficina ARO centralizada"]'::jsonb, 1, 'El NM está gobernado por el NMB, donde están autoridades, ANSP y otros actores (p. 16).', 'p. 16', 2, false),
  ('10000006-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006006', '¿Antes de qué hora se distribuye el AUP y cuál es su validez?', '["Antes de las 18:00 UTC del día anterior; válido 12 horas desde las 00:00 UTC", "Antes de las 14:00 UTC del mismo día; válido 24 horas desde las 14:00 UTC", "Antes de las 14:00 UTC del día anterior; válido 24 horas desde las 06:00 UTC del día siguiente", "Antes de las 06:00 UTC del día anterior; válido 48 horas"]'::jsonb, 2, 'La AMC lo distribuye antes de las 14:00 UTC del día anterior, con validez de 24 h a partir de las 06:00 UTC del día siguiente (p. 32).', 'p. 32', 3, false),
  ('10000006-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006006', '¿Bajo la responsabilidad de quién están las posiciones de gestión de afluencia (FMP) de un centro de control?', '["Del director del NMOC", "Del Jefe de Sala del ACC al que están adscritas", "De la AMC", "Del controlador de TWR más antiguo"]'::jsonb, 1, 'Las FMP las atienden técnicos de afluencia, siempre bajo la responsabilidad del Jefe de Sala del ACC (p. 17).', 'p. 17', 2, false),
  ('10000006-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006006', '¿Qué abarca la fase estratégica del ATFCM y cuál es su resultado?', '["Los seis días previos; produce el Plan Diario ATFCM", "El día de la operación; actualiza el Plan Diario", "Desde el día siguiente a la operación; produce mejores prácticas", "Hasta siete días antes de la operación; produce el NOP europeo"]'::jsonb, 3, 'La estratégica llega hasta siete días antes y da lugar al NOP (p. 18).', 'p. 18', 2, false),
  ('10000006-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006006', '¿Qué abarca la fase pretáctica del ATFCM y qué documento recoge sus medidas?', '["Los seis días anteriores a la operación; el Plan Diario ATFCM (ADP)", "Hasta siete días antes; el NOP", "El día de la operación; el AUP", "Desde el día siguiente; el UUP"]'::jsonb, 0, 'La pretáctica se aplica los seis días previos y las medidas se recogen en el ADP (p. 18).', 'p. 18', 2, false),
  ('10000006-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006006', '¿Cuándo se aplica el análisis post-operacional y cuál es su finalidad?', '["El mismo día de la operación; ajustar el plan en tiempo real", "Seis días antes; afinar la previsión", "Desde el día siguiente a la operación; medir lo ocurrido y obtener mejores prácticas que realimenten las demás fases", "Siete días antes; elaborar el NOP"]'::jsonb, 2, 'Se aplica desde el día siguiente, recoge feedback de todos los participantes y genera mejores prácticas (p. 19).', 'p. 19', 2, false),
  ('10000006-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006006', '¿Dónde están los dos centros redundantes del IFPS?', '["En Bruselas y en Bretigny (París)", "En Montreal y Ginebra", "En Madrid y Lisboa", "En Bruselas y Fráncfort"]'::jsonb, 0, 'El IFPS tiene dos centros redundantes, Bruselas y Bretigny; España depende por lo general del francés (p. 19).', 'p. 19', 1, false),
  ('10000006-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006006', '¿Qué ocurre con un plan de vuelo rechazado (REJ) por el IFPS?', '["Se envía a ATC con una marca de aviso", "Lo corrige automáticamente la FMP", "No llega a ATC y el operador o el originador debe tomar medidas", "Se reenvía al ANSP para que lo corrija"]'::jsonb, 2, 'Los planes rechazados no llegan a ATC y corresponde al operador u originador actuar (p. 20).', 'p. 20', 2, false),
  ('10000006-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006006', '¿Qué implica inicialmente un mensaje FLS recibido en una dependencia ATS?', '["La cancelación definitiva del FPL", "La asignación automática de un CTOT", "La obligación de presentar un RFP", "La no autorización de salida del vuelo"]'::jsonb, 3, 'El FLS suspende un plan ya aceptado e implica, en principio, no autorizar la salida (p. 21).', 'p. 21', 2, false),
  ('10000006-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006006', '¿En qué se basa la demanda que maneja el sistema ATFCM?', '["En todos los vuelos presentes en el espacio, incluidos los VFR", "Solo en los vuelos que ya han despegado", "En los planes de vuelo presentados, sin incluir los vuelos VFR ni los operacionales", "Solo en los vuelos comerciales regulares"]'::jsonb, 2, 'La demanda se basa en los FPL presentados, sin VFR ni operacionales (p. 21).', 'p. 21', 2, false),
  ('10000006-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006006', 'En fase táctica y ante una situación sobrevenida, ¿quién determina la capacidad disponible en una unidad con Jefe de Sala?', '["El técnico de control de afluencia", "El Jefe de Sala", "La Dirección de Operaciones", "El controlador con la habilitación más moderna"]'::jsonb, 1, 'En unidades con Jefe de Sala, este determina la capacidad disponible. Si no hay, el Supervisor, y si tampoco, el CTA con habilitación más antigua (p. 23).', 'p. 23', 2, false),
  ('10000006-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006006', '¿Durante cuánto tiempo como máximo puede la capacidad máxima ser sensiblemente superior a la sostenible?', '["No más de sesenta minutos", "Treinta minutos", "Dos horas", "Toda la jornada"]'::jsonb, 0, 'La capacidad máxima, determinada por la Dirección de Operaciones, puede superar la sostenible durante un periodo no superior a 60 minutos (p. 23).', 'p. 23', 2, false),
  ('10000006-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006006', 'Cuando se prevé una demanda superior a la capacidad, ¿cuál es el orden de actuación?', '["Regular con CTOT, aplicar STAM y adaptar la capacidad", "Aplicar STAM, regular con CTOT y adaptar la capacidad", "Adaptar la capacidad, aplicar medidas sin regulación (STAM) y, como último recurso, regular con CTOT", "Regular siempre primero y analizar después la capacidad"]'::jsonb, 2, 'Primero se adapta la capacidad, después se estudian medidas sin regulación y la regulación es el último recurso (p. 24).', 'p. 24', 2, false),
  ('10000006-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006006', '¿Qué límite tiene el MDI en su aplicación táctica?', '["Un intervalo máximo de 5 minutos entre salidas durante un periodo no superior a unos 30 minutos", "Un intervalo mínimo de 15 minutos durante dos horas", "Un intervalo máximo de 10 minutos durante una hora", "Un intervalo de 5 minutos durante todo el día"]'::jsonb, 0, 'El MDI será como máximo de 5 minutos durante unos 30 minutos. Si no basta, se adoptan otras medidas ATFCM (p. 26).', 'p. 26', 3, false),
  ('10000006-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006006', 'En un sector sin OTMV (distinto de los TMA de Barcelona y Madrid), ¿qué ocurre si en la primera hora la demanda supera la declarada pero no la declarada +10 %, y en los 120 minutos siguientes no se rebasa la declarada?', '["Se regula a la capacidad declarada desde el inicio", "Se regula la primera hora al valor declarado +10 %", "Se cancela el sector hasta nuevo aviso", "No se aplica regulación"]'::jsonb, 3, 'En ese caso no se regula, siempre que luego la demanda no supere la capacidad declarada (p. 28).', 'p. 28', 3, false),
  ('10000006-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006006', '¿Cuál es la diferencia entre vuelos exentos y vuelos excluidos de las regulaciones?', '["Los exentos lo son de una sola regulación y los excluidos de todas", "Los exentos lo son de todas las regulaciones y los autorizan los Estados; los excluidos lo son solo de alguna regulación o volumen y los autorizan los proveedores de servicio", "Ambos los autoriza la FMP y valen para todas las regulaciones", "Los exentos los autoriza el NMOC y los excluidos el Jefe de Sala"]'::jsonb, 1, 'Exentos: todas las regulaciones, autorizados por los Estados. Excluidos: solo alguna, autorizados por los proveedores (p. 29).', 'p. 29', 3, false),
  ('10000006-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006006', '¿Qué categorías de rutas condicionales (CDR) se mantienen actualmente?', '["Solo la CDR 1, establecida en la fase estratégica", "CDR 1 y CDR 2", "Las tres categorías originales", "Solo la CDR 3, establecida en fase táctica"]'::jsonb, 0, 'Se eliminaron dos de las tres categorías y queda solo la CDR 1 (p. 31).', 'p. 31', 3, false)
on conflict (id) do nothing;
