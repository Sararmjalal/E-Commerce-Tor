import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";
import jwt from "jsonwebtoken";

const dbDirectory = path.join(process.cwd(), "/src/product/db");


if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

class ProductSchema {
  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async create({ title, price, quantity, color, type, inStore, description, imgurl }) {
    try {
      print("before if");
      if (
        !title ||
        !price ||
        isNaN(Number(price)) ||
        !quantity ||
        isNaN(Number(quantity)) ||
        !color ||
        !type ||
        !inStore ||
        isNaN(Number(inStore)) ||
        !description ||
        !imgurl
      )
        throw new Error("bad input");

      print("after if");
      const thisProduct = {
        _id: UID("ECP"),
        title,
        price,
        quantity,
        color,
        type,
        inStore,
        description,
        imgurl,
        averageScore: 0,
        scores: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      print("after this product");

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisProduct._id}.txt`,
        ),
        JSON.stringify(thisProduct),
        "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return thisProduct;
      
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      if (!this.doesCacheneedsUpdate || this.cache) return this.cache;

      const result = readdirSync(dbDirectory).map((item) => {
        const thisProduct = JSON.parse(
          readFileSync(path.join(dbDirectory, item), {
            encoding: "utf-8",
          })
        );

        return thisProduct;
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

  async findById(_id) {
    try {
      const thisProduct = JSON.parse(
        readFileSync(path.join(dbDirectory, `${_id}.txt`), {
          encoding: "utf8",
        })
      );

      return thisProduct;

    } catch (error) {
      console.log("Error in findById");
      console.log(error);

      return null;
    }
  }

  async findByIdAndUpdate(_id, data) {
    try {
      const thisProduct = await this.findById(_id);

      Object.entries(data).forEach(
        ([key, value]) => (thisProduct[key] = value)
      );

      thisProduct.updatedAt = new Date().toISOString();

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisProduct._id}.txt`,
          ),
          JSON.stringify(thisProduct),
          "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return "ok";

    } catch (error) {
      throw error;
    }
  }

  async getTopProducts() {
    try {

      return deepClone(await this.findAll())
        .sort((a, b) => b.averageScore - a.averageScore)
        .slice(0, 3);

    } catch (error) {
      console.log("Error in getTopProducts");
      console.log(error);

      return [];
    }
  }
}

const ProductModel = new ProductSchema();

export default ProductModel;
