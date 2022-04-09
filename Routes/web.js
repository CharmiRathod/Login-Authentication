import express from 'express'
const router = express.Router()

import userController from '../Controllers/userController.js'

router.get('/', userController.Home)
router.get('/Registration', userController.Registration)
router.post('/Registration', userController.createUserDoc)
router.get('/Login', userController.Login)
router.post('/Login', userController.verifyLogin)


export default router;