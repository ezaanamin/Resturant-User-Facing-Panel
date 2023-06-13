import express from "express"
import {GetRiders} from "../controllers/rider.js"
const router=express.Router();

router.get("/",GetRiders)

export default router;
