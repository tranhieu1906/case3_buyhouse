const url = require("url");
const qs = require("qs");
const fs = require("fs");
const PATH = "/Users/hoa/MD3-case/Case_demo/view";
const SiteController = require("../controllers/Site.controller.js");
const AuthController = require("../controllers/Auth.controller.js");
function router(req, res, next) {
  let parseUrl = url.parse(req.url);
  let path = parseUrl.path;
  let mimeTypes = {
    webp: "image/webp",
    jpg: "images/jpg",
    png: "images/png",
    js: "text/javascript",
    css: "text/css",
    svg: "image/svg+xml",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    eot: "application/vnd.ms-fontobject",
  };
  const filesDefences = path.match(
    /\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.webp/
  );
  if (filesDefences) {
    const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
    res.writeHead(200, { "Content-Type": extension });
    fs.createReadStream(PATH + req.url).pipe(res);
  } else {
    switch (path) {
      case "/":
        SiteController.showHomePage(req, res);
        break;
      case "/login":
        if (req.method == "GET") {
          SiteController.showHomePage(req, res);
        } else {
          AuthController.LoginController(req, res);
        }
        break;
      case "/register":
        AuthController.RegisterController(req, res);
        break;
      default:
        SiteController.ShowPageNotFound(req, res);
    }
  }
}
module.exports = router;
