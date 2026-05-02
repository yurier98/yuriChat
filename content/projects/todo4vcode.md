---
slug: todo4vcode
title: ToDo4VCode
description: Extensión de gestión de tareas para VS Code y editores compatibles, creada para planificar, priorizar y conectar tareas con el código sin salir del entorno de desarrollo.
publishedAt: 2025/12/31
readingTime: 5
cover: todo4vcode/cover.webp
favorite: true
tags:
  - VS Code Extension
  - TypeScript
  - Productividad
  - Developer Tools
  - Open Source
  - Kanban
  - Planificación
---

# ToDo4VCode

ToDo4VCode es una extensión de gestión de tareas para VS Code y editores compatibles con su ecosistema, como Cursor, Antigravity y otros forks. La creé con una idea muy clara: reducir el salto constante entre el editor, herramientas de planificación, tableros externos y gestores de prioridades.

El problema era cotidiano. Muchos desarrolladores escriben código en un lugar, planifican tareas en otra plataforma, priorizan en otro sistema y terminan cambiando de contexto demasiadas veces durante el día. Ese flujo rompe el enfoque, hace más lenta la ejecución y convierte la organización del proyecto en una carga adicional. ToDo4VCode lleva esa planificación al mismo espacio donde ocurre el trabajo técnico.

Lancé la extensión el 31 de diciembre, en Nochevieja, como una primera versión centrada en tareas, prioridades, fechas y recordatorios dentro del editor. Desde entonces ha evolucionado hasta convertirse en una herramienta de planificación más completa para proyectos reales: lista, Kanban, calendario, subtareas, filtros, datos compartidos por Git y tareas conectadas directamente con fragmentos de código.

## Impacto

El proyecto está publicado en [Open VSX](https://open-vsx.org/extension/YurierHerrera/todo4vcode), en el [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=YurierHerrera.todo4vcode) y su código está disponible en [GitHub](https://github.com/yurier98/ToDo4VCode).

En Open VSX superó las 1.000 descargas, una señal importante porque ese registro es el canal natural para muchos editores compatibles con VS Code que no dependen directamente del marketplace de Microsoft. La extensión también mantiene una valoración pública de 5 estrellas, con comentarios que destacan su utilidad y simplicidad.

Ese crecimiento confirma la hipótesis inicial: los desarrolladores no necesitan otro tablero aislado, necesitan una forma más directa de convertir el trabajo pendiente en acciones visibles dentro del editor.

## Funciones principales

- Priorización MoSCoW para clasificar tareas como Must, Should, Could o Won't y enfocarse en impacto real.
- Tres vistas conectadas: lista para ejecución rápida, Kanban para seguimiento de estados y calendario para planificación temporal.
- Calendario compacto en la barra lateral y calendario completo para mover tareas visualmente entre días o dejarlas sin fecha.
- Subtareas con seguimiento de progreso para dividir tareas grandes sin perder contexto.
- Recordatorios integrados en VS Code para fechas importantes.
- Estadísticas en la barra de estado con conteos de tareas críticas, en progreso, completadas y vencidas.
- Filtros por búsqueda, etiquetas y tareas completadas.
- Enlaces entre código y tareas: una selección del editor puede convertirse en tarea o adjuntarse a una tarea existente.
- Tareas compartidas opcionales en `.todo4vcode/shared-tasks.json`, pensadas para versionarse con Git y colaborar en equipo.
- Importación y exportación en JSON para respaldar, migrar o reutilizar datos en flujos con agentes y herramientas de desarrollo.

## Evolución del producto

La primera versión pública partió de una base simple: gestión de tareas, sistema de prioridades, vistas Lista y Kanban, fechas, recordatorios, subtareas, estadísticas y soporte visual para temas de VS Code.

La versión 1.1 mejoró la experiencia diaria: persistencia independiente entre barra lateral y pantalla completa, tarjetas clicables, ajustes visuales, prevención de múltiples paneles abiertos y apertura del detalle de tarea desde notificaciones.

La versión 1.2 respondió a necesidades de control y portabilidad: panel de configuración, importación/exportación de datos, sincronización automática de ajustes y una corrección importante para evitar pérdida de subtareas al guardar.

La versión 1.3 amplió el alcance hacia una planificación más profesional: calendario en sidebar y pantalla completa, matriz drag-and-drop, filtros más consistentes, mejor manejo de etiquetas, referencias directas a código, tareas compartidas por Git e importación automática de comentarios `TODO`, `FIXME` y `NOTE` desde el workspace.

Más que agregar funciones por volumen, la extensión ha ido acercándose a los patrones reales de trabajo: planificar, ejecutar, revisar código, colaborar y mantener el backlog del proyecto sin salir del editor.

## Aprendizajes

Este proyecto me enseñó que una herramienta pequeña puede tener impacto si elimina fricción en un punto muy frecuente del flujo de trabajo. La clave no fue crear otro sistema de gestión de proyectos, sino integrar las decisiones de prioridad y seguimiento en el lugar donde el desarrollador ya está concentrado.

También reforzó la importancia de publicar en canales abiertos como Open VSX. Muchos usuarios trabajan en Cursor, Antigravity u otros entornos compatibles con VS Code, y para ellos Open VSX puede ser más relevante que el marketplace tradicional de Microsoft.

![ToDo4VCode interface](/projects/todo4vcode/cover.webp)
![ToDo4VCode Kanban](/projects/todo4vcode/kanban.webp)
![ToDo4VCode calendar planning](/projects/todo4vcode/calendar.webp)
![ToDo4VCode task details](/projects/todo4vcode/task-details.webp)
