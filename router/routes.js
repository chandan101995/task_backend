import express from "express";
import * as UserController from '../controller/UserController.js';

const router = express.Router();

router.post('/add-data', UserController.add_data);
router.get('/get-data', UserController.get_data);
router.get('/get-country', UserController.get_country);
router.get('/get-state', UserController.get_state);
router.get('/get-city', UserController.get_city);


export default router;