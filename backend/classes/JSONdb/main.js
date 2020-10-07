// import fs from "fs/promises";

class IndexOutOfBoundsError extends Error {}

export const db = {};

function createTable(name = "", columns = []) {
  if (typeof name !== "string") {
    throw new TypeError("table name must be of type string");
  }
  if (typeof columns !== "object" || columns.constructor.name !== "Array") {
    throw new TypeError("columns must be of type Object");
  }
  for (let column in columns) {
    if (typeof column !== "string") {
      throw new TypeError("column entries must be of type string ");
    }
  }
  if (!db[name]) {
    db[name] = {};
    for (let column of columns) {
      db[name][column] = [];
    }
  }
}
/**@returns {Array} The Array of content that has been added.
 * Unknown keys have been skipped;
 * Missing keys have been added and instantiated with null.
 */
export function addRow(table, content) {
  if (typeof table !== "string") {
    throw new TypeError("table must be of type string");
  }
  if (typeof content !== "object" || content.constructor.name !== "Object") {
    throw new TypeError("content must be of type Object");
  }
  if (!db[table]) {
    createTable(table, Object.keys(content));
  }
  const allowedContent = Object.fromEntries(
    Object.entries(content).filter(([key]) =>
      Object.keys(db[table]).includes(key)
    )
  );
  Object.keys(db[table]).forEach((key) => {
    if (!Object.keys(allowedContent).includes(key)) {
      allowedContent[key] = null;
    }
  });
  for (let column in allowedContent) {
    db[table][column].push(allowedContent[column]);
  }
  return allowedContent;
}

export function getRows(table, where = {}, columns = []) {
  if (typeof table !== "string") {
    throw new TypeError("table must be of type string");
  }
  if (typeof where !== "object" || where.constructor.name !== "Object") {
    throw new TypeError("where must be of type Object");
  }
  if (typeof columns !== "object" || columns.constructor.name !== "Array") {
    throw new TypeError("columns must be of type Array");
  }
  const tableCopy = { ...db[table] };
  if (columns.length > 0) {
    for (let key of tableCopy) {
      if (columns.includes(key)) {
        delete tableCopy[key];
      }
    }
  }
  if (Object.keys(where).length === 0) {
    return tableCopy;
  }
  let rows = [];
  for (
    let index = 0;
    index < Object.values(tableCopy[Object.keys(tableCopy)[0]]).length;
    index++
  ) {
    let row = {};
    for (let key in tableCopy) {
      row[key] = tableCopy[key][index];
    }
    rows.push(row);
  }
  rows = rows.filter((row) => {
    for (let key in where) {
      if (!row[key]) {
        continue;
      } else if (row[key] !== where[key]) {
        return false;
      }
    }
    return true;
  });
  const result = {};
  for (let row of rows) {
    for (let key in row) {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(row[key]);
    }
  }
  return result;
}

export function getRow(table, index) {
  const row = {};
  if (!db[table]) return null;
  for (let key in db[table]) {
    if (index > 0 && index < db[table][key].length) {
      row[key] = db[table][key][index];
    } else {
      throw new IndexOutOfBoundsError(index);
    }
  }
  return row;
}

export function removeRow(table, index) {
  const row = {};
  if (!db[table] || db[table].length === 0) return {};
  for (let key in db[table]) {
    if (index >= 0 && index < db[table][key].length) {
      row[key] = db[table][key][index];
      db[table][key].splice(index, 1);
    } else {
      throw new IndexOutOfBoundsError(index);
    }
  }
  return row;
}
// export function nextID() {
//   const numberKeys = Object.keys(db)
//     .filter((key) => !isNaN(parseInt(key)))
//     .map((key) => parseInt(key))
//     .sort((a, b) => b - a);
//   console.log(numberKeys);
//   return numberKeys.length >= 1 ? numberKeys[0] + 1 : 0;
// }
