import Product from "./model";

export default {
  createProduct: async (req, res) => {
    print(req.body);

    try {
      const thisProduct = await Product.create({ ...req.body });

      return res.status(200).json({
        msg: "successfully created this product",
        _id: thisProduct._id,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  editProduct: async (req, res) => {
    try {
      if (!req.body.productId || !req.body.data)
        throw new Error("bad request: bad inputs");

      const realData = {
        title: req.body.data.title,
        price: req.body.data.price,
        quantity: req.body.data.quantity,
        color: req.body.data.color,
        type: req.body.data.type,
        inStore: req.body.data.inStore,
        description: req.body.data.description,
        imgurl: req.body.data.imgurl,
      };

      const thisProduct = await Product.findById(req.body.productId);

      if (!thisProduct) throw new Error("thisProduct not found");

      await Product.findByIdAndUpdate(thisProduct._id, realData);

      return res.status(200).json({ msg: "Product successfully edited" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllProducts: async (req, res) => {
    print("get all blog ran");
    try {
      const products = deepClone(await Product.findAll());

      products.forEach((product) => product);

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getSingleProduct: async (req, res) => {
    print("get single blog ran");
    try {
      const thisProduct = deepClone(
        await Product.findById(String(req.params._id))
      );

      if (!thisProduct)
        return res
          .status(500)
          .json({ msg: "bad request: no such Product exists" });

      return res.json(thisProduct);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getTopProducts: async (req, res) => {
    print("0");
    try {
      print("1");
      const thisProducts = deepClone(await Product.getTopProducts());
      print("2");

      return res.status(200).json(thisProducts);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
