# Multicolor Ecommerce

Proyecto ecommerce con:

- `mi-web`: frontend React + TypeScript + TailwindCSS
- Google Sheets como CMS/base de datos mediante API REST

## Arquitectura

- El catalogo publico puede leer directamente desde Google Sheets en CSV.
- El frontend tambien puede consumir una API REST de Google Sheets con `fetch` si configuras `VITE_PRODUCTS_API_URL`.
- La capa de datos vive en [mi-web/src/api/products.ts](/c:/Users/yafis/OneDrive/Desktop/WebMulticolor/mi-web/src/api/products.ts:1).
- `getProducts` es publico.
- `createProduct`, `updateProduct` y `deleteProduct` adjuntan `API_KEY` en query param y header para proteger escrituras.
- El estado global del carrito vive en `CartContext` y se persiste en `localStorage`.
- Los favoritos tambien se persisten en `localStorage`.
- El checkout genera un mensaje automatico para WhatsApp con el resumen del pedido.
- `/admin` queda protegida con login frontend y sesion persistida en `localStorage`.

## Modelo Product

```json
{
  "id": "prod-001",
  "name": "iPhone 15 Pro",
  "price": 1299,
  "oldPrice": 1449,
  "category": "iPhones",
  "image": "https://...",
  "description": "Pantalla brillante, camara potente y bateria lista para todo el dia.",
  "stock": 9,
  "rating": 4.9
}
```

## Arranque

### Frontend

```bash
cd mi-web
cp .env.example .env
npm install
npm run dev
```

Variables:

- `VITE_GOOGLE_SHEET_ID=1sZfSNrvlMj5jstlgisI7aCG83ilAZIyXFqWl1eSVlzw`
- `VITE_GOOGLE_SHEET_GID=0`
- `VITE_PRODUCTS_API_URL=https://tu-endpoint-rest-de-google-sheets/products`
- `VITE_PRODUCT_ITEM_URL=https://tu-endpoint-rest-de-google-sheets/products/:id`
- `VITE_WHATSAPP_PHONE=34123456789`

Si no configuras `VITE_PRODUCTS_API_URL`, la home leera directamente del Google Sheet indicado por `VITE_GOOGLE_SHEET_ID`.

`VITE_PRODUCT_ITEM_URL` acepta `:id` como placeholder. Esto permite adaptar el proyecto a distintos proveedores, por ejemplo:

- Sheet.best: `https://sheet.best/api/sheets/TU_ID/id/:id`
- Google Apps Script: `https://script.google.com/macros/s/TU_ID/exec?id=:id`

## Rutas principales

- `/`: home ecommerce con filtros, busqueda, favoritos y carrito
- `/admin`: login admin y panel protegido para crear, editar y eliminar productos
- `/checkout`: resumen del carrito y cierre de compra por WhatsApp

## Estructura recomendada de Google Sheets

Usa una hoja con estas columnas:

```text
id | name | price | oldPrice | category | image | description | stock | rating
```

El frontend normaliza string/number automaticamente. La columna `id` es obligatoria para editar y eliminar.

## Conexion rapida

1. Publica tu hoja mediante Sheet.best o un script de Google Apps Script.
2. Para solo lectura, basta con `VITE_GOOGLE_SHEET_ID`.
3. Para escrituras admin, copia la URL REST en `VITE_PRODUCTS_API_URL`.
4. Copia la URL del recurso individual en `VITE_PRODUCT_ITEM_URL`, usando `:id` donde vaya el identificador.
5. Arranca `npm run dev` dentro de `mi-web`.
6. Entra en `/admin`, introduce la contrasena fija del frontend y la `API_KEY` de escritura.
7. Prueba alta, edicion y borrado desde el panel.

## Configuracion admin

- La contrasena fija del panel se define en [mi-web/src/lib/constants.ts](/c:/Users/yafis/OneDrive/Desktop/WebMulticolor/mi-web/src/lib/constants.ts:1) como `ADMIN_PASSWORD`.
- La `API_KEY` de escritura no se guarda en `.env` del frontend para no empaquetarla en el bundle publico.
- El admin la introduce al iniciar sesion y se reutiliza desde `localStorage` durante la sesion.

Ejemplo de validacion en Google Apps Script:

```js
const ADMIN_API_KEY = "tu-clave-secreta";

function isAuthorized(request) {
  const apiKeyFromQuery = request.parameter.apiKey;
  const apiKeyFromHeader =
    request?.headers?.["x-api-key"] || request?.headers?.["X-Api-Key"];

  return apiKeyFromQuery === ADMIN_API_KEY || apiKeyFromHeader === ADMIN_API_KEY;
}
```

## Notas

- El frontend muestra estados de `loading` y `error` si la API no responde o la configuracion no existe.
- El backend legado del repositorio no es necesario para este flujo.
- Si cambias el numero de WhatsApp, actualiza `VITE_WHATSAPP_PHONE`.
- La contrasena fija en frontend no sustituye una seguridad real de servidor; sirve solo como barrera basica.
- El enlace directo de Google Sheets permite lectura del catalogo, pero no escritura segura. Para que `/admin` modifique esa misma hoja necesitas un Apps Script o Sheet.best apuntando a este documento.
