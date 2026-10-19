-- Contenido propio del Tema 9 (Aerodinámica y mecánica de vuelo).
-- Redactado a partir de docs/fuentes/enaire/t9.pdf (ENAIRE, ago. 2023). reviewed=false: pendiente de revisión humana.

insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages, reviewed) values
  ('10000009-0000-4000-8001-000000000001', '00000000-0000-4000-8000-000000006009', 1, 'Bernoulli y tubo Venturi', '**Definiciones**

**Teorema de Bernoulli:** en cualquier punto de un fluido, **P + ½·ρ·V² = constante**.
- Si la velocidad sube, la presión baja, y al revés.
- Aplicación práctica: el **tubo Venturi**. Donde la velocidad es mayor (V2 > V1) la presión es menor (P2 < P1), porque la densidad es constante.', 'pp. 3-4', false),
  ('10000009-0000-4000-8001-000000000002', '00000000-0000-4000-8000-000000006009', 2, 'Atmósfera Estándar Internacional (ISA)', '**Qué es.** Un modelo de la atmósfera que da presión, temperatura, densidad y viscosidad del aire según la altitud. Sirve de **marco de referencia invariante** para la navegación y los cálculos aerodinámicos.

**Valores OACI**
- Nivel del mar: **15 ºC** y **1013 hPa**.
- Gradiente de temperatura: baja **2 ºC cada 1000 ft** (6,5 ºC por km) hasta **36 000 ft**.
- Por encima de 36 000 ft la temperatura se considera constante: **-56 ºC**.
', 'pp. 4-5', false),
  ('10000009-0000-4000-8001-000000000003', '00000000-0000-4000-8000-000000006009', 3, 'Altitud de presión y altitud densidad', '**Altitud de presión**
- Altura sobre el plano de referencia estándar, donde la presión es **1013 hPa**.
- Es la altitud que indica el altímetro cuando está ajustado a **1013 hPa**.

**Altitud densidad**
- Altitud de la ISA que correspondería a una determinada densidad del aire.
- La densidad **decrece** cuando aumentan **temperatura, altitud y humedad**.
', 'pp. 5-6', false),
  ('10000009-0000-4000-8001-000000000004', '00000000-0000-4000-8000-000000006009', 4, 'Velocidades y número de Mach', '| Velocidad | Qué es |
|---|---|
| **TAS** | Velocidad respecto al aire en el que vuela |
| **IAS** | La que marca el anemómetro, sin corregir errores |
| **CAS** | IAS corregida por errores de instrumento y posición |
| **EAS** | Además, corregida por compresibilidad |
| **GS** | Respecto al suelo: suma vectorial de TAS y viento |

- **Mach = TAS / velocidad del sonido (c)**.
', 'pp. 6-7', false),
  ('10000009-0000-4000-8001-000000000005', '00000000-0000-4000-8000-000000006009', 5, 'Las cuatro fuerzas', 'En vuelo recto y nivelado actúan cuatro fuerzas equilibradas: **empuje, peso, resistencia y sustentación**.

- **Sustentación (L):** perpendicular a la corriente. **L = CL · q · S**, con q = ½·ρ·V² (presión dinámica) y S la superficie alar. CL depende del ángulo de ataque.
- **Resistencia (D):** hacia atrás, paralela al viento relativo. **D = CD · q · S**. CD = resistencia parásita + resistencia inducida.
- **Empuje (T):** fuerza de avance del motor/hélice. Actúa paralelo al eje longitudinal.

Si el empuje excede a la resistencia, el avión acelera; si la resistencia excede al empuje, decelera. El origen de la sustentación es la diferencia de presión entre intradós y extradós (menor presión en el extradós).', 'pp. 7-9', false),
  ('10000009-0000-4000-8001-000000000006', '00000000-0000-4000-8000-000000006009', 6, 'Vórtices de punta de ala y efecto suelo', '**Vórtice de punta de ala**
- Consecuencia de la sustentación: el aire fluye de la zona de alta presión (bajo el ala) a la de baja presión rodeando la punta.
- Empieza en la **rotación** (la rueda de proa deja la pista) y termina cuando la rueda de proa toca en el aterrizaje.
- Intensidad: **proporcional al peso**, **inversamente proporcional a envergadura y velocidad**. Máxima con avión **pesado, limpio y lento**.

**Efecto suelo**
- Cerca del suelo el vórtice se destruye contra la superficie.
- Resultado: **menos resistencia y más sustentación**.
- Es mayor cuanto más cerca del suelo y cuanto mayor es la envergadura.', 'pp. 9-12', false),
  ('10000009-0000-4000-8001-000000000007', '00000000-0000-4000-8000-000000006009', 7, 'Factor de carga y pérdida', '**Factor de carga**
- Relación entre sustentación y peso; se mide en **G**.
- En viraje a altura constante, la **componente vertical** de la sustentación debe igualar al peso, así que la sustentación total **aumenta**.

**Pérdida**
- Se produce al **exceder el ángulo de ataque crítico**: el flujo se separa del extradós y la sustentación cae rápidamente.
- La velocidad de pérdida **aumenta con la altitud** (menor densidad).
- Antes de la pérdida aparece el **buffet (bataneo)**. El aviso (p. ej. stick shaker) debe darse a una velocidad un **7 % por encima** de la pérdida.', 'pp. 12-13', false),
  ('10000009-0000-4000-8001-000000000008', '00000000-0000-4000-8000-000000006009', 8, 'Mach crítico y coffin corner', '- A Mach 0,82 o más, en algún punto del extradós puede alcanzarse la velocidad del sonido.
- **Mach crítico:** el Mach de vuelo que hace que en un punto del extradós se alcance Mach 1. Genera una **onda de choque** y una resistencia nueva, mayor cuanto mayor es el Mach. Puede llevar a la pérdida de alta velocidad. Remedio: reducir el Mach.
- **Coffin corner:** punto en que coinciden las velocidades de pérdida por alta y por baja velocidad (reactores a gran altura, según su peso). El piloto debe **descender** para ampliar el margen.', 'p. 14', false),
  ('10000009-0000-4000-8001-000000000009', '00000000-0000-4000-8000-000000006009', 9, 'Geometría del ala', '- **Perfil alar:** corte del ala por un plano vertical paralelo al eje longitudinal.
- **Extradós** (superior) e **intradós** (inferior). **Cuerda:** línea entre borde de ataque y de salida.
- Perfil **simétrico:** cuerda y línea de curvatura media coinciden; con ángulo de ataque cero **no hay sustentación**. Perfil **asimétrico:** con ángulo cero sí hay sustentación.
- **Envergadura:** distancia entre extremos. Envergadura × cuerda media = **superficie alar**.
- **Alargamiento** = envergadura / cuerda media (3-4 en aviones muy rápidos, 25-30 en planeadores).
- **Ángulo de ataque:** ángulo agudo entre la cuerda y el viento relativo.', 'pp. 14-16', false),
  ('10000009-0000-4000-8001-000000000010', '00000000-0000-4000-8000-000000006009', 10, 'Ejes y mandos de vuelo', 'Tres ejes perpendiculares que pasan por el **centro de gravedad**:
| Eje | Movimiento | Superficie | Mando |
|---|---|---|---|
| **Longitudinal** | Alabeo (roll) | **Alerones** (borde de salida del ala) | Girar la palanca |
| **Lateral** | Cabeceo (pitch) | **Timón de profundidad** (estabilizador horizontal) | Empujar/tirar |
| **Vertical** | Guiñada (yaw) | **Timón de dirección** (estabilizador vertical) | Pedales |', 'pp. 16-18', false),
  ('10000009-0000-4000-8001-000000000011', '00000000-0000-4000-8000-000000006009', 11, 'Hipersustentadores, spoilers y trim tabs', '- **Slats** (borde de ataque) y **flaps** (borde de salida): aumentan la curvatura y el **CLmax**. Reducen las velocidades de despegue y aterrizaje y las longitudes de pista.
- **Spoilers:** reducen sustentación y aumentan resistencia; están en el extradós. Simétricos = **aerofrenos**; asimétricos = mando de **alabeo** a altas velocidades.
- **Trim tabs:** pequeñas superficies cerca del borde de salida de profundidad, dirección y alerones. Se deflectan en sentido opuesto al mando primario y **anulan el momento de charnela**, y con él la fuerza en palanca.', 'pp. 18-19', false),
  ('10000009-0000-4000-8001-000000000012', '00000000-0000-4000-8000-000000006009', 12, 'Velocidades de despegue', '- **VS:** velocidad de pérdida.
- **VMCG:** mínima de control en tierra con un motor inoperativo; la guiñada se debe controlar solo con mandos aerodinámicos.
- **VMCA:** mínima de control en el aire con un motor inoperativo. **VMCA ≥ 1,2 VS**.
- **V1:** velocidad de decisión: antes se aborta, después se continúa. **V1 ≥ VMCG**.
- **VR:** inicio de la rotación. **VR ≥ V1** y **VR ≥ 1,05 VMC**.
- **V2:** velocidad de seguridad al despegue, a **35 ft** al final de la pista requerida; mejor ángulo de ascenso con un motor inoperativo; se mantiene hasta franquear obstáculos o al menos **400 ft**.', 'pp. 20-21', false),
  ('10000009-0000-4000-8001-000000000013', '00000000-0000-4000-8000-000000006009', 13, 'Pista requerida en despegue', 'El peso de despegue se adapta a la **más larga** de tres distancias:
1. **Aceleración-despegue:** acelerar a V1 con todos los motores, fallo a V1 y continuar con el restante hasta 35 ft y V2.
2. **Aceleración-parada:** acelerar a V1, fallo a V1 y detenerse **solo con frenos** (sin inversores).
3. **Despegue (todos los motores):** hasta 35 ft; debe ser al menos un **15 %** menor que con un motor inoperativo. Normalmente no limita.

**Stopway:** prolongación de pista, al menos de su ancho y capaz de soportar el avión, solo para frenar un despegue abortado.
**Clearway:** zona libre de obstáculos en la prolongación del eje, usable solo para la subida; empieza al final de la pista.', 'pp. 21-22', false),
  ('10000009-0000-4000-8001-000000000014', '00000000-0000-4000-8000-000000006009', 14, 'Aterrizaje e hidroplaneo', '- **VREF = 1,3 VSO**, requerida a **50 ft** sobre el umbral.
- **VTD = 1,15 VSO** (toma de contacto).
- Peso máximo de aterrizaje: el **menor** de los dictados por los requisitos de pista y de ascenso en aproximación.

**Hidroplaneo**
- Con pista mojada o contaminada, las ruedas dejan de girar y deslizan, y el frenado pierde eficacia.
- Método más efectivo para parar: la **reversa**.', 'pp. 22-23', false)
on conflict (id) do nothing;

insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages, difficulty, reviewed) values
  ('10000009-0000-4000-8002-000000000001', '00000000-0000-4000-8000-000000006009', 'Según el teorema de Bernoulli, si aumenta la velocidad de un fluido en un punto, ¿qué le ocurre a su presión?', '["Disminuye, porque P + ½ρV² se mantiene constante", "Aumenta en la misma proporción que la velocidad", "No varía, porque solo depende de la temperatura", "Aumenta si la densidad es constante"]'::jsonb, 0, 'Bernoulli: P + ½ρV² es constante, así que al aumentar la velocidad disminuye la presión (pp. 3-4).', 'pp. 3-4', 1, false),
  ('10000009-0000-4000-8002-000000000002', '00000000-0000-4000-8000-000000006009', 'En un tubo Venturi, ¿dónde es menor la presión?', '["En la sección donde el fluido circula a menor velocidad", "Es igual en ambas secciones porque la densidad es constante", "En la sección donde el fluido circula a mayor velocidad", "En la entrada, siempre"]'::jsonb, 2, 'En el Venturi V2 > V1 y por tanto P2 < P1: la presión es menor donde la velocidad es mayor (p. 4).', 'p. 4', 1, false),
  ('10000009-0000-4000-8002-000000000003', '00000000-0000-4000-8000-000000006009', '¿Qué valores al nivel del mar define la OACI para la atmósfera estándar internacional?', '["0 ºC y 1013 hectopascales", "15 ºC y 1000 hectopascales", "20 ºC y 1025 hectopascales", "15 ºC y 1013 hectopascales"]'::jsonb, 3, 'La OACI define la ISA con 15 ºC y 1013 hPa al nivel del mar (p. 4).', 'p. 4', 1, false),
  ('10000009-0000-4000-8002-000000000004', '00000000-0000-4000-8000-000000006009', 'En la ISA, ¿cuánto disminuye la temperatura por cada 1000 ft hasta 36 000 ft?', '["Aproximadamente 1 ºC", "Aproximadamente 2 ºC (6,5 ºC por km)", "Aproximadamente 6,5 ºC", "Aproximadamente 0,65 ºC"]'::jsonb, 1, 'El gradiente de temperatura es de 2 ºC por 1000 ft, es decir 6,5 ºC por km (p. 4).', 'p. 4', 1, false),
  ('10000009-0000-4000-8002-000000000005', '00000000-0000-4000-8000-000000006009', '¿Cómo se considera la temperatura ISA por encima de 36 000 ft?', '["Sigue bajando 2 ºC cada 1000 ft", "Constante, de -56 ºC", "Constante, de -15 ºC", "Aumenta de nuevo hasta 0 ºC"]'::jsonb, 1, 'Por encima de 36 000 ft la temperatura se considera constante, -56 ºC (p. 4).', 'p. 4', 2, false),
  ('10000009-0000-4000-8002-000000000006', '00000000-0000-4000-8000-000000006009', 'Si el altímetro está ajustado a 1013 hPa, la altitud que indica es la...', '["Altitud densidad", "Altitud verdadera sobre el terreno", "Altitud de transición", "Altitud de presión"]'::jsonb, 3, 'Con el altímetro a 1013 hPa, la altitud indicada es la altitud de presión (p. 5).', 'p. 5', 1, false),
  ('10000009-0000-4000-8002-000000000007', '00000000-0000-4000-8000-000000006009', '¿Qué es la altitud densidad?', '["La altitud en la ISA a la que corresponde una determinada densidad del aire", "La altura sobre el terreno medida con el radioaltímetro", "La altitud a la que la presión es de 1013 hPa", "La altitud a la que la temperatura es de 15 ºC"]'::jsonb, 0, 'La altitud densidad es la que correspondería en la ISA a una determinada densidad del aire (p. 6).', 'p. 6', 2, false),
  ('10000009-0000-4000-8002-000000000008', '00000000-0000-4000-8000-000000006009', '¿Qué combinación de factores hace crítica la maniobra de despegue?', '["Baja temperatura, baja altitud y baja humedad", "Alta temperatura, baja altitud y baja humedad", "Alta temperatura, alta altitud y alta humedad", "Viento de cara, alta presión y baja temperatura"]'::jsonb, 2, 'Alta temperatura, altitud y humedad reducen la densidad y hacen crítico el despegue (p. 6).', 'p. 6', 2, false),
  ('10000009-0000-4000-8002-000000000009', '00000000-0000-4000-8000-000000006009', '¿Qué es la velocidad verdadera (TAS)?', '["La velocidad que marca el anemómetro sin ninguna corrección", "La velocidad del avión respecto al suelo", "La velocidad del avión respecto al aire en el que vuela", "La relación entre la velocidad del avión y la del sonido"]'::jsonb, 2, 'La TAS es la velocidad del avión respecto a la masa de aire (p. 6).', 'p. 6', 1, false),
  ('10000009-0000-4000-8002-000000000010', '00000000-0000-4000-8000-000000006009', '¿Qué es la velocidad indicada (IAS)?', '["La que marca el anemómetro, sin corrección por errores de indicador, posición o compresibilidad", "La velocidad respecto al suelo", "La IAS corregida de los errores de instrumento y posición", "La velocidad del avión respecto al aire"]'::jsonb, 0, 'La IAS es la lectura del anemómetro sin corregir (p. 6).', 'p. 6', 1, false),
  ('10000009-0000-4000-8002-000000000011', '00000000-0000-4000-8000-000000006009', '¿Cómo se obtiene la velocidad sobre el suelo (GS)?', '["Restando la IAS a la velocidad del sonido", "Como suma vectorial de la velocidad verdadera y la velocidad del viento", "Multiplicando la TAS por el número de Mach", "Corrigiendo la IAS por compresibilidad"]'::jsonb, 1, 'La GS es la suma vectorial de la TAS y el viento (p. 6).', 'p. 6', 1, false),
  ('10000009-0000-4000-8002-000000000012', '00000000-0000-4000-8000-000000006009', '¿Qué es la velocidad calibrada (CAS)?', '["La TAS corregida por el viento", "La velocidad respecto al suelo", "La velocidad a la que se alcanza Mach 1", "La IAS corregida por errores de posición y de instrumento"]'::jsonb, 3, 'La CAS es la IAS corregida por errores de posición e instrumento (p. 6).', 'p. 6', 2, false),
  ('10000009-0000-4000-8002-000000000013', '00000000-0000-4000-8000-000000006009', '¿Cómo se define el número de Mach?', '["Relación entre la IAS y la velocidad del viento", "Producto de la TAS por la densidad del aire", "Relación entre la GS y la TAS", "Relación entre la TAS del avión y la velocidad del sonido"]'::jsonb, 3, 'MN = TAS / c, con c la velocidad del sonido (p. 7).', 'p. 7', 1, false),
  ('10000009-0000-4000-8002-000000000014', '00000000-0000-4000-8000-000000006009', 'En vuelo recto y nivelado, ¿qué fuerza equilibra al peso?', '["El empuje", "La sustentación", "La resistencia", "La presión dinámica"]'::jsonb, 1, 'El peso actúa hacia abajo y se opone a la sustentación (pp. 7-8).', 'pp. 7-8', 1, false),
  ('10000009-0000-4000-8002-000000000015', '00000000-0000-4000-8000-000000006009', 'En la fórmula de la sustentación L = CL·q·S, ¿qué representa q?', '["La superficie alar", "El coeficiente de sustentación", "La presión dinámica, ½·ρ·V²", "El ángulo de ataque"]'::jsonb, 2, 'q es la presión dinámica ½ρV² (p. 8).', 'p. 8', 2, false),
  ('10000009-0000-4000-8002-000000000016', '00000000-0000-4000-8000-000000006009', '¿De qué se compone el coeficiente de resistencia CD?', '["De la suma de la resistencia parásita y la inducida", "De la diferencia entre empuje y peso", "Solo de la resistencia inducida", "De la sustentación dividida por el peso"]'::jsonb, 0, 'El coeficiente de resistencia es la suma del coeficiente parásito y el inducido (p. 8).', 'p. 8', 2, false),
  ('10000009-0000-4000-8002-000000000017', '00000000-0000-4000-8000-000000006009', '¿A qué se debe el origen de la sustentación?', '["A la diferencia de presión entre intradós y extradós, siendo menor en el extradós", "A que la presión en el extradós es mayor que en el intradós", "Únicamente al empuje del motor", "A la fuerza de la gravedad sobre el ala"]'::jsonb, 0, 'La sustentación nace de la diferencia de presión, mucho menor en el extradós (p. 9).', 'p. 9', 1, false),
  ('10000009-0000-4000-8002-000000000018', '00000000-0000-4000-8000-000000006009', '¿De qué depende la intensidad de los vórtices de punta de ala?', '["Es inversamente proporcional al peso y directamente proporcional a la velocidad", "Es directamente proporcional a la envergadura y a la velocidad", "Es directamente proporcional al peso e inversamente proporcional a la envergadura y la velocidad", "No depende del peso de la aeronave"]'::jsonb, 2, 'Según el PDF, la intensidad crece con el peso y decrece con la envergadura y la velocidad (p. 10).', 'p. 10', 2, false),
  ('10000009-0000-4000-8002-000000000019', '00000000-0000-4000-8000-000000006009', '¿En qué configuración alcanza el vórtice su máxima intensidad?', '["Aeronave ligera, con flaps y rápida", "Aeronave pesada, con flaps y rápida", "Aeronave ligera, en configuración limpia y lenta", "Aeronave pesada, en configuración limpia y lenta"]'::jsonb, 3, 'La fuerza del vórtice es máxima con aeronave pesada, limpia y lenta (p. 11).', 'p. 11', 2, false),
  ('10000009-0000-4000-8002-000000000020', '00000000-0000-4000-8000-000000006009', '¿Qué efecto produce el efecto suelo en un avión que vuela próximo al suelo?', '["Aumenta la resistencia y disminuye la sustentación", "Disminuye la resistencia y aumenta la sustentación", "Aumenta ambas", "Disminuye ambas"]'::jsonb, 1, 'Cerca del suelo disminuye la resistencia al avance y aumenta la sustentación (p. 11).', 'p. 11', 2, false),
  ('10000009-0000-4000-8002-000000000021', '00000000-0000-4000-8000-000000006009', '¿En qué unidad se mide el factor de carga?', '["En hectopascales", "En G, unidades de aceleración de la gravedad", "En nudos", "En grados de ángulo de ataque"]'::jsonb, 1, 'El factor de carga se mide en Gs (p. 12).', 'p. 12', 1, false),
  ('10000009-0000-4000-8002-000000000022', '00000000-0000-4000-8000-000000006009', '¿Cuál es la causa de la entrada en pérdida de un perfil?', '["El exceso de empuje sobre la resistencia", "La disminución del peso del avión", "El aumento de la densidad del aire", "La separación del flujo del extradós por exceder el ángulo de ataque crítico"]'::jsonb, 3, 'La pérdida resulta de la separación del flujo por exceder el ángulo de ataque crítico (p. 13).', 'p. 13', 1, false),
  ('10000009-0000-4000-8002-000000000023', '00000000-0000-4000-8000-000000006009', '¿Cómo varía la velocidad de pérdida al aumentar la altitud?', '["Aumenta, porque disminuye la densidad del aire", "Disminuye, porque disminuye la densidad del aire", "No varía", "Disminuye, porque aumenta la temperatura"]'::jsonb, 0, 'A mayor altitud la densidad es menor y la velocidad de pérdida es mayor (p. 13).', 'p. 13', 2, false),
  ('10000009-0000-4000-8002-000000000024', '00000000-0000-4000-8000-000000006009', '¿Qué es el Mach crítico?', '["El Mach al que el avión entra en pérdida a baja velocidad", "El Mach máximo del anemómetro", "El Mach de vuelo con el que se alcanza Mach 1 en algún punto del extradós", "El Mach al que desaparece el vórtice de punta de ala"]'::jsonb, 2, 'El Mach crítico es el que provoca Mach 1 en un punto del extradós, con onda de choque (p. 14).', 'p. 14', 2, false),
  ('10000009-0000-4000-8002-000000000025', '00000000-0000-4000-8000-000000006009', '¿Qué es el coffin corner y qué debe hacer el piloto para evitarlo?', '["El punto donde coinciden V1 y VR; debe abortar", "La zona de la pista tras el stopway; debe frenar", "El punto donde coinciden las velocidades de pérdida por alta y baja velocidad; debe descender", "El punto donde se anula el efecto suelo; debe ascender"]'::jsonb, 2, 'En el coffin corner coinciden ambas pérdidas; descender amplía el margen (p. 14).', 'p. 14', 2, false),
  ('10000009-0000-4000-8002-000000000026', '00000000-0000-4000-8000-000000006009', 'En un perfil simétrico con ángulo de ataque cero...', '["No se genera sustentación", "Se genera la máxima sustentación", "Se genera sustentación igual al peso", "Se produce la entrada en pérdida"]'::jsonb, 0, 'En perfil simétrico cuerda y línea de curvatura coinciden y con ángulo cero no hay sustentación (p. 15).', 'p. 15', 2, false),
  ('10000009-0000-4000-8002-000000000027', '00000000-0000-4000-8000-000000006009', '¿Cómo se calcula el alargamiento del ala?', '["Cuerda en el encastre dividida por cuerda en la punta", "Envergadura dividida por la cuerda media", "Envergadura multiplicada por la cuerda media", "Superficie alar dividida por el peso"]'::jsonb, 1, 'Alargamiento = envergadura / cuerda media (p. 15).', 'p. 15', 2, false),
  ('10000009-0000-4000-8002-000000000028', '00000000-0000-4000-8000-000000006009', '¿Alrededor de qué eje se produce el cabeceo y qué superficie lo controla?', '["Eje longitudinal; alerones", "Eje vertical; timón de dirección", "Eje lateral; alerones", "Eje lateral; timones de profundidad"]'::jsonb, 3, 'El cabeceo es alrededor del eje lateral y lo controlan los elevadores (p. 17).', 'p. 17', 1, false),
  ('10000009-0000-4000-8002-000000000029', '00000000-0000-4000-8000-000000006009', '¿Qué superficie controla la guiñada y cómo se acciona?', '["Los alerones, girando la palanca", "El timón de profundidad, tirando de la palanca", "Los flaps, mediante su palanca", "El timón de dirección, mediante los pedales"]'::jsonb, 3, 'El timón de dirección controla la guiñada y se acciona con los pedales (p. 18).', 'p. 18', 2, false),
  ('10000009-0000-4000-8002-000000000030', '00000000-0000-4000-8000-000000006009', '¿Cómo funcionan los spoilers deflectados simétricamente?', '["Como mando de alabeo a altas velocidades", "Como aerofrenos, reduciendo sustentación y aumentando resistencia", "Como hipersustentadores en el borde de ataque", "Como compensadores del timón de dirección"]'::jsonb, 1, 'Simétricos funcionan como aerofrenos; asimétricos, como mando de alabeo (p. 19).', 'p. 19', 2, false),
  ('10000009-0000-4000-8002-000000000031', '00000000-0000-4000-8000-000000006009', '¿Qué consiguen slats y flaps?', '["Reducir la sustentación y aumentar la resistencia", "Anular el momento de charnela", "Aumentar el CLmax y reducir velocidades y longitudes de pista de despegue y aterrizaje", "Aumentar la velocidad de pérdida"]'::jsonb, 2, 'Los hipersustentadores aumentan CLmax y reducen velocidades y pistas necesarias (p. 19).', 'p. 19', 1, false),
  ('10000009-0000-4000-8002-000000000032', '00000000-0000-4000-8000-000000006009', '¿Para qué se utiliza el trim tab?', '["Para anular el momento de charnela y, con él, la fuerza en la palanca", "Para aumentar la sustentación en el despegue", "Para frenar el avión en tierra", "Para controlar el alabeo a altas velocidades"]'::jsonb, 0, 'El tab anula el momento de charnela y por tanto la fuerza en el mando (p. 19).', 'p. 19', 2, false),
  ('10000009-0000-4000-8002-000000000033', '00000000-0000-4000-8000-000000006009', '¿Qué es la velocidad V1?', '["La velocidad de decisión: antes se aborta el despegue y después se continúa", "La velocidad a la que el avión se va al aire", "La velocidad de pérdida en configuración de aterrizaje", "La velocidad mínima de control en el aire"]'::jsonb, 0, 'V1 es la velocidad de decisión entre abortar y continuar (p. 20).', 'p. 20', 1, false),
  ('10000009-0000-4000-8002-000000000034', '00000000-0000-4000-8000-000000006009', 'Según el PDF, ¿qué condición cumple la velocidad de rotación VR?', '["VR ≤ V1 y VR ≤ 1,05 VMC", "VR = 1,3 VS", "VR ≥ V1 y VR ≥ 1,05 VMC", "VR ≥ 1,2 VS y VR ≤ V1"]'::jsonb, 2, 'VR no puede ser inferior a V1 ni a 1,05 VMC (p. 20).', 'p. 20', 3, false),
  ('10000009-0000-4000-8002-000000000035', '00000000-0000-4000-8000-000000006009', '¿A qué altura debe alcanzarse V2 al final de la distancia de pista requerida?', '["50 ft", "400 ft", "15 ft", "35 ft"]'::jsonb, 3, 'V2 se debe alcanzar a 35 ft al final de la distancia de pista requerida (p. 21).', 'p. 21', 2, false),
  ('10000009-0000-4000-8002-000000000036', '00000000-0000-4000-8000-000000006009', '¿Con cuál de las tres distancias reguladas se adapta el peso de despegue?', '["La más corta de ellas", "La más larga de ellas", "La media de ellas", "Solo con la distancia de aceleración-parada"]'::jsonb, 1, 'El peso de despegue se adapta a la más larga de las tres distancias (p. 21).', 'p. 21', 2, false),
  ('10000009-0000-4000-8002-000000000037', '00000000-0000-4000-8000-000000006009', '¿Qué es el clearway?', '["Una zona en la prolongación de pista que soporta el avión, para frenar un despegue abortado", "Una zona libre de obstáculos en la prolongación del eje de pista, usable solo para la subida", "La zona de pista tras V1", "El área de toma de contacto"]'::jsonb, 1, 'El clearway es zona libre de obstáculos usable solo para la subida; el stopway sirve para frenar (p. 22).', 'p. 22', 2, false),
  ('10000009-0000-4000-8002-000000000038', '00000000-0000-4000-8000-000000006009', '¿Qué velocidad es VREF y a qué altura se requiere?', '["1,15 veces la velocidad de pérdida en aterrizaje, a 35 ft", "1,3 veces VMC, a 400 ft", "1,05 veces V1, a 50 ft", "1,3 veces la velocidad de pérdida en aterrizaje, a 50 ft sobre el umbral"]'::jsonb, 3, 'VREF = 1,3 VSO a 50 ft sobre el umbral; VTD = 1,15 VSO (p. 22).', 'p. 22', 2, false),
  ('10000009-0000-4000-8002-000000000039', '00000000-0000-4000-8000-000000006009', 'Con pista mojada o contaminada, ¿cuál es el método más efectivo para parar el avión según el PDF?', '["El uso de la reversa", "El uso exclusivo de los frenos", "Aumentar los flaps", "Reducir el peso en vuelo"]'::jsonb, 0, 'El PDF indica que el método más efectivo para parar es la reversa (p. 23).', 'p. 23', 2, false),
  ('10000009-0000-4000-8002-000000000040', '00000000-0000-4000-8000-000000006009', '¿Cómo se determina el peso máximo de aterrizaje permitido?', '["Es el mayor de los pesos dictados por pista y ascenso", "Solo depende de la longitud de pista", "Es el menor de los pesos dictados por los requisitos de pista y de ascenso en aproximación", "Es igual al peso máximo de despegue"]'::jsonb, 2, 'El peso máximo de aterrizaje es el menor según pista de aterrizaje y ascenso en aproximación (p. 23).', 'p. 23', 3, false)
on conflict (id) do nothing;
