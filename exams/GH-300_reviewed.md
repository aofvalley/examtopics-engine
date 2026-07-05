# GH-300 — Solucionario validado (Microsoft Learn)

> Copia revisada de `GH-300.md`. Cada pregunta incluye la **respuesta validada** contra la
> documentación oficial de Microsoft Learn (guía de estudio GH-300 y módulos de training:
> *Responsible AI*, *Prompt engineering*, *Management & customizations*, *Copilot data & architecture*).
>
> Leyenda: ✅ correcta y confirmada · ⚠️ comunidad dividida / matiz · 🔴 pregunta obsoleta o respuesta más votada dudosa.

---

## Tema 1 — IA Responsable

### Q1.1 — Principio ético que asegura trato igualitario
**Answer: B (Fairness)** ✅ — Fairness = los sistemas de IA deben tratar a todas las personas por igual.

### Q1.2 — Minimizar sesgo durante el desarrollo
**Answer: C** ✅ — Datos diversos + métricas de fairness + supervisión humana.

### Q1.3 — Importancia de la seguridad del código en Gen AI
**Answer: A** ⚠️ — Principio *Privacy & Security*: evitar accesos no autorizados y brechas de datos. (Algunos votan C «integridad»; A es lo más alineado.)

### Q1.4 — Promover transparencia en filtrado de contenido
**Answer: A** ✅ — Explicar qué filtra la IA y cómo llega a la conclusión.

### Q1.5 — Cómo genera respuestas Copilot Chat
**Answer: B** ✅ — Combina training data + código de repos del usuario + fuentes externas (Bing).

### Q1.6 — Principio "entendible / información clara"
**Answer: C (Transparency)** ✅

### Q1.7 — Riesgo asociado al uso de IA
**Answer: D** ✅ — Decisiones difíciles de interpretar (problema de "caja negra").

### Q1.8 — Contenido marcado por el filtro de toxicidad (2)
**Answer: A, B** ✅ — Discurso de odio/discriminatorio + contenido sexual explícito.

### Q1.9 — Integrar fairness al **operar** la herramienta
**Answer: C** ⚠️ — Al «operar» → monitorización continua del rendimiento/outputs. (Si fuera fase de desarrollo sería B; comunidad dividida B/C.)

### Q1.10 — Riesgos de depender mucho de Copilot (2)
**Answer: A, B** ✅ — Puede introducir vulnerabilidades + no siempre refleja best practices.

### Q1.11 — Por qué Gen AI produce salidas inexactas
**Answer: C** ✅ — El training data puede contener sesgos o inconsistencias.

### Q1.12 — Copilot y análisis estadístico
**Answer: D** ✅ — Sugerencias basadas en tendencias; pueden no aplicar a un dataset concreto.

---

## Tema 2 — Planes y gestión

### Q2.1 — Rol del comando `/optimize`
**Answer: D** ✅ — Mejora el rendimiento analizando la complejidad en runtime.

### Q2.2 — Plan de Copilot para Azure DevOps sin licencia GHE
**Answer: B** 🔴 — Pregunta **obsoleta/errónea**: no existe un plan oficial "Copilot for Azure DevOps" (es una extensión que usa Individual/Business). B es la clave histórica del examen.

### Q2.3 — Política org-wide para restringir Copilot a ciertos repos
**Answer: C** ✅ — Configurar las políticas en organization settings.

### Q2.4 — Información recuperable vía REST (Business) (2)
**Answer: B, C** ✅ — Listar asignaciones de seats + resumen de uso.

### Q2.5 — Feedback de Copilot Chat en GitHub Mobile
**Answer: C** ✅ — Emojis en la interfaz del chat.

### Q2.6 — Función del comando `/fix`
**Answer: A** ✅ — Propone correcciones de sintaxis y errores de programación.

### Q2.7 — Planes que excluyen tus datos del training por defecto (2)
**Answer: B, D** ✅ — Business + Enterprise.

### Q2.8 — Funciones de Chat accesibles desde el IDE (2)
**Answer: A, C** ✅ — Explicar código/sugerir mejoras + generar tests unitarios.

### Q2.9 — Funciones de Copilot Enterprise disponibles en TODOS los IDE
**Answer: C** ⚠️ — Solo *inline suggestions* está en todos (Chat no está en Neovim).

### Q2.10 — Navegar para configurar duplicate detection (2)
**Answer: A, B** ⚠️ — Organization settings → Copilot → Policies **y** Enterprise settings → Copilot → Policies.

### Q2.11 — Insights de la usage metrics API (2)
**Answer: B, D** ✅ — Nº de sugerencias aceptadas + métricas específicas de Copilot Chat.

