-- Contenido propio del Tema 3 (Conceptos básicos de meteorología).
-- Redactado a partir de docs/fuentes/enaire/t3.pdf (ENAIRE, nov. 2024). reviewed=false: pendiente de revisión humana.
-- topic_id fijo del tema 3 (migración 20261019000002_roadmap.sql).

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000003-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006003', 1, 'Meteorología aeronáutica y servicio meteorológico', '**Conceptos.**
- **Tiempo** (OMM): estado de la atmósfera en un instante dado. **Clima**: síntesis de las condiciones en un lugar, con estadísticas a largo plazo.
- **Meteorología aeronáutica**: la que trata los fenómenos que afectan a las aeronaves, en tierra y en vuelo.
- La información tiene dos vertientes: **observada** (situación reciente) y **prevista** (pronóstico). El pronóstico es el valor **más probable** durante su periodo.
- Destinatarios: operadores y tripulaciones, ATS y FIS, búsqueda y salvamento, y aeropuertos.

**Servicio meteorológico internacional.** Lo regula el **Anexo 3 de la OACI**, y su finalidad es la seguridad, regularidad y eficiencia de la navegación aérea. Cada Estado decide qué servicio presta en su espacio aéreo. La OACI coopera con la **OMM**, organismo de la ONU.

| Ámbito | Oficina | Claves |
|---|---|---|
| Mundial | **WAFC** | Son **2**, Londres y Washington; si uno falla, el otro asume sus funciones. Elaboran pronósticos reticulares de viento, temperatura y humedad, y de tiempo significativo. |
| Regional | **VAAC** | **9** centros de cenizas volcánicas, con vigilancia las 24 h. |
| Regional | **TCAC** | **7** centros de ciclones tropicales. |
| Regional | **CMRE** | **8** centros (Beijing, Exeter, Melbourne, Montreal, Obninsk, Tokio, Toulouse y Washington) para materiales radiactivos. |
| FIR | **Oficina de vigilancia meteorológica** | Vigila las condiciones en ruta. En España, AEMET tiene 2: **Valencia** (FIR Madrid y Barcelona) y **Las Palmas** (FIR Canarias). |
| Aeródromo | **OMAe** | Hacen la vigilancia y los pronósticos (**TAF, TREND**, avisos). Hay **5**: Las Palmas, Madrid, Santander, Sevilla y Valencia. |
| Aeródromo | **EMAe** | Observaciones ordinarias (**METAR**, cada media hora o cada hora) y especiales (**SPECI**). |

