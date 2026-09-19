---
slug: arquitectura-multiagente-factibilidad
locale: es
title: "Arquitectura Multiagente para la Factibilidad de Proyectos: Diseño de un Sistema de Agentes Inteligentes con Orquestador"
description: Propuesta académica y de ingeniería para un sistema multiagente donde agentes especializados y un orquestador central garantizan rigor y trazabilidad.
readingTime: 9
publishedAt: 2026/09/12
tags:
  - ai
  - agents
  - architecture
  - project-management
---

# Arquitectura Multiagente para la Factibilidad de Proyectos

## Resumen

Evaluar la factibilidad de un proyecto exige integrar información heterogénea —técnica, financiera, de mercado, legal y operativa— que rara vez reside en una sola fuente. Este artículo propone una arquitectura de sistema multiagente (MAS) en la que un **orquestador central** coordina un conjunto de **agentes inteligentes especializados**, cada uno dotado de *skills* y *tools* propias, para producir un dictamen de factibilidad estructurado, trazable y auditable. La propuesta combina fundamentos de la teoría de agentes y sistemas multiagente con consideraciones concretas de ingeniería de software: contratos de interfaz, gestión de contexto, evaluación de resultados, control de costos y extensibilidad por dominio de proyecto. Se discuten el diseño del orquestador, el catálogo de agentes base, el mecanismo de adaptación según el tipo de proyecto, métricas de evaluación y limitaciones conocidas.

**Palabras clave:** sistemas multiagente, agentes inteligentes, LLM, factibilidad de proyectos, orquestación, ingeniería de software.

## 1. Introducción

La factibilidad de un proyecto es un problema de decisión multidimensional. No basta con saber si una idea es técnicamente construible; es necesario estimar costos y retornos, validar demanda, verificar restricciones regulatorias, dimensionar recursos operativos y anticipar riesgos. Cada dimensión tiene sus propios métodos, fuentes de datos y criterios de aceptación. En la práctica, este análisis lo ejecuta un equipo multidisciplinario que reúne especialistas en distintas áreas —ingeniería, finanzas, mercado, legal— y luego sintetiza sus hallazgos en una recomendación.

Los sistemas multiagente basados en modelos de lenguaje grande (LLM) ofrecen una analogía natural con este proceso: en lugar de un único modelo que intenta responder "todo sobre el proyecto", se distribuye el trabajo entre agentes especializados, cada uno responsable de una dimensión, bajo la supervisión de un coordinador. Esta separación no es solo organizativa; es una decisión de arquitectura que mejora la **modularidad**, la **trazabilidad** y la **capacidad de adaptación** a distintos tipos de proyecto.

Este artículo presenta el diseño de una arquitectura de este tipo. La sección 2 introduce los fundamentos de agentes y sistemas multiagente. La sección 3 modela la factibilidad como un problema distribuible. La sección 4 detalla la arquitectura propuesta: orquestador, catálogo de agentes y contrato común. La sección 5 explica el mecanismo de adaptación por dominio. La sección 6 aborda las consideraciones de ingeniería. La sección 7 propone métricas de evaluación y la sección 8 cierra con limitaciones y trabajo futuro.

## 2. Fundamentos: de un agente a un sistema multiagente

### 2.1 El agente como unidad de capacidad

Un **agente inteligente** es un sistema autónomo que percibe su entorno, razona sobre un objetivo y ejecuta acciones para alcanzarlo. En el contexto de los LLM, un agente combina:

- un **modelo de razonamiento** (el LLM) que decide qué hacer,
- un conjunto de **tools** —capacidades externas invocables como APIs, buscadores, calculadoras, ejecución de código o acceso a bases de datos—,
- un **bucle de control** que alterna pensamiento, acción y observación (el patrón *Thought–Action–Observation*, popularizado por ReAct), y
- **memoria** para retener contexto dentro de una tarea o entre tareas.

La distinción entre *skill* y *tool* es relevante para este diseño. Una **tool** es una primitiva de ejecución: "consultar API", "ejecutar script", "buscar en web". Un **skill** es una capacidad compuesta y reutilizable: un procedimiento que puede combinar varias tools, incluir heurísticas, formatos de salida y criterios de calidad. Si la tool es el músculo, el skill es el procedimiento entrenado que sabe cuándo y cómo usar cada músculo.

