import express from "express"
import { allPost, create, delet, fetchPost, likePost, timeline, update } from "../controllers/post_controller.js";
import { upload } from "../middleware/multer_middleware.js";

const router =  express.Router()


router.post("/" ,upload.single("img") ,create)

router.put("/:id",update )

router.delete("/:id" ,delet) 

router.get("/:id" ,fetchPost) 

router.put("/:id/like",likePost)

router.get("/timeline/:userId",timeline) 

router.get("/profile/:username", allPost)

export default router ;

