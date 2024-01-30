import express from 'express';
import { authentication } from '../middlewares/authentication.js';
import { updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.use(authentication)
router.put('/update', updateUser)
router.delete("/delete", deleteUser)


export default router