### 2.2 El sistema multiagente

Un **sistema multiagente** organiza varios agentes que colaboran para resolver un problema que excede la capacidad de uno solo. Los MAS se estudian desde hace décadas en inteligencia artificial distribuida, con conceptos como **roles**, **protocolos de comunicación**, **organización** y **resolución de conflictos** (Wooldridge, 2009). Los MAS modernos basados en LLM trasladan estos conceptos al software: cada agente encapsula un especialista, y la coordinación se resuelve por mensajes estructurados o por un agente supervisor.

El valor del MAS frente al agente único es triple:

1. **Especialización**: cada agente se entrena y configura para un dominio, con vocabulario, tools y criterios propios.
2. **Paralelismo**: dimensiones independientes se analizan concurrentemente.
3. **Auditoría**: cada contribución proviene de un componente identificable, lo que facilita revisar, corregir y responsabilizar.

## 3. La factibilidad como problema distribuible

Un análisis de factibilidad puede descomponerse en dimensiones semi-independientes. Esta descomposición es la clave que permite el enfoque multiagente.

| Dimensión | Pregunta central | Métodos y fuentes típicas |
|---|---|---|
| Técnica | ¿Se puede construir/implementar con la tecnología disponible? | Ingeniería, prototipos, benchmarking, expertos |
| Económico-financiera | ¿Es rentable? ¿Cuál es el CAPEX/OPEX, retorno e inversión? | Modelos financieros, flujos de caja, VAN, TIR, presupuestos |
| Mercado | ¿Existe demanda suficiente y sostenible? | Investigación de mercado, análisis de competencia, encuestas |
| Legal/regulatoria | ¿Cumple el marco normativo aplicable? | Legislación, permisos, contratos, compliance |
| Operativa | ¿Puede la organización ejecutarlo y operarlo? | Capacidad de equipo, procesos, logística, proveedores |
| Temporal | ¿Es viable en el plazo y con los hitos requeridos? | Cronogramas, dependencias, análisis de ruta crítica |
| Riesgo | ¿Qué puede fallar y con qué impacto? | Matrices de riesgo, análisis de sensibilidad, escenarios |

Cada dimensión es relativamente autónoma en su análisis, pero sus conclusiones **interactúan**: un riesgo técnico alto puede volver inviable una rentabilidad aparentemente atractiva. Esta interacción es responsabilidad del orquestador, que sintetiza los hallazgos parciales en un dictamen integrado.

## 4. La arquitectura propuesta

### 4.1 Vista general

La arquitectura sigue un patrón **orquestador-trabajadores** (conocido también como *supervisor pattern* en ingeniería de agentes).

```
                     ┌─────────────────────────────────────────────┐
                     │                 ORQUESTADOR                 │
                     │  Planificación · Routing · Síntesis · QA    │
                     │  Memoria compartida · Presupuesto · Traza   │
                     └──────┬──────┬──────┬──────┬──────┬──────────┘
                            │      │      │      │      │
              ┌─────────────┘      │      │      │      └─────────────┐
              │                    │      │      │                    │
       ┌──────▼──────┐     ┌───────▼────┐ ┌──▼───────┐        ┌──────▼──────┐
       │  AGENTE      │     │  AGENTE     │ │  AGENTE  │  ...   │  AGENTE     │
       │  TÉCNICO     │     │ FINANCIERO  │ │ MERCADO  │        │  RIESGOS    │
       │ skills+tools │     │ skills+tools│ │ skills+  │        │ skills+tools│
       └──────┬──────┘     └───────┬────┘ │ tools    │        └──────┬──────┘
              │                    │      └──────────┘               │
        ┌─────▼──────────┐  ┌──────▼──────────┐            ┌─────────▼────────┐
        │ tools: calc,   │  │ tools: fin API, │            │ tools: web,     │
        │ sim, repo, docs│  │ sheet, fx rates │            │ db, reports     │
        └────────────────┘  └─────────────────┘            └──────────────────┘
```

El flujo general es:

