# Empieza aquí

Te han nombrado jefe del Grupo de Plataforma para Desarrolladores de Kestrel Parcel, una empresa ficticia de logística de paquetería. Este repositorio es tu escritorio durante los próximos dos trimestres.

> Idioma: la app tiene un menú **Idioma** (English / Español) arriba a la izquierda. Las misiones, rúbricas y esta guía están traducidas; los documentos de `leadership/` y `technical/` siguen en inglés (ver [`docs/translating.md`](docs/translating.md)).

## 1. Ejecuta la app

```bash
pip install -r requirements.txt
python3 app/server.py
```

Elige **Sprint** o **Simulación completa**. La primera pantalla es tu encargo de la CTO, Elena Ríos. Léelo; todo lo que hagas aquí es tu respuesta a ese encargo.

## 2. Abre el repositorio en una herramienta de IA

Sirve cualquier herramienta que lea un repositorio. Empieza con:

> Run mission s1 with me.  (o: «Haz la misión s1 conmigo».)

o `m0` para la simulación completa. La herramienta sigue `AGENTS.md`: presenta la situación, interpreta a las personas, cuestiona tu razonamiento y comenta tus respuestas orales. No escribe tus documentos. Si elegiste Español en la app, te hablará en español.

## 3. Trabaja una misión

Cada misión tiene cinco pasos.

| Paso | Qué haces |
| --- | --- |
| **Leer** | Los documentos que lista la misión, más tu propio material de estudio |
| **Anotar** | La teoría con tus palabras, en `notes/study-notes.md` |
| **Decidir** | Una decisión y un documento, escritos como jefe del grupo. Algunas decisiones cuestan presupuesto; regístralas en la app |
| **Verlo funcionar** | El mecanismo detrás de la decisión: lee la página técnica o los datos |
| **Decirlo** | Responde en voz alta la pregunta de la misión y luego al agente |

Marca las tareas en la app conforme avances. Los entregables pasan a «Lista» cuando el archivo existe y está completo.

## 4. Pide una revisión

En cada punto de control, dile a tu herramienta de IA:

> Run the review-checkpoint skill for cp1.

Califica cada entregable contra la rúbrica de 0 a 3, citando tu propio texto como evidencia, y escribe el resultado donde la app pueda mostrarlo. Un entregable aprueba con promedio de 2 y ningún cero. Corrige y pide otra revisión; el historial se conserva.

El último punto de control incluye un examen oral cronometrado: un informe de diez minutos al comité ejecutivo y veinte minutos de preguntas.

## Las personas

Todas son ficticias. Cada una la interpreta un agente en `.claude/agents/`.

| Persona | Puesto |
| --- | --- |
| Elena Ríos | CTO. Viene de operaciones y finanzas |
| Tomás Leal | VP de Ingeniería, tu jefe |
| Paula | Ingeniera de plataforma, pipelines y entorno de ejecución |
| Hugo | Guild Lead de backend |
| Ana | Desarrolladora de planta, clasificación en el hub |
| Victor | Desarrollador contratista, planeación de rutas |
| Marcela Ibarra | Gerente de cuenta en Altos Delivery, un proveedor |
| Lucía Montes | Business partner de Finanzas |
| Iván Cano | Jefe de seguridad de la información |

## Hábitos de trabajo

- Haz commit después de cada misión. El historial es tu registro.
- Escribe en borrador y mejora después de la revisión.
- Cuando un agente cuestione una respuesta, pon la mejor respuesta en la sección 10 de tus notas.
- Los datos tienen cosas que un lector cuidadoso encuentra y uno apresurado malinterpreta. No abras `practice/rubrics.yaml` buscándolas.

## Mantén lo privado en privado

Si tu fork es público, guarda empleadores reales, detalles de entrevistas y tus propias cifras de carrera en `notes/private/`, que Git ignora. El material de Kestrel Parcel y la teoría general pueden estar a la vista.

## Si solo tienes una hora

Haz la sesión 1 del sprint: lee el puesto, el escenario y la anatomía de un IDP, reescribe la misión del charter con tus palabras y responde en voz alta: «Si tuvieras este puesto, ¿cómo empezarías la creación, implementación y control de la plataforma?»
