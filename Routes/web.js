import express from 'express'
const router = express.Router()

import userController from '../Controllers/userController.js'

router.get('/', userController.Home)
router.post('/Registration', userController.Registration)
router.post('/Login', userController.Login)

export default router;