1. El **orquestador** recibe la solicitud de factibilidad y la descripción del proyecto.
2. **Planifica**: descompone el problema en dimensiones, identifica qué agentes son necesarios según el tipo de proyecto y define el orden y las dependencias.
3. **Enruta** los subproblemas a los agentes correspondientes, entregando contexto suficiente y requisitos de salida.
4. Los agentes **ejecutan** su análisis usando sus skills y tools, y devuelven resultados estructurados con evidencia.
5. El orquestador **sintetiza**, detecta conflictos entre dimensiones, solicita aclaraciones cuando es necesario y produce el dictamen final con recomendación, riesgos y plan de acción.

### 4.2 El orquestador: el cerebro coordinador

El orquestador no es un agente más; es el componente que garantiza **rigor y consistencia**. Sus responsabilidades:

- **Planificación de tareas**: descomponer el análisis y decidir el grafo de dependencias entre agentes.
- **Gestión de contexto**: construir el "expediente del proyecto" —objetivos, restricciones, datos disponibles— y pasarlo selectivamente a cada agente para evitar contaminación y ruido.
- **Control de calidad**: validar que cada agente devuelva lo prometido, con evidencia y dentro de los criterios mínimos; rechazar salidas incompletas o sin sustento.
- **Resolución de conflictos**: cuando dos dimensiones llegan a conclusiones incompatibles (por ejemplo, viabilidad técnica alta pero plazo imposible), el orquestador identifica el conflicto, decide si puede resolverlo con información adicional o si debe escalarlo al usuario.
- **Presupuesto y límites**: controlar consumo de tokens, tiempo y llamadas a tools; detener ramas improductivas.
- **Trazabilidad**: registrar el razonamiento, las fuentes y las decisiones de cada agente para generar un reporte auditable.

El orquestador mantiene una **memoria de sesión** con los resultados parciales, lo que le permite iterar: pedir a un agente financiero que recalcule bajo un escenario nuevo definido por el agente de riesgos.

### 4.3 El contrato común de agente

Para que el orquestador pueda coordinar agentes intercambiables y configurables, cada agente debe exponer un **contrato de interfaz** uniforme. Este contrato es la decisión de arquitectura que hace posible la extensibilidad:

- **Entrada**: descripción del subproblema, contexto del proyecto, restricciones, formato de salida esperado, presupuesto de cómputo.
- **Salida**: JSON estructurado con hallazgos, evidencia (fuentes, cálculos), nivel de confianza, supuestos, incertidumbres y datos para el orquestador.
- **Metadatos**: identidad del agente, versión, skills/tools disponibles, tiempo y costo consumido.

Con este contrato, el orquestador no necesita conocer los detalles internos de cada agente; le basta con saber qué capacidades declara. Esto es análogo al principio de diseño por contrato (Meyer, 1992) aplicado a sistemas de agentes.

### 4.4 Catálogo de agentes base

El sistema nace con un catálogo de agentes base, uno por dimensión de factibilidad. Cada agente se configura con un **perfil** (rol, criterios, estilo de análisis) y un conjunto de **skills y tools** propias:

| Agente | Skills | Tools típicas |
|---|---|---|
| Técnico | Evaluación de madurez tecnológica, benchmarking de soluciones, estimación de esfuerzo | Repositorios de código, simuladores, documentación técnica, calculadoras de estimación |
| Financiero | Modelado de flujos de caja, cálculo de VAN/TIR, análisis de sensibilidad | Hojas de cálculo, APIs financieras, tipos de cambio, tasas de descuento |
| Mercado | Segmentación, análisis de competencia, estimación de demanda | Motores de búsqueda, bases de datos de mercado, APIs de encuestas |
| Legal | Verificación normativa, identificación de permisos y riesgos de compliance | Bases jurídicas, reguladores, bases de contratos |
| Operativo | Análisis de capacidad, dependencias logísticas, plan de recursos | Sistemas de planificación, catálogos de proveedores |
| Temporal | Construcción de cronogramas, ruta crítica, análisis de hitos | Herramientas de Gantt, algoritmos de scheduling |
| Riesgos | Identificación de riesgos, matriz de probabilidad-impacto, escenarios | Bases de incidentes, simulaciones Monte Carlo, árboles de decisión |

Un aspecto clave es que los agentes **no necesitan compartir el mismo LLM subyacente**. La arquitectura permite asignar modelos distintos según la exigencia de cada tarea: un modelo rápido y económico para tareas mecánicas, un modelo de alto razonamiento para síntesis y juicio. Esta decisión tiene impacto directo en costo y latencia, y se discute en la sección 6.

