const fs = require("fs");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem.js");
const CookieAndSession = require("./Session.controller");
const AuthController = require("./Auth.controller");
class SiteController {
  async showHomePage(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    if (isLogin) {
      fs.readFile("./view/base.html", "utf-8", async (err, data) => {
        if(err) throw err;
        res.writeHead(200, {"content-type": "text/html"});
        data = data.replace("{user}",isLogin[1]) 
        res.write(data);
        res.end();
      });
    }else{
      let data = await getTeamplates.readTemplate("./view/home.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  }
  async LoginPage(req, res) {
    let data = await getTeamplates.readTemplate("./view/login.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async RegisterPage(req, res) {
    let data = await getTeamplates.readTemplate("./view/register.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
  async PostPage(req, res) {
    let isLogin = CookieAndSession.checkingSession(req, res);
    console.log(isLogin)
    if(isLogin){
      let data = await getTeamplates.readTemplate("./view/post.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }else{
      console.log("sadasdasd")
      res.writeHead(301, {Location:"/login"});
      res.end();
    }
  }
  async ShowPageNotFound(req, res) {
    let data = await getTeamplates.readTemplate("./view/notfound.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  }
}
module.exports = new SiteController();
