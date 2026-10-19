-- Contenido propio del Tema 1 (Instituciones y legislación aeronáutica).
-- Redactado a partir de docs/fuentes/enaire/t1.pdf (ENAIRE, nov. 2025). reviewed=false: pendiente de revisión humana.
-- topic_id fijo del tema 1 (migración 20261019000002_roadmap.sql).

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000000-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006001', 1, 'OACI: origen, misión y estructura', '**Qué es.** La OACI (ICAO) es un **organismo especializado de la ONU**, creado por los Estados en **1944** para administrar el **Convenio de Chicago** y velar por su aplicación. Trabaja con los **193 Estados** miembros y con la industria para consensuar las **SARPs** (normas y métodos recomendados). Es el mayor órgano de regulación mundial de la aviación civil.

**La Conferencia de Chicago (1944)**
- La convocó EE. UU. Se celebró del **1 de noviembre al 7 de diciembre de 1944**, con **54 países**. Al cierre, **52** habían firmado el Convenio.
- El Convenio:
  - sienta las bases de la navegación aérea mundial en tiempo de paz;
  - pide que la aviación se desarrolle "de manera segura y ordenada";
  - crea la OACI.
- Tiene dos partes: la navegación internacional y el funcionamiento de la OACI.
- Mientras llegaban las ratificaciones funcionó una OACI provisional, la **PICAO**. El **4 de abril de 1947** pasó a llamarse oficialmente OACI. Su primera Asamblea se celebró en Montreal en mayo de 1947.

**Misión.** Armonizar y normalizar la operación de los servicios aéreos internacionales, desarrollar los principios y técnicas de la navegación aérea y fomentar el transporte aéreo seguro, regular y económico.

**Objetivos estratégicos:** seguridad operacional, capacidad y eficiencia, seguridad y facilitación, desarrollo económico y protección del medio ambiente. Además, prevé que la capacidad del transporte aéreo mundial se duplique hacia **2030**.

**Estructura.** Sede permanente en **Montreal (Canadá)**.
| Órgano | Claves |
|---|---|
| **Asamblea** | Órgano soberano con todos los Estados. Se reúne **al menos cada 3 años**, convocada por el Consejo. Cada Estado tiene un voto. Aprueba el programa de trabajo y el presupuesto del trienio. |
| **Consejo** | Órgano ejecutivo permanente: **36 Estados** elegidos por la Asamblea por **3 años**. Convoca la Asamblea, **adopta las SARPs y las incorpora a los Anexos**, arbitra entre Estados y puede investigar obstáculos a la navegación. **España forma parte de él.** |
| **Secretaría General** | Dirige al personal y hace de secretaría del Consejo. Tiene **5 oficinas**: navegación aérea, transporte aéreo, desarrollo de capacidades, asuntos jurídicos y relaciones exteriores, y administración. |

