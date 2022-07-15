import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";


const dbDirectory = path.join(process.cwd(), "/src/product/db");


if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

class OrderSchema {
  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }
}

const OrderModel = new OrderSchema();

export default OrderModel;
