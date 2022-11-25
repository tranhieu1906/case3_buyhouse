const fs = require("fs");
const cookie = require("cookie");
class CookieAndSession {
  async WriteSessionAndCookie(req, res, data) {
    try {
      let sessionName = Date.now();
      let dataSession = [...data, sessionName];
      fs.writeFile(
        "src/session/" + sessionName + ".txt",
        JSON.stringify(dataSession),
        (err) => {
          if (err) {
            console.log(err.message);
          }
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("key", JSON.stringify(sessionName), {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7, // 1 week
            })
          );
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new CookieAndSession();
