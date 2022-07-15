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

const dbDirectory = path.join(process.cwd(), "/src/comment/db");

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

class CommentSchema {
  constructor() {
    this.cache = null
    this.doesCacheneedsUpdate = true
  }

  async create({ text, productId, userId }) {
    try {

      if (!text || !productId) throw new Error('bad request: bad input')

      const thisProduct = {
        _id: UID("ECC"),
        text,
        productId,
        userId,
        createdAt: new Date().toISOString()
      }

      writeFileSync(path.join(dbDirectory, `${thisProduct._id}.txt`), JSON.stringify(thisProduct), "utf8")

      this.doesCacheneedsUpdate = true
      return thisProduct
      
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {

      if (!this.doesCacheneedsUpdate && this.cache) return this.cache

      const result = readdirSync(dbDirectory).map(item => {
        return JSON.parse(readFileSync(path.join(dbDirectory, item), {
          encoding: "utf8",
        }),)
      })

      this.cache = result
      this.doesCacheneedsUpdate = false

      return result
      
    } catch (error) {
      console.log("Error in findAll")
      console.log(error)

      return []
    }
  }

  async getProductComments(productId) {
    try {
      const allProducts = await this.findAll()

      console.log("********")
      console.log(allProducts)

      return allProducts.filter(item => item.productId === productId)

    } catch (error) {
      console.log("Error in getProductComment")
      console.log(error)

      return []
    }
  }
}

const Comment = new CommentSchema()

export default Comment