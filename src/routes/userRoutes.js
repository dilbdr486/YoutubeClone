import {Router} from 'express';
import { userRegister } from '../controllers/userControllers.js';
import{upload} from '../middlewares/multerMiddlerwares.js';


const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    userRegister);

export default router;