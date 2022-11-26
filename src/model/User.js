const db = require("./DBconnect");

class User {
  async getListUsers() {
    let sql = "SELECT * FROM User";
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async InsertUser(data) {
    let sql = `insert into User(nameUser,phone,passwordUser) values ('${data.name}', '${data.phone}','${data.password}')`;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async changePassword(data) {
    let sql = data;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
  async CheckOldPassword(data) {
    let sql = data;
    return await db
      .runMySQL(sql)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = new User();
