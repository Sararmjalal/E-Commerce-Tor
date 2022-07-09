import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";

import Product from "../product/model";

const dbDirectory = path.join(process.cwd(), "/src/cart/db");
const productDbDirectory = path.join(process.cwd(), "/src/product/db");

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}


class CartSchema {

  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async addToCart({ productId, quantity }) {
    
    try {
      
      if (!quantity || isNaN(Number(quantity)) || !productId) throw new Error("bad input")

      const thisCart = {
        _id: UID("ECC"),
        productId,
        quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisCart._id}.txt`,
        ),
        JSON.stringify(thisCart),
        "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return thisCart;

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      if (!this.doesCacheneedsUpdate || this.cache) return this.cache;

      const result = readdirSync(dbDirectory).map((item) => {
        const thisCart = JSON.parse(
          readFileSync(path.join(dbDirectory, item), {
            encoding: "utf-8",
          })
        );

        return thisCart;
      });

      this.cache = result;
      this.doesCacheneedsUpdate = false;

      return result;

    } catch (error) {
      console.log("Error in findAll");
      console.log(error);

      return [];
    }
  }

  async findByProductId(_id) {
    try {

      const allProductsCart = await this.findAll()

      const thisProduct = JSON.parse(
        readFileSync(path.join(productDbDirectory, `${_id}.txt`), {
          encoding: "utf8",
        })
      );
      const thisProductCart = allProductsCart.find(product => {

        return product.productId == thisProduct._id
      })

      if (!thisProductCart) throw new Error('bad request: no such product exists in our database')

      return thisProductCart;

    } catch (error) {
      console.log("Error in findById");
      console.log(error);

      return null;
    }
  }

  async findByIdAndUpdate(_id, data) {
    try {

      const thisCart = await this.findByProductId(_id);

      Object.entries(data).forEach(
        ([key, value]) => (thisCart[key] = value)
      );

      thisCart.updatedAt = new Date().toISOString();

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisCart._id}.txt`,
          ),
          JSON.stringify(thisCart),
          "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return "ok";

    } catch (error) {
      throw error;
    }
  }

  

  async calculateTotalPrice (_id) {
    try {

      const allProductsCart = await this.findAll()

      const thisProducts = await Product.findAll();
      
      const thisCalculatePrice = allProductsCart.reduce((acc, cur) => {
        const thisProduct = thisProducts.find((product) => product.id == cur.id);
        return acc + thisProduct.quantity * thisProduct.price
      })

      return thisCalculatePrice
      
    } catch (error) {
      throw error;
    }
  }

}

const CartModel = new CartSchema();

export default CartModel;
