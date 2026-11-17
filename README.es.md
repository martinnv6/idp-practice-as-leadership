# IDP practice as leadership (en español)

Una práctica para **liderar** una Internal Developer Platform (IDP). Interpretas al jefe recién nombrado de un grupo de plataforma en una empresa ficticia. Una app local te presenta las situaciones que traería el puesto, registra los documentos que produces y muestra las revisiones de tu trabajo. Una herramienta de IA a tu elección interpreta a las personas a tu alrededor y te examina en los puntos de control.

El foco es el liderazgo: estrategia, adopción, medición, gobernanza, presupuesto, proveedores, IA y personas. No hay plataforma que instalar. Los datos de la plataforma son simulados, así que el trabajo es leer números, decidir, escribir y defender.

La empresa, **Kestrel Parcel**, es ficticia y todas las cifras son cifras de práctica.

## Idioma

La app trae un menú **Idioma** (English / Español) arriba a la izquierda. Al elegir Español se traducen la interfaz, las misiones, las decisiones, las rúbricas y esta guía. Tu elección se guarda en `progress/state.json`, y las herramientas de IA que sigan `AGENTS.md` te hablarán en ese idioma.

Los documentos de estudio (`leadership/`, `technical/`, `docs/`) siguen en inglés. Cuando exista una versión `nombre.es.md` junto a un documento, el lector de la app la muestra al elegir Español. Cómo añadir traducciones: [`docs/translating.md`](docs/translating.md).

## Inicio rápido

Requiere Python 3.10 o posterior.

```bash
# 1. Haz un fork de este repositorio en GitHub y clona tu fork
git clone https://github.com/<tu-usuario>/idp-practice-as-leadership.git
cd idp-practice-as-leadership

# 2. Instala la única dependencia
pip install -r requirements.txt

# 3. Ejecuta la app
python3 app/server.py
```

Tu navegador abre `http://127.0.0.1:8765`. Elige el idioma y un ritmo, y la app abre tu encargo de la CTO.

Después abre la carpeta del repositorio en una herramienta de IA para programar (Claude Code, Antigravity, Cursor, Copilot o similar) y di:

> Run mission s1 with me.

La herramienta lee `AGENTS.md`, interpreta a las personas y cuestiona tus respuestas. No escribirá tus documentos. Sigue en [`START-HERE.es.md`](START-HERE.es.md).

## Cómo funciona la práctica

| Paso | Qué haces | Dónde |
| --- | --- | --- |
| Leer | La teoría de la misión | Documentos que lista la misión |
| Anotar | Escríbela con tus palabras | `notes/study-notes.md` |
| Decidir | Toma la decisión de liderazgo y escribe el documento | `leadership/` |
| Verlo funcionar | Entiende el mecanismo detrás | `technical/` y la pantalla Datos |
| Decirlo | Responde en voz alta la pregunta de la misión | A un agente de IA |

Dos ritmos:

- **Sprint:** cuatro sesiones de unos 90 minutos, para cuando una entrevista está cerca.
- **Simulación completa:** once misiones que siguen los dos primeros trimestres en el puesto, con cuatro puntos de control y un examen oral final.

## Qué muestra la app

| Pantalla | Para qué sirve |
| --- | --- |
| Resumen y bandeja | Mensajes de las personas, que llegan conforme avanzas |
| Misiones | Tareas por marcar, herramientas, entregables y su estado |
| Datos | Métricas de entrega, encuesta, scorecards, gasto y embudo de adopción simulados |
| Presupuesto | Lo que cuestan tus decisiones frente al presupuesto, y tu tiempo |
| Marcador | Avance y calificaciones por competencia |
| Revisiones | Revisiones calificadas con evidencia citada de tus propios documentos |

La app detecta si cada entregable existe y está completo. La calidad se juzga en los puntos de control: pide a tu herramienta de IA «run the review-checkpoint skill for cp1» y recarga la pantalla Revisiones.

## Mapa del repositorio

```
START-HERE.md        lee esto después del inicio rápido (START-HERE.es.md en español)
app/                 la app de práctica
practice/            misiones, rúbricas, datos simulados; i18n/ con las traducciones
progress/            tu estado y revisiones (se crea al empezar)
leadership/          los documentos que escribirás y sus plantillas
technical/           cómo funciona una IDP, con la profundidad que necesita un líder
notes/               tus notas de estudio; notes/private/ lo ignora Git
docs/                mapa de estándares, glosario, referencias, guía de traducción
.claude/             skills (tutor, examinador) y el elenco
scripts/             validación, avance, generador de datos
```

## Cómo conservar tu trabajo

Tu fork es tu cuaderno de trabajo. Haz commit de tus documentos y de `progress/` conforme avances para que el historial muestre cómo cambió tu pensamiento. Guarda lo personal (empleadores reales, detalles de entrevistas, tus propias cifras de carrera) en `notes/private/`, que Git ignora.

## Comprobaciones

```bash
python3 scripts/validate.py         # archivos y referencias son coherentes
python3 scripts/check_progress.py   # qué entregables están listos
python3 app/server.py --check       # los datos de la app y las traducciones cargan
```

## Límites

- El conjunto de datos es inventado y pequeño. Enseña a leer datos de plataforma, no cómo son los números reales.
- Las revisiones de IA son una ayuda de estudio. Siguen las rúbricas de `practice/rubrics.yaml` y pueden equivocarse; discútelas.
- `technical/appendix/` contiene un plan práctico opcional y una configuración inicial que nunca se han ejecutado.
