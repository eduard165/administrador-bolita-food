<div align="center">

<img src="./public/bolita-logo.png" alt="Logo de Bolita Food" width="180" />

# Bolita Food

### Administrador de pedidos y operación del negocio

Una aplicación pensada para llevar la organización de un negocio familiar al celular.

<br />

![Estado](https://img.shields.io/badge/Estado-En_desarrollo-E995A6?style=for-the-badge)
![Tipo](https://img.shields.io/badge/Proyecto-Negocio_real-718C35?style=for-the-badge)
![Alcance](https://img.shields.io/badge/Etapa-Frontend-F5D9BE?style=for-the-badge&logoColor=black)

<br />

[**Explorar el código**](https://github.com/eduard165/administrador-bolita-food)
&nbsp; · &nbsp;
[**Portafolio del desarrollador**](https://portafolio-ers.vercel.app/)

</div>

---

## 🌸 Un proyecto con historia

**Bolita Food** es un negocio familiar de comida en Tlacotalpan, Veracruz.

Este administrador nace para facilitar el trabajo de la persona que recibe, revisa y prepara los pedidos. Reúne la información necesaria para organizar cada orden: productos, sabores, extras, entrega, pago y tiempo de espera.

El proyecto contempla una futura integración con WhatsApp. Esta primera etapa desarrolla la interfaz y las reglas principales del negocio.

## 🛠️ Tecnologías

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)

![Base UI](https://img.shields.io/badge/Base_UI-343434?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide_Icons-E995A6?style=for-the-badge&logo=lucide&logoColor=white)
![Almacenamiento](https://img.shields.io/badge/localStorage-718C35?style=for-the-badge)

</div>

## ✨ Funcionalidades

| | Función | Descripción |
| :---: | --- | --- |
| 📋 | **Gestión de pedidos** | Consulta de órdenes, detalles y estados. |
| ✍️ | **Registro manual** | Captura de pedidos recibidos por llamada o directamente. |
| 🍗 | **Productos y sabores** | Selección de presentaciones y distribución de piezas por sabor. |
| 🧀 | **Extras** | Registro de ranch adicional y queso amarillo. |
| 🧮 | **Cálculo del pedido** | Total calculado a partir de productos y extras. |
| 📍 | **Entrega** | Dirección y referencias para reparto, o recolección. |
| 💵 | **Efectivo y cambio** | Captura del importe con el que pagará el cliente. |
| ✅ | **Revisión antes de aceptar** | Confirmación de disponibilidad y ubicación de entrega. |
| ⏱️ | **Tiempo estimado** | Tiempo de espera ajustable al confirmar. |
| 🟢 | **Estado del negocio** | Control manual de apertura, pausa y cierre. |
| 💾 | **Persistencia local** | Pedidos y estado del negocio guardados en el navegador. |

## 💡 Decisiones del proyecto

### Diseñado para la operación real

El negocio tiene horarios variables. Por eso, la disponibilidad se controla manualmente mediante los estados **abierto**, **pausado** y **cerrado**.

### Confirmación humana

Antes de aceptar un pedido, la encargada revisa la existencia de productos, confirma la ubicación de entrega y asigna el tiempo estimado.

### Cantidades que cuadran

Cada presentación tiene un número definido de piezas. La distribución entre sabores debe coincidir con ese total y respetar el máximo permitido.

### Uso desde el celular

La interfaz se adapta a dispositivos móviles y escritorio para acompañar la operación diaria.

## 🍽️ Reglas del negocio

| Concepto | Regla |
| --- | --- |
| Reparto | Gratuito |
| Orden completa | Hasta 3 sabores |
| Media orden | Hasta 2 sabores |
| Bolipapas | Hasta 2 sabores |
| Piezas por sabor | Cantidades enteras positivas que sumen el total de la presentación |
| Tiempo inicial | 35 minutos estimados, ajustables al confirmar |
| Confirmación | Disponibilidad y ubicación de entrega revisadas por la encargada |
| Pedidos programados | Fuera del alcance de la primera versión |

## 🧩 Organización del código

| Ruta | Responsabilidad |
| --- | --- |
| `app/` | Página principal, configuración y estilos globales |
| `components/bolita/` | Pantallas, tarjetas, navegación y diálogos |
| `components/bolita-food-app.tsx` | Coordinación del estado y navegación |
| `lib/bolita-data.ts` | Catálogo, tipos y datos de demostración |
| `lib/order-rules.ts` | Validaciones y cálculo de importes |
| `lib/bolita-types.ts` | Tipos de navegación |
| `scripts/` | Verificación de reglas de pedidos |
| `public/` | Logo y recursos visuales |

## 🚀 Ejecutar el proyecto

**Requisitos:** Node.js compatible con Next.js 16 y npm.

### 1. Clonar el repositorio

    git clone https://github.com/eduard165/administrador-bolita-food.git
    cd administrador-bolita-food

### 2. Instalar dependencias

    npm install

### 3. Iniciar el entorno de desarrollo

    npm run dev

Abre **http://localhost:3000**.

### Comandos disponibles

| Comando | Función |
| --- | --- |
| `npm run dev` | Iniciar desarrollo |
| `npm run typecheck` | Revisar tipos de TypeScript |
| `npm run test:rules` | Verificar reglas de pedidos |
| `npm run build` | Generar la compilación de producción |
| `npm start` | Ejecutar la compilación de producción |

## 🚧 Estado y siguientes etapas

El proyecto está en desarrollo y actualmente funciona como un **prototipo de frontend**.

Los datos se almacenan en el navegador. La sincronización entre dispositivos, autenticación, backend y conexión con WhatsApp están pendientes. Algunas pantallas incluyen controles de demostración.

- [x] Separación de pantallas y componentes.
- [x] Registro manual de pedidos.
- [x] Validación de piezas y sabores.
- [x] Cálculo de productos y extras.
- [x] Confirmación de disponibilidad y ubicación.
- [x] Persistencia local de pedidos y estado del negocio.
- [ ] Edición y persistencia del catálogo.
- [ ] Gestión de productos especiales y agotados.
- [ ] Configuración de apertura y cierre.
- [ ] Gestión completa de cambios y cancelaciones.
- [ ] Registro y confirmación de transferencias.
- [ ] Autenticación y permisos.
- [ ] API y base de datos.
- [ ] Integración con WhatsApp.
- [ ] Notificaciones de nuevos pedidos.

## 👨‍💻 Desarrollo

Desarrollado por **Eduardo Rodríguez Solís**, a partir de una base inicial generada con v0.

El trabajo comprende la reorganización del proyecto, adaptación visual a la marca, implementación del registro manual y separación de las reglas del negocio.

<div align="center">

<br />

[![Portafolio](https://img.shields.io/badge/Ver_portafolio-E995A6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://portafolio-ers.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/eduard165)

<br />

**🌸 Tecnología al servicio de un negocio familiar.**

</div>