import express from "express";
import ProductController from "./controller";
import userAuth from "lib/utils/userAuth";

const router = express.Router();

router.post("/create", ProductController.createProduct);

router.post("/edit", ProductController.editProduct);

router.get("/", ProductController.getAllProducts);

router.get("/top-products", ProductController.getTopProducts);

router.get("/:_id", ProductController.getSingleProduct);

export default router;
