import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
    res.json({ message: 'login' })
})

router.post('/logout', (req, res) => {

})

export default router