**Obtención de datos.**
- Presión y temperatura se miden con sensores automáticos. Visibilidad y nubosidad las estima un observador.
- En altura se usan sondeos, radar, red de descargas, satélites y aeronaves.
- Los **sondeos** con globo miden presión, temperatura y humedad a las **00 y 12 UTC**.
- Radar y descargas localizan cumulonimbos y tormentas. Los satélites localizan sistemas nubosos.
- Todo se integra en el Sistema Mundial de Observación de la OMM.', 'pp. 4-9', false),
  ('10000003-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006003', 2, 'Composición de la atmósfera, agua y humedad', '**Composición del aire** (cerca del nivel del mar)
- **78 % nitrógeno**, **21 % oxígeno** y **1 %** de otros gases. Esta mezcla es el **aire seco**.
- Hay además partículas sólidas y líquidas en suspensión.
- **Aire húmedo** = aire seco + vapor de agua. El vapor varía entre el **0,2 % y el 3 %** y está casi todo en la troposfera.

**El agua en la atmósfera**
- Sólido (nieve, granizo, hielo), líquido (lluvia, rocío, gotas) y gas (vapor).
- Cambios de estado: evaporación, condensación, congelación, fusión y sublimación.
- Ciclo hidrológico: evaporación, condensación (nubes) y precipitación.

**Humedad**
- La cantidad de vapor que admite el aire la fija la **temperatura**: a más temperatura, más vapor.
- Aire **saturado**: contiene el máximo posible. Se satura de dos maneras: **enfriándolo** o **inyectándole vapor**. Si sigue enfriándose, el exceso **se condensa**.
- **Humedad relativa**: cociente entre el vapor que hay y el máximo posible a esa temperatura. Si está saturado, vale **100 %**.
- **Punto de rocío**: temperatura a la que hay que enfriar el aire, a presión constante, para saturarlo (HR 100 %). Si la temperatura del aire se acerca al punto de rocío, es posible que haya **niebla**.', 'pp. 10-12, 17-18', false),
  ('10000003-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006003', 3, 'Presión, temperatura y densidad', '**Presión atmosférica**
- Es el peso de la columna de aire sobre una superficie (P = F/S = m·g/S). Se ejerce por igual en todas las direcciones.
- **Disminuye con la altitud**, y no de forma lineal: en los primeros metros baja **1 mb por cada 9 m (30 ft)** y después la caída se hace exponencial.
- También depende de la temperatura: **más calor, menos densidad y menos presión**; más frío, más presión. Varía con el momento del día (menos de 1 hPa en zonas templadas), la época del año, el movimiento de masas de aire y la orografía.
- Equivalencia: **1 atm = 760 mm Hg = 1013,25 hPa**. Se definió con el experimento de Torricelli (columna de 76 cm de mercurio).

**Temperatura**
- Mide la energía cinética media de las moléculas.
- Gradiente térmico vertical: variación de la temperatura con la altura.
- Variación diaria: máximo unas **2 h después del mediodía** y mínimo **poco después del amanecer** (inercia térmica).
- Suavizan la amplitud térmica la **nubosidad** y el **viento**. Sobre el mar y las costas la variación diaria es menor que en tierra, porque el agua tiene más calor específico.

| Escala | Fusión del hielo | Ebullición del agua |
|---|---|---|
| Centígrada | 0 ºC | 100 ºC |
| Fahrenheit | 32 ºF | 212 ºF |
| Kelvin | ~273 K | ~373 K |

- C = 5/9 · (F − 32); K = C + 273.

**Densidad**
- ρ = m/V. La ecuación de estado de los gases perfectos es **P = d·R·T**.
- A **presión constante**, el aire caliente es **menos denso** y su columna se expande (es más alta).', 'pp. 12-17', false),
  ('10000003-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006003', 4, 'Capas de la atmósfera y estabilidad', 'La atmósfera tiene **5 capas**, que varían con la latitud.
| Capa | Extensión y límite | Temperatura | Claves |
|---|---|---|---|
| **Troposfera** | Hasta la **tropopausa**: ~8 km en latitudes altas, ~12 km en medias y ~18 km en bajas | Desciende hasta unos −56,5 ºC | Casi todo el vapor y la mayor parte de la masa. **Aquí ocurren casi todos los fenómenos meteorológicos.** En las roturas de la tropopausa nace la **corriente en chorro**. |
| **Estratosfera** | Hasta la **estratopausa** (~50 km) | Asciende por el **ozono** | Presión ~0,1 % de la del mar. Casi sin nubes (nacaradas; topes de Cb). |
| **Mesosfera** | Hasta la **mesopausa** (~80 km) | Baja hasta ~−95 ºC | La mesopausa es el nivel **más frío** de la atmósfera. Nubes noctilucentes. |
| **Termosfera (ionosfera)** | Hasta unos 500 km | Sube hasta ~1.100 ºC | Ionización y aurora boreal. Sus iones reflejan ondas de radio. Sin nubes. |
| **Exosfera** | Se funde con el espacio interplanetario | | Última capa. |

- **Homosfera**: troposfera, estratosfera y mesosfera, con composición de gases homogénea.

**Estabilidad**
- **Estabilidad**: capacidad de una masa de aire de resistirse al desplazamiento vertical.
- Hay **inestabilidad** si una burbuja está más caliente (menos densa) que su entorno y asciende. Si está más fría, hay estabilidad.
- **Aire estable:** cielo despejado o nubes estratiformes, nieblas en capas bajas (sobre todo en invierno), y humo y contaminantes que no se elevan y reducen la visibilidad.
- **Aire inestable:** nubes muy desarrolladas, chubascos y turbulencia; buena visibilidad salvo en nubes y chubascos.', 'pp. 18-21', false),
  ('10000003-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006003', 5, 'Atmósfera estándar, altimetría y reglajes', '**Atmósfera ISA** (definida por la OACI): atmósfera ideal, independiente de la latitud y de la época, usada solo en aplicaciones aeronáuticas.
- Aire seco y gas perfecto.
- A nivel del mar: **15 ºC (288,15 K), 1013,25 hPa (760 mm Hg) y 1,2250 kg/m³**.
- Gradiente en la troposfera: **2 ºC por cada 1.000 ft (6,5 ºC por 1.000 m)** hasta la tropopausa (~−56,5 ºC).
- Ejemplo de cálculo: a 5.000 ft, la temperatura ISA es 15 − 5·2 = **5 ºC**.
- La atmósfera real puede diferir mucho de la ISA.

**Altimetría**
- **Altura**: distancia vertical a una superficie de referencia (normalmente el suelo).
- **Altitud**: distancia vertical al nivel medio del mar (**MSL**).
- **Elevación**: altitud de un punto del terreno.
- El **altímetro** es un barómetro aneroide graduado en altitudes. Convierte la presión en altitud según la ISA y por eso hay que **calarlo** (reglarlo).

**Reglajes**
| Reglaje | Qué es | Qué indica el altímetro |
|---|---|---|
| **QNH** | Presión del aeródromo reducida al nivel del mar con condiciones ISA | **Altitud** sobre el MSL. En tierra marca la **elevación** del aeródromo. |
| **QFE** | Presión medida en el aeródromo | **Altura** sobre el aeródromo. En tierra marca **cero**. |
| **QNE** | Presión estándar, **1013,25 hPa** | Distancia a la superficie de 1013,25 hPa: los **niveles de vuelo**. En ruta todos vuelan con QNE. |

- QNH y QFE cambian con el tiempo y el lugar, y se obtienen de la estación más cercana.
- Aeropuerto a nivel del mar: QNH = QFE. Por encima del mar: QNH > QFE. Por debajo: QNH < QFE.
- **Niveles de vuelo**: superficies de presión constante, medidas desde la de 1013,25 hPa. Se expresan en centenares de pies y quedan siempre por encima de la altitud de transición.', 'pp. 21-25', false),
  ('10000003-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006003', 6, 'Altitud, nivel y capa de transición', 'El reglaje del altímetro cambia durante el vuelo, en dos puntos.

| Concepto | Definición | Reglaje | Fase |
|---|---|---|---|
| **Altitud de transición** | Por **debajo** se controla la posición vertical con altitudes. Por **encima**, con niveles de vuelo. | QNH por debajo, QNE por encima | Se tiene en cuenta en el **despegue**. Es fija para cada aeropuerto. |
| **Nivel de transición** | Nivel de vuelo **más bajo disponible** por encima de la altitud de transición. | QNH por debajo, QNE por encima | Se tiene en cuenta en la **aproximación**. Depende de la meteorología y suele estar **como mínimo 1.000 ft** por encima de la altitud de transición. |
| **Capa de transición** | Capa entre el nivel y la altitud de transición. | | Espesor variable, siempre **≥ 1.000 ft**. |

**Altitudes de transición en España**
- **TMA de Madrid: 13.000 ft.**
- CTA de Granada: 7.000 ft.
- Resto de aeropuertos: **6.000 ft**.

**Esquema del vuelo**
- Despegue: QNH hasta la altitud de transición, y a partir de ahí QNE (niveles de vuelo).
- Crucero: QNE.
- Aproximación: QNE hasta el nivel de transición y QNH por debajo (altitudes).', 'pp. 25-27', false),
  ('10000003-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006003', 7, 'Radiación y transmisión del calor', '**Radiación solar:** de **onda corta**. Del total que llega:
- ~36 % lo absorben o reflejan las nubes.
- ~20 % lo absorben los gases (5 % ozono y 15 % CO2).
- ~4 % lo refleja la superficie.
- Solo ~**40 %** lo absorbe la corteza terrestre (tierra y océanos).

**Radiación terrestre:** de **onda larga**, emitida por la superficie, los gases, los aerosoles y las nubes. Los gases de efecto invernadero son transparentes a la onda corta del Sol y absorben la onda larga de la Tierra: es el **efecto invernadero**. Con cielo totalmente cubierto, las nubes absorben mucha radiación terrestre y la reemiten.

**Calor específico.** Es la capacidad de un cuerpo para almacenar calor. El **agua** tiene el mayor, así que los mares se calientan y se enfrían **más despacio** que la tierra.

**Balance radiactivo.**
- La radiación solar depende de la latitud, la época y la hora. El hemisferio norte recibe el máximo hacia el solsticio de junio.
- La temperatura media de la Tierra varía muy poco, porque el sistema Tierra-atmósfera emite al espacio tanta energía como recibe.
- El calor sobrante en el ecuador pasa a latitudes altas por corrientes de convección y corrientes oceánicas.

**Procesos de intercambio de calor**
| Proceso | Qué es | Efecto |
|---|---|---|
| **Conducción** | Contacto entre cuerpos a distinta temperatura | Calentamiento del aire sobre las pistas |
| **Convección** | Un fluido transporta calor | **Movimientos verticales** de masas de aire |
| **Advección** | **Movimientos horizontales** de masas de aire | Nubes orográficas, ciclo del agua |
| **Turbulencia** | Corrientes desordenadas, remolinos | Aceleraciones que alteran el vuelo; la sensibilidad depende de peso, superficie alar, actitud y velocidad |

- El calor siempre va de la zona más caliente a la más fría.', 'pp. 27-31', false),
  ('10000003-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006003', 8, 'Circulación general, Coriolis y viento', '**Circulación general atmosférica:** flujo de aire alrededor del globo que redistribuye el calor. Nace del desigual balance de radiación entre el ecuador y los polos.
- **Modelo simple** (Tierra inmóvil): el aire asciende en el ecuador, va hacia los polos en altura, desciende en el polo y vuelve por la superficie. Eso es una **célula**.
- **Modelo realista** (con rotación): **3 células**.
  - **Hadley**: del ecuador a unos 30º.
  - **Ferrel**: de 30º a 60º.
  - **Polar**: de 60º al polo.
- Presión en superficie: **vaguada ecuatorial** (baja), **alta subtropical** (~30º) y **baja subpolar** (~60º).

**Fuerza de Coriolis.** Producida por la rotación terrestre, **desvía** los objetos en movimiento a la **derecha** en el hemisferio norte y a la **izquierda** en el sur.

**Viento: conceptos**
- Viento = corriente de aire causada por diferencias de presión.
- **Convergencia**: compresión del aire al encontrarse dos corrientes. **Divergencia**: separación de la masa de aire.
- **Subsidencia**: descenso del aire hacia el suelo en la troposfera.

**Vientos a gran escala**
- **Alisios**: entre la alta subtropical y la vaguada ecuatorial. Soplan del NE en el hemisferio norte y del SE en el sur, y convergen en la **Zona de Convergencia Intertropical**.
- **Vientos del Oeste**: entre la alta subtropical y la baja subpolar.
- Entre los polos y la baja subpolar soplan vientos polares, desviados por Coriolis.

**Corriente en chorro (jet stream)**
- Corriente fuerte y estrecha en la **alta troposfera o la estratosfera**, con fuerte cizalladura.
- Circula en altura, a gran velocidad, **de oeste a este** y con ondulaciones (ondas de Rossby).
- Las más intensas son las **polares**; también hay subtropicales.
- Sopla a la altura habitual de crucero, así que las aeronaves buscan el **viento en cola** para ahorrar combustible.', 'pp. 31-36', false),
  ('10000003-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006003', 9, 'Anticiclones, depresiones, masas de aire y frentes', '| | **Anticiclón** | **Depresión (borrasca)** |
|---|---|---|
| Presión | Más alta que el entorno | Mucho más baja que el entorno |
| Giro | **Horario** en el hemisferio norte y antihorario en el sur | **Antihorario** en el hemisferio norte y horario en el sur |
| Viento | Flojo en el centro y más fuerte fuera | Fuerte en el centro y más débil fuera |
| Tiempo | Estable, cielo despejado, vientos flojos; **nieblas en invierno** y baja visibilidad | Nubosidad, fuertes vientos y lluvias |

- Anticiclón **frío**: origen térmico. Anticiclón **cálido**: origen dinámico (convergencia en altura, subsidencia y divergencia en superficie).
- **Ciclón tropical** (huracán o tifón): borrasca de océanos cálidos, con vientos y lluvias fuertes en superficie y vientos flojos en altura.
- **DANA** (antes "gota fría"): bolsa de aire frío en altura que se separa de la circulación del oeste. Mide 200 km o más, es inestable, da lluvias intensas y su trayectoria es difícil de predecir.
- **Borrascas de latitudes medias**: asociadas a los frentes polares, de gran extensión.

**Masas de aire**
- Volumen de aire de miles de km con propiedades homogéneas horizontalmente. Se identifican por su **temperatura** y su **humedad**.
- Adquieren sus propiedades en la **región manantial**.
- Por temperatura: ártica, polar, tropical y ecuatorial. Por humedad: **seca** (fuente continental) o **húmeda** (fuente marítima). Resultan **8 tipos**.

**Frentes.** Un frente es la frontera entre dos masas de distinta temperatura y densidad. El aire más cálido y ligero asciende sobre el frío. Están asociados a depresiones.
| Frente | Descripción |
|---|---|
| **Frío** | El aire frío desplaza al caliente como una cuña y lo obliga a subir. Da nubes de desarrollo vertical y precipitación. |
| **Cálido** | El aire caliente desplaza al frío y asciende sobre él, con nubosidad y precipitación. |
| **Estacionario** | Las masas se encuentran sin desplazarse. El viento sopla paralelo al frente y en sentidos opuestos. |
| **Ocluido** | El frente frío, más rápido, alcanza al cálido y eleva el sector cálido. Puede ser de tipo frío o cálido. |', 'pp. 36-41', false),
  ('10000003-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006003', 10, 'Nubes: formación, clasificación y nubosidad', '**Formación.** Se necesitan tres cosas: **alta humedad relativa**, un mecanismo que lleve el aire a la **saturación** (casi siempre el enfriamiento) y **núcleos de condensación**.
- Enfriamiento por contacto con una superficie fría (advección y radiación).
- Enfriamiento por **expansión adiabática**: ascenso convectivo, ascenso forzado en una ladera, convergencia en superficie (frontal) o turbulencia en capas bajas.

**Clasificación.** Se dividen en **tres pisos** (alto, medio y bajo). El Atlas Internacional de Nubes de la OMM distingue **10 géneros**, agrupados en cuatro familias.
| Familia | Géneros | Claves |
|---|---|---|
| **Altas** (cristales de hielo) | Cirros (Ci), Cirrostratos (Cs), Cirrocúmulos (Cc) | Los cirros indican a veces que se acerca una perturbación. Los **Cs producen halos**. |
| **Medias** (gotas, a menudo superenfriadas) | Altocúmulos (Ac), Altoestratos (As), Nimbostratos (Ns) | Los As **no producen halos**. Los Ns dan lluvia o nieve continua. |
| **Bajas** (gotas de agua) | Estratos (St), Estratocúmulos (Sc) | El St parece una niebla que no toca el suelo. |
| **Desarrollo vertical** | Cúmulos (Cu), Cumulonimbos (Cb) | El Cb da chubascos o tormenta y puede crecer hasta la tropopausa. |

**Cantidad de nubosidad.** El cielo se divide en **8 octas**.
- **FEW**: 1-2 octas. **SCT**: 3-4. **BKN**: 5-7. **OVC**: 8 (cielo cubierto).
- **NSC**: sin nubes de importancia para las operaciones.
- **CAVOK**: sin nubes ni fenómenos significativos, con visibilidad **mayor de 10 km**.

**Techo de nubes.** Es la altura sobre el suelo de la base de la capa más baja que cubre **más de la mitad del cielo (BKN/OVC)** y está por debajo de **20.000 ft (6.000 m)**.

**Nube de importancia para las operaciones.** Tiene la base por debajo del mayor de **1.500 m (5.000 ft)** y la altitud mínima de sector más alta, o es un **Cb o Cu de gran desarrollo** a cualquier altura.', 'pp. 41-47', false),
  ('10000003-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006003', 11, 'Visibilidad, precipitación, viento y vientos locales', '**Visibilidad (Anexo 3)**
- **Horizontal**: el mayor de dos valores. Uno es el alcance óptico meteorológico (**MOR**), la distancia a la que se ve un objeto negro y que se usa de día. El otro es la distancia a la que se ven luces de unas 1.000 candelas, que se usa de noche.
- **Vertical** (la de un globo ascendente) y **oblicua** (a lo largo de la senda de planeo). La oblicua suele ser **menor** que la vertical y la horizontal.
- **RVR**: distancia hasta la que un piloto sobre el eje de la pista ve las señales o las luces de la pista.
- Se mide en metros. Influyen la humedad relativa, la posición del sol y la dirección del viento.
- En METAR/SPECI se da la **visibilidad reinante**: el máximo valor alcanzado en al menos la mitad del horizonte o del aeródromo. Si fluctúa mucho, se da la mínima.

**Precipitación**
- Partículas líquidas o sólidas de las nubes que llegan al suelo.
- Los **chubascos** (nubes convectivas, Cb) empiezan y acaban bruscamente y son intensos.
- La precipitación **continua** o intermitente viene de nubes estratiformes (As, Ns).
- **Virga**: la precipitación se evapora antes de llegar al suelo.
- Efectos: menos visibilidad, cizalladura, engelamiento, peor frenado y aquaplaning, y rodaje más lento sobre nieve o hielo.

**Viento**
- La causa principal es el **gradiente de presión**, y lo modifican Coriolis, la fuerza centrífuga y el rozamiento.
- Es un vector (intensidad y dirección). La velocidad se da en **nudos**. La dirección es la de **procedencia**, en grados desde el **norte geográfico**, en sentido horario.
- Despegues y aterrizajes **contra el viento**; se tolera un viento en cola ligero. La componente transversal máxima de las aeronaves va de **15 a 35 kt**.

**Brisas.** De **día**, la tierra se calienta más que el mar, baja la presión en tierra y sopla la **brisa de mar** (del mar a tierra). De **noche** ocurre al revés: **brisa de tierra**. Es un ciclo diario predecible que se aprovecha en la configuración de pistas.

**Efecto Foehn.** En el lado de **sotavento**, el aire se vuelve más **cálido y seco** que a la misma altura en barlovento. Asciende por barlovento, condensa y pierde humedad, y desciende calentándose por compresión adiabática (gradiente adiabático seco).', 'pp. 47-53', false),
  ('10000003-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006003', 12, 'Visibilidad reducida, niebla y engelamiento', '**Visibilidad reducida.** La que ve el piloto en el aire puede ser distinta de la medida en tierra (por ejemplo, una niebla en la pista).
- Cuando la visibilidad es **inferior a 1.500 m** se debe cifrar el **RVR**.
- El RVR es el promedio de los **10 minutos** anteriores. Se mide con transmisómetros a 2,5 m de altura, a unos 100 m del eje, en la zona de toma de contacto.
- Causas: nieblas, neblinas, ventiscas, calima, humo, contaminación, smog, polvo, nubes bajas y precipitaciones intensas. **La niebla es lo que más influye.**
- La estabilidad y las inversiones térmicas dificultan que se disipe la niebla.

**Niebla y neblina**
- **Niebla**: nube estratiforme en contacto con el suelo o muy cerca, con visibilidad **inferior a 1.000 m**.
- **Neblina**: reducción mayor de 1.000 m con humedad relativa **superior al 70 %**. La **bruma** es una neblina de partículas higroscópicas (sobre todo sal), típica de costas.
- Se forma por condensación, por **enfriamiento** o por aporte de vapor.
- **Niebla baja**: no supera los 2 m de altura.

**Ilusiones ópticas.** Hacen creer al piloto que está a una altura o distancia distinta de la real. Las causan la pendiente y la anchura de la pista, el terreno, el agua en el parabrisas, la falta de contraste de las luces y la luminosidad.

**Engelamiento**
- Formación de hielo en el avión cuando gotas **subfundidas** (agua líquida a 0 ºC o menos) se congelan al impactar. En vuelo requiere gotas visibles y temperatura **≤ 0 ºC** (a veces algo superior).
- Efectos: más peso y resistencia, falsas indicaciones, **menos sustentación**, menos maniobrabilidad, peor frenado, pérdida de potencia y daños en motores.
- Intensidad: **ligero**, **moderado** y **fuerte** (los equipos de a bordo no bastan y hace falta un **cambio de altitud inmediato**).

| Tipo | Aspecto | Condiciones |
|---|---|---|
| **Hielo claro** | Transparente, liso, muy adherente. Muy peligroso. | Aire entre **0 y −10 ºC** |
| **Hielo granulado** (rime) | Blanco, opaco, rugoso. Poco adherente y menos problemático. | Aire entre 0 y −40 ºC (habitual −10 a −20 ºC) |
| **Lluvia engelante** | Gotas de una capa cálida que se sobreenfrían en una capa bajo 0 ºC. **El más peligroso.** | |
| **Escarcha / nieve húmeda** | Cristales con gotas subfundidas. Puede formarse en tierra. | Retirarlo antes de despegar |', 'pp. 53-59', false),
  ('10000003-0000-4000-8001-000000000013', '00000000-0000-4000-8000-000000006003', 13, 'Cizalladura y turbulencia', '**Cizalladura (wind shear).** Cambio de velocidad y/o dirección del viento entre dos puntos próximos. Puede ser horizontal, vertical o ambas. Es más fuerte cuanto **menor la distancia** y **mayor la rapidez** del cambio.
- En niveles altos favorece la turbulencia. En niveles **bajos** es un peligro para despegue y aterrizaje, porque afecta a la senda de planeo.
- Causas: tormentas (microrreventones, **frentes de racha**), tornados, frentes, vientos fuertes perturbados por el relieve e inversiones térmicas cerca del suelo.

**Turbulencia.** Flujo con fluctuaciones irregulares de velocidad (remolinos). En aviación se produce cuando afecta al movimiento del avión, sobre todo con aceleraciones verticales.
- Intensidad: **ligera**, **moderada** (suele exigir intervención del piloto), **fuerte** y **extrema** (avión prácticamente ingobernable).

| Tipo | Origen y claves |
|---|---|
| **Convectiva** | Días calurosos o aire frío sobre superficie cálida. Solo se considera el efecto de las ascendentes. |
| **Mecánica** | Obstáculos (edificios, montañas). Depende del tamaño, la velocidad del viento y la rugosidad. Si el aire es inestable, los remolinos son mayores. |
| **De estela** | La dejan las aeronaves. **Tras el despegue de un avión pesado no conviene autorizar enseguida otro despegue.** |
| **Frontal** | Mayor en frentes fríos que en cálidos. |
| **Ondas de montaña** | Muy peligrosas; los **rotores** bajo las crestas son lo peor, sobre todo el de la primera onda. |
| **TAC** (aire claro) | En alta cota y fuera de nubes. Cerca de la corriente en chorro y en capas estables con fuerte cizalladura vertical. Suele ser ligera. |
| **De tormenta** | Dentro de la nube y alrededor. |

**Condiciones de las ondas de montaña**
- Viento en la cima **> 15 kt**, que aumenta con la altura.
- Dirección constante, a **menos de 30º** de la perpendicular al eje de la montaña.
- **Capa estable** sobre la cima.
- Con humedad aparecen nubes **lenticulares**, nubes **rotor** y nubes de ladera y cresta (bonete).
- El piloto que sufra TAC intensa y persistente pedirá un cambio de ruta o nivel, de ahí la importancia de conocer dónde está la corriente en chorro.', 'pp. 59-64', false),
  ('10000003-0000-4000-8001-000000000014', '00000000-0000-4000-8000-000000006003', 14, 'Tormentas y otros fenómenos peligrosos', '**Tormenta.** Cumulonimbo con aparato eléctrico (rayos y truenos).
- Condiciones: calor en superficie, **atmósfera inestable**, humedad suficiente y, a veces, un mecanismo de elevación.
- Reúne turbulencia fuerte o extrema, viento racheado, granizo, engelamiento y cizalladura.
- Tipos: **frontales** (aire cálido que asciende sobre el frente; más duraderas) y de **masa de aire** (calentamiento diurno, decenas de km²; en latitudes medias, tardes de primavera y verano).

**Ciclo de vida** (2 a 3 horas)
1. **Formación**: corrientes ascendentes y condensación; nacen los Cb.
2. **Madurez**: cae la precipitación, aparecen corrientes descendentes y el **frente de racha**. Las ascendentes alcanzan su **máxima intensidad**, la nube forma **yunque** y hay descargas.
3. **Disipación**: desaparecen las ascendentes y la nube se va disipando.

**Línea de turbonada.** Línea de tormentas muy activas, de cientos de km de largo y 20-50 km de ancho, a unos 25 kt de media. Trae vientos destructivos, turbulencia severa, granizo y tornados.

**Microrreventón**
- Fuerte corriente descendente de aire frío y denso que sale de una nube convectiva.
- Descendentes de hasta **60 kt**; vientos horizontales de hasta **150 kt**, con variaciones de más de 50 kt (fortísima cizalladura).
- Escala pequeña: hasta **5 km** y duración de **1 a 5 minutos** (nunca más de 15). También altera los instrumentos.
- **Húmedo** si lleva precipitación y **seco** si no.

**Tornado / tromba marina.** Columna de aire que rota violentamente, desde la base de un Cb. Diámetro de menos de 10 m a 1 km y desplazamiento a ~25 kt. Si no toca el suelo, se llama **tuba**; sobre el mar, **tromba marina**.

**Ciclones tropicales.** Depresiones no frontales entre unos 25º N y 25º S, con mar a más de ~**27 ºC**.
- Perturbación tropical: vientos ligeros.
- Depresión tropical: hasta 33 kt.
- **Tormenta tropical: 34 a 63 kt.**
- **Huracán, ciclón o tifón: más de 64 kt.**
- Su presencia es motivo suficiente para suspender toda la actividad aérea.

**Otros peligros**
- **Corrientes convectivas**: el suelo caliente genera ascensos y descensos bruscos.
- **Temperaturas superiores a 30 ºC**: baja la densidad del aire y condiciona el recorrido de despegue; hacen falta pistas largas o reducir el peso máximo.', 'pp. 64-70', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000003-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006003', '¿Qué Anexo de la OACI regula el servicio meteorológico para la navegación aérea internacional?', '["El Anexo 2", "El Anexo 3", "El Anexo 11", "El Anexo 4"]'::jsonb, 1, 'El servicio meteorológico para la navegación aérea internacional está regulado por el Anexo 3 de la OACI (p. 5).', 'p. 5', 1, false),
  ('10000003-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006003', '¿Cuántos Centros Mundiales de Pronóstico de Área (WAFC) existen y dónde están?', '["Tres: Londres, Toulouse y Montreal, con reparto regional de funciones", "Uno solo, en Londres, con respaldo en cada Estado", "Dos: Madrid y Washington, sin posibilidad de sustitución mutua", "Dos: Londres y Washington, de modo que si uno falla el otro asume sus funciones"]'::jsonb, 3, 'Los WAFC son dos, el de Londres y el de Washington, y si uno interrumpe sus actividades el otro asume sus funciones (p. 7).', 'p. 7', 1, false),
  ('10000003-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006003', '¿Cuántas oficinas meteorológicas de aeródromo (OMAe) hay en España y cuáles son?', '["Cinco: Las Palmas, Madrid, Santander, Sevilla y Valencia", "Dos: Valencia y Las Palmas, una por cada FIR peninsular y canario", "Ocho: una por cada base aérea abierta al tráfico civil", "Cuarenta: una por cada aeropuerto de la red de Aena"]'::jsonb, 0, 'Las OMAe, que preparan TAF, TREND y avisos de aeródromo, son cinco: Las Palmas, Madrid, Santander, Sevilla y Valencia (p. 8). Las EMAe, en cambio, están en los 40 aeropuertos y 8 bases.', 'p. 8', 2, false),
  ('10000003-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006003', '¿Cuál es la composición aproximada del aire seco cerca del nivel del mar?', '["78 % de oxígeno, 21 % de nitrógeno y 1 % de otros gases", "50 % de nitrógeno, 40 % de oxígeno y 10 % de vapor de agua", "99 % de nitrógeno y 1 % de oxígeno", "78 % de nitrógeno, 21 % de oxígeno y 1 % de otros gases"]'::jsonb, 3, 'El aire seco tiene un 78 % de N2, un 21 % de O2 y un 1 % de otros gases (p. 10).', 'p. 10', 1, false),
  ('10000003-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006003', '¿De qué dos maneras puede saturarse un volumen de aire no saturado?', '["Aumentando su temperatura o inyectándole vapor de agua", "Disminuyendo su presión o aumentando su temperatura", "Disminuyendo su humedad relativa o aumentando su densidad", "Disminuyendo su temperatura o inyectándole vapor de agua"]'::jsonb, 3, 'El aire se satura al enfriarse o al recibir más vapor de agua; una vez saturado, el exceso se condensa (p. 17).', 'p. 17', 2, false),
  ('10000003-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006003', '¿Qué es el punto de rocío?', '["La temperatura máxima que puede alcanzar el aire saturado a presión constante", "La temperatura a la que el vapor de agua se convierte en hielo por sublimación", "La temperatura a la que hay que enfriar el aire, a presión constante, para que su humedad relativa sea del 100 %", "La temperatura a la que la humedad relativa del aire es del 0 %"]'::jsonb, 2, 'El punto de rocío es la temperatura a la que se satura el aire al enfriarlo a presión constante; si la temperatura se acerca a él, puede haber niebla (p. 18).', 'p. 18', 2, false),
  ('10000003-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006003', 'En los primeros metros sobre el suelo la presión baja de forma aproximadamente lineal, 1 mb cada 9 m. ¿Cuánto disminuye aproximadamente al ascender 180 m?', '["Unos 2 hPa", "Unos 9 hPa", "Unos 20 hPa", "Unos 200 hPa"]'::jsonb, 2, 'Si baja 1 mb por cada 9 m, en 180 m baja 180/9 = 20 mb (= 20 hPa) (p. 13). La aproximación lineal solo vale en los primeros metros.', 'p. 13', 3, false),
  ('10000003-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006003', '¿Cómo afecta la temperatura del aire a su densidad y a su presión?', '["Cuanto mayor es la temperatura, mayor es la densidad y mayor la presión", "Cuanto mayor es la temperatura, menor es la densidad y menor la presión", "Cuanto mayor es la temperatura, menor es la densidad y mayor la presión", "La temperatura no afecta a la presión, solo a la humedad"]'::jsonb, 1, 'El aire más caliente es menos denso y su presión es menor; el aire frío es más denso y la presión aumenta (p. 13).', 'p. 13', 2, false),
  ('10000003-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006003', 'Según la fórmula del documento, ¿a cuántos grados centígrados equivalen 68 ºF?', '["20 ºC", "36 ºC", "15 ºC", "25 ºC"]'::jsonb, 0, 'La relación es C = 5/9 · (F − 32): 5/9 · (68 − 32) = 5/9 · 36 = 20 ºC (p. 16).', 'p. 16', 3, false),
  ('10000003-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006003', '¿A qué altitud media se encuentra la tropopausa en latitudes medias?', '["Hasta unos 8 km", "Hasta unos 18 km", "Hasta unos 50 km", "Hasta unos 12 km"]'::jsonb, 3, 'La tropopausa llega a ~8 km en latitudes altas, ~12 km en latitudes medias y ~18 km en latitudes bajas (p. 18).', 'p. 18', 1, false),
  ('10000003-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006003', '¿Qué tiempo se asocia normalmente a una atmósfera estable?', '["Nubes muy desarrolladas, chubascos y turbulencia, con buena visibilidad fuera de ellas", "Tormentas frecuentes y fuertes corrientes verticales", "Cumulonimbos aislados con buena visibilidad en toda la capa", "Cielo despejado o nubes estratiformes, con posibles nieblas en capas bajas y humo que reduce la visibilidad"]'::jsonb, 3, 'El aire estable da cielo despejado o estratiformes y, con humedad, nieblas; el humo no se eleva y baja la visibilidad. El aire inestable da nubes desarrolladas, chubascos y turbulencia (p. 21).', 'p. 21', 2, false),
  ('10000003-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006003', '¿Cuáles son los valores de la atmósfera estándar (ISA) a nivel del mar?', '["15 ºC, 1013,25 hPa y 1,2250 kg/m³", "0 ºC, 1013,25 hPa y 1,2250 kg/m³", "15 ºC, 760 hPa y 1,0250 kg/m³", "15 ºC, 1000 hPa y 1,2250 kg/m³"]'::jsonb, 0, 'La ISA tiene a nivel del mar 15 ºC (288,15 K), 1013,25 hPa (760 mm Hg) y 1,2250 kg/m³ (p. 21).', 'p. 21', 1, false),
  ('10000003-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006003', 'En la atmósfera ISA, con un gradiente de 2 ºC por cada 1.000 ft y 15 ºC al nivel del mar, ¿qué temperatura corresponde a 6.000 ft (dentro de la troposfera)?', '["3 ºC", "9 ºC", "-3 ºC", "12 ºC"]'::jsonb, 0, 'Con 15 ºC en superficie y un descenso de 2 ºC por cada 1.000 ft, a 6.000 ft hay 15 − 12 = 3 ºC (p. 22).', 'p. 22', 2, false),
  ('10000003-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006003', 'Con el altímetro calado en QNH y la aeronave en tierra, ¿qué indica el altímetro?', '["Cero, porque indica la altura sobre el aeródromo", "1013,25 hPa, la presión estándar de referencia", "La elevación del aeródromo, porque indica altitud sobre el nivel medio del mar", "El nivel de vuelo del aeródromo"]'::jsonb, 2, 'Con QNH el altímetro indica altitud sobre el MSL, así que en tierra marca la altitud (elevación) del aeródromo. Con QFE marcaría cero (p. 25).', 'p. 25', 2, false),
  ('10000003-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006003', '¿Qué reglaje se usa en ruta para que todas las aeronaves vuelen en niveles de vuelo con la misma referencia?', '["QNH, la presión del aeródromo reducida al nivel del mar", "QFE, la presión medida en el aeródromo", "QNE, que es la presión estándar de 1013,25 hPa", "El de la estación meteorológica más cercana, actualizado continuamente"]'::jsonb, 2, 'Los reglamentos establecen que todos los aviones vuelen en ruta con la misma presión de referencia, QNE (1013,25 hPa), y así vuelan en niveles de vuelo (p. 25).', 'p. 25', 1, false),
  ('10000003-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006003', '¿Cuál es la altitud de transición en la TMA de Madrid, según el documento?', '["6.000 ft", "7.000 ft", "13.000 ft", "18.000 ft"]'::jsonb, 2, 'En España hay tres valores: TMA de Madrid, 13.000 ft; CTA de Granada, 7.000 ft; resto, 6.000 ft (p. 26).', 'p. 26', 2, false),
  ('10000003-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006003', '¿Qué espesor tiene la capa de transición?', '["Fijo, de 500 ft", "Variable, pero siempre menor de 1.000 ft", "Variable, pero siempre mayor o igual que 1.000 ft", "Fijo, de 2.000 ft en todos los aeropuertos"]'::jsonb, 2, 'La capa de transición está entre el nivel y la altitud de transición; su espesor es variable y siempre mayor o igual que 1.000 ft (p. 26).', 'p. 26', 2, false),
  ('10000003-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006003', '¿Qué porcentaje de la radiación solar es absorbido por la corteza terrestre (tierra y océanos)?', '["Un 20 % aproximadamente", "Un 36 % aproximadamente", "Un 4 % aproximadamente", "Solo un 40 % aproximadamente"]'::jsonb, 3, 'De la radiación solar, ~36 % lo absorben o reflejan las nubes, ~20 % lo absorben los gases, ~4 % lo refleja la superficie y solo ~40 % lo absorbe la corteza (p. 27).', 'p. 27', 3, false),
  ('10000003-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006003', '¿Qué proceso de transmisión de calor origina frecuentemente los movimientos verticales de las masas de aire?', '["La advección", "La conducción", "La radiación terrestre", "La convección"]'::jsonb, 3, 'La convección transporta calor por un fluido y origina los movimientos verticales; la advección es el movimiento horizontal de masas de aire (p. 30).', 'p. 30', 2, false),
  ('10000003-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006003', 'En el modelo realista de circulación general con tres células, ¿qué célula se extiende entre el ecuador y unos 30º de latitud?', '["La célula de Hadley", "La célula de Ferrel", "La célula Polar", "La célula de Coriolis"]'::jsonb, 0, 'Hadley va del ecuador a ~30º, Ferrel de ~30º a ~60º y la Polar de ~60º al polo (p. 32).', 'p. 32', 1, false),
  ('10000003-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006003', '¿Hacia dónde desvía la fuerza de Coriolis los objetos en movimiento en el hemisferio norte?', '["Hacia la izquierda", "Hacia la derecha", "Hacia el ecuador", "Hacia el polo"]'::jsonb, 1, 'La fuerza de Coriolis desvía hacia la derecha en el hemisferio norte y hacia la izquierda en el sur (p. 33).', 'p. 33', 1, false),
  ('10000003-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006003', '¿Cuál de estas características describe correctamente la corriente en chorro?', '["Es un flujo fuerte y estrecho en la alta troposfera, que circula de oeste a este alrededor del planeta", "Es un viento débil en superficie que sopla de este a oeste", "Es una corriente que circula siempre sin ondulaciones por la mesosfera", "Es un viento local que sopla del mar a tierra durante el día"]'::jsonb, 0, 'La corriente en chorro circula en altura, a gran velocidad, alrededor del planeta y de oeste a este, con ondulaciones (p. 35).', 'p. 35', 2, false),
  ('10000003-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006003', '¿Cómo es normalmente el tiempo asociado a un anticiclón?', '["Inestable, con vientos fuertes en el centro y lluvias intensas", "Con nubes de desarrollo vertical y tormentas frecuentes", "Con tornados y líneas de turbonada habituales", "Estable, con vientos flojos en superficie y cielo despejado, y con posibles nieblas en invierno"]'::jsonb, 3, 'Los anticiclones suelen traer estabilidad, viento flojo y cielo despejado, y facilitan las nieblas invernales con baja visibilidad en aeródromos (p. 37).', 'p. 37', 1, false),
  ('10000003-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006003', '¿Qué describe un frente frío?', '["Una masa de aire caliente que desplaza a una fría y asciende sobre ella", "Dos masas de aire que se encuentran sin desplazarse", "Una masa de aire frío que desplaza a una caliente avanzando como una cuña y obligándola a ascender", "Un frente frío que alcanza a uno cálido y eleva el sector cálido"]'::jsonb, 2, 'En el frente frío el aire frío empuja al caliente como una cuña y lo fuerza a ascender, con nubes de desarrollo vertical y precipitaciones (p. 40).', 'p. 40', 1, false),
  ('10000003-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006003', '¿Qué es una DANA, antiguamente conocida como gota fría?', '["Una depresión tropical que se forma sobre mares a más de 27 ºC", "Un embolsamiento de aire frío en altura que se separa de la circulación del oeste, con un diámetro habitual de 200 km o más", "Un anticiclón cálido de origen dinámico con subsidencia", "Una borrasca asociada al frente polar con trayectoria muy predecible"]'::jsonb, 1, 'La DANA se forma al romperse una ondulación de gran amplitud de la circulación del oeste; su trayectoria es difícil de predecir y suele dar intensas precipitaciones (p. 38).', 'p. 38', 2, false),
  ('10000003-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006003', '¿Qué tres condiciones deben darse para que se formen las nubes?', '["Alta temperatura, baja humedad relativa y viento fuerte", "Alta humedad relativa, un mecanismo que lleve el aire a la saturación (como el enfriamiento) y núcleos de condensación", "Aire estable, cielo despejado y núcleos de condensación", "Alta presión, aire seco y un mecanismo de calentamiento"]'::jsonb, 1, 'Hace falta humedad relativa alta, un mecanismo que sature el aire (sobre todo el enfriamiento) y núcleos de condensación (p. 41).', 'p. 41', 2, false),
  ('10000003-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006003', 'En un mensaje aeronáutico, ¿qué cantidad de cielo cubierto indica la abreviatura BKN?', '["De 1 a 2 octas", "De 3 a 4 octas", "De 5 a 7 octas", "8 octas (cielo cubierto)"]'::jsonb, 2, 'FEW es 1-2 octas, SCT 3-4, BKN 5-7 y OVC cielo cubierto (p. 46).', 'p. 46', 1, false),
  ('10000003-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006003', '¿Qué se denomina techo de nubes?', '["La altura de la cima del cumulonimbo más alto observado", "La altura sobre el suelo de la base de la capa más baja que cubre más de la mitad del cielo (BKN/OVC) y está por debajo de 20.000 ft", "La altura de la base de cualquier capa de nubes, con independencia de la cantidad de cielo que cubra", "La altura de la base de la capa más baja que cubre al menos 1 octa, por debajo de 5.000 ft"]'::jsonb, 1, 'El techo es la base de la capa más baja con BKN/OVC situada a menos de 20.000 ft (6.000 m) sobre el suelo (p. 47).', 'p. 47', 2, false),
  ('10000003-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006003', '¿A partir de qué visibilidad se debe cifrar el alcance visual en pista (RVR)?', '["Cuando la visibilidad es inferior a 10 km", "Cuando la visibilidad es inferior a 1.500 m", "Cuando la visibilidad es inferior a 1.000 m", "Cuando la visibilidad es superior a 1.500 m"]'::jsonb, 1, 'Cuando la visibilidad baja de 1.500 m se cifra el RVR, promedio de los 10 minutos anteriores a la observación (p. 54).', 'p. 54', 2, false),
  ('10000003-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006003', '¿Cómo se expresa la dirección del viento?', '["Por su procedencia, en grados desde el norte geográfico medidos en sentido horario", "Por su destino, en grados desde el norte magnético medidos en sentido antihorario", "Por su procedencia, en nudos desde el norte geográfico", "Por su destino, en grados desde el norte geográfico en sentido horario"]'::jsonb, 0, 'La dirección se da por la procedencia del viento, en grados sexagesimales desde el norte verdadero (geográfico), en sentido de las agujas del reloj (p. 51).', 'p. 51', 2, false),
  ('10000003-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006003', '¿Por qué sopla la brisa de mar durante el día?', '["Porque el mar se calienta más que la tierra y el aire se desplaza de tierra a mar", "Porque la tierra se calienta más que el mar, baja la presión en tierra y el aire se desplaza del mar a tierra", "Porque de día la presión sobre el mar es menor que sobre tierra", "Porque la fuerza de Coriolis desvía el aire hacia la costa"]'::jsonb, 1, 'La diferencia de calor específico hace que de día la tierra se caliente más, el aire se dilate y la presión en tierra sea menor, de modo que el viento va del mar a tierra (pp. 51-52).', 'pp. 51-52', 2, false),
  ('10000003-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006003', '¿Qué caracteriza al efecto Foehn?', '["En el lado de sotavento el aire es más cálido y seco que a la misma altura en el lado de barlovento", "En el lado de sotavento el aire es más frío y húmedo que en barlovento", "Es un viento que sopla del mar a tierra durante el día", "Es un descenso de temperatura con la altura en la troposfera"]'::jsonb, 0, 'El aire asciende por barlovento, condensa y pierde humedad, y al descender por sotavento se calienta por compresión adiabática, quedando más cálido y seco (pp. 52-53).', 'pp. 52-53', 2, false),
  ('10000003-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006003', '¿Cómo define el documento la niebla?', '["Una reducción de la visibilidad por encima de 1.000 m con humedad relativa superior al 70 %", "Una capa de nubes bajas que cubre más de la mitad del cielo", "Una nube de desarrollo vertical con base por debajo de 300 m", "Una nube estratiforme en contacto con el suelo o a muy poca altura, que reduce la visibilidad a menos de 1.000 m"]'::jsonb, 3, 'La niebla restringe la visibilidad a menos de 1.000 m; si la reducción es mayor de 1.000 m con HR superior al 70 %, se trata de neblina (p. 55).', 'p. 55', 2, false),
  ('10000003-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006003', '¿En qué condiciones es más favorable el hielo claro (clear icing)?', '["Con aire entre -10 y -20 ºC, de forma habitual", "Con aire por encima de 10 ºC y mucha humedad", "Con aire entre 0 y -10 ºC y el avión ligeramente por debajo de 0 ºC", "Con aire entre 0 y -40 ºC y el avión muy por debajo de -20 ºC"]'::jsonb, 2, 'El hielo claro, liso, adherente y muy peligroso, se favorece con aire entre 0 y -10 ºC y la aeronave ligeramente bajo 0 ºC (p. 58). El hielo granulado cubre de 0 a -40 ºC.', 'p. 58', 3, false),
  ('10000003-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006003', '¿Qué medida requiere un engelamiento fuerte, en el que el crecimiento del hielo supera a los equipos de a bordo?', '["Reducir la velocidad y mantener la altitud", "Esperar a que los equipos de a bordo lo resuelvan", "Un cambio de altitud inmediato", "Aumentar el ángulo de ataque hasta que el hielo se desprenda"]'::jsonb, 2, 'En el engelamiento fuerte los equipos de a bordo no pueden resolverlo solos y se requiere un cambio de altitud inmediato (p. 57).', 'p. 57', 2, false),
  ('10000003-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006003', '¿Qué condiciones favorecen la aparición de ondas de montaña?', '["Viento en la cima superior a 15 kt y creciente con la altura, dirección casi perpendicular al eje (menos de 30º) y una capa estable sobre la cima", "Viento flojo en la cima, dirección paralela al eje de la montaña y atmósfera inestable", "Viento inferior a 15 kt y variable en dirección, con una capa inestable sobre la cima", "Viento en la cima superior a 15 kt pero paralelo al eje y sin capa estable"]'::jsonb, 0, 'Hacen falta viento >15 kt que aumente con la altura, dirección constante a <30º de la perpendicular al eje y capa estable sobre la cima (p. 62).', 'p. 62', 3, false),
  ('10000003-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006003', 'Tras el despegue de un avión pesado, ¿qué debe tener presente el controlador sobre la turbulencia de estela?', '["La estela se disipa de inmediato y no condiciona el siguiente despegue", "Solo afecta a las aeronaves que vuelan en altitud, no en pista", "Solo es peligrosa con viento en cola superior a 15 kt", "El aire sobre la pista queda revuelto y puede ser peligroso autorizar enseguida otro despegue"]'::jsonb, 3, 'La turbulencia de estela es especialmente crítica en el despegue; tras un avión pesado el aire sobre la pista queda revuelto (p. 61).', 'p. 61', 1, false),
  ('10000003-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006003', '¿En qué fase de una tormenta alcanzan su máxima intensidad las corrientes ascendentes y se forma el frente de racha?', '["En la fase de formación", "En la fase de madurez", "En la fase de disipación", "En ninguna fase, porque las ascendentes y las descendentes no coexisten"]'::jsonb, 1, 'En la madurez cae la precipitación, aparecen descendentes que forman el frente de racha y las ascendentes alcanzan su máxima intensidad (p. 66).', 'p. 66', 2, false),
  ('10000003-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006003', '¿Cuál es la duración habitual de un microrreventón desde que llega al suelo?', '["Entre 2 y 3 horas", "Entre 1 y 5 minutos, y nunca más de 15", "Entre 30 y 60 minutos", "Unos 25 minutos de media, y nunca menos de 10"]'::jsonb, 1, 'El microrreventón es de escala muy pequeña: hasta 5 km y entre 1 y 5 minutos, nunca más de 15 (p. 68).', 'p. 68', 2, false),
  ('10000003-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006003', 'En la escala de ciclones tropicales del documento, ¿con qué denominación corresponden vientos máximos en superficie de 34 a 63 kt?', '["Tormenta tropical", "Depresión tropical", "Huracán, ciclón o tifón", "Perturbación tropical"]'::jsonb, 0, 'Depresión tropical: hasta 33 kt; tormenta tropical: 34 a 63 kt; huracán, ciclón o tifón: más de 64 kt (p. 70).', 'p. 70', 2, false)
on conflict (id) do nothing;
