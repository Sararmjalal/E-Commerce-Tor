import express from "express";
import CartController from "./controller";
import userAuth from "lib/utils/userAuth";

const router = express.Router();

router.post("/add", CartController.addProduct);

router.post("/edit", CartController.editProductOfCart);

router.get("/calculate-price", CartController.calculatePrice);

export default router;
