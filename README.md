# PeriodiLab ⚛️

**PeriodiLab** es una plataforma educativa interactiva diseñada para la exploración y el aprendizaje dinámico de la Tabla Periódica de los elementos. Este proyecto fue desarrollado como prototipo funcional para la materia de **Diseño y Prototipado de Aplicaciones Educativas**.

La aplicación combina una estética moderna basada en *glassmorphism* con herramientas pedagógicas para facilitar la comprensión de las propiedades químicas y la historia de los elementos.

---

## 🚀 Características Principales

### 1. Explorador Interactivo (Tabla)
*   **Grilla Dinámica:** Visualización completa de la tabla periódica alineada mediante CSS Grid.
*   **Filtros en Tiempo Real:** Filtra elementos por su estado físico (Sólidos, Líquidos, Gases).
*   **Fichas de Detalle:** Tarjetas interactivas con información técnica (masa, serie, configuración electrónica) y descripciones detalladas.

### 2. Mapas de Calor (Tendencias)
*   Visualización cromática de propiedades periódicas como **Electronegatividad**, **Energía de Ionización**, **Afinidad Electrónica** y **Densidad**.
*   Análisis técnico y conceptos clave para cada tendencia.

### 3. Quiz Educativo
*   Evaluación interactiva con generación aleatoria de preguntas basada en los datos reales de los elementos.
*   Sistema de puntuación y retroalimentación inmediata.

### 4. Contexto Histórico
*   Espacio preparado para la integración de líneas de tiempo interactivas (vía TimelineJS) para explorar hitos del descubrimiento químico.

---

## 🛠️ Tecnologías Utilizadas

*   **React + Vite:** Para una experiencia de usuario rápida y reactiva.
*   **Vanilla CSS:** Diseño artesanal con variables CSS para el sistema de colores y efectos de desenfoque (*backdrop-filter*).
*   **Lucide React:** Iconografía moderna y minimalista.
*   **React Router:** Navegación fluida entre secciones sin recarga de página.

---

## 📦 Instalación y Ejecución

Para ejecutar este proyecto de forma local, sigue estos pasos:

1.  **Asegúrate de tener instalado Node.js** (v18 o superior).
2.  **Clona o descarga este repositorio.**
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
5.  Abre tu navegador en: [http://localhost:5173](http://localhost:5173)

---

### 🐳 Despliegue con Docker (Homelab / Portainer)

Este proyecto incluye la configuración necesaria para ser desplegado fácilmente en entornos propios (self-hosting) mediante contenedores.

1. Asegúrate de tener Docker y Docker Compose instalados en tu servidor.
2. En la raíz del proyecto, construye y levanta el contenedor en segundo plano:
   ```bash
   docker-compose up -d --build

---

## 📱 Diseño Responsivo

PeriodiLab ha sido optimizado para ser utilizado en múltiples dispositivos:
*   **Escritorio:** Experiencia inmersiva completa.
*   **Tablet/Móvil:** La tabla utiliza *scroll* horizontal asistido y las fichas de detalle se transforman en vistas modales a pantalla completa para garantizar la facilidad de uso táctil.

---

## 🎓 Propósito Educativo

Este prototipo busca demostrar cómo el diseño visual avanzado y la interactividad pueden reducir la carga cognitiva al estudiar conceptos abstractos de química, transformando una herramienta estática como la tabla periódica en un recurso vivo y explorable.

© 2026 PeriodiLab Project.
