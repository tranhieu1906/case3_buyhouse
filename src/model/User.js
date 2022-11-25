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
    let sql = `insert into User(phone,passwordUser) values ('${data.phone}','${data.password}')`;
    await db
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
