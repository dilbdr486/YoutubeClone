import { Router } from 'express';
import { loginUser, logoutUser, refreshAccessToken, userRegister } from '../controllers/userControllers.js';
import { upload } from '../middlewares/multerMiddlerware.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'coverImage',
      maxCount: 1,
    },
  ]),
  userRegister
);
router.route('/login').post(loginUser);

//secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);

export default router;
