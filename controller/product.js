const ProductModel = require("../model/product");

exports.createProduct = async (req, res) => {
  console.log("Incoming request body:", req.body);
  try {
    const { title, price, brand, rating, category, discountPercentage } =
      req.body;
    if (!title || !price || !brand) {
      return res
        .status(400)
        .json({ message: "Title, price, and brand are required" });
    }

    const product = new ProductModel({
      title,
      price,
      brand,
      rating: rating || 0,
      discountPercentage: discountPercentage || 0,
      category: category || [],
    });

    const savedProduct = await product.save();
    res
      .status(201)
      .json({
        message: "Product created successfully Ansar",
        product: savedProduct,
      });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({
      error: "Server error",
      message: err.message,
      stack: err.stack,
      details: err,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await ProductModel.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.replaceProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const replacedProduct = await ProductModel.findOneAndReplace(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!replacedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product replaced successfully",
      product: replacedProduct,
    });
  } catch (err) {
    console.error("Error replacing product:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
