const fs = require("fs");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem.js");
const User = require("../model/User");
const CookieAndSession = require("./Session.controller");
class AuthController {
  LoginController(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      let newData = qs.parse(data);
      let userData = await User.getListUsers();
      for (let i = 0; i < userData.length; i++) {
        if (
          userData[i].phone == newData.name &&
          userData[i].passwordUser == newData.password
        ) {
          let dataSql = [
            userData[i].userId,
            userData[i].nameUser,
            userData[i].address,
            userData[i].phone,
            userData[i].password,
            userData[i].email,
            userData[i].cccd,
            userData[i].dateDK,
            userData[i].gender,
          ];
          CookieAndSession.writeCookieAndSession(req, res, dataSql);
          return;
        }
      }
      this.userWrong = true;
      res.statusCode = 302;
      res.setHeader("Location", "/login");
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  async logOutUser(req, res) {
    try {
      await CookieAndSession.deleteSession(req);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    } catch (e) {
      console.log(e.message);
    }
  }
  RegisterController(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let newData = qs.parse(data);

      User.InsertUser(newData);
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
}
module.exports = new AuthController();
