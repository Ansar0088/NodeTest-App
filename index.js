const http = require("http");
const mongoose=require('mongoose')
main().catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://localhost:27017/EcommerceTest');
    console.log('Databas connected--------------')
  
  }
  console.log(' wrong Databas connected---------------')

// EXPRESS SERVER
require('dotenv').config()
const express = require("express")
const server = express();
const morgan = require("morgan")
const productRouter = require("./routes/product")
const userController=require('./routes/user')
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"))
server.use("/api", productRouter.routes);
server.use("/users",userController.routes)
console.log('agyaaa---',process.env.DB_PASSWORD)
server.listen(8080, () => {
  console.log("Server is running on port 8080")
})

// const server = http.createServer((req, res) => {
//   console.log(req.url,req.method);
//   if (req.url.startsWith("/product")) {
//     const id = req.url.split("/")[2];
//     const prd = products.find((p) => p.id === (+id));
//     console.log('ewe---',prd)
//     res.setHeader("Conntent-Type", "text-html");
//     let modifyIndex = index
//       .replace("**title**", prd.title)
//       .replace("**url**", prd.thumbnail)
//       .replace("**description**", prd.description);
//     res.end(modifyIndex);
//   } return;

//   switch (req.url) {
//     case "/":
//       res.setHeader("content-Type", "Text/html");
//       res.end(index);
//       break;
//     case "/api":
//       res.setHeader("content-Type", "application-json");
//       res.end(JSON.stringify(json));
//       break;
//     default:
//       res.writeHead(404);
//       res.end();
//   }
// });
// server.listen(7070);
