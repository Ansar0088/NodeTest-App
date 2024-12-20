const fs = require("fs");
const json = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
const products = json.products;

exports.createProduct = (req, res) => {
    console.log(req.body);
    products.push(req.body);
    res.status(201).json(req.body);
  };
  exports.getAllProducts = (req, res) => {
    res.json(products);
  };
  
  exports.getProduct = (req, res) => {
    const id = req.params.id ? +req.params.id : null;
  
    if (id) {
      const product = products.find((p) => p.id === id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" })
      }
    } else {
      res.json(products);
    }
  };
  exports.updateProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((p) => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, { ...product, ...req.body });
    res.status(201).json();
  };
  exports. replaceProducrs = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((p) => p.id === id);
    products.splice(productIndex, 1, { ...req.body, id: id });
    res.status(201).json();
  };
  exports.deleteProducts = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((p) => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1);
    console.log("gyaa---------", product);
    res.status(201).json(product);
  };