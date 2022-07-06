import Cart from "./model";
import Product from "../product/model";

export default {
  addProduct: async (req, res) => {
    try {
      const thisCart = await Cart.addToCart({ ...req.body });

      return res.status(200).json({
        msg: "successfully added to cart",
        _id: thisCart._id,
      });
      
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  editProductOfCart: async (req, res) => {
    print("get editProductOfCart ran");
    try {

      if (!req.body.productId || !req.body.data) throw new Error("bad request: bad inputs");

      const realData = {
        quantity: req.body.data.quantity,
      };

      const thisProduct = await Product.findById(req.body.productId);

      if (!thisProduct) throw new Error("thisProduct not found");

      await Cart.findByIdAndUpdate(thisProduct._id, realData);

      return res.status(200).json({ msg: "Product successfully edited" });
      
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  calculatePrice: async (req, res) => {
    try {

      const thisTotalPrice = deepClone(await Cart.calculateTotalPrice());

      return res.status(200).json(thisTotalPrice);
      
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};