## 5. Extensibilidad: adaptar los agentes al tipo de proyecto

La factibilidad de una planta industrial, de una aplicación de software o de una inversión inmobiliaria no comparte los mismos criterios. La arquitectura aborda esta variabilidad mediante **configuración de agentes por dominio**, no mediante la creación de sistemas completamente distintos.

### 5.1 Mecanismo de adaptación

El proceso de adaptación tiene tres niveles:

1. **Selección**: el orquestador elige qué agentes del catálogo participan y cuáles se omiten. Un proyecto de software quizá no necesite un agente de permisos de construcción; uno de infraestructura sí.
2. **Configuración**: cada agente recibe un *perfil de dominio* —criterios de evaluación, umbrales, fuentes autorizadas, restricciones regulatorias locales— sin cambiar su interfaz ni su lógica de coordinación. Esto equivale a inyectar conocimiento de contexto en el prompt del agente o en su configuración de skills.
3. **Extensión**: cuando el catálogo no cubre un dominio, se **crea un nuevo agente** o se añaden skills/tools a uno existente. El contrato común garantiza que el nuevo componente se integre sin tocar el orquestador.

### 5.2 Ejemplo de perfiles por tipo de proyecto

| Tipo de proyecto | Agentes activos | Ajustes de dominio |
|---|---|---|
| Construcción/Infraestructura | Técnico, Financiero, Legal, Temporal, Riesgos | Normativa de construcción local, permisos, cronogramas de obra, códigos técnicos |
| Software/Producto digital | Técnico, Mercado, Financiero, Operativo, Riesgos | Stack tecnológico, métricas de adopción, costos de infraestructura, deuda técnica |
| Inversión/Financiero | Financiero, Mercado, Legal, Riesgos | Instrumentos, tasas, horizonte de inversión, marco regulatorio financiero |
| Industrial/Manufactura | Técnico, Operativo, Financiero, Legal, Temporal, Riesgos | Líneas de producción, cadena de suministro, normativas de seguridad, capacidad instalada |
| Emprendimiento/Nuevo negocio | Mercado, Financiero, Operativo, Riesgos | Validación de demanda, modelo de ingresos, equipo fundador, escalabilidad |

La tabla ilustra que el **cambio entre dominios es principalmente configuracional**: el orquestador y el contrato de agentes permanecen estables, mientras que el perfil y la selección de agentes varían. Esta es la propiedad que hace al sistema mantenible a lo largo del tiempo.

## 6. Consideraciones de ingeniería

Un diseño académicamente elegante falla en producción si ignora las restricciones de la ingeniería real. Estas son las consideraciones críticas.

### 6.1 Gestión de contexto y memoria

Los LLM tienen ventanas de contexto limitadas. La arquitectura debe evitar dos extremos: dar a cada agente todo el contexto (ruido, costo, riesgo de confusión) o darle muy poco (análisis superficial). El orquestador debe implementar una **política de contexto selectivo**: un expediente canónico del proyecto, resúmenes comprimidos por dimensión y recuperación de información específica bajo demanda.

### 6.2 Mitigación de alucinaciones

La factibilidad alimenta decisiones de inversión; una cifra inventada puede tener consecuencias reales. Mitigaciones obligatorias:

- **Evidencia obligatoria**: cada hallazgo cuantitativo debe citar su fuente o su método de cálculo.
- **Validación de datos**: los cálculos financieros deben ejecutarse con tools reales (hojas de cálculo, APIs), no estimarse por el modelo.
- **Revisión cruzada**: el orquestador o un agente revisor verifica consistencia interna y detecta valores fuera de rango plausible.
- **Declaración de incertidumbre**: los agentes deben reportar su nivel de confianza y los supuestos detrás de cada conclusión.

### 6.3 Costos, latencia y presupuestos

Cada turno de razonamiento y cada llamada a tool consume recursos. El orquestador debe:

- fijar **presupuestos de cómputo** por análisis (tokens máximos, número de iteraciones),
- asignar **modelos por tarea** (rápidos para clasificación, potentes para síntesis),
- permitir **paralelismo controlado** entre dimensiones independientes y
- registrar el **costo total por análisis** como métrica de operación (ver sección 7).

### 6.4 Observabilidad y trazabilidad

