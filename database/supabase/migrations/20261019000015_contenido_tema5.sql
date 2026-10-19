-- Contenido propio del Tema 5 (Navegación aérea, equipos y sistemas).
-- Redactado a partir de docs/fuentes/enaire/t5.pdf (ENAIRE). reviewed=false: pendiente de revisión humana.
-- topic_id fijo del tema 5 (migración 20261019000002_roadmap.sql).

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000005-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006005', 1, 'Sistema de navegación aérea, CNS/ATM y fases del vuelo', '**Sistema de navegación aérea (SNA).** Es el conjunto de elementos **jurídicos, organizativos, técnicos y operativos** que permiten operar de forma **segura, fluida y eficiente**. Solo funciona si todos ellos se desarrollan de manera equilibrada.
- **Parte jurídica y organizativa:** marco regulador, principios, normas, requisitos y responsabilidades de las personas implicadas.
- **Parte técnica y operativa:** se agrupa en el concepto **CNS-ATM**.

| Bloque | Qué incluye |
|---|---|
| **ATM** (gestión del tránsito aéreo) | Organización del espacio aéreo, gestión de afluencia, control del tráfico, información y alerta. |
| **CNS** (comunicaciones, navegación y vigilancia) | Medios técnicos de soporte del ATM. **C**: difusión de datos; **N**: que la aeronave conozca su posición y navegue; **V**: conocer en tiempo real la posición de todas las aeronaves. |

**Fases del vuelo.** La ruta se planifica antes del vuelo mediante **puntos de recorrido** entre origen y destino. Fases: despegue, ascenso (salida, por rutas de salida), ruta (tramo estable y nivelado), descenso (llegada, por rutas de llegada) y aproximación y aterrizaje.

**Funciones de navegación** (en cada fase):
- **Posicionamiento:** el piloto conoce su situación respecto a la ruta.
- **Guiado:** el piloto dirige la aeronave para mantener la ruta según los datos de posición.

