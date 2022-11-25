const fs = require("fs");
const qs = require("qs");
const getTeamplates = require("../Handler/FileSystem.js");
class SiteController {
    async showHomePage(req,res) {
        let data = await getTeamplates.readTemplate('./view/home.html')
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
    async ShowPageNotFound(req, res) {
        let data = await getTeamplates.readTemplate('./view/notfound.html');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
    }
}
module.exports = new SiteController();
