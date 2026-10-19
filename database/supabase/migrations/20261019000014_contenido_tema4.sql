-- Contenido propio del Tema 4 (Cartografía).
-- Redactado a partir de docs/fuentes/enaire/t4.pdf (ENAIRE, nov. 2024). reviewed=false: pendiente de revisión humana.
-- topic_id fijo del tema 4 (migración 20261019000002_roadmap.sql).

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000004-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006004', 1, 'Geodesia, forma y dimensiones de la Tierra', '**Cartografía y topografía.** Estudian la representación total o parcial de la superficie terrestre en un mapa o plano. Las **cartas** son mapas o planos diseñados para necesidades funcionales de los usuarios; las **cartas aeronáuticas** sirven a las distintas fases del vuelo.

**Geodesia.** Ciencia que estudia la forma y dimensiones de la Tierra, su campo de gravedad y sus variaciones temporales, y cómo representarla en un plano. Es la base de la topografía, la cartografía, la fotogrametría y la navegación.

**Superficies de referencia**
- **Geoide:** la forma real (algo achatada en los polos y ensanchada en el Ecuador por la combinación de fuerzas centrífugas y gravitatorias). Es la superficie **equipotencial del campo de gravedad**, aproximadamente el nivel medio del mar. No es constante: tiene irregularidades por la distribución desigual de masas.
- **Esfera perfecta:** para estudiar puntos y líneas, la Tierra se toma como una esfera de radio medio medido hasta el nivel del mar.

**Dimensiones aproximadas (esfera):**
| Magnitud | Valor |
|---|---|
| Radio | 6.371 km |
| Perímetro | 40.076 km |

