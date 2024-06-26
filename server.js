const express = require("express");
const app = express();
// const session = require("express-session");
require("dotenv").config();
const use = require("./utils/use");
const dbConnection = require("./utils/db");

use(app);
dbConnection();

// * Routes
// app.use("/payment", require("./routes/payment"));
app.use("/m-pay", require("./routes/manual-payment"));
app.use("/admin/edit", require("./routes/admin-edit"));
app.use("/admin", require("./routes/admin"));
app.use("/auth", require("./routes/auth"));
app.use("/books", require("./routes/products"));
app.get("/", (req, res) => {
  res.json({ server: "Books Server" });
});

app.listen(process.env.PORT || 3000);