**Regiones.** Hay **9 regiones** de navegación aérea dirigidas desde **7 oficinas**. Por ejemplo, EUR y NAT dependen de **París**. Las demás oficinas están en Bangkok, Nairobi, Dakar, El Cairo, Ciudad de México y Lima.', 'pp. 5-8', false),
  ('10000000-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006001', 2, 'OACI: Anexos, Documentos y Circulares', 'La documentación de la OACI tiene tres niveles: **Anexos → Documentos → Circulares**.

**1. Anexos (19).** Fijan niveles mínimos y uniformidad mediante SARPs.
| Nº | Materia | Nº | Materia |
|---|---|---|---|
| 1 | Licencias al personal | 11 | **Servicios de tránsito aéreo** |
| 2 | **Reglamento del aire** | 12 | Búsqueda y salvamento |
| 3 | Servicio meteorológico | 13 | Investigación de accidentes e incidentes |
| 4 | Cartas aeronáuticas | 14 | Aeródromos |
| 5 | Unidades de medida | 15 | Servicios de información aeronáutica |
| 6 | Operación de aeronaves | 16 | Protección del medio ambiente |
| 7 | Marcas de nacionalidad y matrícula | 17 | Seguridad (contra actos de interferencia ilícita) |
| 8 | Aeronavegabilidad | 18 | Mercancías peligrosas |
| 9 | Facilitación | 19 | **Gestión de la seguridad operacional** |
| 10 | Telecomunicaciones aeronáuticas | | |

**2. Documentos.** Desarrollan los Anexos en detalle, y un Anexo puede tener varios. Por ejemplo, el Anexo 2 se desarrolla en el Doc 4444 y el Doc 7030 (procedimientos suplementarios regionales), y el Anexo 4 en el Doc 8697.
- **Doc 9750 – GANP** (Plan mundial de navegación aérea): marco 2016-2030 para los planes regionales y estatales. Busca más capacidad y eficiencia sin reducir la seguridad.
- **Doc 4444 – PANS-ATM**: completa las SARPs de los **Anexos 2 y 11**. Detalla los procedimientos que aplican las dependencias ATS.
- **Doc 8168 – PANS-OPS**:
  - Vol. I: procedimientos de vuelo para tripulaciones.
  - Vol. II: construcción de procedimientos visuales y por instrumentos (franqueamiento de obstáculos).
- **Doc 8126**: manual de los servicios AIS.

**3. Circulares.** Son **textos de orientación**. Por ejemplo, la Circ. 207 (pistas paralelas, SOIR), la 247 (factores humanos) y la 257 (economía de la navegación por satélite).', 'pp. 8-10', false),
  ('10000000-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006001', 3, 'EUROCONTROL', '**Qué es.** Es la Organización Europea para la Seguridad de la Navegación Aérea, **intergubernamental, civil y militar**, creada en **1960**.
- Tiene **42 Estados miembros**, más 2 del Acuerdo Global (Israel y Marruecos).
- Su **sede está en Bruselas**.
- **España es miembro desde 1997.** En 2002 se firmó la adhesión de la UE al Convenio Revisado, que el Parlamento español ratificó en 2016.

**Misión.** Armonizar e integrar los servicios de navegación aérea en Europa hacia un **sistema ATM uniforme** para usuarios civiles y militares.

**Objetivos.** Liderar el diseño de la futura red ATM, gestionar funciones paneuropeas como el **ATFCM** centralizado, apoyar la regulación ATM, prestar control regional cuando lo pidan los Estados y asegurar el éxito de **SESAR**.

**Estructura**
- **Gobierno**
  - **Comisión Permanente**: el **máximo órgano de decisión**, a nivel ministerial. Fija la política general, aprueba el presupuesto y el programa a 5 años, y nombra al Director General.
  - **Consejo Provisional**: formado por los Directores Generales de Aviación Civil. Aplica la política y supervisa a la Agencia.
- **Ejecutiva: la Agencia.** La dirige el Director General. Incluye, entre otras, el Network Manager Directorate, la Central Route Charges Office y el **MUAC**.
- **Consultiva**: varios órganos, entre ellos la PRC (evaluación de resultados), la SRC (regulación de seguridad), el **ANSB**, el **AAB** y el CMSC (civil-militar).

**Normativa ESARR.** Son los requisitos de seguridad que adopta el Consejo Provisional. Los Estados miembros deben incorporarlos. Se han aprobado **seis**:
1. supervisión de la seguridad;
2. notificación y evaluación de sucesos;
3. SMS de los proveedores;
4. evaluación y mitigación de riesgos;
5. **personal ATM**;
6. software.

**Servicios destacados**
- **EAD**: base de datos AIS europea. Es la fuente única y fiable de **NOTAM y datos AIP** y permite generar los **PIB** (boletines de información previa al vuelo).
- **MUAC** (Maastricht): da servicio en el **espacio aéreo superior** de Bélgica, Luxemburgo, Países Bajos y el noroeste de Alemania.

**Participación de España y ENAIRE.** España está en la Comisión Permanente y en el Consejo Provisional, y participa en el Comité de Coordinación del Consejo Provisional. ENAIRE participa en el **ANSB** y en el **AAB**, como proveedor de servicios de navegación aérea.', 'pp. 11-13', false),
  ('10000000-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006001', 4, 'Unión Europea: instituciones y normativa aérea', '**Datos básicos.** La UE tiene **27 Estados**. **España es miembro desde el 1 de enero de 1986.** Su misión es la convergencia política y económica mediante la libre circulación de mercancías, capitales, personas y servicios.

**Objetivos en transporte aéreo**
- Económicos: libre acceso al mercado y libertad de tarifas.
- Redes transeuropeas de transporte.
- Seguridad operacional y frente a actos ilícitos, además de medio ambiente y derechos de los pasajeros.
- I+D frente a la saturación de infraestructuras, lo que lleva a **unificar el cielo europeo**.

**Instituciones principales (quién hace qué)**
| Institución | Papel |
|---|---|
| Parlamento Europeo | Elegido por sufragio directo, con **720 eurodiputados**. Tiene funciones legislativas, de supervisión y presupuestarias. |
| Consejo Europeo | Lo forman los jefes de Estado o de Gobierno. Marca la orientación y las prioridades políticas. |
| **Consejo de la UE** | Lo forman los **ministros**, según el tema. Representa a los Gobiernos, adopta legislación y coordina políticas. |
| Comisión Europea | Un comisario por país. Propone legislación, vigila su cumplimiento y aplica políticas y presupuesto. |
| TJUE | Garantiza que el Derecho de la UE se interprete y aplique de forma uniforme. |
| BCE / Tribunal de Cuentas | Gestionan el euro y controlan los fondos, respectivamente. |
| CESE y CDR | Órganos consultivos: el CESE representa a los agentes sociales y el CDR a los entes regionales y locales. |

Otros órganos de la UE son el SEAE, el BEI, el Defensor del Pueblo Europeo y el SEPD.

**Normativa aérea de la UE por campos**
- Mercado interior.
- Servicios y licencias, que incluye las licencias de controlador.
- Derechos de los pasajeros.
- Seguridad aérea, que incluye EASA, accidentes y notificación de sucesos.
- Dimensión internacional y protección de la aviación.
- **Cielo Único**:
  - **SES I**: marco, prestación de servicios, espacio aéreo e interoperabilidad.
  - **SES II**: evaluación del rendimiento, tarificación común, **ampliación de EASA** a aeródromos, ATC y ANS, creación del **Gestor de Red** y de los **FAB**, y participación militar.', 'pp. 14-16', false),
  ('10000000-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006001', 5, 'Cielo Único Europeo, SESAR, NMOC y Gestor de Red', '**Origen del SES**
- En **1999** la Comisión propuso el Cielo Único Europeo para reformar la ATM europea.
- **Objetivos iniciales:**
  - reestructurar el espacio aéreo según los flujos de tráfico y no según las fronteras;
  - generar capacidad;
  - ganar eficiencia.
- En **abril de 2004** entraron en vigor los **cuatro reglamentos** pilares. Hoy los sustituyen el **Reglamento (UE) 2018/1139** (normas comunes y EASA) y el **Reglamento (UE) 2024/2803** (realización del SES).

**Logros principales**
- **Marco institucional**: el Comité de Cielo Único (Estados), el Órgano Consultivo del Sector, el diálogo social y EUROCONTROL.
- **Separación entre prestación y supervisión**:
  - Cada Estado designa una **Autoridad Nacional de Supervisión (ANS)**. En España es **AESA**, para los servicios civiles salvo los meteorológicos.
  - Las ANS **certifican** a los proveedores.
- **Regulador comunitario**: lo asume la **Comisión Europea**.
- **Gestor de Red Europeo (NM)**.
- **Evaluación del rendimiento** en seguridad, medio ambiente, capacidad y rentabilidad.
- **Espacio aéreo**:
  - se trata como un continuo, empezando por el espacio superior;
  - uso flexible del espacio aéreo;
  - **FAB**: bloques de espacio aéreo basados en exigencias operativas, **independientes de las fronteras nacionales**.
- **Tasas**: sistema común de tarificación transparente, con bases de costes notificadas y consulta a los usuarios.

**SESAR.** Es el **pilar tecnológico** del SES. Su hoja de ruta es el **Plan Maestro ATM Europeo**. Tiene dos fases en paralelo:
1. **I+D**: valida tecnologías hasta convertirlas en "Soluciones SESAR".
2. **Despliegue**: empezó formalmente en **2014**, con el **Proyecto Común Piloto** publicado por la Comisión.

**NMOC.** Está operativo desde **marzo de 1996** y centraliza el control de afluencia en Europa.
- Equilibra demanda y capacidad.
- Centraliza el **ATFCM** en el área CEAC.
- Coordina con los operadores y con las **FMP**, que enlazan la unidad central con los ACC y aeródromos y aportan la información local.

**Gestor de Red (NM).** Lo creó la **Comisión Europea en el SES II** para mejorar el rendimiento de la red ATM. Sus funciones:
- coordinación central de **radiofrecuencias** y de **códigos SSR**;
- diseño de la **red europea de rutas** y función central **ATFM**;
- gestión de crisis de la red y de los riesgos a nivel de red;
- Plan estratégico y Plan de Rendimiento de la Red, y apoyo al despliegue de SESAR;
- apoyo a los investigadores de accidentes y alertas a la Comisión sobre las compañías con prohibición de explotación.

**España.**
- La DGAC participa en el **Comité de Cielo Único**.
- ENAIRE es miembro de la **SESAR Deployment Alliance**, designada en diciembre de 2014 como Gestor de Despliegue de SESAR.', 'pp. 16-20', false),
  ('10000000-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006001', 6, 'EASA (Agencia de Seguridad Aérea de la UE)', '**Qué es.** Es la pieza central de la estrategia de seguridad aérea de la UE. Se creó en **2002** y hoy se rige por el **Reglamento (UE) 2018/1139**. Tiene personalidad jurídica propia y puede abrir sedes locales en los Estados si estos lo aceptan.

**Misión**
- Lograr los máximos niveles comunes de seguridad y de protección ambiental.
- Un proceso único de reglamentación y certificación.
- Mercado único en igualdad de condiciones.
- Cooperación internacional.

**Tareas principales**
- **Normativa**: redacta la legislación de seguridad y apoya técnicamente a la Comisión y a los Estados.
- **Inspecciones, formación y estandarización**, para que la norma se aplique igual en toda la UE.
- **Certificación de tipo** (aeronavegabilidad y compatibilidad ambiental) de aeronaves, motores y componentes.
- Certificación de productos y organizaciones de países terceros.
- Datos, análisis e investigación.
- Coordinación del programa **SAFA** (evaluación de la seguridad de aeronaves extranjeras), por encargo de la Comisión.

**Estructura**
- **Consejo de Administración**: el órgano directivo. Tiene un representante por Estado y uno de la Comisión, cada uno con su suplente. Los **mandatos son de 5 años renovables**.
- **Director ejecutivo**: es totalmente independiente y no recibe instrucciones de ningún Gobierno. El Parlamento o el Consejo pueden pedirle cuentas. Bajo él hay cuatro direcciones:
  - Estrategia y gestión de la seguridad, que incluye la cooperación con la OACI, la FAA y otras autoridades;
  - Certificación;
  - Normas de vuelo, que cubre mantenimiento, operaciones, tripulaciones, medicina, ATM/ANS y aeródromos;
  - Recursos y apoyo.
- **Salas de recursos**: resuelven recursos contra las decisiones de la Agencia, por ejemplo sobre certificaciones o tasas. La **Comisión decide cuántas hay**.

**Cómo elabora normas.** Produce reglamentos de ejecución, medios aceptables de cumplimiento, material guía y especificaciones de certificación. Los somete a consulta mediante tres documentos:
- **ToR**: términos de referencia;
- **NPA**: avisos de modificación propuesta;
- **CRD**: respuesta a comentarios.

Después, los proyectos pasan a la **Comisión Europea**. Si superan la revisión del Parlamento y del Consejo, se publican en el DOUE.', 'pp. 20-22', false),
  ('10000000-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006001', 7, 'Otras organizaciones internacionales', '| Siglas | Qué es | Datos clave |
|---|---|---|
| **EUROCAE** | Organización Europea para el Equipamiento de la Aviación Civil. Sin ánimo de lucro. | Se formó en **Lucerna (Suiza)**. Crea estándares de electrónica aeronáutica. Tiene más de 500 miembros. Sus normas son **voluntarias**. |
| **RTCA** | Comisión Radiotécnica para la Aeronáutica. Estadounidense y sin ánimo de lucro. | Tiene sede en **Washington D.C.** Hace recomendaciones **CNS/ATM**, que adoptan la **FAA** y empresas privadas. Tiene unas 400 organizaciones miembro. |
| **IATA** | Asociación Internacional del Transporte Aéreo. No gubernamental. | Se fundó en **La Habana**. Es el principal vehículo de cooperación entre aerolíneas. Agrupa a más de 350 aerolíneas, con el **80 %** del tráfico. |
| **CANSO** | Organización de proveedores de servicios de navegación aérea. | **Representa a los ANSP** de todo el mundo. Tiene miembros de pleno derecho (proveedores ANS) y miembros asociados. |
| **ACI** | Consejo Internacional de Aeropuertos. | Defiende una política aeroportuaria común. Agrupa 2.181 aeropuertos de 830 operadores en 170 países. |
| **ESA** | Agencia Espacial Europea. | Se estableció en **París**. Elabora y ejecuta el programa espacial europeo. Tiene 23 Estados miembros. |

**Truco para el examen:** IATA representa a las **aerolíneas**, ACI a los **aeropuertos** y CANSO a los **proveedores ANS**. EUROCAE (Europa) y RTCA (EE. UU.) elaboran estándares técnicos.', 'pp. 22-23', false),
  ('10000000-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006001', 8, 'Autoridad aeronáutica nacional: Ministerio, DGAC y CIAIAC', '**Máxima autoridad aeronáutica civil.** Es el **Ministerio de Transportes y Movilidad Sostenible**, que ordena, supervisa y controla la aviación civil.

**Desdoblamiento de la autoridad (RD 184/2008)**
| DGAC | AESA |
|---|---|
| Propuestas sectoriales y **política estratégica** | **Potestades inspectoras y sancionadoras** |
| Representación ante otras administraciones y ante la UE | Iniciativa normativa en seguridad aérea y protección del usuario, que eleva al Ministerio |
| **Adopción de circulares aeronáuticas** | Evaluación de riesgos de seguridad |

**DGAC (Dirección General de Aviación Civil).** Es el órgano del Ministerio que diseña la estrategia, dirige la política aeronáutica, coordina a los organismos adscritos y **ejerce de regulador** del sector aéreo.

Funciones clave de la DGAC:
- **Aprobar circulares aeronáuticas**, por iniciativa propia o a propuesta de AESA.
- **Presidir la CIDETRA**, que coordina los Ministerios de Defensa y Transportes.
- Ejercer la máxima representación del Departamento ante los organismos nacionales e internacionales.
- Preparar la normativa y formular propuestas de política estratégica.
- En materia de aeropuertos:
  - informar sobre la calificación de aeropuertos;
  - proponer autorizaciones de establecimiento, apertura y cierre;
  - emitir informes previos sobre aeródromos autonómicos;
  - informar los planes directores, con informe vinculante si afectan a competencias del Estado;
  - tramitar expropiaciones.
- **Negociar los convenios internacionales de transporte aéreo y asignar los derechos de tráfico.**
- Gestionar las subvenciones y **proponer obligaciones de servicio público**.
- Además, asume toda función que no esté atribuida a AESA.

**Estructura de la DGAC.** Tiene una Unidad de Apoyo, la **Subdirección General de Transporte Aéreo** y la **Subdirección General de Aeropuertos y Navegación Aérea**.

**CIAIAC (Comisión de Investigación de Accidentes e Incidentes de Aviación Civil)**
- Está adscrita a la **Subsecretaría** del Ministerio. Investiga los accidentes e incidentes que ocurren en territorio español.
- Su investigación es **exclusivamente técnica**. Busca **prevenir** y **no determina culpas ni responsabilidades**.
- El informe incluye los hechos, el análisis, las conclusiones y las **recomendaciones de seguridad**.', 'pp. 23-26', false),
  ('10000000-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006001', 9, 'AESA (Agencia Estatal de Seguridad Aérea)', '**Qué es.** Es el organismo del Estado que **vela por el cumplimiento de las normas de aviación civil** en España. Se encarga de la supervisión, inspección y ordenación del transporte aéreo, la navegación aérea y la seguridad aeroportuaria. Evalúa riesgos y tiene **potestad sancionadora**.

**Competencias (esquema)**
- **Licencias y registro**:
  - expide, renueva, suspende y revoca autorizaciones, licencias y certificados (operación de aeronaves, aeropuertos, servicios de navegación aérea, diseño, fabricación y mantenimiento);
  - reconoce títulos extranjeros;
  - **gestiona el Registro de matrícula de aeronaves**.
- **Inspección y sanción**:
  - inspección aeronáutica y acreditación de entidades colaboradoras;
  - gestión de riesgos de seguridad;
  - **potestad sancionadora**.
- **Normas**:
  - ejerce de **autoridad nacional de supervisión**;
  - aprueba previamente los programas de autoverificación de operadores, aeropuertos y proveedores de navegación aérea;
  - tiene la iniciativa normativa, que eleva al Ministerio.
- **Facilitación**: accesibilidad y tránsito fluido de personas y bienes.
- **Colaboración**:
  - con organismos nacionales e internacionales;
  - con la UE y EASA, para inspecciones en España;
  - asistencia técnica al Ministerio.

**Estructura: cuatro direcciones**
| Dirección | Se ocupa de |
|---|---|
| **Seguridad de Aeronaves (DSA)** | Operación, mantenimiento y certificación de aeronaves, permisos comerciales, **Registro de matrícula** y derechos de emisión. Integra la **Oficina de Seguridad en Vuelo (OSV)**. |
| **Gestión de la Seguridad y Personal de Vuelo** | Gestión de riesgos, personal de vuelo, escuelas, **medicina aeronáutica** y protección del usuario, incluida la asistencia a víctimas. |
| **Aeropuertos y Seguridad de la Aviación Civil** | Aeropuertos, **actos de interferencia ilícita**, facilitación y evaluación ambiental. |
| **Navegación Aérea** | Competencias en navegación aérea. |', 'pp. 26-27', false),
  ('10000000-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006001', 10, 'Aena S.M.E., S.A. y ENAIRE E.P.E.', '**Aena S.M.E., S.A.** Es una **sociedad mercantil estatal** que gestiona **46 aeropuertos y 2 helipuertos** de interés general en España. A través de Aena Internacional participa en otros **32 aeropuertos**, entre ellos **Luton**, del que tiene el 51 %.

**Cronología de Aena**
- **1991**: el RD 905/1991 constituye el ente público AENA (Aeropuertos Españoles y Navegación Aérea).
- **1997-1998**: primera concesión en el extranjero (Barranquilla, 1997) y nacimiento de AENA Internacional (1998).
- **2000-2010**: Plan Barajas, Plan Barcelona y Plan Málaga, y nuevos aeropuertos.
- **RDL 13/2010**: liberaliza los servicios aeroportuarios y crea **Aena Aeropuertos, S.A.**, con un **49 % de capital privado**. La entidad pública **conserva solo la navegación aérea**.
- **2014**: pasa a llamarse Aena, S.A. y se crea el **DORA** (Documento de Regulación Aeroportuaria).
- **2015**: desde el **11 de febrero cotiza en Bolsa**.
- **2017**: añade "S.M.E.".
- **2024**: cierra el año con 2,5 millones de operaciones y 309,3 millones de pasajeros.

Aena es el primer operador aeroportuario del mundo por número de pasajeros.

**Funciones de Aena**
- explotar los aeropuertos y helipuertos, y las zonas civiles de bases aéreas y aeropuertos de uso conjunto;
- invertir en infraestructuras, incluidos los bienes para los servicios ATS de aeródromo;
- planificar las servidumbres;
- seguridad en sus instalaciones;
- formación.

**ENAIRE E.P.E.** Es una entidad pública empresarial adscrita al Ministerio de Transportes. Es el **gestor del control del tránsito aéreo**, de la información aeronáutica y de las redes **CNS**.
- Según la **Ley 9/2010**, es la empresa designada por el Estado para prestar los ATS en las fases de **ruta y aproximación**.
- **Espacio controlado: 2,19 millones de km²**. Comprende la península (salvo Portugal), Canarias, Baleares y parte del Atlántico norte, del Mediterráneo occidental y del Sáhara Occidental.
- **Organización**:
  - **5 direcciones regionales**: Centro-Norte, Este, Canaria, Sur y Baleares, con sede en los ACC de Madrid, Barcelona, Canarias, Sevilla y Palma;
  - **2 TACC**: **Santiago y Valencia**;
  - **21 torres**.
- **2024**: más de 2,5 millones de vuelos y un 96,7 % de eficiencia en ruta. Es uno de los **cuatro mayores** gestores de Europa.

**Funciones de ENAIRE**
- planificar, dirigir y explotar el tráfico aéreo, las telecomunicaciones, el AIS y las infraestructuras de navegación;
- elaborar y aprobar proyectos e invertir;
- proponer nuevas infraestructuras y cambios en el espacio aéreo;
- formación aeronáutica sujeta a licencia.', 'pp. 27-30', false),
  ('10000000-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006001', 11, 'Asociaciones, comisiones y subcomité', '**Asociaciones del sector**
| Siglas | Qué es | Claves |
|---|---|---|
| **AECA** | Asociación Española de Compañías Aéreas | Fundada en **1988**. Hace de nexo entre el sector privado y las administraciones. Agrupa a más de 30 compañías. |
| **ALA** | Asociación de Líneas Aéreas | Registrada hace más de 50 años. Agrupa a la gran mayoría de las aerolíneas regulares que operan en España. Defiende y asesora a sus socios. |
| **ACETA** | Asociación de Compañías Españolas de Transporte Aéreo | Fundada en **2004**, sin ánimo de lucro. Sus miembros son Air Europa, Air Nostrum, Binter, Gestair, Iberia, Naysa, Orbest y Vueling. |
| **AOC** | Asociaciones de Operadores de Compañías | Agrupan a las aerolíneas de cada aeropuerto y, a su vez, forman la AOC de España. Coordinan con Aena. |

**Comisiones y subcomité**
- **CIDETRA** (Comisión Interministerial entre Defensa y Transportes):
  - Antecedente: en 1977 las competencias civiles pasaron de Defensa al nuevo Ministerio de Transportes, Turismo y Comunicaciones.
  - Se creó en **1979** (Orden de 8 de noviembre) para **coordinar la aeronáutica civil y la militar**.
  - Ha cambiado de nombre según el Ministerio: CIDEFO, CIDETMA y, desde 2024, CIDETRA.
  - Estudia e informa sobre: planificación de aeropuertos y aeródromos, servidumbres, cartas y aproximaciones por instrumentos, estructura del espacio aéreo, red de ayudas y telecomunicaciones, reglamentación de la circulación aérea y búsqueda y salvamento.
- **CIPAI** (Comisión Interministerial de Política Aeroespacial Internacional):
  - Es un órgano colegiado **adscrito al Ministerio de Asuntos Exteriores**, creado en **1946** y actualizado por el RD 1342/2003.
  - Asesora y coordina en política aérea y espacial internacional y en la negociación de tratados.
- **SCA** (Subcomité de Circulación Aérea):
  - Procede del **Comité de Coordinación Operativa (1986)**, que se dividió en cinco subcomités.
  - Coordina los requisitos operacionales de los usuarios.
  - Participan **ENAIRE, la DGAC, la AEMET y las compañías aéreas españolas**.', 'pp. 30-31', false),
  ('10000000-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006001', 12, 'Derecho aeronáutico y sus fuentes', '**Concepto.** El "Derecho Aeronáutico" es el conjunto de normas que regulan la navegación aérea y sus infraestructuras, sea con fines civiles o militares. Toca varias ramas del Derecho:
- **Administrativo**: aeródromos, licencias y sanciones.
- **Internacional público**: tratados y organizaciones.
- **Mercantil**: el contrato de transporte.
- **Laboral**: las condiciones de las tripulaciones.
- **Penal**: los delitos aeronáuticos.

**Tres fuentes:** Derecho internacional, Derecho comunitario y Derecho nacional.

**1. Derecho internacional**
- **Acuerdos multilaterales.** En España solo obligan si están **ratificados y publicados en el BOE**. Los principales:
  - **Chicago (7-12-1944)**: base del derecho aeronáutico; crea la OACI.
  - **Montreal 1999**: reglas del transporte aéreo internacional. **Sustituye a Varsovia (1929)** y sus protocolos.
  - **Tokio 1963**: infracciones y actos cometidos **a bordo**.
  - **La Haya**: apoderamiento ilícito de aeronaves.
  - **Montreal 1971**: actos ilícitos contra la seguridad de la aviación.
  - **Roma 1933**: daños a terceros.
  - **Cielos abiertos (1992)**.
  - **Bruselas 1960**: crea EUROCONTROL.
- **Convenios bilaterales.** Los firma un Estado con otro país y regulan servicios extracomunitarios: rutas, capacidad, compañías designadas y tarifas. El **Reglamento 847/2004** permite a la UE negociar en las materias transferidas.

**Libertades del aire** (Estado A = el de la aerolínea)
| Nº | Nombre | Qué permite |
|---|---|---|
| 1ª | Sobrevuelo | Volar sobre B sin aterrizar *(técnica)* |
| 2ª | Escala técnica | Aterrizar en B sin fines comerciales: combustible, mantenimiento, emergencias *(técnica)* |
| 3ª | Transporte al exterior | Desembarcar en B tráfico tomado en A |
| 4ª | Transporte al interior | Embarcar en B tráfico con destino a A |
| 5ª | Externo consecutivo | Llevar tráfico de B a C, como continuación de un vuelo A-B |
| 6ª | Externo-interno | Llevar tráfico entre B y C haciendo escala en A |
| 7ª | Externo | Llevar tráfico entre B y C, enteramente fuera de A |
| 8ª | Cabotaje consecutivo | Hacer cabotaje en B, partiendo de A o terminando en A |
| 9ª | Cabotaje autónomo | Hacer cabotaje dentro de B |

**2. Derecho comunitario.** Arranca con el Tratado de la CEE de 1957. La liberalización del transporte aéreo se concretó a finales de los años 80.
| | Reglamento | Directiva | Decisión |
|---|---|---|---|
| A quién vincula | A todos los Estados | A los Estados destinatarios | Solo a sus destinatarios |
| Efecto | **Directo** desde su publicación en el DOUE | **Necesita transposición** | Directo |
| Ejemplos | 550/2004, 216/2008, 2015/340, 2017/373 | **2006/23/CE** (licencia comunitaria de controlador) | — |

**3. Derecho nacional** (de mayor a menor rango): **Leyes → Reales Decretos → Órdenes Ministeriales → Circulares Aeronáuticas → Resoluciones de la DGAC**.

Las **Circulares Aeronáuticas**:
- son disposiciones **secundarias** y de contenido técnico;
- las **aprueba la DGAC**;
- deben tener en cuenta las prescripciones de la **OACI**;
- son **obligatorias** para quienes forman personal, fabrican o mantienen aeronaves, gestionan aeropuertos o la navegación aérea, prestan servicios de navegación o realizan transporte y trabajos aéreos.', 'pp. 32-35', false),
  ('10000000-0000-4000-8001-000000000013', '00000000-0000-4000-8000-000000006001', 13, 'Normativa de la UE aplicable a ENAIRE', '**Marco del Cielo Único**
- **Reglamento 549/2004 ("Reglamento marco")**: marco armonizado para crear el SES.
- **Reglamento 2019/317**: evaluación del rendimiento y tarificación de los ANS y funciones de red.
- **Reglamento 2024/2803**: realización del Cielo Único Europeo.

**Prestación de servicios**
- **Reglamento 550/2004 ("Reglamento de prestación de servicios")**: requisitos comunes para prestar ANS.
- **Reglamento 176/2011**: información previa para crear o modificar un **FAB**.
- **Reglamento 409/2013**: proyectos comunes y su gobernanza.
- **Reglamento 2021/116 (Proyecto Común Uno, PC1)**. Sus funcionalidades:
  - AF1: AMAN/DMAN;
  - AF2: aeropuertos;
  - **AF3: gestión flexible del espacio aéreo y free route**;
  - AF4: gestión colaborativa de la red;
  - AF5: gestión de la información del sistema en su conjunto;
  - AF6: intercambio de trayectorias.

**Espacio aéreo y operaciones**
- **Reglamento 2150/2005**: uso flexible del espacio aéreo (**FUA**).
- **Reglamento 255/2010**: gestión de afluencia (**ATFM**).
- **Reglamento 923/2012 (SERA)**: el **Reglamento del Aire** europeo y las disposiciones operativas comunes para el tránsito aéreo general (GAT).
  - Se aplica a los vuelos con origen o destino en la UE, o dentro de ella.
  - También a las aeronaves con matrícula de la UE en cualquier espacio aéreo, y a autoridades, ANSP, gestor de red y aeródromos.
  - Su anexo tiene 15 secciones y 6 apéndices. Por ejemplo: S4 planes de vuelo, S5 VMC/VFR, S6 clasificación del espacio aéreo, S8 ATC, S13 transpondedor y ADS-B, S15 CPDLC.
- **Reglamento 2019/123**: funciones de la red ATM y gestión de crisis.

**EASA y requisitos técnicos**
- **Reglamento 2018/1139**: normas comunes de aviación civil; crea EASA.
- **Reglamento 628/2013**: inspecciones de normalización de EASA.
- **Reglamento 139/2014**: aeródromos, con AESA como autoridad en España.
- **Reglamento 2015/340**: **licencias y certificados de controladores y alumnos**. Regula la competencia lingüística, la formación y la evaluación médica.
- **Reglamento 2017/373**: requisitos comunes para los **proveedores ATM/ANS** y su supervisión. Lo modifica el 2020/469 (ATS, AIS, diseño del espacio aéreo).
- **Reglamento 2018/1048**: **PBN**.
- **Reglamento 2019/947**: **UAS**.
- **Reglamento 2021/664**: **U-space**.
- **Reglamento 2023/203**: riesgos de seguridad de la información.
- **Reglamentos 2023/1768 y 2023/1769**: certificación de sistemas y componentes ATM/ANS, y de las organizaciones que los diseñan y producen.

**Seguridad operacional**
- **Reglamento 996/2010**: investigación de accidentes **sin determinar responsabilidades** y red europea de autoridades.
- **Reglamento 376/2014**: **notificación de sucesos**.
- **Reglamento 2015/1018**: lista de sucesos de notificación obligatoria.

**I+D.** El **Reglamento 2021/2085** crea la **Empresa Común SESAR 3**. Durará hasta el **31-12-2031**, con sede en **Bruselas**.', 'pp. 35-42', false),
  ('10000000-0000-4000-8001-000000000014', '00000000-0000-4000-8000-000000006001', 14, 'Normativa nacional con implicaciones para ENAIRE', '**Fuentes de financiación de ENAIRE:** la **tarifa de ruta** y la **tasa de aproximación**.

**Primer nivel**
- **Ley 48/1960, de Navegación Aérea**: el espacio aéreo sobre el territorio español y su mar territorial está bajo **soberanía española**. Los dueños de los bienes que hay debajo tienen derecho a ser resarcidos.
- **Ley 21/2003, de Seguridad Aérea**: competencias de la Administración General del Estado, investigación de accidentes, inspección e infracciones y sanciones.
- **Ley 9/2010**: regula la prestación de ATS y fija condiciones laborales de los controladores.
  - Reserva a ENAIRE el **control de área y de aproximación**.
  - Abre los **ATS de aeródromo** a otros proveedores certificados.
- **Ley 8/2011** (infraestructuras críticas) y **RDL 12/2018** (seguridad de redes y sistemas de información).

**Marco institucional**
- **Ley 4/1990**: crea el ente "Aeropuertos Españoles y Navegación Aérea".
- **RDL 13/2010**: crea **Aena Aeropuertos, S.A.**, que asume la gestión aeroportuaria.
- **Ley 18/2014**: **cambia la denominación de AENA a ENAIRE** y crea el Plan Director de navegación aérea.
- **RD 184/2008**: Estatuto de **AESA**.
- **RD 186/2008**: Estatuto de **AEMET**, adscrita a Transición Ecológica.
- **RD 253/2024**: estructura del Ministerio de Transportes.
- **RD 160/2023**: **Estatuto de ENAIRE**. Recoge sus funciones (ATS de área y aproximación, AIS/AIP, CNS, ATFM/ASM y coordinación civil-militar del espacio aéreo, entre otras) y los derechos que le da su participación en Aena.
- **Orden de 8-11-1979**: crea la CIDETRA.
- **Orden FOM/1525/2011**: Aena Aeropuertos empieza a gestionar los aeropuertos.

**Supervisión y certificación**
- **Ley 39/2015**: procedimiento administrativo común.
- **RD 310/2022**: cambios de espacio aéreo y procedimientos de vuelo.
- **RD 515/2020**: certificación de los proveedores ATM/ANS.
- **RD 98/2009**: Reglamento de inspección aeronáutica.
- **RD 1133/2010**: **AFIS**.
- **Orden FOM/3352/2010**: aeropuertos con nuevos proveedores ATS de aeródromo.
- **Orden FOM/922/2013**: planes de inspección de AESA.

**Recursos humanos (controladores)**
- **RD 1516/2009**: complementa el Reglamento 2015/340 en licencias y en la certificación de los centros de formación.
- **RD 1001/2010**: **tiempos de actividad y descanso** de los controladores.
- **Orden FOM/1146/2019**: **competencia lingüística**. El personal AFIS y SDP necesita como mínimo el nivel 4.
- **Resolución de AESA de 11-10-2011**: canje de licencias de controlador.

**Sistemas y operaciones**
- **RD 57/2002**: **Reglamento de Circulación Aérea**.
- **RD 1238/2011**: servicio de dirección en plataforma (**SDP**).
- **RD 1180/2018**: desarrolla el SERA.
- **RD 426/2021**: pistas paralelas, conforme a la enmienda 9 del Doc 4444.
- **RD 517/2024**: drones (UAS).

**Seguridad operacional**
- **RD 369/2023**: servidumbres aeronáuticas.
- **RD 389/1998**: investigación de accidentes, sin buscar culpas.
- **RD 995/2013**: **PESO** (Programa Estatal de Seguridad Operacional).
- **RD 1088/2020**: notificación de sucesos.
- **RD 311/2022**: Esquema Nacional de Seguridad (ENS).

**Aeropuertos**
- **RD 862/2009**: normas técnicas y certificación de aeródromos.
- **RD 1189/2011**: informes previos sobre aeródromos autonómicos.

**Regulación económica**
- **Decreto 1675/1972**: tarifas de ruta de EUROCONTROL.
- **Acuerdo Multilateral de 12-2-1981**: tarifas de ruta.
- **Ley 25/1998**: tasas. Incluye 26 tarifas aeroportuarias, que solo puede fijar una ley.
- **Ley 24/2001**: **tasa de aproximación**.

**Regulación ambiental**
- **Ley 37/2003, del Ruido**.
- **Ley 42/2007**: patrimonio natural.
- **Ley 21/2013**: evaluación ambiental.
- **Ley 7/2021**: cambio climático.', 'pp. 42-54', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000000-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006001', '¿Qué es la OACI?', '["Una organización intergubernamental europea civil y militar creada en 1960", "La agencia de la Unión Europea responsable de la seguridad aérea, creada en 2002", "Una asociación no gubernamental de aerolíneas fundada en La Habana", "Un organismo especializado de las Naciones Unidas creado en 1944 para administrar el Convenio de Chicago"]'::jsonb, 3, 'La OACI es un organismo especializado de la ONU creado en 1944 para administrar el Convenio de Chicago y velar por su aplicación (p. 5).', 'p. 5', 1, false),
  ('10000000-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006001', '¿Cómo está compuesto el Consejo de la OACI?', '["Por 36 Estados contratantes elegidos por la Asamblea para un mandato de tres años", "Por todos los Estados miembros, que se reúnen al menos una vez cada tres años", "Por 54 Estados elegidos por la Secretaría General para un mandato de cinco años", "Por 19 Estados, uno por cada Anexo del Convenio, con mandato anual"]'::jsonb, 0, 'El Consejo es el órgano ejecutivo permanente, con 36 Estados elegidos por la Asamblea por tres años (p. 7).', 'p. 7', 2, false),
  ('10000000-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006001', '¿Cuándo dejó de existir la PICAO y pasó a llamarse oficialmente OACI?', '["El 7 de diciembre de 1944, al clausurarse la Conferencia de Chicago", "El 1 de noviembre de 1944, al abrirse la Conferencia de Chicago", "El 4 de abril de 1947, al reunirse las ratificaciones suficientes del Convenio", "En 1960, al crearse EUROCONTROL"]'::jsonb, 2, 'La PICAO pasó a llamarse oficialmente OACI el 4 de abril de 1947, cuando se obtuvieron las ratificaciones suficientes (p. 6).', 'p. 6', 3, false),
  ('10000000-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006001', '¿Cuántos Anexos al Convenio de Chicago tiene establecidos la OACI?', '["18", "17", "19", "21"]'::jsonb, 2, 'La OACI tiene establecidos 19 anexos, que detallan los distintos aspectos de la regulación de la aviación civil (p. 8).', 'pp. 8-9', 1, false),
  ('10000000-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006001', '¿Qué Anexo de la OACI trata de los Servicios de tránsito aéreo?', '["Anexo 2", "Anexo 10", "Anexo 11", "Anexo 15"]'::jsonb, 2, 'En la tabla de Anexos, el 11 es Servicios de tránsito aéreo. El 2 es Reglamento del aire, el 10 Telecomunicaciones y el 15 Servicios de información aeronáutica (p. 9).', 'p. 9', 2, false),
  ('10000000-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006001', 'El Doc 4444 (PANS-ATM) complementa las normas y métodos recomendados de los Anexos...', '["4 y 15", "6 y 8", "10 y 14", "2 y 11"]'::jsonb, 3, 'Según el tema, los procedimientos del Doc 4444 complementan las SARPs de los Anexos 2 y 11 (p. 10).', 'p. 10', 2, false),
  ('10000000-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006001', '¿En qué año se creó EUROCONTROL y desde cuándo es España miembro?', '["Se creó en 1944 y España es miembro desde 1986", "Se creó en 2002 y España es miembro desde 2016", "Se creó en 1960 y España es miembro desde 1997", "Se creó en 1960 y España es miembro desde 1986"]'::jsonb, 2, 'EUROCONTROL se creó en 1960 y España es miembro desde 1997 (p. 11).', 'p. 11', 2, false),
  ('10000000-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006001', '¿Cuál es el máximo órgano de decisión de EUROCONTROL?', '["El Consejo Provisional", "La Agencia", "La Comisión Permanente", "La Junta de los Servicios de Navegación Aérea (ANSB)"]'::jsonb, 2, 'La Comisión Permanente, formada por representantes de nivel ministerial, es el máximo órgano de decisión. El Consejo Provisional aplica la política que ella fija (p. 11).', 'p. 11', 2, false),
  ('10000000-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006001', '¿En qué espacio aéreo presta servicio el MUAC de EUROCONTROL?', '["En el espacio aéreo inferior de Bélgica, Países Bajos y Francia", "En el espacio aéreo superior de Bélgica, Luxemburgo, Países Bajos y el noroeste de Alemania", "En todo el espacio aéreo de los 42 Estados miembros de EUROCONTROL", "En el espacio aéreo superior de Francia, Suiza y el sur de Alemania"]'::jsonb, 1, 'El MUAC presta servicios uniformes en el espacio aéreo superior de Bélgica, Luxemburgo, Países Bajos y el noroeste de Alemania (p. 13).', 'p. 13', 2, false),
  ('10000000-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006001', '¿Desde cuándo es España miembro de la Unión Europea?', '["Desde el 1 de enero de 1997", "Desde 1957, con el Tratado de la CEE", "Desde el 1 de enero de 1986", "Desde el 8 de octubre de 2002"]'::jsonb, 2, 'La UE tiene 27 Estados miembros y España lo es desde el 1 de enero de 1986 (p. 14).', 'p. 14', 1, false),
  ('10000000-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006001', '¿Qué institución de la UE está formada por ministros de cada país, según el tema, y representa a los Gobiernos y adopta legislación?', '["El Consejo de la Unión Europea", "El Consejo Europeo", "La Comisión Europea", "El Parlamento Europeo"]'::jsonb, 0, 'El Consejo de la UE lo forman ministros de cada país. El Consejo Europeo, en cambio, lo forman los jefes de Estado o de Gobierno y fija las prioridades políticas (p. 15).', 'p. 15', 2, false),
  ('10000000-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006001', '¿A qué organismo designó España como Autoridad Nacional de Supervisión en el marco del Cielo Único?', '["A la Agencia Estatal de Seguridad Aérea (AESA)", "A la Dirección General de Aviación Civil (DGAC)", "A ENAIRE", "A la CIAIAC"]'::jsonb, 0, 'España designó a AESA como Autoridad Nacional de Supervisión de los servicios civiles de navegación aérea, salvo los meteorológicos (p. 17).', 'p. 17', 1, false),
  ('10000000-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006001', '¿Qué es un bloque funcional de espacio aéreo (FAB)?', '["Una zona de espacio aéreo reservada en exclusiva para uso militar", "El conjunto de aeropuertos que gestiona un mismo operador aeroportuario", "El espacio aéreo superior que controla directamente EUROCONTROL", "Un bloque de espacio aéreo basado en exigencias operativas, establecido con independencia de las fronteras nacionales"]'::jsonb, 3, 'Los FAB se diseñan según requisitos operacionales e independientemente de las fronteras estatales, para usar mejor el espacio aéreo (p. 18).', 'p. 18', 2, false),
  ('10000000-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006001', '¿Cuál de estas funciones corresponde al Gestor de Red Europeo (NM)?', '["Certificar a los proveedores de servicios de navegación aérea de cada Estado", "Investigar accidentes para determinar responsabilidades", "Aprobar las circulares aeronáuticas de los Estados miembros", "Coordinar de forma central las radiofrecuencias y mejorar la atribución de códigos de transpondedor SSR"]'::jsonb, 3, 'Entre las funciones del NM están la coordinación central de radiofrecuencias y la mejora de la atribución de códigos SSR. La certificación de proveedores corresponde a las autoridades nacionales de supervisión (pp. 17 y 19).', 'p. 19', 2, false),
  ('10000000-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006001', '¿Cuándo se creó EASA y por qué reglamento se rige actualmente?', '["Se creó en 2008 y se rige por el Reglamento (CE) 216/2008", "Se creó en 2002 y se rige por el Reglamento (UE) 2018/1139", "Se creó en 2004 y se rige por el Reglamento (CE) 550/2004", "Se creó en 1999 y se rige por el Reglamento (UE) 2024/2803"]'::jsonb, 1, 'EASA se creó en 2002 y hoy se rige por el Reglamento (UE) 2018/1139 (p. 20).', 'p. 20', 1, false),
  ('10000000-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006001', '¿Cuánto dura el mandato de los miembros del Consejo de Administración de EASA?', '["Tres años, no renovables", "Cuatro años, renovables una sola vez", "Seis años, renovables", "Cinco años, renovables"]'::jsonb, 3, 'Cada Estado y la Comisión nombran un miembro y un suplente. Los mandatos duran cinco años y son renovables (p. 21).', 'p. 21', 3, false),
  ('10000000-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006001', 'En el proceso de elaboración de normas de EASA, ¿qué son los NPA?', '["Documentos de respuesta a los comentarios recibidos", "Términos de referencia de la tarea normativa", "Avisos de modificación propuesta que se someten a consulta", "Reglamentos de ejecución ya publicados en el Diario Oficial de la UE"]'::jsonb, 2, 'EASA somete a consulta los términos de referencia (ToR), los avisos de modificación propuesta (NPA) y los documentos de respuesta a comentarios (CRD) (p. 22).', 'p. 22', 2, false),
  ('10000000-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006001', '¿Dónde se fundó la IATA?', '["En Montreal (Canadá)", "En La Habana (Cuba)", "En Lucerna (Suiza)", "En Washington D.C. (EE. UU.)"]'::jsonb, 1, 'La IATA es un organismo no gubernamental fundado en La Habana. Lucerna es el origen de EUROCAE y Washington es la sede de la RTCA (p. 22).', 'p. 22', 2, false),
  ('10000000-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006001', '¿Qué organización representa a los proveedores de servicios de navegación aérea (ANSP) en todo el mundo?', '["ACI", "CANSO", "IATA", "EUROCAE"]'::jsonb, 1, 'CANSO se fundó para representar a los ANSP de todo el mundo. ACI representa a los aeropuertos e IATA a las aerolíneas (pp. 22-23).', 'p. 22', 1, false),
  ('10000000-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006001', 'Con el desdoblamiento de la autoridad aeronáutica del RD 184/2008, ¿a quién corresponden las potestades inspectoras y sancionadoras en aviación civil?', '["A la Agencia Estatal de Seguridad Aérea (AESA)", "A la Dirección General de Aviación Civil (DGAC)", "A ENAIRE", "A la CIAIAC"]'::jsonb, 0, 'El RD 184/2008 atribuye a AESA las potestades inspectoras y sancionadoras. La DGAC se queda con la política estratégica y las circulares aeronáuticas (p. 23).', 'p. 23', 1, false),
  ('10000000-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006001', '¿Qué órgano aprueba las Circulares Aeronáuticas?', '["La Agencia Estatal de Seguridad Aérea (AESA)", "La Dirección General de Aviación Civil (DGAC)", "ENAIRE", "El Consejo de la OACI"]'::jsonb, 1, 'Las circulares las aprueba la DGAC, por iniciativa propia o a propuesta de AESA (pp. 24 y 35).', 'pp. 24, 35', 1, false),
  ('10000000-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006001', '¿Cuál es la finalidad de las investigaciones de la CIAIAC?', '["Determinar la responsabilidad penal de los implicados en el accidente", "Imponer sanciones administrativas a los operadores infractores", "Prevenir futuros accidentes e incidentes, sin determinar culpas ni responsabilidades", "Certificar a los proveedores de servicios de navegación aérea"]'::jsonb, 2, 'La investigación de la CIAIAC es exclusivamente técnica. Su fin es la prevención y no busca culpas ni responsabilidades (p. 25).', 'p. 25', 1, false),
  ('10000000-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006001', '¿Qué organismo gestiona el Registro de matrícula de aeronaves?', '["AESA", "La DGAC", "Aena S.M.E., S.A.", "ENAIRE"]'::jsonb, 0, 'La gestión del Registro de matrícula es competencia de AESA, en concreto de su Dirección de Seguridad de Aeronaves (pp. 26-27).', 'pp. 26-27', 1, false),
  ('10000000-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006001', '¿Qué dirección de AESA tiene las competencias sobre personal de vuelo, escuelas de vuelo y medicina aeronáutica?', '["La Dirección de Seguridad de Aeronaves (DSA)", "La Dirección de Aeropuertos y Seguridad de la Aviación Civil", "La Dirección de Navegación Aérea", "La Dirección de Gestión de la Seguridad y Personal de Vuelo"]'::jsonb, 3, 'Esa dirección se ocupa de la gestión de riesgos, el personal de vuelo, las escuelas, la medicina aeronáutica y la protección del usuario (p. 27).', 'p. 27', 3, false),
  ('10000000-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006001', 'Según la Ley 9/2010, ¿en qué fases del vuelo es ENAIRE el proveedor designado de servicios de tránsito aéreo?', '["Solo en ruta", "En ruta y aproximación", "En aproximación y aeródromo", "En aeródromo en todos los aeropuertos de interés general"]'::jsonb, 1, 'Conforme a la Ley 9/2010, ENAIRE es la empresa designada para los ATS de ruta y aproximación. Los ATS de aeródromo pueden prestarlos otros proveedores certificados (pp. 29 y 49).', 'pp. 29, 49', 1, false),
  ('10000000-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006001', '¿Dónde están los dos centros de control de área terminal (TACC) de ENAIRE?', '["En Santiago y Valencia", "En Sevilla y Palma de Mallorca", "En Madrid y Barcelona", "En Bilbao y Málaga"]'::jsonb, 0, 'ENAIRE tiene dos TACC, en Santiago y Valencia. Madrid, Barcelona, Canarias, Sevilla y Palma son las sedes de los ACC de las direcciones regionales (p. 29).', 'p. 29', 2, false),
  ('10000000-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006001', '¿Qué supuso el Real Decreto-ley 13/2010 para el sistema aeroportuario?', '["Cambió la denominación de AENA a ENAIRE", "Aprobó el Estatuto de la entidad pública empresarial ENAIRE", "Constituyó por primera vez el ente público AENA", "Liberalizó los servicios aeroportuarios y creó Aena Aeropuertos, S.A., mientras la entidad pública conservaba las competencias de navegación aérea"]'::jsonb, 3, 'El RDL 13/2010 creó Aena Aeropuertos, S.A. (con un 49 % de capital privado) para la gestión aeroportuaria. El cambio de nombre a ENAIRE llegó con la Ley 18/2014 (pp. 28 y 44).', 'pp. 28, 44', 2, false),
  ('10000000-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006001', '¿Para qué se creó la CIDETRA en 1979?', '["Para investigar los accidentes de aviación civil", "Para representar a las compañías aéreas ante la Administración", "Para coordinar la aeronáutica civil y la militar", "Para asesorar en política aérea y espacial internacional"]'::jsonb, 2, 'La CIDETRA nació en 1979 para asegurar la coordinación entre la aeronáutica civil y la militar (p. 31).', 'p. 31', 1, false),
  ('10000000-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006001', '¿A qué ministerio está adscrita la CIPAI (Comisión Interministerial de Política Aeroespacial Internacional)?', '["Al Ministerio de Asuntos Exteriores", "Al Ministerio de Defensa", "Al Ministerio de Transportes y Movilidad Sostenible", "Al Ministerio para la Transición Ecológica"]'::jsonb, 0, 'La CIPAI es un órgano colegiado adscrito al Ministerio de Asuntos Exteriores, creado en 1946 (p. 31).', 'p. 31', 2, false),
  ('10000000-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006001', '¿Qué permite la quinta libertad del aire a una aeronave del Estado A?', '["Embarcar tráfico en el Estado B y llevarlo a un Estado C, como continuación de un vuelo A-B", "Transportar tráfico entre B y C haciendo escala en su propio territorio", "Transportar tráfico entre B y C enteramente fuera de su territorio", "Embarcar tráfico en el Estado B con destino a su propio Estado A"]'::jsonb, 0, 'La quinta libertad (transporte externo consecutivo) permite llevar tráfico de B a C si esa parte continúa el vuelo A-B. Las demás opciones describen la sexta, la séptima y la cuarta (p. 33).', 'p. 33', 2, false),
  ('10000000-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006001', '¿Cómo se llama el derecho a realizar cabotaje dentro de otro Estado sin que el servicio parta ni termine en el país de la aerolínea?', '["Octava libertad (cabotaje consecutivo)", "Novena libertad (cabotaje autónomo)", "Séptima libertad (transporte externo)", "Sexta libertad (transporte externo-interno)"]'::jsonb, 1, 'La novena libertad es el cabotaje autónomo. La octava, el cabotaje consecutivo, exige partir del país de la aerolínea o terminar en él (p. 33).', 'p. 33', 3, false),
  ('10000000-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006001', '¿Qué norma comunitaria necesita transponerse al ordenamiento de cada Estado miembro para surtir efecto?', '["La Directiva", "El Reglamento", "La Decisión", "El Reglamento de ejecución de la Comisión"]'::jsonb, 0, 'La directiva fija un resultado y deja a cada Estado la forma y los medios, por lo que exige transposición. El reglamento y la decisión tienen eficacia directa (p. 34).', 'p. 34', 2, false),
  ('10000000-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006001', '¿Qué requisito debe cumplir un convenio internacional multilateral para ser de obligado cumplimiento en España?', '["Haber sido aprobado por el Consejo de la OACI", "Haber sido ratificado y publicado en el BOE", "Haber sido firmado por al menos 52 Estados", "Haber sido transpuesto mediante una Circular Aeronáutica"]'::jsonb, 1, 'En España solo forman parte del ordenamiento, como normas obligatorias, los convenios internacionales ratificados y publicados en el BOE (p. 32).', 'p. 32', 2, false),
  ('10000000-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006001', '¿Qué reglamento europeo establece el Reglamento del Aire y las disposiciones operativas comunes (SERA)?', '["El Reglamento (CE) 2150/2005", "El Reglamento (UE) 923/2012", "El Reglamento (UE) 255/2010", "El Reglamento (CE) 549/2004"]'::jsonb, 1, 'El Reglamento 923/2012 (SERA) contiene el Reglamento del Aire. El 2150/2005 trata del uso flexible del espacio aéreo, el 255/2010 del ATFM y el 549/2004 es el Reglamento marco (pp. 35-37).', 'p. 37', 2, false),
  ('10000000-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006001', '¿Qué regula el Reglamento (UE) 2015/340?', '["La notificación de sucesos en la aviación civil", "Los requisitos comunes para la certificación de aeródromos", "Las normas para la utilización de aeronaves no tripuladas", "Los requisitos técnicos y procedimientos administrativos de las licencias y certificados de los controladores de tránsito aéreo"]'::jsonb, 3, 'El Reglamento 2015/340 regula las licencias y certificados de los controladores y alumnos controladores, incluidas la competencia lingüística, la formación y la evaluación médica (pp. 34 y 39).', 'pp. 34, 39', 1, false),
  ('10000000-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006001', '¿Qué reglamento de la UE regula la notificación de sucesos en la aviación civil?', '["El Reglamento (UE) 996/2010", "El Reglamento (UE) 2023/203", "El Reglamento (UE) 139/2014", "El Reglamento (UE) 376/2014"]'::jsonb, 3, 'El 376/2014 regula la notificación, recogida y análisis de sucesos. El 996/2010 trata de la investigación de accidentes, el 2023/203 de la seguridad de la información y el 139/2014 de los aeródromos (pp. 39-41).', 'p. 41', 2, false),
  ('10000000-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006001', '¿Qué ley establece que el espacio aéreo sobre el territorio español y su mar territorial está sujeto a la soberanía del Estado?', '["La Ley 21/2003, de Seguridad Aérea", "La Ley 48/1960, de Navegación Aérea", "La Ley 9/2010, de prestación de servicios de tránsito aéreo", "La Ley 18/2014, de medidas urgentes"]'::jsonb, 1, 'La Ley 48/1960 contiene las disposiciones generales sobre la soberanía del espacio aéreo español y su mar territorial (p. 43).', 'p. 43', 2, false),
  ('10000000-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006001', '¿Qué norma regula los tiempos de actividad y los requisitos de descanso de los controladores de tránsito aéreo?', '["El Real Decreto 1001/2010", "El Real Decreto 1516/2009", "La Orden FOM/1146/2019", "El Real Decreto 57/2002"]'::jsonb, 0, 'El RD 1001/2010 regula, por seguridad operacional, la jornada especial de los controladores. El RD 1516/2009 trata de las licencias, la Orden FOM/1146/2019 de la competencia lingüística y el RD 57/2002 es el Reglamento de Circulación Aérea (pp. 49-50).', 'pp. 49-50', 2, false),
  ('10000000-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006001', 'Según el tema, ¿cuáles son las principales fuentes de financiación de los servicios de navegación aérea que presta ENAIRE?', '["Los Presupuestos Generales del Estado y las tasas aeroportuarias de Aena", "La tasa de aproximación y los derechos de emisión", "La tarifa de ruta y la tasa de aproximación", "La tarifa de ruta y las subvenciones al transporte aéreo"]'::jsonb, 2, 'El tema indica que la regulación económica recoge las fuentes de financiación de ENAIRE, que son sobre todo la tarifa de ruta y la tasa de aproximación (p. 42).', 'p. 42', 2, false),
  ('10000000-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006001', '¿Qué norma cambió la denominación de AENA a ENAIRE?', '["El Real Decreto-ley 13/2010", "El Real Decreto 160/2023", "La Ley 4/1990", "La Ley 18/2014"]'::jsonb, 3, 'La Ley 18/2014 cambió la denominación de AENA a ENAIRE. El RD 160/2023 aprueba su Estatuto y la Ley 4/1990 creó el ente (pp. 44-45).', 'p. 44', 2, false)
on conflict (id) do nothing;