Las exigencias de precisión son **mayores en las fases iniciales y finales** (críticas por la proximidad de obstáculos y otras aeronaves) que en ruta, donde el vuelo es nivelado, a velocidad constante y solo hay conflicto potencial con otras aeronaves.', 'pp. 5-8', false),
  ('10000005-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006005', 2, 'Técnicas de navegación aérea', 'Son los métodos y procedimientos para volar de origen a destino. Han surgido según el entorno y la evolución tecnológica.

| Técnica | Idea clave | Limitaciones |
|---|---|---|
| **Visual** | Observación directa de referencias externas (ríos, carreteras, edificios). La ruta se planifica sobre carta con puntos reconocibles. | Muy elemental; depende de la pericia del piloto, obliga a volar cerca del terreno y de la meteorología y visibilidad. |
| **A estima** | Usa **velocidad, tiempo y rumbo**. Tramos rectos con rumbo y distancia; con velocidad constante, espacio = velocidad x tiempo. | Solo da una estimación: no considera el viento ni errores de pilotaje e instrumentales. Su principio se perfecciona en la **navegación inercial**. |
| **Radioeléctrica convencional** | Navegación instrumental volando hacia o desde **radioayudas**; los puntos de ruta coinciden con estaciones. | Red de rutas fija, ligada a la configuración de radioayudas: limita la capacidad, complica las operaciones y encarece costes operativos y medioambientales. |
| **De área** | Navegación instrumental que permite **cualquier trayectoria**. La ruta se define por **latitud y longitud** sin necesidad de instalaciones terrestres. Los equipos **RNAV/RNP** de a bordo calculan posición y guiado. | Es la base de PBN (ver sección siguiente). |', 'pp. 8-10', false),
  ('10000005-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006005', 3, 'Navegación de área: RNAV, RNP y PBN', '**Tipos de RNAV según prestaciones:**
- **RNAV 2D:** posicionamiento y guiado en plano horizontal.
- **RNAV 3D:** añade guiado en plano vertical.
- **RNAV 4D:** añade además previsiones de tiempo de vuelo entre puntos.

**Especificaciones y concepto**
- **RNAV:** navegación de área que **no** incluye vigilancia y alerta de la performance a bordo.
- **RNP:** navegación de área que **sí** incluye ese requisito de vigilancia y alerta.
- **PBN:** concepto de OACI que engloba RNAV y RNP. Condiciona la operación en un espacio aéreo al cumplimiento de unas prestaciones definidas.

**Parámetros básicos**
| Parámetro | Definición |
|---|---|
| **Exactitud** | Diferencia entre la posición indicada y la real. |
| **Integridad** | Capacidad de desconectarse o avisar cuando el sistema no debe usarse. |
| **Continuidad** | Realizar la función durante una operación sin interrupciones imprevistas. |
| **Disponibilidad** | Realizar la función al **inicio** de la operación; se expresa como % de tiempo operativo cumpliendo exactitud, integridad y continuidad. |

**La "X" de RNAV X / RNP X** es la precisión de navegación lateral (TSE) en **millas náuticas** que se logra al menos el **95 %** del tiempo de vuelo. RNAV 5 exige 5 NM.

**Especificaciones (Doc. 9613 de OACI)**
- **RNAV 10 / RNP 4:** ruta oceánica o áreas remotas, para separación longitudinal basada en distancia.
- **RNAV 5:** ruta en espacio aéreo continental.
- **RNAV 1 y 2:** ruta, SID, STAR y aproximación (tramos inicial, intermedio y frustrada). En la UE no se prevé RNAV 2 ni RNAV 1 en ruta.
- **RNP 1:** SID, STAR y aproximación con vigilancia ATS limitada o nula y densidad baja o media; admite tramos curvos de radio fijo.
- **RNP APCH:** aproximaciones RNP hasta 0,3 NM; puede incluir baro-VNAV o SBAS en final.
- **RNP AR APCH:** RNP entre 1 y 0,1 en inicial, intermedia y frustrada, y entre 0,3 y 0,1 en final; guiado vertical con baro-VNAV.
- **RNP 0.3:** orientada a helicópteros.
- **A-RNP:** RNP avanzada, escalable entre 2 y 0,3; no está prevista en la UE.

**Beneficios:** red de rutas más flexible y mayor capacidad, vuelos más cortos (menos coste y emisiones) y mejor eficiencia y seguridad en todas las fases.', 'pp. 10-14', false),
  ('10000005-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006005', 4, 'Clasificación de los sistemas de ayuda a la navegación', '**Por parámetros exigidos**
- **Medio principal o primario:** debe cumplir **exactitud e integridad**, sin exigir disponibilidad ni continuidad.
- **Medio único:** debe cumplir los **cuatro** requisitos.
- **Medio suplementario:** se usa **junto con un medio único**; cumple exactitud e integridad, sin disponibilidad ni continuidad.

**Por técnica y elementos**
- **No autónomos** (equipo de a bordo + infraestructura externa):
  - **Terrestres por radioayudas:** NDB, VOR, DME, ILS (señales de radiofrecuencia de estaciones fijas).
  - **Terrestres visuales:** agrupaciones de luces con códigos de colores; **no hay equipo de a bordo**, el piloto interpreta. Tipos: indicadores de pendiente de descenso y luces de aproximación.
  - **Espaciales (GNSS):** base de la implantación de PBN. Constelaciones principales y sistemas de aumentación.
- **Autónomos:** calculan posición y guiado midiendo parámetros de vuelo (velocidad, presión, actitud) sin infraestructura externa. Se usan donde no hay cobertura de otras ayudas. Tipos: **radar Doppler** e **inerciales (INS)**.', 'pp. 15-19', false),
  ('10000005-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006005', 5, 'Radioayudas: NDB y VOR', '**NDB (radiofaro no direccional).** Da **guiado horizontal** (marcación).
- Tierra: transmisor que emite en **todas direcciones (360º)**. A bordo: **ADF** (antena/receptor).
- Banda **LF-MF**; alcance según frecuencia, potencia y atmósfera. Error normal del ADF no superior a **±5º**. Se interfiere fácilmente (atmósfera, radio comercial, corrientes estáticas).
- Indicadores: **RBI** (rosa fija, aguja marca la procedencia de la señal respecto al eje del avión) y **RMI** (rosa móvil que muestra el rumbo del avión, más la aguja ADF).
- Para ir hacia la estación se vira hacia el lado de la aguja hasta alinearla con la proa; para alejarse, con la cola.
- Hoy casi no se usa en ruta: apoyo a aproximación y salida.

**VOR (radiofaro omnidireccional de VHF).** Da guiado horizontal respecto a una **línea de situación magnética (radial)**.
- Tierra: estación que genera radiales, con identificación en **Morse de tres letras**.
- A bordo: antena/receptor e indicador con **CDI** (indica mando: aguja centrada = sobre el radial), indicador **TO/FROM** y selector **OBS** (elige el radial).
- **TO/FROM** indica el semiplano de situación; el CDI indica el cuadrante. Ambos independientes del rumbo.
- Relación radial/ruta magnética: **hacia** la estación, Rm = RDL + 180º; **desde** la estación, Rm = RDL.
- Alcance nominal unas **200 NM**, banda **VHF** (sin interferencias atmosféricas pero necesita **línea de vista**). Se usa en ruta, llegada, salida y aproximación.
- **DVOR (VOR Doppler):** mismas frecuencias, equipo de a bordo e información, pero mejor calidad de señal con obstáculos y menos errores que el VOR convencional (CVOR).', 'pp. 20-29', false),
  ('10000005-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006005', 6, 'Radioayudas: DME e hiperbólicos', '**DME (equipo medidor de distancia).** Da la **distancia oblicua** entre aeronave y estación.
- Tierra: **transpondedor**. A bordo: **interrogador**.
- Funcionamiento: el avión emite señales, la estación las procesa y las devuelve, y el equipo de a bordo calcula la distancia con el **tiempo de ida y vuelta**, en millas náuticas.
- Identificación: **dos o tres letras** en Morse.
- **No da radiales ni rumbos**, solo distancia; no sirve por sí solo para navegar.
- Requiere línea de vista (cobertura a ángulos bajos), alcance unas **200 NM**, sin interferencia atmosférica.
- Coemplazamientos: **VOR/DME** (el más típico; materializa puntos por intersección de radial y distancia), NDB/DME e ILS/DME.
- En PBN puede usarse sintonizando dos o más estaciones y triangulando.

**Sistemas hiperbólicos** (DECCA, LORAN-A, LORAN-C, OMEGA)
- Pensados para navegación de largo alcance, sobre todo oceánica. Casi en desuso por el sistema inercial y los satélites.
- Dan **posición**, nunca rumbo ni guiado (salvo con ordenador de navegación).
- Línea de situación: puntos con **diferencia de distancia constante** a dos referencias fijas, es decir, una **hipérbola**. La posición sale de la intersección de hipérbolas.
| Sistema | Técnica | Banda |
|---|---|---|
| DECCA | medida de fases | LF |
| LORAN-A | medida de tiempos | MF |
| LORAN-C | tiempos y fases | LF |
| OMEGA | medida de fases | VLF (mayor alcance, 6000-10000 NM) |', 'pp. 29-33, 39-40', false),
  ('10000005-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006005', 7, 'Sistema ILS', 'El **ILS** da información de **precisión** de guiado horizontal (azimut) y vertical (trayectoria de planeo) en aproximación y aterrizaje.

**Equipo de tierra**
- **Localizador (LOC):** plano vertical que alinea con el **eje de pista**; la desviación lateral se ve en la aguja **vertical azul**.
- **Senda de descenso (GP):** plano oblicuo desde la zona de toma de contacto, pendiente aproximada de **3º**; la desviación vertical se ve en la aguja **horizontal roja**.
- **Radiobalizas** (distancia al umbral al pasar por su vertical): exterior **OM**, intermedia **MM**, interior **IM**. Hoy están en desuso, sustituidas por un **DME** coemplazado con la senda.

| Radiobaliza | Tono | Luz |
|---|---|---|
| **OM** | rayas continuas | azul |
| **MM** | puntos y rayas alternados | ámbar |
| **IM** | puntos continuos | blanca |

**Navegación:** el piloto maniobra hasta mantener centradas ambas agujas.

**Características**
- LOC y radiobalizas en **VHF**; senda de descenso en **UHF**. Las frecuencias de LOC y GP están **emparejadas**: se selecciona una sola.
- Tres categorías de operación (I, II, III A/B/C) según **RVR** (alcance visual en pista) y **DH** (altura de decisión). A mayor categoría, menores mínimos.
- Radiobalizas: intermedia y exterior para **CAT I**; en **CAT II y III** además la interior.
- Se coemplaza con luces de aproximación, PAPI/VASIS, VOR, DME, etc.', 'pp. 33-38', false),
  ('10000005-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006005', 8, 'Ayudas visuales: PAPI y luces de aproximación', 'Dan información visual en aproximación y aterrizaje. Convenio de colores: **todo rojo** = muy bajo o muy cerca de pista; **todo blanco** = muy alto.

**Indicadores de pendiente**
- **PAPI:** barra de ala con **4** elementos luminosos. **APAPI:** barra con **2**.
- Se sitúan al **lado izquierdo** de la pista salvo imposibilidad; puede añadirse una segunda barra en el lado opuesto si hace falta guía de balanceo.
- Se usan de día y de noche, como única ayuda o como suplemento a la instrumental (entonces la pendiente visual se ajusta a la senda de planeo). Tienen control de intensidad.
- **T-VASIS y AT-VASIS:** en desuso en aeródromos civiles.

**Luces de aproximación (ALS).** Informan de la posición respecto al eje y la cabecera de pista, con luces, colores y **barretas** transversales. No hay equipo a bordo, pero el piloto necesita **contacto visual**. Se sitúan antes del umbral.
| Tipo | Rasgos |
|---|---|
| **Sencillo** | Línea central de una luz, longitud mínima **420 m**, una barreta a 300 m. Para aproximaciones visuales y de no precisión. |
| **CAT I** | Línea central de hasta **900 m**: 1 luz los primeros 300 m, 2 luces los siguientes y 3 los últimos. Barreta obligatoria cada 300 m (recomendable cada 150 m). |
| **CAT II/III** | Igual que CAT I, pero los 300 m más próximos al umbral llevan **barretas rojas** a ambos lados de la línea central. |

Complementan al ILS y ayudan en la transición del vuelo instrumental al visual.', 'pp. 40-47', false),
  ('10000005-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006005', 9, 'GNSS y sistemas de aumentación', '**GNSS.** Da posición (metros) y tiempo (nanosegundos) en todo el mundo. Se basa en medir el **tiempo que tarda la señal** del satélite en llegar al receptor, es decir, la distancia.
- Con **3 satélites** se determina la posición; en la práctica se necesita un **cuarto** para sincronizar el reloj del receptor.
- Constelaciones principales: **GPS** (EE. UU.), **GLONASS** (Rusia), **Galileo** (UE) y **BeiDou/BDS** (China).
- **Tres segmentos:** espacial (satélites), terrestre o de control (estaciones que supervisan la constelación) y de usuario (receptores).

**Sistemas de aumentación** (mejoran exactitud, integridad, continuidad y disponibilidad)
| Sistema | Área | Funcionamiento | Alcance operativo |
|---|---|---|---|
| **SBAS** | Región o continente | Estaciones de referencia calculan correcciones e integridad y se envían por **satélites geoestacionarios**. Ej.: **EGNOS** (Europa), WAAS, MSAS, GAGAN. | Compatible (no obligatorio) con PBN en ruta, SID, STAR y no precisión; puede habilitar **APV SBAS** o **CAT I**. |
| **GBAS** | Local (aeropuerto) | Estación en el aeropuerto emite correcciones por **VHF** (VDB). | Aproximaciones de precisión: hoy **CAT I**, en el futuro CAT II/III. |
| **ABAS** | Global | **Embarcado**: usa datos de sistemas autónomos (IRS, datos aire) o la redundancia de satélites. | PBN en todas las fases; en aproximación solo no precisión y APV con baro-VNAV. |

Todos los receptores GNSS certificados incluyen ABAS integrado.', 'pp. 17-19, 47-51', false),
  ('10000005-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006005', 10, 'Sistemas autónomos: INS y radar Doppler', '**INS (navegación inercial).** Da posición, velocidad respecto al suelo, posición instantánea y distancia a un destino.
- Principio: detecta las **aceleraciones** con una plataforma estabilizada orientada al Norte y Este geográficos. Integrando la aceleración se obtiene la **velocidad (GS)**; integrando la velocidad, la **distancia**; sumada a la coordenada inicial, la **nueva posición**.
- El piloto introduce antes del vuelo la **coordenada inicial** (aeropuerto de origen).
- **Cuatro componentes:** acelerómetros, plataforma inercial, integradores y computador.
- Error **sistemático que crece con el tiempo** desde la última actualización; hay que actualizarlo periódicamente con VOR, VOR/DME, GPS, etc.
- Los inerciales de **láser** usan tres giróscopos láser y tres acelerómetros, uno por cada eje principal, y miden velocidades angulares.

**Radar Doppler.** Da la posición del avión respecto a una ruta seleccionada.
- Funciona como navegación a estima, sumando incrementos de espacio (velocidad x tiempo).
- Emite **tres o cuatro haces** hacia el suelo; la energía reflejada cambia de frecuencia por la velocidad relativa (**efecto Doppler**).
- Muestra la distancia transversal a la ruta y la distancia que falta por recorrer.', 'pp. 19, 51-54', false),
  ('10000005-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006005', 11, 'Vigilancia: PSR, SMR y SSR', 'La función de vigilancia busca conocer **en tiempo real** la posición de las aeronaves. Tres tipologías:
1. **Independiente no cooperativa:** datos determinados en tierra **sin colaboración** de la aeronave (PSR, SMR).
2. **Independiente cooperativa:** en tierra, **con colaboración** de la aeronave (SSR, multilateración).
3. **Dependiente:** los datos se generan a bordo (ADS).

**PSR (radar primario).** Solo componente terrestre. Una antena giratoria emite impulsos que se reflejan en el blanco. Da **distancia** (por el tiempo de eco), **marcación angular** (por el ángulo de la antena) y tiempo de detección.
- Bandas **L (1-2 GHz) y S (2-4 GHz)**. Sirve también para detectar fenómenos meteorológicos.
- Inconvenientes: imprecisiones de identificación y pérdidas de señal por reflejos del terreno.

**SMR (radar de movimiento en superficie).** Primario para aeronaves y vehículos en el **área de maniobras**; imagen en la consola de la **torre**.
- Banda **X (8-12 GHz)**; antena pequeña, rota **1 vuelta por segundo** (el PSR, 6-15 rpm); precisión en azimut **0,25º** (PSR 1-2º); resolución en distancia unos **20 m**; alcance reducido.

**SSR (radar secundario).** Requiere **transpondedor** a bordo. Complementa (no sustituye) al PSR.
- Mayor inmunidad a fenómenos atmosféricos y mejor precisión angular (técnica **monopulso**).
- Aporta además identificación, altitud (nivel de vuelo), emergencias e intenciones (nivel seleccionado, rumbo, velocidad).
- Al ser blanco cooperativo: no se necesitan potencias ni sensibilidades tan altas y el intercambio de información puede iniciarse desde tierra o desde el aire.

| Modo | Aplicación |
|---|---|
| **3/A** | Transmite identificación. |
| **C** | Con 3/A seleccionado, transmite altitud (nivel de vuelo). |
| **Intermodo** | Interrogación en modos A, C y S, o solo A y C. |
| **S** | Interrogación general, radiodifusión y **llamada selectiva** a un respondedor concreto. Es el de mayor uso. |', 'pp. 55-64', false),
  ('10000005-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006005', 12, 'Multilateración y ADS', '**Multilateración (MLAT / WAM).** Vigilancia independiente cooperativa.
- Se basa en la **diferencia horaria de llegada (TDOA)** de la respuesta del transpondedor a varias estaciones receptoras.
- Con 2 estaciones se obtiene una curva hiperbólica; con **3**, dos puntos posibles; con **4**, una única posición.
- Sirve para superficie del aeropuerto y entorno o áreas extensas (**WAM**, Wide Area Multilateration). Se pueden reducir las zonas sin cobertura añadiendo o moviendo estaciones.
- A bordo necesita transpondedor, igual que el SSR.

**ADS (vigilancia dependiente automática).** La aeronave transmite por **enlace de datos** parámetros de sus sistemas de navegación (identificación, posición, velocidad...).
- **Automática:** no requiere intervención del piloto. **Dependiente:** la información se genera a bordo.
- **ADS-C (contrato):** se pacta con el sistema de tierra cuándo se envían los datos (periódicamente, ante un suceso como sobrevolar un fijo, o bajo demanda).
- **ADS-B (radiodifusión):** transmisión en modo difusión para cualquier usuario equipado, en aire o en tierra.
- Esencial para zonas **oceánicas** (hoy con ADS-C) y continentales sin cobertura radar, y para racionalizar zonas con radar.', 'pp. 56, 64-69', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000005-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006005', '¿Qué es el sistema de navegación aérea (SNA)?', '["El conjunto de elementos jurídicos, organizativos, técnicos y operativos que permiten operar de forma segura, fluida y eficiente", "Únicamente el conjunto de radioayudas terrestres de un Estado", "El conjunto de aeronaves que operan en un espacio aéreo determinado", "Solo los servicios de control de tránsito aéreo prestados por un proveedor"]'::jsonb, 0, 'El SNA integra la parte jurídica, organizativa, técnica y operativa, y solo tiene éxito si todas se desarrollan de forma equilibrada (p. 5).', 'p. 5', 1, false),
  ('10000005-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006005', 'En el concepto CNS-ATM, ¿qué agrupan los servicios CNS?', '["Control, Navegación y Seguridad, como normas del ATM", "Comunicaciones, Navegación y Vigilancia, como medios técnicos de soporte del ATM", "Comunicaciones, Navegación y Seguridad operacional", "Centros, Navegación y Servicios de información"]'::jsonb, 1, 'CNS son los servicios proporcionados por medios técnicos (comunicaciones, navegación y vigilancia) que dan soporte al ATM (p. 6).', 'p. 6', 1, false),
  ('10000005-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006005', 'Las dos funciones principales de navegación en cada fase del vuelo son...', '["comunicación y vigilancia", "planificación y separación", "posicionamiento y guiado", "identificación y alerta"]'::jsonb, 2, 'El piloto debe conocer su situación respecto a la ruta (posicionamiento) y dirigir la aeronave para mantenerla (guiado) (p. 7).', 'p. 7', 1, false),
  ('10000005-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006005', '¿En qué tres parámetros se basa la navegación a estima?', '["Distancia, altitud y viento", "Posición, presión y temperatura", "Rumbo, altitud y aceleración", "Velocidad, tiempo y rumbo"]'::jsonb, 3, 'La navegación a estima usa velocidad, tiempo y rumbo; con velocidad constante, el espacio recorrido es velocidad por tiempo (p. 9).', 'p. 9', 1, false),
  ('10000005-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006005', 'En la navegación de área, ¿cómo se define la ruta?', '["Mediante las coordenadas de latitud y longitud de los puntos de recorrido, sin que coincidan necesariamente con radioayudas", "Mediante radiales VOR y distancias DME obligatoriamente", "Siguiendo ríos y carreteras identificables sobre la carta", "Con rumbos magnéticos fijos entre estaciones NDB"]'::jsonb, 0, 'En la navegación de área los puntos se definen por coordenadas y los equipos RNAV o RNP de a bordo calculan posición y guiado (p. 10).', 'p. 10', 1, false),
  ('10000005-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006005', '¿Qué diferencia a una especificación RNP de una RNAV?', '["La RNAV incluye vigilancia y alerta a bordo; la RNP no", "La RNP incluye el requisito de vigilancia y alerta de la performance a bordo; la RNAV no", "La RNP solo se usa en aproximación y la RNAV solo en ruta", "La RNP usa radioayudas y la RNAV solo satélites"]'::jsonb, 1, 'El criterio que distingue ambas especificaciones es la vigilancia y alerta de la performance a bordo, presente solo en RNP (p. 11).', 'p. 11', 2, false),
  ('10000005-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006005', '¿Qué prestaciones proporciona un sistema RNAV 3D, pero no uno 2D?', '["Posicionamiento", "Previsiones de tiempo de vuelo entre puntos de la ruta", "Guiado en el plano vertical", "Guiado en el plano horizontal"]'::jsonb, 2, 'RNAV 2D ofrece posicionamiento y guiado horizontal; 3D añade guiado vertical y 4D añade previsiones de tiempo (p. 11).', 'p. 11', 2, false),
  ('10000005-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006005', '¿Qué es la integridad de un sistema de navegación?', '["La diferencia entre la posición indicada y la posición real", "La capacidad de funcionar sin interrupciones imprevistas durante una operación", "El porcentaje de tiempo en que el sistema está operativo al inicio de la operación", "La capacidad del sistema de desconectarse automáticamente o advertir al usuario cuando no deba usarse para navegar"]'::jsonb, 3, 'Definición de integridad según el tema (pp. 11-12). La exactitud es la diferencia de posición, la continuidad evita interrupciones y la disponibilidad es el porcentaje de tiempo operativo.', 'pp. 11-12', 2, false),
  ('10000005-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006005', '¿Cómo se define la disponibilidad en PBN?', '["Porcentaje de tiempo en que el sistema está operativo, cumpliendo a la vez exactitud, integridad y continuidad", "Capacidad de realizar la función sin interrupciones durante una operación", "Capacidad de desconectarse cuando no deba ser usado", "Diferencia entre posición indicada y real"]'::jsonb, 0, 'La disponibilidad es la capacidad de realizar las funciones al inicio de la operación, expresada como porcentaje de tiempo operativo (p. 12).', 'p. 12', 2, false),
  ('10000005-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006005', 'En la designación RNAV 5, ¿qué significa el valor 5?', '["Que el sistema tiene un alcance máximo de 5 NM", "Que se espera una precisión de navegación lateral de 5 NM al menos el 95 % del tiempo de vuelo", "Que se necesitan 5 satélites para calcular la posición", "Que el error vertical máximo es de 5 pies"]'::jsonb, 1, 'La X de RNAV X y RNP X es la precisión lateral (TSE) en millas náuticas lograda al menos el 95 % del tiempo (p. 12).', 'p. 12', 1, false),
  ('10000005-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006005', '¿Cuál de estos usos de RNAV no está previsto en la Unión Europea?', '["RNAV 5 en ruta", "RNP APCH en aproximación", "RNAV 2 y RNAV 1 en fase de ruta", "RNP 1 en SID y STAR"]'::jsonb, 2, 'El tema indica que en la UE no está previsto el uso de RNAV 2 ni de RNAV 1 en fase de ruta (p. 12).', 'p. 12', 3, false),
  ('10000005-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006005', '¿Cuál es un beneficio de RNAV, RNP y PBN señalado en el tema?', '["Eliminación total de la necesidad de vigilancia", "Menor exigencia de prestaciones en los equipos de a bordo", "Uso exclusivo de rutas fijas entre radioayudas", "Mayor flexibilidad en el diseño de la red de rutas y reducción de las distancias de vuelo"]'::jsonb, 3, 'Permiten optimizar la capacidad del espacio aéreo, acortar distancias con menos costes y mejorar eficiencia y seguridad (p. 14).', 'p. 14', 1, false),
  ('10000005-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006005', 'Un sistema de ayuda a la navegación que debe cumplir los cuatro requisitos de prestación (exactitud, integridad, disponibilidad y continuidad) es un medio...', '["único", "primario", "suplementario", "autónomo"]'::jsonb, 0, 'El medio único cumple los cuatro requisitos; el primario solo exactitud e integridad (p. 15).', 'p. 15', 2, false),
  ('10000005-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006005', '¿Cuántos satélites se requieren en la práctica para determinar la posición del receptor y sincronizar su reloj en GNSS?', '["Dos", "Cuatro", "Tres", "Seis"]'::jsonb, 1, 'Con tres satélites se fija la posición, pero en la práctica hace falta un cuarto para sincronizar el reloj del receptor (p. 48).', 'p. 48', 2, false),
  ('10000005-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006005', '¿Cuál de estos sistemas es una constelación principal GNSS europea?', '["EGNOS", "GLONASS", "Galileo", "MSAS"]'::jsonb, 2, 'Galileo es la constelación de la UE. EGNOS es el SBAS europeo, GLONASS es ruso y MSAS es el SBAS japonés (p. 18).', 'p. 18', 1, false),
  ('10000005-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006005', '¿Qué tipo de sistema de aumentación envía correcciones mediante satélites geoestacionarios sobre una región o continente?', '["GBAS", "ABAS", "ILS", "SBAS"]'::jsonb, 3, 'SBAS usa estaciones de referencia y envía correcciones e integridad por satélites GEO; EGNOS es el SBAS europeo (p. 50).', 'p. 50', 1, false),
  ('10000005-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006005', '¿Cuál es el área de servicio de un sistema GBAS?', '["Local, cerca del aeropuerto en el que se instala", "Global", "Todo un continente", "Únicamente el espacio aéreo oceánico"]'::jsonb, 0, 'GBAS mejora la constelación sobre un área local y emite por antenas VHF en tierra, habilitando aproximaciones de precisión (p. 50).', 'p. 50', 2, false),
  ('10000005-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006005', '¿En qué se basa el sistema de aumentación ABAS?', '["En estaciones terrestres situadas en el aeropuerto", "En datos de sistemas autónomos de la aeronave o en la redundancia de las señales de satélite recibidas", "En satélites geoestacionarios que emiten correcciones", "En una red de estaciones VOR/DME"]'::jsonb, 1, 'ABAS está embarcado, es de ámbito global y se basa en datos como el IRS o el sistema de datos aire, o en la redundancia de satélites (p. 51).', 'p. 51', 2, false),
  ('10000005-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006005', '¿Qué banda de frecuencias utiliza el NDB?', '["VHF", "UHF", "LF-MF (baja y media frecuencia)", "X (8-12 GHz)"]'::jsonb, 2, 'El NDB trabaja en LF-MF, por lo que su señal se interfiere fácilmente por la atmósfera y las emisoras comerciales (p. 22).', 'p. 22', 1, false),
  ('10000005-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006005', '¿Qué margen de error máximo tiene el ADF en condiciones normales de propagación?', '["±1º", "±10º", "±0,25º", "±5º"]'::jsonb, 3, 'El tema indica que en condiciones normales el error del ADF no es superior a ±5º (p. 22).', 'p. 22', 2, false),
  ('10000005-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006005', '¿Qué indicador combina el rumbo de la aeronave con la aguja del ADF mediante una rosa de rumbos móvil?', '["RMI", "RBI", "CDI", "OBS"]'::jsonb, 0, 'El RMI tiene rosa móvil que indica el rumbo del avión; el RBI tiene rosa fija con el cero alineado con el eje del avión (pp. 21-22).', 'pp. 21-22', 2, false),
  ('10000005-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006005', 'Cuando un avión se aleja de la estación VOR, ¿qué relación hay entre la ruta magnética (Rm) y el radial (RDL)?', '["Rm = RDL + 180º", "Coinciden: Rm = RDL", "Rm = RDL - 90º", "No guardan ninguna relación"]'::jsonb, 1, 'En radiales de alejamiento la ruta magnética y el radial coinciden, como en el ejemplo del radial 342 (p. 29).', 'p. 29', 2, false),
  ('10000005-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006005', 'En el indicador de un VOR, ¿qué muestra el CDI?', '["Si el avión vuela hacia o desde la estación", "La distancia oblicua a la estación", "Lo que debe hacer el piloto para mantener la aeronave sobre el radial seleccionado (indica mando)", "El radial en que se encuentra la aeronave"]'::jsonb, 2, 'El CDI indica mando (aguja centrada = sobre el radial). El indicador TO/FROM muestra si se va hacia o desde la estación (p. 25).', 'p. 25', 2, false),
  ('10000005-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006005', '¿Cuál es el alcance nominal aproximado del VOR?', '["Unas 20 NM", "Unas 1000 NM", "Unas 6000 NM", "Unas 200 NM"]'::jsonb, 3, 'El VOR es un sistema de corto y medio alcance, con valores nominales de unas 200 NM y necesidad de línea de vista (p. 29).', 'p. 29', 1, false),
  ('10000005-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006005', '¿Qué ventaja ofrece el DVOR respecto al VOR convencional?', '["Mejora la calidad de la señal aun con obstáculos y reduce errores de precisión", "Funciona en UHF sin necesidad de equipo de a bordo", "Proporciona la distancia a la estación", "Tiene mayor alcance que cualquier radioayuda"]'::jsonb, 0, 'El DVOR usa las mismas frecuencias, equipo de a bordo e información, pero con otras técnicas de transmisión que mejoran las prestaciones (p. 29).', 'p. 29', 3, false),
  ('10000005-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006005', 'En el sistema DME, ¿qué equipo es el interrogador y cuál el transpondedor?', '["El interrogador es la estación en tierra y el transpondedor el de a bordo", "El interrogador es el equipo de a bordo y el transpondedor la estación en tierra", "Ambos son equipos de a bordo", "Ambos son equipos de tierra"]'::jsonb, 1, 'El equipo de a bordo emite las señales y la estación terrestre (transpondedor) las devuelve, de modo que se calcula la distancia (p. 30).', 'p. 30', 2, false),
  ('10000005-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006005', '¿Cuál es la instalación DME coemplazada más típica?', '["NDB/DME", "ILS/GBAS", "VOR/DME", "VOR/NDB"]'::jsonb, 2, 'El VOR/DME es la más típica y permite materializar puntos por intersección de un radial VOR y una distancia DME (p. 32).', 'p. 32', 1, false),
  ('10000005-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006005', '¿Cuáles son los tres componentes terrestres del ILS?', '["Localizador, DME y PAPI", "Radiobalizas, VOR y senda de descenso", "NDB, localizador y barretas", "Localizador, senda de descenso y radiobalizas"]'::jsonb, 3, 'El ILS consta de localizador (LOC), senda de descenso (GP) y radiobalizas (OM, MM, IM), hoy en desuso (p. 33).', 'p. 33', 1, false),
  ('10000005-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006005', '¿Qué indicación recibe el piloto al pasar por la radiobaliza intermedia (MM)?', '["Tono de puntos y rayas alternados y luz ámbar parpadeante", "Tono de rayas continuas y luz azul parpadeante", "Tono de puntos continuos y luz blanca parpadeante", "Tono continuo sin luz"]'::jsonb, 0, 'OM: rayas y luz azul; MM: puntos y rayas alternados y luz ámbar; IM: puntos continuos y luz blanca (p. 37).', 'p. 37', 3, false),
  ('10000005-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006005', '¿En qué banda trabaja la senda de descenso del ILS?', '["VHF", "UHF", "LF", "VLF"]'::jsonb, 1, 'El localizador y las radiobalizas trabajan en VHF, mientras que la senda de descenso lo hace en UHF (p. 38).', 'p. 38', 2, false),
  ('10000005-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006005', '¿Qué radiobalizas se instalan además en operaciones de Categoría II y III?', '["La radiobaliza exterior", "La radiobaliza intermedia", "La radiobaliza interna", "Ninguna, se sustituyen por completo por un NDB"]'::jsonb, 2, 'Intermedia y exterior se instalan para CAT I; en CAT II y III se añade la interna (p. 38).', 'p. 38', 3, false),
  ('10000005-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006005', '¿Qué indica el color blanco en todas las luces de un sistema indicador de pendiente de aproximación?', '["Que la aeronave está muy baja", "Que la aeronave está en la senda correcta", "Que la pista está cerrada", "Que la aeronave está muy alta"]'::jsonb, 3, 'Convenio de colores: todo rojo indica muy cerca de pista o muy bajo; todo blanco, muy alto (p. 41).', 'p. 41', 1, false),
  ('10000005-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006005', '¿Cuántos elementos luminosos tiene la barra de ala del sistema PAPI?', '["Cuatro", "Dos", "Tres", "Seis"]'::jsonb, 0, 'El PAPI tiene una barra con 4 elementos y el APAPI, una barra con 2 (p. 41).', 'p. 41', 1, false),
  ('10000005-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006005', '¿Cómo funciona el radar secundario de vigilancia (SSR) frente al primario?', '["No requiere ningún equipo a bordo y se basa en el eco", "Requiere la colaboración de la aeronave mediante un transpondedor que responde a la interrogación", "Calcula la posición solo con satélites", "Funciona únicamente en superficie del aeropuerto"]'::jsonb, 1, 'En el SSR el blanco cooperativo recibe la interrogación y devuelve una respuesta con identificación, altitud y otros datos (p. 56).', 'pp. 56, 62', 1, false),
  ('10000005-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006005', '¿Qué radar está diseñado para detectar aeronaves y vehículos en la superficie del aeropuerto y mostrarlos en la torre de control?', '["PSR", "SSR", "SMR", "WAM"]'::jsonb, 2, 'El SMR es un radar primario especializado en el área de maniobras, con imagen en consola de la torre (p. 60).', 'p. 60', 1, false),
  ('10000005-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006005', '¿En qué banda de frecuencia opera el SMR?', '["Banda L (1 a 2 GHz)", "Banda S (2 a 4 GHz)", "Banda VHF", "Banda X (8 a 12 GHz)"]'::jsonb, 3, 'El PSR trabaja en bandas L y S, mientras que el SMR opera en banda X, lo que mejora la resolución (p. 61).', 'p. 61', 2, false),
  ('10000005-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006005', '¿Qué modo del transpondedor permite la llamada selectiva a un respondedor concreto?', '["Modo S", "Modo 3/A", "Modo C", "Intermodo"]'::jsonb, 0, 'El Modo S admite interrogación general, radiodifusión y llamada selectiva; es el de mayor uso (p. 64).', 'p. 64', 2, false),
  ('10000005-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006005', '¿En qué se basa la multilateración para calcular la posición?', '["En el efecto Doppler de haces dirigidos al suelo", "En la diferencia horaria de llegada (TDOA) de las señales a varias estaciones receptoras", "En el giro de una antena que mide el ángulo del eco", "En la integración de aceleraciones de la aeronave"]'::jsonb, 1, 'La multilateración usa TDOA: con cuatro estaciones se obtiene una única posición (p. 65).', 'p. 65', 2, false),
  ('10000005-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006005', '¿Cuáles son las dos características definitorias de la ADS?', '["Es pasiva y cooperativa", "Es independiente y no cooperativa", "Es automática y dependiente", "Es periódica y bajo demanda"]'::jsonb, 2, 'Es automática porque no requiere intervención del piloto y dependiente porque la información se genera en los sistemas de a bordo (p. 69).', 'p. 69', 1, false),
  ('10000005-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006005', 'En el INS, el error del sistema...', '["es constante y no requiere actualización", "disminuye con el tiempo de vuelo", "solo aparece en vuelos sobre el mar", "crece con el tiempo desde la última actualización, por lo que debe actualizarse periódicamente con otros sistemas"]'::jsonb, 3, 'El INS tiene un error sistemático que aumenta con el tiempo, por lo que se actualiza con VOR, VOR/DME, GPS, etc. (p. 52).', 'pp. 51-52', 2, false)
on conflict (id) do nothing;
