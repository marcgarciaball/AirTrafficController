-- Contenido propio del Tema 2 (Códigos OACI/IATA y características de aeronaves).
-- Redactado a partir de docs/fuentes/enaire/t2.pdf (ENAIRE, nov. 2024). reviewed=false: pendiente de revisión humana.
-- topic_id fijo del tema 2 (migración 20261019000002_roadmap.sql).

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000002-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006002', 1, 'Comunicaciones aeronáuticas y AFTN', 'Las comunicaciones aeronáuticas son estratégicas para la seguridad, regularidad y eficiencia. Se prestan mediante dos servicios:
- **AFS** (Servicio Fijo Aeronáutico): comunica **estaciones terrestres fijas** entre sí. Se presta a través de la **AFTN**.
- **AMS** (Servicio Móvil Aeronáutico): comunica estaciones terrestres fijas con **estaciones de aeronave**.

**AFTN** (Red de Telecomunicaciones Fijas Aeronáuticas)
- Sistema mundial de circuitos fijos para intercambiar mensajes o datos entre estaciones fijas con características de comunicación compatibles.
- Tiene **estructura de malla**: cualquier estación se comunica con todas las demás y los mensajes llegan a todos los centros conectados.
- Antes usaba líneas telegráficas y teletipos. Hoy las sustituyen redes de datos como REDAN o CIDIN.
- Usa protocolos, formatos, códigos y abreviaturas propios; conocerlos es el objetivo del tema.', 'pp. 4', false),
  ('10000002-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006002', 2, 'Indicadores de lugar OACI: concepto y asignación', '**Qué es.** Grupo de **cuatro letras** que identifica localizaciones geográficas, normalmente conectadas al AFS: aeródromos y helipuertos civiles y centros de control. Algunos, como los aeródromos privados, no están conectados a la red.

**Reglas de asignación**
- Los asignan los **Estados**. La **OACI** supervisa que se formulen conforme al **Doc. 7910** "Indicadores de lugar".
- Un indicador no debería reasignarse a otro lugar hasta pasados **seis meses como mínimo** desde que se anuló.
- Los cambios se promulgan por **NOTAM o AIP**, con la mayor antelación posible.
- Si el lugar **no está conectado a la AFTN**, el indicador se marca con un **asterisco (*)**.
- **No** se usan en radio en lugar del distintivo de llamada. Ejemplo: el ACC de Canarias es "Canarias Control" y su indicador GCCC; no se dice GCCC por radio.', 'pp. 4-5', false),
  ('10000002-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006002', 3, 'Formulación del indicador de lugar', 'Cuatro letras, con este significado:
| Letra | Significado | España |
|---|---|---|
| 1ª | **Área de encaminamiento del AFS** (no tiene por qué coincidir con Estado, territorio ni FIR; se decide solo por necesidades de encaminamiento) | **L** Península; **G** Canarias, Ceuta y Melilla |
| 2ª | **Estado o territorio** donde está el lugar | **E** Península, Ceuta y Melilla; **C** Canarias |
| 3ª y 4ª | **El lugar** en sí, por ejemplo un aeródromo | MD en LE**MD** (Madrid-Barajas) |

Consecuencia: Península y Baleares empiezan por **LE**; Canarias por **GC**; Ceuta y Melilla por **GE** (GECE, GEML).', 'pp. 6-7', false),
  ('10000002-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006002', 4, 'Indicadores de lugar de uso frecuente en España', 'El tema recuerda que las tablas se actualizan; para consultas, el Doc. 7910 vigente.

**Centros ATS españoles**
| Centro | Indicador |
|---|---|
| Barcelona FIC/ACC | LECB |
| Canarias FIC/ACC | GCCC |
| Madrid FIC/ACC | LECM |
| Palma TACC | LECP |
| Santiago TACC | LECG |
| Sevilla FIC/ACC | LECS |
| Valencia TACC | LECL |

**Colaterales**: Lisboa ACC/FIC LPPC; Santa María OAC/FIC LPPO; Casablanca GMMM; Alger DAAA; Burdeos LFBB; Brest LFRR; Marsella LFMM; Milán LIMM; Roma LIRR; Brindisi LIBB; Dakar GOOO; Túnez DTTC; SAL FIR/UIR GVSC.

Siglas: **ACC** centro de control de área; **FIC** centro de información de vuelo; **OAC** control de área oceánica; **TACC** control de área terminal; **UAC** control de área superior.

**Algunos aeródromos**
- LEMD Madrid-Barajas; LEBL Barcelona-El Prat; LEPA Palma; LEMG Málaga; LEZL Sevilla; LEVC Valencia; LEAL Alicante-Elche; LEBB Bilbao.
- LEGT Getafe; LETO Torrejón; LECU/LEVS Cuatro Vientos.
- Canarias: GCLP Gran Canaria; GCTS Tenerife Sur; GCXO Tenerife Norte (Ciudad de La Laguna); GCRR Lanzarote; GCFV Fuerteventura.
- Melilla GEML.

**Helipuertos**: Algeciras LEAG; Ceuta GECE; Melilla GEHM; Tenerife Norte/Los Rodeos GCXM.

**Aeródromos en situación excepcional**: El Aaiún GSAI, Gibraltar LXGB, Villacisneros GSVO.', 'pp. 7-9', false),
  ('10000002-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006002', 5, 'Identificación de oficinas en el indicador', 'Para indicar destinatario o remitente concreto en un mensaje AFTN, no basta el indicador de lugar. Se le añade un **designador de tres o cuatro letras** del **Doc. 8585**.
- Los de **tres letras** van como 5ª, 6ª y 7ª letra, seguidos de la letra de relleno **X** o de una letra que indique un departamento o división.

| Designador | Entidad o servicio | Indicador completo |
|---|---|---|
| YAY | Director General de Aviación Civil | LEAC**YAY**X |
| YUY | Director de Aeropuertos Españoles | LEAN**YUY**X |
| YNYX | Oficina NOTAM Internacional | LEAN**YNYX** |
| YMY | Oficina Meteorológica (El Hierro) | GCHI**YMY**X |
| YOY | Oficina AIS de aeródromo (Almería) | LEAM**YOY**X |
| ZTZ | Torre de control de aeródromo (Alicante) | LEAL**ZTZ**X |', 'pp. 9-10', false),
  ('10000002-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006002', 6, 'Designadores de compañías aéreas (OACI)', 'La OACI establece dos tipos de designadores para empresas explotadoras, entidades oficiales y servicios aeronáuticos (**Doc. 8585**):
- **Telegráficos**: grupos de **tres letras** para el servicio internacional de telecomunicaciones.
- **Telefónicos**: identifican al explotador en las comunicaciones y forman parte del **distintivo de llamada radiotelefónico**, seguidos de la identificación del vuelo. Ejemplo: IBERIA 301.
- A cada telefónico le corresponde un telegráfico determinado.

A menudo el telefónico coincide con el nombre comercial, pero no siempre:
| Empresa | Telegráfico | Telefónico |
|---|---|---|
| Air France | AFR | AIRFRANS |
| American Airlines | AAL | AMERICAN |
| British Airways | BAW | **SPEEDBIRD** |
| Iberia | IBE | IBERIA |
| Ryanair | RYR | RYANAIR |
| Vueling | VLG | VUELING |

Los designadores cambian con la dinámica comercial (se eliminan o reasignan). Los designadores OACI **no coinciden** con los códigos IATA, que usan las compañías para gestión comercial y relación con clientes.', 'pp. 10-11', false),
  ('10000002-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006002', 7, 'Marcas de nacionalidad y matrícula', 'Identifican a la aeronave. Se componen de caracteres (letras y/o números), en este orden:
1. **Marca de nacionalidad o marca común.**
  - Nacionalidad: normalmente **uno o dos caracteres**; indica el Estado donde está registrada.
  - Marca común: para aeronaves de un organismo internacional de explotación no nacional (Naciones Unidas: **4U**).
  - Ambas las **asigna la OACI** y preceden a la matrícula.
2. **Matrícula**: letras y/o números, **adjudicada por la autoridad competente de cada país**. Si su primer carácter es una letra, va precedida de **guion**.

Otras reglas
- Con letras, no deben usarse combinaciones confundibles con los grupos de cinco letras del Código Internacional de Señales ni con señales de auxilio o urgencia (SOS, XXX, PAN, TTT).
- Se pintan o fijan con permanencia similar y deben verse limpias y visibles.
- Normativa: **Anexo 7** del Convenio de Chicago.

**Marcas frecuentes en ATS españoles**
| País | Marca | País | Marca |
|---|---|---|---|
| España | **EC** | Países Bajos | PH |
| Alemania | D | Portugal | **CR, CS** |
| Francia | F | Reino Unido | G |
| Italia | I | Gibraltar | VP-G |
| EE. UU. | N | Marruecos | CN |
| Bélgica | OO | Suiza | HB |
| Irlanda | EI | Túnez | TS |
| Argelia | 7T | Israel | 4X |', 'pp. 11-13', false),
  ('10000002-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006002', 8, 'Códigos IATA', 'La IATA (Organización Internacional para el Transporte Aéreo) define identificadores alfanuméricos que usan las compañías en programación de vuelos, operaciones comerciales, emisión de billetes y comunicaciones entre aerolíneas.

**Indicadores de lugar IATA**: **tres letras**, para localizaciones de interés operativo, sobre todo aeropuertos. Ejemplos: MAD Madrid-Barajas; BCN Barcelona; PMI Palma; AGP Málaga; SVQ Sevilla; VLC Valencia; ALC Alicante; BIO Bilbao; LPA Gran Canaria; TFN Tenerife Norte; TFS Tenerife Sur; ACE Lanzarote; FUE Fuerteventura; IBZ Ibiza; MAH Menorca; LCG A Coruña; SCQ Santiago; LEI Almería; MLN Melilla; XRY Jerez; VDE El Hierro; SPC La Palma.

**Designadores de aerolíneas IATA**
- **Dos caracteres** alfanuméricos.
- Si el mismo código lo usan dos transportistas para distintos servicios (código duplicado), se señala con **asterisco** tras el designador.
- IATA asigna también designadores de **tres letras**, en cooperación con OACI, FAA y Transportes de Canadá; coinciden con los de OACI.

| Aerolínea | IATA | OACI |
|---|---|---|
| Air France | AF | AFR |
| American Airlines | AA | AAL |
| British Airways | BA | BAW |
| Emirates | EK | UAE |
| Iberia | IB | IBE |
| Japan Airlines | JL | JAL |
| SAS | SK | SAS |
| Vueling | VY | VLG |

Consulta: "Airline Coding Directory (ACD)" de IATA.', 'pp. 14-16', false),
  ('10000002-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006002', 9, 'Partes de la aeronave', '| Parte | Función |
|---|---|
| **Fuselaje** | Cuerpo del avión: cabina de mando, pasaje, bodegas y equipos |
| **Alas** | Generan la **sustentación** en despegue, subida, crucero, descenso y aterrizaje |
| **Alerones** | **Alabeo**: cuando uno sube, el del otro ala baja |
| **Empenaje** | Cola; aloja los estabilizadores horizontal y vertical |
| **Estabilizador horizontal** | Estabilidad y **cabeceo**; parte fija + timón de profundidad (elevator) |
| **Timón de profundidad** | Palanca hacia atrás: sube el morro; hacia delante: lo baja |
| **Estabilizador vertical (deriva)** | Controla el deslizamiento lateral o **guiñada** |
| **Timón de dirección (rudder)** | Mediante **pedales**: pedal derecho vira a la derecha, izquierdo a la izquierda |
| **Motor / hélice** | Propulsión; la hélice es un perfil giratorio con dos o más palas que da tracción |
| **Tren de aterrizaje** | Ruedas, soportes y amortiguadores; sostiene el avión en superficie, absorbe el impacto, frena y se orienta |

Esquema por ejes: alerones = alabeo; timón de profundidad = cabeceo; timón de dirección = guiñada.', 'pp. 16-17', false),
  ('10000002-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006002', 10, 'Reconocimiento de aeronaves y helicópteros', '**Aviones**: se reconocen por siete características externas:
1. **Tipo de ala**: alta, baja, doble ala (biplano).
2. **Tipo de flecha**: regresiva o positiva, recta, progresiva o invertida.
3. **Tipo de cola**: en T, en cruz, fuselada, doble.
4. **Motorización**: pistón, turbohélice, reacción.
5. **Número de motores**: 1, 2, 3, 4, 6 u 8.
6. **Ubicación de los motores**: en el morro, en las alas, en el fuselaje, en ala y empenaje, en fuselaje y empenaje.
7. **Tren de aterrizaje** (solo aeronaves ligeras o especiales): fijo sin carenar, fijo carenado, retráctil, patines en el ala para amerizaje.

**Helicópteros**: tres características.
- **Apoyo en el suelo**: patines o tren de aterrizaje.
- **Número de rotores**: uno o dos.
- **Número de palas**: dos, tres, cuatro, cinco u ocho.

**Catálogo (apdo. 6.4)**: para cada aeronave indica fabricante, denominación, designador OACI, tipo, velocidad de crucero (TAS en kt o Mach), régimen máximo de ascenso (ft/min), techo (FL) y categoría de estela. Seis grupos: comerciales de pasajeros, commuter y regional jet, executive, helicópteros, pistón y turbohélices militares de transporte. Ejemplos de designadores: A320, B738, B744, A388, AT72, E190, C130.', 'pp. 18-25', false),
  ('10000002-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006002', 11, 'Designador de tipo de aeronave OACI y estela turbulenta', 'El **Doc. 8643** de la OACI recoge el designador y la descripción de cada tipo de aeronave.

**Designador**: código de **2 a 4 caracteres** alfanuméricos (por ejemplo A380 de Airbus, o nombres como Skymaster de Cessna).

**Categoría de estela turbulenta (WTC)** según la masa máxima certificada al despegue (MTOW):
| Cat. | Masa |
|---|---|
| **J** (Súper) | Solo el **Airbus A380-800** (560.000 kg) |
| **H** (Pesada) | **136.000 kg o más** |
| **M** (Media) | **Menos de 136.000 kg y más de 7.000 kg** |
| **L** (Ligera) | **7.000 kg o menos** |

**B757**: se considera **pesado** si va seguido de otra aeronave y **medio** si sigue a otra.

**RECAT-EU**: seis categorías según MTOW **y envergadura**: Super Heavy (J, equivalente a la J de OACI), Upper Heavy (H+), Lower Heavy (H-), Upper Medium (M+), Lower Medium (M-) y Light (L+). Oficialmente CAT-A a CAT-F.
- No cambia el plan de vuelo: la casilla 9 sigue llevando la WTC OACI (J, H, M, L).
- No afecta a procedimientos, planificación ni fraseología; el piloto no necesita conocer su categoría RECAT-EU.', 'pp. 33-34', false),
  ('10000002-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006002', 12, 'Descripción de tipo OACI y designador ATA/IATA', '**Descripción OACI de tres caracteres**
| Carácter | Valores |
|---|---|
| 1º (tipo) | **L** avión terrestre; **S** hidroavión; **A** anfibio; **H** helicóptero; **G** girohelicóptero; **T** ala basculante |
| 2º (motores) | 1, 2, 3, 4, 6, 8 o **C** |
| 3º (motor) | **P** pistón; **T** turbohélice/turboeje; **J** reacción; **E** eléctrico |

- **C** solo en alas fijas: dos motores acoplados accionando una sola hélice.
- Ejemplo: Airbus A-300B2 = designador A30B, WTC **H**, descripción **L2J** (avión terrestre, 2 motores, reacción).

**Designador ATA/IATA**
- **General**: 3 caracteres para una familia de aviones con configuración y sección de fuselaje común.
- **Subtipo**: 3 caracteres cuando hay modelos distintos en la familia (longitud, envergadura...).
- **Categoría**: H helicóptero; J reacción, P pistón y T turbohélice (los tres precedidos del nº de motores); S hidroavión.
- Ejemplos: Embraer 190 = EMJ / E90 / 2J; Airbus 340-300 = 340 / 343 / 4J; MD 900 Explorer = MD9 / MD9 / H.
- Fuente: Apéndice A del **SSIM** de IATA.', 'pp. 33-36', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000002-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006002', '¿Cuántas letras forman un indicador de lugar OACI?', '["Cuatro", "Tres", "Dos letras y dos cifras", "Cinco"]'::jsonb, 0, 'El indicador de lugar OACI es un grupo de cuatro letras (p. 4). Los códigos IATA son los de tres letras.', 'p. 4', 1, false),
  ('10000002-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006002', '¿En qué documento de la OACI se recogen las normas de formulación de los indicadores de lugar?', '["Doc. 8585", "Doc. 7910", "Doc. 8643", "Doc. 4444"]'::jsonb, 1, 'La OACI supervisa que los indicadores se formulen conforme al Doc. 7910 "Indicadores de lugar" (p. 5). El 8585 son designadores de empresas y el 8643 tipos de aeronave.', 'p. 5', 2, false),
  ('10000002-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006002', '¿Cómo se identifica un indicador de lugar asignado a un lugar no conectado a la AFTN?', '["Con la letra X al final", "Con un guion tras la segunda letra", "Con un asterisco (*)", "Con el prefijo ZZ"]'::jsonb, 2, 'Los indicadores de lugares donde no se pueden cursar mensajes por la AFTN deben identificarse con un asterisco (p. 5).', 'p. 5', 1, false),
  ('10000002-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006002', '¿Durante cuánto tiempo mínimo no debería reasignarse un indicador de lugar tras anular su asignación previa?', '["Un mes", "Tres meses", "Doce meses", "Seis meses"]'::jsonb, 3, 'El tema indica que no debería reasignarse durante un período de seis meses, como mínimo, tras anular la asignación anterior (p. 5).', 'p. 5', 2, false),
  ('10000002-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006002', '¿Cómo deberían promulgarse los cambios de asignación de indicadores de lugar?', '["Mediante NOTAM o AIP, con la mayor antelación posible", "Solo mediante el Doc. 7910, en su edición anual", "Mediante comunicación verbal a cada dependencia ATS", "Mediante circular de la IATA el día de la efectividad"]'::jsonb, 0, 'Los cambios se promulgan por NOTAM o AIP con la mayor antelación posible a la fecha de efectividad (p. 5).', 'p. 5', 2, false),
  ('10000002-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006002', 'El ACC de Canarias tiene indicador GCCC y distintivo de llamada "Canarias Control". ¿Cuál se usa en las comunicaciones radio?', '["El indicador GCCC, por ser más breve", "El distintivo de llamada \"Canarias Control\"; el indicador GCCC no debe usarse", "Ambos indistintamente", "El indicador GCCC seguido de CONTROL"]'::jsonb, 1, 'Los indicadores de lugar no deberían usarse en radio en lugar de los distintivos de llamada; el tema pone precisamente este ejemplo (p. 5).', 'p. 5', 2, false),
  ('10000002-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006002', '¿Qué indica la primera letra de un indicador de lugar OACI?', '["El Estado en que está el lugar", "El tipo de aeródromo", "El área de encaminamiento del servicio fijo aeronáutico", "La FIR a la que pertenece el lugar"]'::jsonb, 2, 'Cada área de encaminamiento del AFS tiene una letra distinta, y sus límites no tienen que coincidir con los de un Estado o FIR (p. 6).', 'p. 6', 2, false),
  ('10000002-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006002', '¿Qué primera letra corresponde a Canarias, Ceuta y Melilla?', '["L", "E", "C", "G"]'::jsonb, 3, 'A España le corresponden L para la Península y G para Canarias, Ceuta y Melilla (p. 6).', 'p. 6', 2, false),
  ('10000002-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006002', 'En un indicador de lugar, ¿qué segunda letra corresponde a Canarias?', '["C", "E", "L", "G"]'::jsonb, 0, 'La segunda letra identifica el Estado o territorio: E para la Península, Ceuta y Melilla, y C para Canarias (p. 7).', 'p. 7', 2, false),
  ('10000002-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006002', '¿Cuál es el indicador de lugar del aeropuerto Adolfo Suárez Madrid-Barajas?', '["LEMG", "LEMD", "LECM", "LEMO"]'::jsonb, 1, 'Madrid-Barajas es LEMD (pp. 7 y 9). LECM es el FIC/ACC de Madrid y LEMG es Málaga.', 'pp. 7-9', 1, false),
  ('10000002-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006002', '¿Qué dependencia se identifica con el indicador LECM?', '["FIC/ACC de Barcelona", "TACC de Valencia", "FIC/ACC de Madrid", "Aeropuerto de Madrid-Barajas"]'::jsonb, 2, 'LECM es el FIC/ACC de Madrid; Barcelona es LECB y Valencia (TACC) LECL (p. 7).', 'p. 7', 2, false),
  ('10000002-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006002', '¿Qué indicador de lugar tiene el TACC de Palma?', '["LECL", "LECG", "LEPA", "LECP"]'::jsonb, 3, 'El TACC de Palma es LECP. LECL es el TACC de Valencia, LECG el de Santiago y LEPA el aeródromo de Palma (pp. 7-8).', 'pp. 7-8', 3, false),
  ('10000002-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006002', '¿A qué aeródromo corresponde el indicador LEBL?', '["Barcelona/Josep Tarradellas Barcelona-El Prat", "Bilbao", "Burgos/Villafría", "Badajoz/Talavera La Real"]'::jsonb, 0, 'LEBL es Barcelona-El Prat; Bilbao es LEBB, Burgos LEBG y Badajoz LEBZ (p. 8).', 'p. 8', 1, false),
  ('10000002-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006002', '¿Cuál es el indicador de Gibraltar y en qué categoría lo recoge el tema?', '["LEGI, aeródromos españoles", "LXGB, aeródromos en situación excepcional", "LXGB, helipuertos españoles", "GEGI, FIC y ACC adyacentes"]'::jsonb, 1, 'Gibraltar (LXGB) figura junto a El Aaiún (GSAI) y Villacisneros (GSVO) como aeródromo en situación excepcional (p. 9).', 'p. 9', 3, false),
  ('10000002-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006002', 'Para identificar en un mensaje AFTN a un destinatario concreto, ¿qué se añade al final del indicador de lugar?', '["Un código IATA de dos letras", "La marca de nacionalidad de la aeronave", "Un designador OACI de tres o cuatro letras tomado del Doc. 8585", "El designador de tipo del Doc. 8643"]'::jsonb, 2, 'Se añade el designador de tres o cuatro letras del Doc. 8585 (p. 9). Ejemplo: LEANYUYX.', 'p. 9', 2, false),
  ('10000002-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006002', '¿Qué designador de tres letras identifica una torre de control de aeródromo, como en LEALZTZX (Alicante)?', '["YMY", "YOY", "YUY", "ZTZ"]'::jsonb, 3, 'ZTZ es la torre de control; YMY es la oficina meteorológica, YOY la oficina AIS de aeródromo y YUY el Director de Aeropuertos Españoles (p. 10).', 'p. 10', 2, false),
  ('10000002-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006002', '¿Para qué se utilizan los designadores telegráficos OACI de tres letras?', '["Para identificar compañías, entidades y servicios en el servicio internacional de telecomunicaciones", "Para formar el distintivo de llamada radiotelefónico", "Para emitir billetes y gestionar la relación con clientes", "Para marcar la aeronave en el fuselaje"]'::jsonb, 0, 'Los designadores telegráficos se destinan al servicio internacional de telecomunicaciones (p. 10). Los telefónicos son los que se usan en radio.', 'p. 10', 2, false),
  ('10000002-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006002', '¿Qué tipo de designador forma parte del distintivo de llamada radiotelefónico, como en IBERIA 301?', '["El designador telegráfico", "El designador telefónico", "El código IATA de dos caracteres", "La marca de nacionalidad"]'::jsonb, 1, 'Los designadores telefónicos identifican al explotador en las comunicaciones y pueden formar parte del distintivo radiotelefónico seguido del vuelo (p. 10).', 'p. 10', 1, false),
  ('10000002-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006002', '¿Cuál es el designador telefónico de British Airways?', '["BAW", "BRITISH", "SPEEDBIRD", "AIRFRANS"]'::jsonb, 2, 'British Airways tiene designador telegráfico BAW y telefónico SPEEDBIRD; AIRFRANS es de Air France (p. 11).', 'p. 11', 2, false),
  ('10000002-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006002', '¿Cuál es la marca de nacionalidad de las aeronaves españolas?', '["ES", "E", "LE", "EC"]'::jsonb, 3, 'La tabla de marcas de nacionalidad asigna EC a España (p. 13).', 'p. 13', 1, false),
  ('10000002-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006002', '¿Qué marca de nacionalidad figura en el tema para Portugal?', '["CR, CS", "P", "PT", "LP"]'::jsonb, 0, 'El tema recoge CR y CS para Portugal (p. 13).', 'p. 13', 3, false),
  ('10000002-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006002', '¿Cuándo se utiliza una marca común en lugar de una marca de nacionalidad?', '["Cuando la aeronave está registrada en dos Estados", "Cuando la aeronave pertenece a un organismo internacional de explotación sobre una base no nacional, como Naciones Unidas (4U)", "Cuando la aeronave es militar", "Cuando la matrícula contiene solo números"]'::jsonb, 1, 'Según el tema, la marca común se emplea para organismos internacionales de explotación sobre base no nacional; a Naciones Unidas le corresponde 4U (p. 11).', 'p. 11', 2, false),
  ('10000002-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006002', 'Si el primer carácter de la matrícula de una aeronave es una letra, ¿cómo se escribe respecto a la marca de nacionalidad?', '["Precedida de una barra", "Separada por un espacio y entre paréntesis", "Precedida de un guion", "Sin separación alguna"]'::jsonb, 2, 'La marca de nacionalidad o común precede a la matrícula y, si el primer carácter de ésta es una letra, va precedida de un guion (p. 11).', 'p. 11', 1, false),
  ('10000002-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006002', '¿Quién adjudica la matrícula de una aeronave?', '["La OACI", "La IATA", "El fabricante de la aeronave", "La autoridad competente de cada país"]'::jsonb, 3, 'La matrícula la adjudica la autoridad competente de cada país; las marcas de nacionalidad y comunes las asigna la OACI (p. 12).', 'p. 12', 2, false),
  ('10000002-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006002', '¿Qué Anexo al Convenio sobre Aviación Civil Internacional recoge las marcas de nacionalidad y matrícula?', '["Anexo 7", "Anexo 2", "Anexo 8", "Anexo 11"]'::jsonb, 0, 'La normativa OACI sobre marcas distintivas de nacionalidad y matrícula está en el Anexo 7 (p. 12).', 'p. 12', 1, false),
  ('10000002-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006002', '¿Cuál es el código IATA del aeropuerto de Málaga/Costa del Sol?', '["MLG", "AGP", "MAL", "LEMG"]'::jsonb, 1, 'Málaga es AGP en la tabla IATA; LEMG es su indicador OACI (pp. 8 y 15).', 'p. 15', 2, false),
  ('10000002-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006002', '¿Qué indica un asterisco tras un designador IATA de aerolínea?', '["Que la aerolínea no está conectada a la AFTN", "Que es un designador de tres letras", "Que el código está duplicado y lo usan dos transportistas para servicios diferentes", "Que la aerolínea ha dejado de operar"]'::jsonb, 2, 'El tema explica que a veces el mismo código lo usan dos transportistas para distintos tipos de servicio y se indica con asterisco (p. 15).', 'p. 15', 3, false),
  ('10000002-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006002', '¿Para qué utilizan las compañías aéreas los códigos IATA?', '["Para formar los distintivos de llamada en radiotelefonía", "Para asignar las matrículas de sus aeronaves", "Para fijar las mínimas de separación por estela turbulenta", "Para programación de vuelos, operaciones comerciales, emisión de billetes y comunicaciones entre aerolíneas"]'::jsonb, 3, 'Son identificadores alfanuméricos de uso comercial y de gestión de las compañías (pp. 11 y 14).', 'p. 14', 1, false),
  ('10000002-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006002', '¿Qué superficie de la aeronave permite el alabeo?', '["Los alerones", "El timón de profundidad", "El estabilizador vertical", "El timón de dirección"]'::jsonb, 0, 'Los alerones permiten el alabeo: cuando el de un ala sube, el del otro baja (p. 16).', 'p. 16', 1, false),
  ('10000002-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006002', '¿Qué ocurre al tirar de la palanca de mando hacia atrás?', '["El morro baja", "El timón de profundidad se acciona y el morro sube", "La aeronave vira a la derecha", "Los alerones se acoplan para el alabeo"]'::jsonb, 1, 'Al tirar de la palanca hacia el piloto se eleva el morro; al empujarla hacia delante, baja (p. 16).', 'p. 16', 2, false),
  ('10000002-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006002', '¿Qué movimiento controla el estabilizador vertical o deriva?', '["El cabeceo", "El alabeo", "La guiñada, es decir, el deslizamiento lateral sobre el eje vertical", "La sustentación en el despegue"]'::jsonb, 2, 'El estabilizador vertical controla el deslizamiento lateral sobre el eje vertical o guiñada. El cabeceo corresponde al estabilizador horizontal (p. 16).', 'p. 16', 2, false),
  ('10000002-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006002', '¿Cuál de estas NO es una característica externa básica para el reconocimiento de aviones según el tema?', '["El tipo de cola", "El número de motores", "La ubicación de los motores", "El color de la librea"]'::jsonb, 3, 'Las características son tipo de ala, de flecha, de cola, de motorización, número y ubicación de motores y tren de aterrizaje (p. 18). El color no figura.', 'p. 18', 1, false),
  ('10000002-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006002', '¿Qué aeronave es la única de la categoría de estela turbulenta J (Súper)?', '["El Airbus A380-800", "El Boeing 747-400", "El Antonov An-124", "El Boeing 777"]'::jsonb, 0, 'La categoría J es exclusiva del A380-800 (560.000 kg) (p. 33).', 'p. 33', 1, false),
  ('10000002-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006002', 'Según la clasificación OACI de estela, una aeronave de 100.000 kg de masa máxima certificada al despegue es de categoría...', '["H (Pesada)", "M (Media)", "L (Ligera)", "J (Súper)"]'::jsonb, 1, 'La categoría M abarca menos de 136.000 kg y más de 7.000 kg (p. 33).', 'p. 33', 2, false),
  ('10000002-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006002', 'Según la clasificación OACI de estela, ¿qué categoría tiene una aeronave de exactamente 7.000 kg de MTOW?', '["M (Media)", "H (Pesada)", "L (Ligera)", "J (Súper)"]'::jsonb, 2, 'La categoría L comprende las aeronaves de 7.000 kg o menos; la M requiere más de 7.000 kg (p. 33).', 'p. 33', 3, false),
  ('10000002-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006002', '¿Cómo se considera un Boeing 757 a efectos de estela turbulenta?', '["Siempre pesado", "Siempre medio", "Medio cuando va seguido de otra aeronave y pesado cuando sigue a otra", "Pesado cuando va seguido de otra aeronave y medio cuando sigue a otra"]'::jsonb, 3, 'El B757 es pesado si le sigue otra aeronave y medio si él sigue a otra (p. 34).', 'p. 34', 3, false),
  ('10000002-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006002', '¿En qué se basa el esquema de estela turbulenta RECAT-EU?', '["En seis categorías definidas por el peso máximo al despegue y la envergadura", "En cuatro categorías definidas solo por el peso", "En tres categorías definidas solo por la envergadura", "En dos categorías según el tipo de motor"]'::jsonb, 0, 'RECAT-EU introduce seis categorías basadas en MTOW y envergadura (p. 34).', 'p. 34', 2, false),
  ('10000002-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006002', 'En el código OACI de descripción de tipo "L2J", ¿qué significa?', '["Hidroavión de dos motores a reacción", "Avión terrestre de dos motores a reacción", "Avión terrestre de dos motores de pistón", "Helicóptero de dos motores a turbina"]'::jsonb, 1, 'L es Landplane, 2 el número de motores y J motor a reacción (p. 35).', 'p. 35', 2, false),
  ('10000002-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006002', 'En el designador ATA/IATA, ¿qué categoría tiene el Airbus 340-300?', '["2J, es decir, dos motores a reacción", "4T, es decir, cuatro turbohélices", "4J, es decir, cuatro motores a reacción", "H, es decir, helicóptero"]'::jsonb, 2, 'El ejemplo del tema asigna al A340-300 categoría 4J: J es reacción precedido del número de motores (p. 36).', 'p. 36', 2, false),
  ('10000002-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006002', '¿En qué documento se recogen los códigos indicadores de tipos de aeronave ATA/IATA?', '["Airline Coding Directory (ACD)", "Doc. 8643 de la OACI", "Doc. 7910 de la OACI", "Apéndice A del Standard Schedules Information Manual (SSIM)"]'::jsonb, 3, 'Los códigos ATA/IATA de tipo de aeronave están en el Apéndice A del SSIM; el ACD recoge los designadores de aerolíneas (pp. 16 y 36).', 'p. 36', 3, false)
on conflict (id) do nothing;
