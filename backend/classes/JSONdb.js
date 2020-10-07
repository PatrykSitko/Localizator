export default class JSONdb {
  //At update cycle: once the previous update cycle ended.
  //A new update cycle will start: that will create an copy of DB_PENDING_UPDATES and pops a pending update from that copy after
  //filtering DB_PENDING_UPDATES Array from entries that are present in the copy;
  //Once new pending update cycle starts.
  DB_PENDING_UPDATES = [];
  DB = {};
  constructor(path) {
    this.path = path;
  }

  get db() {
    return { ...this.DB };
  }

  createTable(name = "", columns = []) {
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
    if (!this.DB[name]) {
      this.DB[name] = {};
      for (let column of columns) {
        this.DB[name][column] = [];
      }
    }
  }
  addColumn(table, columns = []) {}

  addRowAsync(table, content) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.addRow(table, content));
      } catch (error) {
        reject(error);
      }
    });
  }
  addRow(table, content) {
    if (typeof table !== "string") {
      throw new TypeError("table must be of type string");
    }
    if (typeof content !== "object" || content.constructor.name !== "Object") {
      throw new TypeError("content must be of type Object");
    }
    if (!this.DB[table]) {
      this.createTable.bind(this)(table, Object.keys(content));
    }
    const allowedContent = Object.fromEntries(
      Object.entries(content).filter(([key]) =>
        Object.keys(this.DB[table]).includes(key)
      )
    );
    Object.keys(this.DB[table]).forEach((key) => {
      if (!Object.keys(allowedContent).includes(key)) {
        allowedContent[key] = null;
      }
    });
    for (let column in allowedContent) {
      this.DB[table][column].push(allowedContent[column]);
    }
    this.DB_PENDING_UPDATES.push(this.DB);
    return allowedContent;
  }

  getRowsAsync(table, where = {}) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getRows(table, where));
      } catch (error) {
        reject(error);
      }
    });
  }
  getRows(table, where = {}) {
    if (typeof table !== "string") {
      throw new TypeError("table must be of type string");
    }
    if (typeof where !== "object" || where.constructor.name !== "Object") {
      throw new TypeError("where must be of type Object");
    }
    if (Object.keys(where).length === 0) {
      return this.db[table];
    }
    let rows = [];
    if (this.DB[table]) {
      for (
        let index = 0;
        index <
        Object.values(this.DB[table][Object.keys(this.DB[table])[0]]).length;
        index++
      ) {
        let row = {};
        for (let key in this.DB[table]) {
          row[key] = this.DB[table][key][index];
        }
        rows.push(row);
      }
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

  getRowAsync(table, index) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.getRow(table, index));
      } catch (error) {
        reject(error);
      }
    });
  }
  getRow(table, index) {
    const row = {};
    if (!this.DB[table]) return null;
    for (let key in this.DB[table]) {
      if (index >= 0 && index < this.DB[table][key].length) {
        row[key] = this.DB[table][key][index];
      } else {
        throw new IndexOutOfBoundsError(index);
      }
    }
    return row;
  }

  removeRowAsync(table, index) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.removeRow(table, index));
      } catch (error) {
        reject(error);
      }
    });
  }
  removeRow(table, index) {
    const row = {};
    if (!this.DB[table] || this.DB[table].length === 0) return {};
    for (let key in this.DB[table]) {
      if (index >= 0 && index < this.DB[table][key].length) {
        row[key] = this.DB[table][key][index];
        this.DB[table][key].splice(index, 1);
      } else {
        throw new IndexOutOfBoundsError(index);
      }
    }
    this.DB_PENDING_UPDATES.push(this.DB);
    return row;
  }
}

class IndexOutOfBoundsError extends Error {}
