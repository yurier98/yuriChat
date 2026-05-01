---
slug: fitness-counter-vision-computadora-ejercicios
title: Fitness Counter
description: Sistema de conteo automático de repeticiones de ejercicios mediante análisis de posturas corporales en tiempo real.
publishedAt: 2024/09/14
readingTime: 5
cover: fitness-counter/cover.webp
favorite: true
tags:
  - AI
  - Computer Vision
  - OpenCV
  - MediaPipe
  - Fitness Tech
  - Python
  - Health
---
# Fitness Counter: Contador Automático de Ejercicios usando Visión por Computadora

## Introducción

El seguimiento preciso de ejercicios físicos es un desafío común tanto para atletas como para personas en proceso de rehabilitación. En 2021, desarrollé **Fitness Counter**, una aplicación que utiliza visión por computadora para contar automáticamente repeticiones de ejercicios mediante el análisis de posturas corporales en tiempo real.

El proyecto abordaba un problema real: la dificultad de mantener la cuenta mental mientras se ejecutan ejercicios, especialmente en rutinas de alta intensidad o cuando se está aprendiendo una nueva técnica.

## 🎯 El Desafío

Crear un sistema que:
- Detectara automáticamente diferentes tipos de ejercicios
- Contara repeticiones con alta precisión
- Proporcionara feedback en tiempo real sobre la forma
- Funcionara con equipamiento estándar (cámara web)

## ⚒️ Tech Stack

- **OpenCV**: Procesamiento de video en tiempo real
- **MediaPipe Pose**: Detección de 33 puntos clave del cuerpo
- **Python** + **NumPy**: Lógica de aplicación y cálculos matemáticos
- **Scikit-learn**: Para algoritmos de clasificación de ejercicios
- **Custom Rep Counter Module**: Desarrollado específicamente para el proyecto

## 🏗️ Arquitectura del Sistema

### Pipeline de Procesamiento
1. **Captura de Video**: Adquisición de frames desde la cámara
2. **Detección de Pose**: Identificación de landmarks corporales
3. **Cálculo de Ángulos**: Análisis de articulaciones clave
4. **Clasificación de Ejercicio**: Reconocimiento del movimiento actual
5. **Conteo de Repeticiones**: Detección de ciclos completos
6. **Feedback Visual**: Retroalimentación en tiempo real

### Ejercicios Implementados
- **Flexiones de brazo (Push-ups)**
- **Sentadillas (Squats)**
- **Abdominales (Crunches)**
- **Elevaciones de pierna**

## 🔮 Aplicaciones Futuras
### Rehabilitación Física
* Monitoreo de ejercicios de terapia
* Prevención de malas posturas
* Registro automático de progreso

### Entrenamiento Deportivo
* Análisis de técnica avanzada
* Detección de fatiga muscular
* Optimización de rutinas

### Wellness Corporativo
* Programas de ejercicio en oficina
* Prevención de lesiones por sedentarismo
* Gamificación del fitness laboral

## Conclusiones:

*   **La UX es fundamental desde el inicio:** Un algoritmo preciso es inútil si la interfaz no le da feedback claro al usuario. Un simple indicador de "detectado" vs "no detectado" mejoró la experiencia enormemente.
*   **Menos es más:** Mi primer diseño con muchos gestos complejos falló. Reducir la interacción a lo esencial hizo la app inmediatamente usable.
*   **Prueba con usuarios reales, y pronto:** Lo que yo creía intuitivo no siempre lo era para otros. Recibir feedback temprano me guió hacia las funcionalidades que realmente importaban.
*   **El "perfecto" es el enemigo del "funcional":** Aceptar un margen de error del 5% para tener una app estable y responsiva fue la mejor decisión técnica y de UX que tomé.

Este proyecto me enseñó que el éxito no está en la tecnología más compleja, sino en crear una experiencia que la gente *pueda* y *quiera* usar.
