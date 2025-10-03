# Sistema de Gestión de Ventas y Calculadoras (PWA)

Sistema de Ventas ## 📜 Descripción

Este proyecto es una **Aplicación Web Progresiva (PWA)** diseñada para equipos de ventas. Combina herramientas de utilidad diaria con un sistema robusto para el registro y seguimiento de ventas, todo centralizado en una interfaz moderna y fácil de usar.

La aplicación está construida con **HTML, CSS y JavaScript** en el frontend, y utiliza **Google Sheets como base de datos** a través de un **Google Apps Script** que funciona como un backend sin servidor (serverless).

---

## ✨ Características Principales

El sistema se divide en dos módulos principales:

### Módulo 1: Herramientas de Cálculo
* **Calculadora de IVA:** Calcula el 13% de IVA sobre un monto base, estándar en El Salvador.
* **Calculadora de Renta:** Calcula la retención del 10% de renta.

### Módulo 2: Sistema de Gestión de Ventas
* **🔐 Sistema de Autenticación por Roles:**
    * **Vendedor:** Puede iniciar sesión para registrar sus ventas diarias.
    * **Supervisor:** Puede gestionar usuarios y visualizar reportes consolidados del equipo.
* **📝 Registro de Ventas Detallado:**
    * Un formulario completo para ingresar todos los datos relevantes de una venta, incluyendo cliente, montos, servicios y fechas.
* **📊 Base de Datos en la Nube (Google Sheets):**
    * Cada vendedor tiene su propio archivo de Google Sheets, generado automáticamente.
    * Dentro de su archivo, se crea una hoja (pestaña) por cada mes, manteniendo los datos organizados.
* **🤖 Formateo y Cálculos Automáticos:**
    * El sistema calcula automáticamente valores como el monto sin IVA, Total Neto y R1 Mensual.
    * Las hojas de cálculo se diseñan de forma automática con encabezados, colores, formato de moneda y fórmulas de resumen.
* **📈 Panel de Control para el Supervisor:**
    * Visualización de KPIs globales del equipo (Total de ventas, ARPU promedio, etc.).
    * Capacidad de ver el resumen de ventas de cada vendedor de forma individual.
    * Herramienta para crear nuevos usuarios (vendedores o supervisores) directamente desde la aplicación.

---

## 🚀 Instalación y Uso

Esta es una **PWA**, por lo que no requiere instalación desde una tienda de aplicaciones.

1.  **Acceso:** Simplemente abre la URL de la aplicación en un navegador web (preferiblemente Chrome en Android o Safari en iOS).
2.  **Instalación:** El navegador te ofrecerá la opción de **"Instalar Aplicación"** o **"Añadir a la pantalla de inicio"**. Al aceptarlo, se creará un ícono en tu teléfono como si fuera una app nativa.
3.  **Uso sin Conexión:** Gracias al Service Worker, la aplicación puede iniciarse y usarse incluso sin conexión a internet (aunque para guardar datos nuevos se requiere conexión).

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend / Base de Datos:** Google Apps Script y Google Sheets
* **Hosting:** Vercel (o cualquier hosting para sitios estáticos)
* **Control de Versiones:** Git y GitHub

---

## 📄 Licencia

Este proyecto es de propiedad privada.

**Powered by Oscar Ovidio Aguirre. Todos los derechos reservados © 2025**