**Puntos y líneas**
- **Círculos máximos:** definidos por planos que **pasan por el centro**; miden **40.076 km** y dividen la Tierra en **dos hemisferios iguales**.
- **Meridianos:** semicírculos máximos que pasan por los polos y cortan perpendicularmente al Ecuador y a los paralelos. El **meridiano de origen o de Greenwich** (observatorio de Londres, referencia horaria desde **1884**) separa el hemisferio oriental (este) del occidental (oeste).
- **Paralelos:** círculos menores paralelos al Ecuador y perpendiculares a los meridianos. Los principales: Círculo Polar Ártico, Círculo Polar Antártico, Trópico de Cáncer y Trópico de Capricornio.', 'pp. 4-9', false),
  ('10000004-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006004', 2, 'Movimientos de la Tierra', 'Se estudian cuatro (de más de 16 descritos), aunque en realidad forman un único movimiento compuesto. Influyen en las referencias cartográficas, el cálculo de rutas y la variación del norte magnético.

| Movimiento | Claves |
|---|---|
| **Rotación** | Sobre el eje polar, de **oeste a este**; 360º en **23 h 56 min 4 s**. Causa el día y la noche y el achatamiento polar. |
| **Traslación** | Alrededor del Sol, **365 días**, órbita elíptica (eclíptica) con el Sol en un foco. **Afelio** (más lejos) en torno al 4 de julio; **perihelio** (más cerca) el 4 de enero. El eje inclinado (unos 66º33'') causa las estaciones. |
| **Precesión** | El eje describe un **cono** en unos **25.700 años**; sentido contrario a la rotación, unos 50'' anuales. Es causada por la atracción del Sol y la Luna sobre el abultamiento ecuatorial. Cambia la posición aparente de las estrellas. |
| **Nutación** | Pequeña oscilación del eje sobre la precesión: ciclo de algo más de **18 años** y oscilación de unos **9''**. Precesión + nutación provocan la **variación del norte magnético**. |

- **Trópico de Cáncer** (23º27'' N): rayos perpendiculares en el solsticio de verano (día más largo en el hemisferio norte).', 'pp. 9-12', false),
  ('10000004-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006004', 3, 'Magnetismo, declinación y rumbo', '**Magnetismo terrestre.** La Tierra es un gran imán cuyos polos magnéticos **no coinciden** con los geográficos.
- **Polo Norte magnético:** por él **entran** las líneas de fuerza del campo.
- **Polo Sur magnético:** por él **salen**.

**Declinación magnética.** Ángulo entre el **norte magnético local** y el **norte geográfico**.
- **Este (E) o positiva:** mirando al norte geográfico, el norte magnético queda a la **derecha**.
- **Oeste (W) o negativa:** queda a la **izquierda**.

**Rumbo.** Ángulo entre el norte de referencia y el **eje longitudinal de la aeronave**, medido en sentido horario con **tres cifras**. Según el norte usado, es magnético o geográfico.

**Fórmula:** Rumbo magnético = Rumbo geográfico - declinación (E positiva, W negativa).
- Ejemplo del manual: Rg 081º y declinación 3ºE: Rm = 081 - (+3) = **078º**.', 'pp. 13-15', false),
  ('10000004-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006004', 4, 'Ruta, deriva y derrota', '**Ruta.** Proyección del movimiento de una aeronave sobre la superficie terrestre; sobre una carta es la trayectoria que une salida y destino. Puede ser magnética o geográfica. Sin viento, el rumbo coincide con la ruta; con viento puede no coincidir.

| | **Ortodrómica** | **Loxodrómica** |
|---|---|---|
| Qué es | Arco de **círculo máximo** | La que se sigue con **rumbo constante** |
| Longitud | Ruta **más corta** | Más larga |
| Ángulo con los meridianos | Distinto en cada meridiano (salvo meridiano o Ecuador) | **Mismo** ángulo con todos |
| Seguimiento | Difícil | Fácil |
| Uso | Grandes distancias; ahorro de combustible | Rutas cortas (< **1.000 km**); en desuso aeronáutico por los sistemas modernos |

**Milla náutica (NM):** longitud recorrida en un minuto de arco sobre un círculo máximo; **1 NM = 1,852 km**.

**Deriva.** Ángulo entre la ruta deseada y la dirección real del movimiento de la aeronave, por el viento. **Máxima** con viento perpendicular al rumbo; mínima o nula si coincide con él.

**Derrota.** Proyección sobre el suelo de la trayectoria realmente seguida al intentar sobrevolar una ruta; resulta de las correcciones sucesivas de rumbo, debidas sobre todo al viento.', 'pp. 15-18', false),
  ('10000004-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006004', 5, 'Coordenadas geográficas y datum WGS84', 'Un sistema de referencia terrestre combina un **sistema de coordenadas** y un **datum** (parámetros que fijan origen, orientación y escala respecto a un elipsoide de referencia).

Las **coordenadas geográficas** son dos distancias angulares: latitud y longitud.

| | **Latitud** | **Longitud** |
|---|---|---|
| Se mide | Sobre un meridiano, desde el **Ecuador** | Sobre el Ecuador, desde el meridiano de **Greenwich** |
| Rango | 0º a **90º** | 0º a **180º** |
| Signo | Norte (+) / Sur (-) | Este (+) / Oeste (-) |
| Valor constante en | Un mismo **paralelo** | Un mismo **meridiano** |

**WGS84 (World Geodetic System 1984).** Sistema geodésico universal desarrollado por el **Departamento de Defensa de EE. UU.** para acabar con la ambigüedad de usar datums distintos.
- **Origen:** centro de masas de la Tierra.

**En España**
- Las coordenadas del **AIP-España** se refieren a **WGS84**, conforme al **Anexo 15** de la OACI.
- El **RD 1071/2007** adopta **ETRS89** como sistema geodésico oficial (península y Baleares) y **REGCAN95** (Canarias). Ambos usan el elipsoide **GRS80**, materializado por la red **REGENTE**.
- Se consideraron equivalentes a WGS84, pero la **deriva** entre sistemas ha generado discrepancias mayores que la exactitud exigida a algunos datos. Por eso **no son válidos** para publicar coordenadas en el AIP-España.', 'pp. 18-22', false),
  ('10000004-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006004', 6, 'La escala', 'La **escala** es la relación entre la dimensión de un objeto en el dibujo y su dimensión real. Las dos formas más comunes son la numérica y la gráfica.

**Escala numérica:** E = longitud en el plano / longitud en el terreno. Hay que usar **las mismas unidades**.
- Ejemplo: escala 1:10 y 5 cm en el plano equivalen a 5 x 10 = 50 cm en el terreno.
- **Reducción:** numerador menor que denominador. **Ampliación:** numerador mayor. **Natural:** 1:1.
- **Escala grande:** denominador pequeño, abarca **poco terreno** (ciudades, fincas; 1:5.000, 1:10.000).
- **Escala pequeña:** denominador grande, abarca **mucho terreno** (países, continentes; 1:5.000.000).

**Escala gráfica:** línea graduada con la equivalencia real de cada división; permite ver proporciones sin cálculos. Ejemplo: en 1:5.000.000, 1 cm equivale a **50 km**.', 'pp. 22-24', false),
  ('10000004-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006004', 7, 'Proyecciones cartográficas: clasificación', '**Concepto.** Transformaciones matemáticas que representan la Tierra en un plano. No se puede pasar de superficie esférica a plana sin deformar (distancias, ángulos o áreas), así que se busca **minimizar** las distorsiones. La elección depende de la **zona** a representar y de la **finalidad** del mapa.

**Según la magnitud que conservan**
| Tipo | Conserva |
|---|---|
| **Conformes** | Los **ángulos** |
| **Equivalentes** | La proporción de las **áreas** (deforma ángulos) |
| **Equidistantes** | Las **distancias**, solo a lo largo de ciertas líneas (**automecoicas**) |
| **Afilácticas** | Ninguna de las tres |

**Según la forma**', 'pp. 25-28', false),
  ('10000004-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006004', 8, 'Proyecciones en aeronáutica: Lambert', 'Las **proyecciones cónicas** se usan mucho en navegación en ruta por la facilidad y exactitud al representar trayectorias. Las más usadas son las **gnomónicas directas**, con el cono tangente a un **paralelo estándar**.
- Es **conforme**. La distorsión es mínima junto al paralelo estándar (único automecoico) y crece al alejarse.

**Proyección cónica conforme de Lambert.** Modificada, parte de la gnomónica directa pero usa un **cono secante**.
- Resultan **dos paralelos estándar** automecoicos.
- Las deformaciones lineales se reducen a **la mitad** de las del cono tangente.

**Utilidad para la navegación aérea**
- Al ser conforme y casi equidistante, se miden **rumbos y distancias** directamente con buena precisión.
- La **ortodrómica** se representa casi como una **recta**: basta unir los puntos.
- La **loxodrómica** es una **curva** con la concavidad hacia el vértice de la proyección.', 'pp. 28-29', false),
  ('10000004-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006004', 9, 'Representación topográfica y simbología', '**Topografía.** Representa pequeñas extensiones de terreno; se puede ignorar la esfericidad y aproximar a un plano. El relieve se traza comparando altitudes con el plano del **nivel medio del mar**.

**Curvas de nivel.** Se corta el terreno con planos paralelos a igual altitud, separados por la **equidistancia**. Cada sección proyectada es una **curva de nivel o isohipsa**.
- Permiten calcular distancias, áreas, ángulos y volúmenes de forma sencilla, con deformaciones casi nulas.

**Simbología.** Los símbolos identifican objetos o información útil que no se verían a escala. En cartografía aeronáutica están normalizados en el **Anexo 4 de la OACI**. Los símbolos propios de España, no incluidos en el Anexo 4, están en el **GEN 2.3 del AIP-España** marcados con un **asterisco (\*)**.', 'pp. 29-33', false),
  ('10000004-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006004', 10, 'Cartas aeronáuticas y Anexo 4 de la OACI', '**Carta aeronáutica:** representación de una porción de tierra, su relieve y construcciones, diseñada para los requisitos de la navegación aérea. Cada Estado debe proporcionar la información de su territorio mediante cartas.

**Marco normativo**
- Se desarrollan en el **Anexo 4** y en el **Doc. 8697** (Manual de Cartas Aeronáuticas) de la OACI.
- El **Anexo 15** hace responsable de producirlas al **AIS**. En España lo gestiona **ENAIRE**, a través de la **División AIS**.
- El Anexo 4 unifica el formato: diferencias respecto al Anexo, disponibilidad, idioma (en España empiezan a ser bilingües español-inglés), especificaciones generales y cada carta.

**Carácter de las cartas (Doc. 8697)**
| Carácter | Cartas |
|---|---|
| **Obligatorias** | Plano de Obstáculos Tipo A; Carta Topográfica para Aproximaciones de Precisión; Carta de Navegación en Ruta; Carta de Aproximación por Instrumentos; Plano de Aeródromo/Helipuerto; Carta Aeronáutica Mundial 1:1.000.000 |
| **Opcionales** (si aportan seguridad, regularidad y eficiencia) | Plano de Obstáculos Tipo B; Plano de Aeródromo para Movimientos en Tierra; Plano de Estacionamiento y Atraque; Carta Aeronáutica 1:500.000; Carta de Navegación Aeronáutica de escala pequeña; Carta de Posición |
| **Condicionalmente necesarias** | Carta de Área; SID; STAR; Carta de Aproximación Visual; Carta de altitud mínima de vigilancia ATC |', 'pp. 33-37', false),
  ('10000004-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006004', 11, 'Fases del vuelo y cartas', 'Cada carta ayuda a una **fase concreta** del vuelo.

| Fase | Cartas |
|---|---|
| **1. Rodaje** del puesto de estacionamiento al despegue | Plano de Estacionamiento y Atraque; Plano de Aeródromo para Movimientos en Tierra; Plano de Aeródromo/Helipuerto |
| **2. Despegue y ascenso** hasta las rutas ATS | Plano de Obstáculos Tipo A; **SID**; Carta de altitud mínima de vigilancia ATC |
| **3. En ruta** | Carta de Área (salida y llegada); **Carta de Navegación en Ruta**; Carta de Circulación VFR |
| **4. Descenso** hasta la aproximación | **STAR**; CDA; TRAN; Carta de altitud mínima de vigilancia ATC |
| **5. Aproximación** para aterrizar | **Carta de Aproximación por Instrumentos**; Carta Topográfica para Aproximaciones de Precisión; Carta de Aproximación Visual; Plano de Obstáculos Tipo A (limitaciones de utilización) |
| **6. Aterrizaje y rodaje** al estacionamiento | Plano de Aeródromo/Helipuerto; Plano para Movimientos en Tierra; Plano de Estacionamiento y Atraque |', 'pp. 37-39', false),
  ('10000004-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006004', 12, 'Cartas de aeródromo y de llegada/salida', '**Cartas de aeródromo**
- **Plano de Aeródromo/Helipuerto:** facilita el movimiento desde los puestos de estacionamiento a la pista y viceversa, e información operativa esencial. La OACI lo exige para aeródromos de uso internacional regular; España lo publica para casi todos los aeródromos y helipuertos civiles.
- **Plano de Obstáculos Tipo A:** datos para que los explotadores cumplan los requisitos de **despegue** (parar en la distancia de aceleración-parada o continuar salvando obstáculos tras fallo de motor crítico), **en ruta con un motor inactivo** y **aterrizaje**.
- **Carta Topográfica para Aproximaciones de Precisión:** perfil del terreno en parte del área de aproximación final, para evaluar su efecto en la altura de decisión con radioaltímetro. Se facilita para pistas de precisión **CAT II y III**.

**Salidas y llegadas (IFR)**
- **SID:** rutas desde el despegue hasta la fase en ruta.
- **STAR:** rutas desde la fase en ruta hasta la aproximación.
- **CDA (descenso continuo):** basada en las STAR, **sin restricciones de velocidad y altitud**, salvo las altitudes mínimas de seguridad.
- **TRAN:** transiciones RNAV1 con tramos en forma de **trombón** (tramo inicial, alejamiento y acercamiento) que enlazan una STAR con la aproximación final al ILS. Hoy solo existen en **Barcelona/El Prat**.', 'pp. 39-42', false),
  ('10000004-0000-4000-8001-000000000013', '00000000-0000-4000-8000-000000006004', 13, 'Cartas de ruta, aproximación, electrónicas y mantenimiento', '- **Carta de Navegación en Ruta:** ayuda a navegar por las rutas ATS. Debe existir en las áreas con FIR y UIR. En España solo se ofrece en **formato digital** (Insignia).
- **Carta de Área:** facilita la transición entre ruta y aproximación, entre despegue/aproximación frustrada y ruta, y los vuelos en áreas con estructura de rutas compleja.
- **Carta de altitud mínima de vigilancia ATC:** permite vigilar y verificar altitudes asignadas por un controlador con sistema de vigilancia ATS. Lleva una nota: solo sirve para verificar altitudes **con la aeronave identificada**.
- **Carta de Aproximación por Instrumentos (IAC):** procedimientos de aproximación instrumental, incluidas aproximación frustrada y espera. Se publica **una carta por procedimiento**.
- **Carta Aeronáutica 1:500.000:** navegación visual a baja velocidad, distancias cortas o medias y altitudes bajas e intermedias; también planificación previa al vuelo. España la proporciona pero **no la incluye en el AIP**.

**Presentación electrónica.** Especificación OACI para publicar cartas de forma interactiva; todos los tipos son candidatos. Características:
- Añadir o quitar información es sencillo, pero **no se puede quitar la información básica**.
- Determinan continuamente la **posición de la aeronave** de modo dinámico.
- En el AIP-España se usa la aplicación **Insignia**; si una carta es solo electrónica se indica en su sección (por ejemplo, ENR 6.1).

**Mantenimiento**
- Las cartas del AIP se actualizan regularmente o se sustituyen por **enmiendas**.
- **Erratas** tras la publicación y **modificaciones urgentes** significativas para la operación: por **NOTAM**, con referencia a la carta. Si no afectan a la operación: **corrección manuscrita** al AIP.
- Cambio de **importancia operacional** en procedimientos: **nueva edición** distribuida por el sistema **AIRAC**.', 'pp. 41-46', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000004-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006004', '¿Cómo se define el geoide?', '["La superficie equipotencial del campo de gravedad terrestre, aproximadamente el nivel medio del mar", "Una esfera perfecta cuyo radio medio es 6.371 km", "La superficie que resulta de girar una elipse alrededor de uno de sus ejes principales", "El plano de referencia sobre el que se trazan las curvas de nivel"]'::jsonb, 0, 'El geoide es la superficie equipotencial del campo de gravedad, coincidente aproximadamente con el nivel medio del mar; el elipsoide de revolución es la superficie geométrica que lo aproxima (p. 5).', 'p. 5', 1, false),
  ('10000004-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006004', '¿Qué propiedad define a un círculo máximo?', '["Su plano es paralelo al Ecuador y no pasa por el centro", "Solo puede ser el Ecuador terrestre", "Divide la Tierra en dos casquetes esféricos desiguales", "Su plano pasa por el centro de la Tierra y divide el planeta en dos hemisferios iguales"]'::jsonb, 3, 'Los círculos máximos están definidos por planos que pasan por el centro, miden 40.076 km y dividen la Tierra en dos hemisferios iguales. Los círculos menores dan casquetes desiguales (pp. 6-8).', 'pp. 6-8', 1, false),
  ('10000004-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006004', '¿Qué es el meridiano de Greenwich?', '["El paralelo que sirve de origen de latitudes", "El círculo máximo perpendicular al eje de rotación", "El meridiano de origen, que pasa por el observatorio astronómico de Londres y es referencia horaria desde 1884", "El meridiano que separa el hemisferio norte del sur"]'::jsonb, 2, 'El meridiano de origen o de Greenwich pasa por el observatorio de Londres y es referencia del sistema horario desde 1884 (p. 7).', 'p. 7', 1, false),
  ('10000004-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006004', '¿Cuánto tarda la Tierra en completar un giro de rotación y en qué sentido gira?', '["24 h exactas, de este a oeste", "365 días, de oeste a este", "23 h 56 min 4 s, de este a oeste", "23 h 56 min 4 s, de oeste a este"]'::jsonb, 3, 'La rotación es de 360º en 23 h 56 min 4 s y su dirección es de oeste a este (p. 9).', 'p. 9', 2, false),
  ('10000004-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006004', 'En el movimiento de traslación, ¿cuándo se produce el perihelio?', '["En torno al 4 de julio, cuando la Tierra está más cerca del Sol", "En torno al 4 de julio, cuando la Tierra está más lejos del Sol", "En los equinoccios, cuando los rayos inciden sobre el Ecuador", "En torno al 4 de enero, cuando la Tierra está más cerca del Sol"]'::jsonb, 3, 'El afelio (punto más alejado) es en torno al 4 de julio y el perihelio (más cercano) el 4 de enero (p. 10).', 'p. 10', 2, false),
  ('10000004-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006004', '¿Dónde inciden perpendicularmente los rayos solares en el solsticio de verano del hemisferio norte?', '["Sobre el Trópico de Capricornio, situado a 23º27'' al sur del Ecuador", "Sobre el Ecuador, a 0º de latitud", "Sobre el Trópico de Cáncer, situado a 23º27'' al norte del Ecuador", "Sobre el Círculo Polar Ártico, a 66º33'' de latitud"]'::jsonb, 2, 'En el Trópico de Cáncer (23º27'' N) los rayos inciden perpendicularmente en el solsticio de verano, día con más horas de luz en el hemisferio norte (p. 11).', 'p. 11', 2, false),
  ('10000004-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006004', '¿Qué caracteriza a los equinoccios?', '["Es el día del año con más horas de luz en el hemisferio norte", "Los rayos inciden perpendicularmente sobre el Trópico de Capricornio", "Los rayos solares inciden perpendicularmente sobre el Ecuador y hay igual número de horas de día y de noche", "La Tierra se encuentra en el afelio"]'::jsonb, 2, 'Los equinoccios son los momentos en que los rayos inciden perpendicularmente sobre el Ecuador, con equivalencia entre horas nocturnas y diurnas (p. 11).', 'p. 11', 1, false),
  ('10000004-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006004', '¿Cuánto tarda el eje de rotación terrestre en completar el cono de la precesión?', '["Algo más de 18 años", "365 días", "Alrededor de 25.700 años", "23 horas, 56 minutos y 4 segundos"]'::jsonb, 2, 'El eje describe un cono en un ciclo extraordinariamente lento, de unos 25.700 años (p. 11). Los 18 años corresponden a la nutación (p. 12).', 'pp. 11-12', 2, false),
  ('10000004-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006004', '¿Cuál es el principal efecto combinado de la precesión y la nutación?', '["La sucesión del día y la noche", "Las estaciones del año", "La variación de la posición del norte magnético", "El achatamiento de la Tierra en los polos"]'::jsonb, 2, 'El principal efecto de combinar precesión y nutación es la variación de la posición del norte magnético (p. 12). El día y la noche son efecto de la rotación (p. 9).', 'p. 12', 2, false),
  ('10000004-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006004', '¿Qué es la declinación magnética en un punto de la Tierra?', '["El ángulo entre el eje longitudinal de la aeronave y el norte de referencia", "El ángulo entre la ruta deseada y la dirección real del movimiento", "El ángulo entre el norte magnético local y el norte geográfico", "La distancia angular entre un punto y el Ecuador"]'::jsonb, 2, 'La declinación magnética es el ángulo comprendido entre el norte magnético local y el geográfico (p. 13). La definición del rumbo es la segunda opción (p. 14).', 'pp. 13-14', 1, false),
  ('10000004-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006004', '¿Cuándo se dice que la declinación es Este (positiva)?', '["Cuando un observador mirando al norte geográfico ve el norte magnético a su izquierda", "Cuando un observador mirando al norte geográfico ve el norte magnético a su derecha", "Cuando el punto está al este del meridiano de Greenwich", "Cuando el norte magnético coincide con el geográfico"]'::jsonb, 1, 'La declinación Este o positiva es la que se da cuando el norte magnético queda a la derecha del observador que mira al norte geográfico (p. 14).', 'p. 14', 2, false),
  ('10000004-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006004', 'Con rumbo geográfico 081º y declinación 3ºE, ¿cuál es el rumbo magnético?', '["078º", "084º", "081º", "087º"]'::jsonb, 0, 'Rm = Rg - declinación = 081º - (+3º) = 078º (p. 15).', 'p. 15', 2, false),
  ('10000004-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006004', 'Con rumbo geográfico 200º y declinación 4ºW, ¿qué rumbo magnético resulta según la fórmula del manual?', '["196º", "200º", "208º", "204º"]'::jsonb, 3, 'Rm = Rg - declinación, con W negativa: 200º - (-4º) = 204º (p. 15).', 'p. 15', 2, false),
  ('10000004-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006004', '¿Cómo se define el rumbo de una aeronave?', '["Como la proyección sobre el suelo de la trayectoria seguida por la aeronave", "Como el ángulo entre la ruta deseada y la dirección del movimiento", "Como la distancia angular entre el norte de referencia y el eje longitudinal de la aeronave, en sentido horario", "Como el ángulo entre el norte magnético y el geográfico en un punto"]'::jsonb, 2, 'El rumbo es la distancia angular entre el norte de referencia y el eje longitudinal de la aeronave, en tres cifras y sentido horario (p. 14).', 'p. 14', 1, false),
  ('10000004-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006004', '¿Cuál de estas características corresponde a la ruta ortodrómica?', '["Mantiene un rumbo constante en la brújula", "Es un arco de círculo máximo y es la ruta más corta entre dos puntos", "Forma el mismo ángulo con todos los meridianos", "Es más larga que la loxodrómica y fácil de seguir"]'::jsonb, 1, 'La ortodrómica es el arco de círculo máximo que une dos puntos y es la ruta más corta; forma ángulos distintos con cada meridiano y es difícil de seguir (pp. 16-17).', 'pp. 16-17', 2, false),
  ('10000004-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006004', '¿Cuándo suele seguirse la ruta loxodrómica en lugar de la ortodrómica?', '["En rutas de menos de 1.000 km, donde la diferencia es pequeña y se mantiene un rumbo constante", "En rutas de largo recorrido, para ahorrar combustible", "Siempre que la navegación se realice con sistemas modernos", "Solo cuando la ruta coincide con un paralelo"]'::jsonb, 0, 'Para distancias pequeñas (inferiores a 1.000 km) la diferencia es pequeña y se suele seguir la loxodrómica por mantener rumbo constante (p. 16).', 'p. 16', 2, false),
  ('10000004-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006004', '¿Cómo se define la milla náutica (NM) y cuánto equivale?', '["Longitud de un grado de latitud; 1 NM = 1 km", "Longitud recorrida en un minuto sobre un arco de círculo máximo; 1 NM = 1,852 km", "Longitud recorrida en una hora a un nudo sobre un paralelo; 1 NM = 1,609 km", "Longitud de un minuto de longitud en el Ecuador; 1 NM = 1,000 km"]'::jsonb, 1, 'La NM se define a partir de los arcos de círculo máximo: longitud recorrida en un minuto, 1 NM = 1,852 km (p. 17).', 'p. 17', 1, false),
  ('10000004-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006004', '¿En qué situación es máxima la deriva?', '["Cuando el viento es perpendicular al rumbo de la aeronave", "Cuando el viento sopla en la misma dirección que la aeronave", "Cuando no hay viento", "Cuando la ruta es ortodrómica"]'::jsonb, 0, 'La deriva es máxima con viento perpendicular al rumbo y mínima o nula cuando la dirección del viento coincide con la de la aeronave (p. 17).', 'p. 17', 2, false),
  ('10000004-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006004', '¿Qué es la latitud de un punto?', '["La distancia angular, medida sobre el Ecuador, entre el meridiano del lugar y Greenwich, de 0º a 180º", "La altura del punto sobre el nivel medio del mar", "La distancia angular entre el punto y el Polo Norte, de 0º a 360º", "La distancia angular, medida sobre un meridiano, entre el punto y el Ecuador, de 0º a 90º"]'::jsonb, 3, 'La latitud se mide sobre un meridiano desde el Ecuador y varía de 0º a 90º, Norte positiva y Sur negativa (p. 19).', 'p. 19', 1, false),
  ('10000004-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006004', '¿Cuál de estas afirmaciones sobre la longitud es correcta?', '["Varía de 0º a 90º y es positiva en el hemisferio norte", "Varía de 0º a 180º y es negativa si el punto está al oeste del meridiano de Greenwich", "Se mide sobre un meridiano desde el Ecuador", "Todos los puntos de un mismo paralelo tienen la misma longitud"]'::jsonb, 1, 'La longitud se mide sobre el Ecuador desde Greenwich, de 0º a 180º; Este positiva y Oeste negativa. Los puntos de un mismo meridiano comparten longitud (pp. 19-20).', 'pp. 19-20', 2, false),
  ('10000004-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006004', '¿Por qué ETRS89 y REGCAN95 no son válidos para publicar coordenadas en el AIP-España?', '["Por la deriva entre sistemas, con discrepancias mayores que la exactitud requerida para algunos datos respecto a WGS84", "Porque emplean un elipsoide distinto de GRS80", "Porque el Real Decreto 1071/2007 los prohíbe", "Porque solo cubren la península Ibérica"]'::jsonb, 0, 'Inicialmente se consideraron equivalentes a WGS84, pero la deriva ha generado discrepancias mayores que la exactitud exigida a algunos datos (pp. 21-22).', 'pp. 21-22', 3, false),
  ('10000004-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006004', '¿Quién desarrolló el sistema WGS84 y cuál es su origen de ejes?', '["La OACI; el observatorio de Greenwich", "La Comisión Europea; el polo norte magnético", "El IERS; el centro geométrico del Ecuador", "El Departamento de Defensa de EE. UU.; el centro de masas de la Tierra"]'::jsonb, 3, 'WGS84 lo desarrolló el Departamento de Defensa estadounidense y su origen es el centro de masas de la Tierra (p. 20).', 'p. 20', 2, false),
  ('10000004-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006004', 'En una carta a escala 1:5.000.000, ¿a qué distancia real equivale una división gráfica de 1 cm?', '["5 km", "50 km", "500 km", "5.000 km"]'::jsonb, 1, 'El propio manual indica que para 1/5.000.000 un centímetro equivale a 50 km (p. 24). Comprobación: 5.000.000 cm = 50 km.', 'p. 24', 2, false),
  ('10000004-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006004', 'Con una escala 1:10, ¿qué distancia real representa una medida de 5 cm en el plano?', '["50 cm", "0,5 cm", "15 cm", "5 cm"]'::jsonb, 0, 'Distancia real = distancia en el plano x denominador: 5 x 10 = 50 cm (p. 23).', 'p. 23', 1, false),
  ('10000004-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006004', '¿Qué es una escala grande?', '["La de denominador grande, que abarca mucho terreno, como 1:5.000.000", "La de numerador mayor que el denominador", "La que representa el objeto a tamaño real", "La de denominador pequeño, que abarca poco terreno, como 1:5.000"]'::jsonb, 3, 'Una escala es grande cuando el denominador es pequeño; abarca poco terreno (ciudades, fincas). La pequeña abarca países y continentes (p. 23).', 'p. 23', 2, false),
  ('10000004-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006004', '¿Qué conserva una proyección conforme?', '["La proporcionalidad entre las áreas", "La proporcionalidad entre las distancias en todo el mapa", "Ninguna de las magnitudes anteriores", "Los ángulos entre dos puntos, igual en la superficie de referencia y en el mapa"]'::jsonb, 3, 'Las proyecciones conformes conservan los ángulos; ninguna proyección puede ser equivalente y conforme a la vez (p. 26).', 'p. 26', 1, false),
  ('10000004-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006004', '¿Qué tipo de proyección se usa de forma muy extendida en la cartografía aeronáutica de navegación en ruta?', '["Las proyecciones cónicas", "Las proyecciones cilíndricas ortogonales", "Las proyecciones azimutales polares", "Las proyecciones afilácticas"]'::jsonb, 0, 'Las proyecciones cónicas tienen uso muy extendido en navegación en ruta por la facilidad y exactitud al representar trayectorias (p. 28).', 'p. 28', 1, false),
  ('10000004-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006004', '¿En qué se diferencia la proyección cónica conforme de Lambert de la gnomónica directa?', '["Usa un cono secante, con dos paralelos estándar y deformaciones lineales reducidas a la mitad", "Usa un cono tangente a un único paralelo estándar", "Usa un cilindro tangente al Ecuador", "Es una proyección afiláctica sin paralelos estándar"]'::jsonb, 0, 'Lambert sustituye el cono tangente por uno secante: dos paralelos estándar automecoicos y deformaciones lineales reducidas a la mitad (pp. 28-29).', 'pp. 28-29', 2, false),
  ('10000004-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006004', 'En la proyección conforme de Lambert, ¿cómo se representan la ortodrómica y la loxodrómica?', '["La ortodrómica, como una curva; la loxodrómica, como una recta", "Ambas, como rectas", "La ortodrómica, casi como una recta; la loxodrómica, como una curva cóncava hacia el vértice", "Ambas, como curvas con la concavidad hacia el exterior"]'::jsonb, 2, 'En Lambert la ortodrómica se representa con gran aproximación por una recta y la loxodrómica por una curva con la concavidad hacia el vértice (p. 29).', 'p. 29', 3, false),
  ('10000004-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006004', 'En el sistema de curvas de nivel, ¿cómo se llama la separación vertical constante entre los planos de corte?', '["Cota", "Equidistancia", "Escala gráfica", "Paralelo estándar"]'::jsonb, 1, 'Los planos de corte están separados por una misma distancia vertical denominada equidistancia; las curvas resultantes son las isohipsas (p. 31).', 'p. 31', 1, false),
  ('10000004-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006004', '¿Dónde se recogen los símbolos usados por España que no figuran en el Anexo 4 de la OACI?', '["En el GEN 2.3 del AIP-España, marcados con un asterisco", "En el Doc. 8697 de la OACI", "En el ENR 6.1 del AIP-España", "En el Anexo 15 de la OACI"]'::jsonb, 0, 'Los símbolos propios de España figuran en el GEN 2.3 del AIP-España con un * que indica no incluidos en el Anexo 4 de la OACI (p. 32).', 'p. 32', 3, false),
  ('10000004-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006004', 'En España, ¿qué unidad es responsable de la producción de la cartografía aeronáutica?', '["La Secretaría General de la OACI", "La División AIS de ENAIRE", "EUROCONTROL", "La Dirección General de Aviación Civil"]'::jsonb, 1, 'El AIS es responsable de producir la cartografía aeronáutica; en España lo gestiona ENAIRE y, en cuanto a cartografía, recae en la División AIS (p. 33).', 'p. 33', 1, false),
  ('10000004-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006004', '¿Cuál de estas cartas es obligatoria según el Doc. 8697 de la OACI?', '["Carta de Navegación en Ruta", "Plano de Obstáculos de Aeródromo Tipo B", "Carta de Posición", "Carta de Área"]'::jsonb, 0, 'La Carta de Navegación en Ruta es obligatoria. El Plano Tipo B y la Carta de Posición son opcionales, y la Carta de Área es condicional (pp. 35-36).', 'pp. 35-36', 2, false),
  ('10000004-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006004', '¿Cuál de estas cartas tiene carácter opcional?', '["Carta de Aproximación por Instrumentos", "Plano de Estacionamiento y Atraque de Aeronaves", "Plano de Aeródromo/Helipuerto", "Carta Topográfica para Aproximaciones de Precisión"]'::jsonb, 1, 'El Plano de Estacionamiento y Atraque es opcional; las otras tres son obligatorias (pp. 35-36).', 'pp. 35-36', 2, false),
  ('10000004-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006004', '¿Cuándo es necesaria la Carta de Área?', '["Siempre, en todas las FIR", "Solo si las rutas ATS o los requisitos de notificación de posición son complicados y no caben en la Carta de Navegación en Ruta", "Solo en aeródromos con pistas de precisión CAT II o III", "Únicamente para vuelos VFR en TMA"]'::jsonb, 1, 'La Carta de Área es condicionalmente necesaria: solo si las rutas o la notificación de posición son complicadas y no pueden indicarse en la Carta de Navegación en Ruta (p. 36).', 'p. 36', 2, false),
  ('10000004-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006004', '¿Qué carta corresponde a la fase de aproximación para aterrizar?', '["Carta de Salida Normalizada (SID)", "Plano de Estacionamiento y Atraque de Aeronaves", "Carta de Aproximación por Instrumentos", "Carta de Área de rutas de salida"]'::jsonb, 2, 'En la fase 5 se usan la Carta de Aproximación por Instrumentos, la Topográfica para Aproximaciones de Precisión, la de Aproximación Visual y el Plano de Obstáculos Tipo A. La SID es de la fase 2 (p. 38).', 'p. 38', 2, false),
  ('10000004-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006004', '¿En qué aeropuerto español existen en la actualidad cartas TRAN (transición a la aproximación final)?', '["En Madrid-Barajas y Barcelona/El Prat", "Solo en Barcelona/El Prat", "En todos los aeropuertos con ILS", "Solo en Palma de Mallorca"]'::jsonb, 1, 'Las transiciones RNAV con tramos en forma de trombón solo existen en la actualidad en Barcelona/El Prat (p. 42).', 'p. 42', 2, false),
  ('10000004-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006004', '¿Para qué pistas se facilita la Carta Topográfica para Aproximaciones de Precisión?', '["Todas las pistas visuales de cualquier aeródromo", "Solo pistas de categoría I", "Pistas de aproximación de precisión de categorías II y III de aeródromos de aviación civil internacional", "Únicamente helipuertos"]'::jsonb, 2, 'Esta carta da el perfil del terreno para evaluar su efecto en la altura de decisión con radioaltímetro y se facilita para pistas CAT II y III (p. 41).', 'p. 41', 3, false),
  ('10000004-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006004', 'Si tras publicar una carta se detecta una modificación urgente y significativa para las operaciones, ¿cómo se notifica?', '["Mediante corrección manuscrita al AIP", "Solo en la siguiente edición AIRAC", "Mediante un Suplemento Regular únicamente", "Mediante un NOTAM que haga referencia a la carta afectada"]'::jsonb, 3, 'Las erratas y modificaciones urgentes significativas para la operación se notifican por NOTAM; si no afectan a la operación, por corrección manuscrita (p. 46).', 'p. 46', 2, false),
  ('10000004-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006004', '¿Mediante qué aplicación se presentan electrónicamente algunas cartas del AIP-España?', '["AIRAC", "Doc. 8697", "REGENTE", "Insignia"]'::jsonb, 3, 'En el AIP-España algunas cartas se presentan de forma electrónica mediante la aplicación Insignia (p. 45).', 'p. 45', 1, false)
on conflict (id) do nothing;