### Q2.12 — Generar sugerencias en la CLI
**Answer: D** ✅ — `gh copilot suggest` → escribir el comando → elegir sugerencia.

### Q2.13 — Verdadero sobre code suggestions (2)
**Answer: D, E** ✅ — Atajos para aceptar la siguiente palabra + alternativas en pestaña nueva.

### Q2.14 — Motivos por los que no funcionan las sugerencias (3)
**Answer: A, B, D** ⚠️ — Sin internet + lenguaje no soportado + sin licencia válida. (E, content exclusion, también es defendible.)

### Q2.15 — Uso de insights de la metrics API para mejorar el proceso
**Answer: D** ⚠️ — Insights sobre en qué lenguajes es más útil Copilot. (Respuesta única; algunos añaden C.)

### Q2.16 — Feedback de Copilot Chat desde el IDE
**Answer: B** ✅ — Botón "Share Feedback" en el panel de Chat.

### Q2.17 — Ajustes configurables de Copilot en la CLI (2)
**Answer: A, C** ⚠️ — Usage analytics + default execution confirmation.

### Q2.18 — Contenido que responde el Knowledge Base (3)
**Answer: B, C, E** ✅ — Code snippets + design patterns + documentación.

### Q2.19 — Cómo se paga Copilot Individual en open source
**Answer: C** ⚠️ — Según el método de pago del perfil de usuario. (D «gratis para TODO open source» es demasiado amplio: solo mantenedores verificados.)

### Q2.20 — Propósito de los audit logs (Business)
**Answer: D** ✅ — Monitorizar las actividades y acciones de los administradores.

### Q2.21 — Retención de datos Copilot (Business/Enterprise) (2)
**Answer: B, C** ✅ — Prompts/Suggestions no retenidos (IDE) + User Engagement Data 2 años.

### Q2.22 — Copilot Enterprise en code reviews de PR (2)
**Answer: A, B** ✅ — Resumen en prosa + lista de cambios y responder sobre el changeset.

### Q2.25 — Funciones de Copilot Individual en VS/VS Code/JetBrains (2)
**Answer: A, C** ✅ — Chat + code suggestions.

### Q2.26 — Plan para un contractor independiente
**Answer: A** ✅ — GitHub Copilot Individual.

### Q2.28 — Plan que permite recolección de prompts/suggestions
**Answer: A** ✅ — GitHub Copilot Individual.

### Q2.33 — Correcto sobre GitHub Copilot Knowledge Bases
**Answer: D** ✅ — Es una feature Enterprise (hoy migrada a Copilot Spaces).

### Q2.34 — Método para interactuar con Copilot
**Answer: B** ✅ — Mediante una GitHub CLI correctamente configurada.

### Q2.35 — BitBucket + gestión con IdP (Okta), coste-efectivo
**Answer: D** ✅ — GitHub Copilot Business for non-GHE customers.

---

## Tema 3 — Datos y arquitectura

### Q3.1 — Efecto de entrenar en patrones comunes
**Answer: D** ✅ — Sugiere código que refleja las prácticas más comunes del training data.

### Q3.2 — Manejo de features deprecated
**Answer: B** ✅ — Puede sugerir sintaxis deprecated si está presente en el training data.

### Q3.3 — Pasos del ciclo de vida de una sugerencia (2)
**Answer: B, E** ✅ — Capturar el contexto del usuario + generar sugerencias.

### Q3.4 — Rol del pre-proceso del input en Copilot Chat
**Answer: C** ✅ — Enriquece el prompt con contexto antes de pasarlo al modelo.

### Q3.5 — Checks adicionales antes de entregar la respuesta (2)
**Answer: A, D** ⚠️ — Code quality + Matching public code (opcional). (Grounded en el módulo de data & architecture; no B.)

### Q3.6 — Limitaciones potenciales de Copilot Chat (2)
**Answer: A, B** ⚠️ — Manejo de estructuras de código complejas + training data limitado. (C y D están redactadas como fortalezas.)

### Q3.7 — Impacto de "Fill-In-the-Middle" (FIM)
**Answer: A** ✅ — Considera prefijo y sufijo para rellenar el medio con más precisión.

### Q3.8 — Cómo usa Copilot Individual los datos del prompt (2)
**Answer: A, C** ✅ — Input en tiempo real para contexto + entrenar modelos ML.

### Q3.9 — Qué determina el contexto del prompt en el IDE
**Answer: A** ✅ — Info del IDE: tabs abiertos, posición del cursor, código seleccionado.

### Q3.10 — De dónde deriva contexto el LLM
**Answer: D** ✅ — Archivos vecinos o relacionados del proyecto.

### Q3.11 — Beneficio de usar custom models
**Answer: D** ✅ — Las respuestas usan prácticas y patrones de tus repos.

