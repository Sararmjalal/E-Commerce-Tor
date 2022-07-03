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

const dbDirectory = path.join(process.cwd(), "/src/cart/db");
const productDbDirectory = path.join(process.cwd(), "/src/product/db");


class CartSchema {
  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async findById(_id) {
    try {
      const thisProduct = JSON.parse(
        readFileSync(path.join(productDbDirectory, `${_id}.txt`), {
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

  async totallPrice ({price, quantity}) {}

}