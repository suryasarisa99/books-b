const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
function authenticateAdminToken(req, res, next) {
  let token = req.headers.authorization;

  try {
    token = token.split(" ")[1];
  } catch {
    return res.status(401).json({ error: "Unauthorized", message: "No Token" });
  }
  if (!token)
    return res.status(401).json({ error: "Unauthorized", message: "No Token" });
  try {
    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user._id === "admin") {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    console.log("invalid token");
    res.status(401).json({ error: "Unauthorized", message: "Invalid Token" });
  }
}
function authenticateToken(req, res, next) {
  // let token = req.cookies.permanent;
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Unauthorized", message: "No Token" });
  try {
    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user._id) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.log("invalid token");
    res.status(401).json({ error: "Unauthorized", message: "Invalid Token" });
  }
}

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = {
  authenticateAdminToken,
  authenticateToken,
  transporter,
};