### Q3.12 — Cómo maneja/bloquea código público (2)
**Answer: A, B** ✅ — Safeguards contra snippets verbatim + filtrar coincidencias de repos públicos.

### Q3.13 — Uso del historial de chat en las completions
**Answer: D** ✅ — Ofrece snippets personalizados según prompts previos.

### Q3.14 — Propósito del filtro de detección de duplicados
**Answer: D** ✅ — Detecta/bloquea coincidencias con código público de ~150 caracteres.

### Q3.15 — Dónde se aloja el proxy service
**Answer: C (Microsoft Azure)** ✅

### Q3.16 — Copilot en la fase de análisis de requisitos (SDLC)
**Answer: C** ✅ — Plantillas y snippets para documentar requisitos.

### Q3.17 — Cómo mejorar el contexto de Copilot (2)
**Answer: A, D** ✅ — Añadir variables (#selection) + abrir las tabs relevantes en el IDE.

---

## Tema 4 — Prompt engineering

### Q4.1 — Estrategia para mejorar la relevancia
**Answer: B** ✅ — Proveer ejemplos de input y output esperados.

### Q4.2 — Qué es zero-shot prompting
**Answer: B** ✅ — Dar solo la pregunta como prompt, sin ejemplos.

### Q4.3 — Formas de dar contexto para respuestas precisas (2)
**Answer: A, D** ✅ — Participantes como @workspace + variables #file/#editors.

### Q4.4 — Estrategia para aumentar el rendimiento de Copilot Chat
**Answer: C** ✅ — Aplicar técnicas de prompt engineering (ser más específico).

### Q4.5 — Qué es few-shot prompting
**Answer: D** ⚠️ — Few-shot = varios ejemplos; ninguna opción lo redacta literal, D es la aceptada.

### Q4.6 — Rol del historial de chat en las sugerencias
**Answer: B** ✅ — Aporta contexto, mejorando relevancia y precisión.

### Q4.7 — Técnicas para mejorar prompts (2)
**Answer: A, B** ✅ — Criterios de éxito específicos + enlaces a documentación de apoyo.

### Q4.8 — Qué describe el role prompting
**Answer: A** ⚠️🔴 — Role prompting (Microsoft Learn) = instruir a Copilot para actuar como un experto/rol específico. La cita a favor de B (tono de voz) es una **lectura errónea** del doc.

---

## Tema 5 — Productividad

### Q5.1 — Apoyo de Copilot en el refactoring (2)
**Answer: A, B** ✅ — Mejorar legibilidad/mantenibilidad + ejemplos de transformación que mejoran rendimiento/complejidad.

### Q5.2 — Buena práctica para mejorar calidad con Chat
**Answer: B** ✅ — Revisar y refactorizar regularmente el código sugerido.

### Q5.3 — Copilot en la fase de diseño (SDLC)
**Answer: B** ✅ — Sugerir design patterns y best practices relevantes.

### Q5.4 — Limitaciones en el refactoring
**Answer: A** ✅ — No siempre produce código óptimo/best-practice.

### Q5.5 — Cómo minimiza el context switching
**Answer: B** ✅ — Permite al developer permanecer en su IDE.

### Q5.6 — Limitaciones al mantener codebases existentes
**Answer: D** ✅ — Puede no entender del todo el contexto/dependencias de un codebase grande.

### Q5.7 — Cómo ayuda a escribir documentación
**Answer: A** ✅ — Sugerir resúmenes/descripciones según la funcionalidad del código.

### Q5.8 — Cómo reduce el boilerplate manual
**Answer: B** ✅ — Sugerir snippets reutilizables en distintas partes del proyecto.

### Q5.9 — Escenarios de productividad con Chat (2)
**Answer: A, D** ✅ — Crear documentación + ayudar a un nuevo dev a entender el código.

### Q5.10 — Cómo ayuda a corregir problemas de seguridad
**Answer: B** ✅ — Anota las sugerencias con patrones de vulnerabilidad conocidos.

### Q5.11 — Uso previsto de Copilot Chat
**Answer: B** ✅ — Herramienta de productividad que sugiere, apoyándose en el juicio humano.

### Q5.12 — Prompts para refactorizar por calidad (2)
**Answer: A, B** ✅ — Mejorar mantenibilidad + mejorar legibilidad.

### Q5.13 — Cómo ayuda a modernizar aplicaciones
**Answer: A** ✅ — Sugerir patrones de programación modernos según tu código.

### Q5.14 — Cómo asiste en tareas de refactoring
**Answer: B** ✅ — Sugerir mejoras de refactoring para mejor calidad.

### Q5.15 — Aprender un nuevo lenguaje de programación
**Answer: B** ✅ — Chat da guía/soporte para tareas comunes en el lenguaje objetivo.

### Q5.16 — Métodos para generar datos de muestra (2)
**Answer: C, D** ✅ — Basado en documentación de API del repo + patrones del training data.

### Q5.17 — Sugerencias inline para refactorizar (2)
**Answer: A, B** ✅ — Comando `/fix` en inline chat + comentarios que disparan una sugerencia.

---

## Tema 6 — Testing

### Q6.1 — Cautela en cálculos matemáticos
**Answer: D** ✅ — Depende de respuestas basadas en patrones, sin verificar la exactitud.

### Q6.2 — Guiar a Copilot a los estándares de testing de la empresa
**Answer: D** ✅ — Con ejemplos específicos de prompt en la petición al chat.

### Q6.3 — Factor más importante para identificar tests faltantes
**Answer: C** ✅ — Asegurar que Copilot dispone del contexto correcto.

### Q6.4 — Cómo ayuda a mantener consistencia en los tests
**Answer: C** ✅ — Identifica un patrón en cómo escribes tests y lo sugiere para los futuros.

### Q6.5 — Slash command para generar tests unitarios
**Answer: C (`/tests`)** ✅

### Q6.6 — Impacto de Copilot en el proceso de desarrollo
**Answer: B** ✅ — Aumenta la productividad automatizando tareas repetitivas.

### Q6.7 — Casos de uso donde Chat es más efectivo (2)
**Answer: B, D** ✅ — Test unitario para código Python nuevo + explicar/traducir COBOL legacy.

### Q6.8 — Por qué sigue siendo necesario el code review
**Answer: D** ✅ — Los tests generados pueden no cubrir todos los escenarios posibles.

---

## Tema 7 — Privacidad, exclusiones y salvaguardas

### Q7.1 — Dónde validar si no hay sugerencias por content exclusions
**Answer: D** ✅ — El icono de Copilot en la status bar del editor muestra el mensaje.

### Q7.2 — Cuándo puede Copilot usar contenido excluido
**Answer: D** ✅ — Si el contenido excluido se referencia en código no excluido (p. ej. llamadas a funciones).

### Q7.3 — Configuración para proteger contra infracciones de IP
**Answer: B** ✅ — Blocking public code matches.

### Q7.4 — Limitación de las content exclusions
**Answer: A** ⚠️🔴 — Solo aplican a repos Git (no submódulos ni ficheros fuera de git) → se pueden sortear. La opción D (solo enterprise admin) es incorrecta: también las gestiona el owner de organización.

### Q7.5 — Contenido configurable para excluir (3)
**Answer: B, C, E** ✅ — Repositorios, ficheros y carpetas (no gists, no líneas sueltas).

### Q7.6 — Excluir ficheros usando Copilot Individual
**Answer: A** ✅ — Actualizar a Copilot Business (content exclusions requiere Business/Enterprise).

### Q7.7 — Qué revisar si las content exclusions no funcionan (2)
**Answer: B, C** ✅ — Que el usuario esté en una org con exclusiones + que los cambios se hicieran hace <30 min.

### Q7.8 — Prácticas que mejoran la calidad de las sugerencias (3)
**Answer: A, B, D** ✅ — Nombres de variable significativos + definir bien la tarea + ejemplos de salida deseada.

### Q7.9 — Consideración clave al confiar en las explicaciones de Chat
**Answer: D** ✅ — Revisar y validar la salida por exactitud y completitud.

### Q7.10 — Cómo asegura Chat que una función funciona
**Answer: B** ✅ — Sugiere asserts según el contexto y la semántica del código.

### Q7.12 — Feature configurable a nivel org para no sugerir código público
**Answer: C** ✅ — Filtro de detección de duplicados (Suggestions matching public code).

---

## Resumen de puntos de atención

- **T2 Q2** 🔴 obsoleta: no existe un plan oficial "Copilot for Azure DevOps".
- **T4 Q8 (role prompting)** → **A**, no B (la cita a Learn del comentario está mal aplicada).
- **T7 Q4 (limitación de exclusiones)** → **A**, no D (grounded: no cubre submódulos/ficheros fuera de git; las gestiona también la organización).
- **T3 Q5** → **A, D** (code quality + matching public code).
- **T3 Q6** → **A, B** (C y D redactadas como fortalezas, no limitaciones).
- Dependientes de redacción/versión: **T1 Q9**, **T2 Q10/Q14/Q15/Q17/Q19**, **T4 Q5**.

Fuentes: [Guía de estudio GH-300](https://learn.microsoft.com/credentials/certifications/resources/study-guides/gh-300) y módulos de Microsoft Learn (Prompt engineering, Management & customizations, Responsible AI, Copilot data & architecture).
