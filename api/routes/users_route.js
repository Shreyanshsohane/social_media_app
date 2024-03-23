import express from "express" ;
import { delet, follow, getFriends, unfollow, update, user } from "../controllers/user_controller.js";


const router =  express.Router()


router.put("/:id", update )

router.delete("/:id", delet )

router.get('/', user)

router.put("/:id/follow" ,follow)

router.put("/:id/unfollow" ,unfollow)

router.get("/friends/:userId" , getFriends)

export default router ;

