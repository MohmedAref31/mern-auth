import express from 'express';
import { signup, signin, google, signout } from '../controllers/auth.controller.js';

const authRoutes = express.Router();


authRoutes.post('/signup', signup)
authRoutes.post('/signin', signin)
authRoutes.post('/google', google)
authRoutes.get('/signout', signout)

export default authRoutes

