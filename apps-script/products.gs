const SHEET_ID = "1sZfSNrvlMj5jstlgisI7aCG83ilAZIyXFqWl1eSVlzw";
const SHEET_NAME = "Sheet1";
const API_KEY = "mi_clave_secreta_123";

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

function buildJsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function mapRowsToObjects(values) {
  const [headers, ...rows] = values;

  return rows.map((row) => {
    const product = {};
    headers.forEach((header, index) => {
      product[header] = row[index];
    });
    return product;
  });
}

function getRowIndexById(sheet, id) {
  const values = sheet.getDataRange().getValues();

  for (let index = 1; index < values.length; index += 1) {
    if (String(values[index][0]) === String(id)) {
      return index + 1;
    }
  }

  return -1;
}

function doGet(e) {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  const products = mapRowsToObjects(values);
  const id = e && e.parameter && e.parameter.id;

  if (id) {
    const product = products.find((entry) => String(entry.id) === String(id));
    return buildJsonResponse(product || {});
  }

  return buildJsonResponse(products);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");

  if (data.apiKey !== API_KEY) {
    return buildJsonResponse({ message: "Unauthorized" });
  }

  const sheet = getSheet();
  const action = data.action || "create";

  if (action === "create") {
    sheet.appendRow([
      data.id,
      data.name,
      data.price,
      data.oldPrice,
      data.category,
      data.image,
      data.description,
      data.stock,
      data.rating,
    ]);

    return buildJsonResponse({ ok: true, action: "create" });
  }

  if (action === "update") {
    const rowIndex = getRowIndexById(sheet, data.id);

    if (rowIndex === -1) {
      return buildJsonResponse({ message: "Product not found" });
    }

    sheet.getRange(rowIndex, 1, 1, 9).setValues([
      [
        data.id,
        data.name,
        data.price,
        data.oldPrice,
        data.category,
        data.image,
        data.description,
        data.stock,
        data.rating,
      ],
    ]);

    return buildJsonResponse({ ok: true, action: "update" });
  }

  if (action === "delete") {
    const rowIndex = getRowIndexById(sheet, data.id);

    if (rowIndex === -1) {
      return buildJsonResponse({ message: "Product not found" });
    }

    sheet.deleteRow(rowIndex);
    return buildJsonResponse({ ok: true, action: "delete" });
  }

  return buildJsonResponse({ message: "Unsupported action" });
}
