import { Router } from "express";
import { UsersManager } from "../../dao/userManager.js";

export const sessionRouter = Router()
const userService = new UsersManager()

sessionRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        //valido si vienen los datos
        if (!email || !password) return res.status(401).send({stautus: 'error', error: 'se deben completar todos los datos'})

        //valido si existe el usuario
        const userExist = await userService.getUserBy({email})
        if (userExist) return res.status(401).send({status: 'error', error: 'el usuario ya existe'})

        const newUser = {
            first_name,
            last_name,
            email,
            password
        }

        const result = await userService.createUser(newUser)

        console.log(result)
        res.send('usuario registrado')

    } catch (error) {
        console.log(error)
    }
})


sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    //valido si vienen los datos
    if (!email || !password) return res.status(401).send({stautus: 'error', error: 'se deben completar todos los datos'})
    // if(email !== 'natanael@gmail.com' || password !== 'test1234') return res.send('login failed')

    const userFound = await userService.getUserBy({email, password})

    if(!userFound) return res.status(401).send({status: 'error', error: 'usuario no encontrado'})

    req.session.user = {
        email,
        admin: userFound.role === 'admin'
    }

    console.log(req.session.user)
    // res.send('login success')
    res.redirect('/home')    
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'error', error: err})
        else return res.send('logout')
    })
})