Un sistema de agentes es un sistema distribuido: cada componente puede fallar, alucinar o tardar. La trazabilidad no es un lujo; es el mecanismo de confianza. Cada análisis debe producir un **registro de auditoría**: qué agente hizo qué, con qué tools, qué fuentes consultó, qué supuestos usó y qué decisión tomó. Este registro habilita la revisión humana, el debugging y la mejora continua.

### 6.5 Seguridad y control

Los agentes acceden a tools externas con efectos reales. Principios mínimos:

- **principio de menor privilegio**: cada agente solo accede a las tools que necesita;
- **sandboxing** para ejecución de código y acceso a red;
- **aprobación humana** para acciones de alto impacto o irreversibles;
- **sanitización de datos sensibles** del proyecto en prompts y registros.

## 7. Evaluación del sistema

Para validar la propuesta se necesitan métricas que combinen rigor académico y utilidad práctica.

| Métrica | Definición | Nivel |
|---|---|---|
| **Cobertura** | ¿Qué porcentaje de los criterios de factibilidad del dominio fueron evaluados? | Sistema |
| **Precisión de datos** | ¿Qué proporción de cifras clave coinciden con fuentes verificables? | Agente/Sistema |
| **Consistencia** | ¿Las conclusiones entre dimensiones son coherentes entre sí? | Sistema |
| **Trazabilidad** | ¿Qué porcentaje de hallazgos tienen evidencia rastreable? | Sistema |
| **Exactitud de dictamen** | ¿La recomendación final coincide con el juicio de expertos humanos? | Sistema |
| **Costo por análisis** | Costo de cómputo total por estudio de factibilidad | Operación |
| **Latencia** | Tiempo total hasta el dictamen | Operación |
| **Tasa de re-trabajo** | Porcentaje de análisis devueltos por el control de calidad | Sistema |

Un protocolo de evaluación razonable compara el dictamen del sistema contra el de un panel de expertos sobre un conjunto de proyectos reales o sintéticos, midiendo exactitud y cobertura, y mide además la **consistencia inter-ejecución** (el mismo proyecto evaluado dos veces debe producir resultados equivalentes, salvo variación aleatoria controlada).

## 8. Limitaciones y trabajo futuro

El diseño presentado tiene limitaciones que deben reconocerse. Primero, la **calidad del dictamen depende críticamente del orquestador**: si la descomposición es incorrecta, el error se propaga a todo el sistema. Segundo, los **modelos de lenguaje siguen siendo propensos a errores de razonamiento**, por lo que la validación externa (tools reales, revisión humana) es indispensable y no opcional. Tercero, la **configuración de perfiles de dominio requiere conocimiento experto**; la calidad del sistema está limitada por la calidad de esos perfiles.

El trabajo futuro se orienta en varias direcciones: aprendizaje de los perfiles de dominio a partir de proyectos históricos; mecanismos de **auto-mejora** donde el orquestador ajusta su planificación según resultados pasados; integración con fuentes de datos empresariales en tiempo real; y evaluación empírica formal del sistema contra paneles de expertos en distintos dominios.

## 9. Conclusiones

La factibilidad de proyectos es un problema natural para los sistemas multiagente: es multidimensional, requiere especialistas, exige trazabilidad y cambia de criterios según el dominio. La arquitectura propuesta —un orquestador central que planifica, enruta, controla calidad y sintetiza, coordinando agentes especializados que exponen un contrato común y se configuran por tipo de proyecto— ofrece una vía concreta para construir sistemas de este tipo de forma modular, extensible y auditable. La clave del diseño no está en la inteligencia individual de cada agente, sino en la **organización**: la descomposición del problema, el contrato de interfaz y la supervisión del orquestador son lo que transforma un conjunto de capacidades en un sistema de decisión confiable.

## Referencias

- Wooldridge, M. (2009). *An Introduction to MultiAgent Systems* (2.ª ed.). Wiley.
- Yao, S. et al. (2022). *ReAct: Synergizing Reasoning and Acting in Language Models*. arXiv:2210.03629.
- Meyer, B. (1992). *Applying "Design by Contract"*. Computer, 25(10), 40–51.
- Wei, J. et al. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. NeurIPS.
- Xi, Z. et al. (2023). *The Rise and Potential of Large Language Model Based Agents: A Survey*. arXiv:2309.07864.