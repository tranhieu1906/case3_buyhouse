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
          let view = await getTeamplates.readTemplate("./view/base.html");
          view = view.replace("{user}", userData[i].nameUser);
          await CookieAndSession.WriteSessionAndCookie(req, res, dataSql);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(view);
          res.end();
        }
      }
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
  RegisterController(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let newData = qs.parse(data);
      console.log(newData);
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
