import express from 'express'
import productsRouter from './routes/api/products.router.js'
import cartRouter from './routes/api/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import { sessionRouter } from './routes/api/sessions.router.js'

import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import connectDb from './config/index.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'

connectDb()

const app = express();
const PORT = process.env.PORT || 8080

// const httpServer = app.listen('8080', err => {
//     if(err) console.log('Error: ', err)
//     console.log(`Escuchando en el puerto ${ PORT }`);
// })

// const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

const httpServer = app.listen(PORT, err => {
    if(err) console.log('Error: ', err)
    console.log(`Escuchando en el puerto ${ PORT }`);
})

const io = new Server(httpServer)

app.use(getIo(io))

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://natanaelterreno:Bizit.2024@clustercursonodecoderho.urgxwjd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ClusterCursoNodeCoderHouse',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 60 * 60 * 1000 * 24
    }),
    secret: 's3cr3tC@d3r',
    resave: true,
    saveUninitialized: true
}))


// app.engine('handlebars', handlebars.engine())

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))

app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)


function getIo(io){
    return (req,res,next)=>{
        req.io = io
        next()
    }
}