import { Router } from 'express'
import productModel from '../models/product.models.js'
// import ProductManager from '../ProductManager.js'

const router = Router()
// const productManager = new ProductManager()

router.get('/login', (req, res) => {
    res.render('layouts/login')
})

router.get('/register', (req, res) => {
    res.render('layouts/register')
})


router.get('/home', async (req, res) => {    
    const products = await productModel.find({}).lean()

    console.log('prods', products)

    res.render('home', {        
        title: 'E-commerce',
        styles: 'home.css',
        products: products
    })
})

// router.get('/realtimeproducts', async (req, res) => {

//     const {io} = req

//     const products = await productManager.getProducts();    

//     res.render('realtimeproducts', {
//         styles: 'realTimeProducts.css',
//         products
//     })

//     io.on('connection', socket => {

//         socket.emit("getProducts", JSON.stringify(products))

//         socket.on("addProduct", async product => {            
//             let resp = await productManager.addProduct(product)            
//             const products = await productManager.getProducts()                                    
//         })

//         socket.on("deleteProduct", async id => {                            
//             const resp = await productManager.deleteProduct(parseInt(id))
//             const products = await productManager.getProducts()                                    
//         })
//     })
// })

export default router