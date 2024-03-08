import express from "express"
import {GetRiders} from "../controllers/rider.js"
import { PostReviews } from "../controllers/reviews.js";
const router=express.Router();

router.get("/",GetRiders)

export default router;
