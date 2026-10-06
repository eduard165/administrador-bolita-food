# Administrador Bolita Food

Frontend de demostración en Next.js, React, TypeScript y Tailwind. No requiere credenciales ni variables de entorno. No conecta WhatsApp ni procesa cobros reales.

## Ejecutar

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abrir http://localhost:3000. Node.js 20.9 o superior; recomendado Node 24. Se conserva el lockfile de la exportación.

## Comprobar

```bash
pnpm typecheck
pnpm test:rules
pnpm build
```

## Organización

- `app/`: página inicial, estilos y metadatos.
- `components/bolita-food-app.tsx`: coordinación de navegación y estado global.
- `components/bolita/`: componentes separados de marca, navegación, pedidos, detalle, pedido manual, menú, negocio y herramientas.
- `components/bolita/chat-simulator.tsx`: simulador heredado de v0, pendiente de desarrollar.
- `components/ui/`: componentes base.
- `lib/bolita-data.ts`: tipos, catálogo y datos ficticios.
- `lib/order-rules.ts`: validación de piezas por sabor y cálculo de productos/extras.
- `lib/bolita-types.ts`: tipos de navegación.
- `scripts/check-order-rules.cjs`: verificaciones de reglas de pedido.

## Cambios realizados

Se separó el archivo principal de v0 por componentes y pantallas, se formateó el código y se eliminaron imports sin uso. TypeScript ya no se ignora en compilación. Se añadió el logo enviado (captura original encuadrada mediante CSS) y se adaptaron los acentos principales a rosa.

El detalle exige revisiones independientes de existencia y ubicación. El tiempo seleccionado queda almacenado al aceptar. Las revisiones se reinician al cambiar de pedido.

La ventana de pedido manual captura cliente, teléfono, modalidad, referencias, productos separados, piezas por sabor, extras y cambio. Calcula el total y guarda un folio único y un pedido pendiente. Transferencia no se ofrece hasta implementar su configuración. El pago no se marca recibido por indicar con cuánto pagará.

La persistencia espera a recuperar los datos antes de guardar y comunica errores de lectura/escritura. El estado abierto/pausado/cerrado también se conserva. No existe sincronización entre dispositivos.

## Revisión del alcance pendiente

La exportación de v0 es una base incompleta del prompt. Esta entrega ordena y corrige la base del administrador; no completa toda la operación.

- Menú: los interruptores actuales viven en esa pantalla; falta centralizar y persistir disponibilidad para que afecte también al pedido manual. Precios editables, especiales, sabores y extras todavía requieren implementar sus acciones.
- Negocio: guardar horarios y configurar dirección eran botones decorativos; la programación real sigue pendiente.
- Más: conversaciones, configuración y sonido aún contienen acciones sin implementar.
- Detalle: rechazos, cancelaciones, revisión de cambios, mensajería, pago recibido e historial detallado están pendientes. La acción de solicitar información sigue pendiente.
- Pedido manual: permite guardar pendiente y después confirmar desde el detalle. Guardar y confirmar en un solo paso, registro estando cerrado con aviso y coordenadas siguen pendientes.
- Simulador: conserva la muestra de v0; aún no genera pedidos ni intercambia mensajes con el panel.
- Métricas de demostración: datos antiguos sin fechas completas y tiempos transcurridos estáticos; “Entregados hoy” todavía requiere calcularse por fecha local del negocio.
- Ranch de bolipapas: regla pendiente de confirmación; no se asume inclusión.
- Respaldo, autenticación, notificaciones con pantalla bloqueada y backend quedan para etapas posteriores.

## Datos y seguridad

Los pedidos se guardan únicamente en el navegador mediante localStorage. No usar datos reales sensibles en esta demostración. Borrar los datos del navegador elimina el historial local. Los nombres y direcciones de ejemplo son ficticios. El logo proviene de una captura; conviene reemplazarla por el archivo original al disponer de él.
