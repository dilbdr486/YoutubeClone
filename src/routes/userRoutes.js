import { Router } from 'express';
import { changeCurrentPassword, 
  getCurrentUser, 
  getUserChannelProfile, 
  getWatchHistory, 
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  updateAccountDetails, 
  updateUserAvatar, 
  updateUserCoverImage, 
  userRegister 
 } 
from '../controllers/userControllers.js';
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
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)
export default router;
