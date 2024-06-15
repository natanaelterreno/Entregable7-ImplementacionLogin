import Router from 'express'
import productModel from '../../models/product.models.js'

const router = new Router()

router.get('/', async (req, res) => {
    const products = await productModel.find({})
    res.send({status: 'success', payload: products})
})

router.post('/', async (req, res) => {
    const { body } = req
    const result = await productModel.create(body)
    res.send({status: 'success', payload: result})
})

router.get('/:pId', async (req, res) => {
    const { pId } = req.params
    const productFound = await productModel.findById({_id: pId})
    res.send({status: 'success', payload: productFound})
})

router.put('/:pId', async (req, res) => {
    const { pId } = req.params
    const  prodToUpdate = req.body
    const result = await productModel.updateOne({ _id: pId }, prodToUpdate)
    res.send({status: 'success', payload: result})
})

router.delete('/:pId', async (req, res) => {
    const { pId } = req.params
    const result = await productModel.deleteOne({ _id: pId.trim() })
    res.send({status: 'success', payload: result})
})



// router.get('/', async (req, res) => {
//     try {
//         const { limit } = req.query;
//         const products = await productManager.getProducts();
    
//         if(limit){
//             res.send(products.slice(0, parseInt(limit)));
//         }
//         else {
//             res.send(products);
//         }        
//     } catch (error) {
//         res.send('Response: ' + res +' - Error: '+ error)
//     }
// });



// router.post("/", async (req, res) => {    
//     try {
//         let resp = await productManager.addProduct(req.body);        
//         res.send(resp);
//     } catch (error) {
//         res.send('Response: ' + res +' - Error: '+ error)
//     }
// });

// router.put("/:pId", async (req, res) => {
//     const id = parseInt(req.params.pId)
//     const product = {
//         id,
//         title: req.body.title,
//         description: req.body.description,
//         code: req.body.code,
//         price: req.body.price,
//         status: req.body.status || true,
//         stock: req.body.stock,
//         category: req.body.category,
//         thumbnails: req.body.thumbnails
//     };
//     try {        
//         let resp = await productManager.updateProduct(product);
//         res.send(resp)
//     } catch (error) {
//         res.send('Response: ' + res +' - Error: '+ error)        
//     }    
// })

// router.delete('/:pid', async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const prod = await productManager.deleteProduct(parseInt(pid))
//         res.send(prod);        
//     } catch (error) {
//         res.send('Response: ' + res +' - Error: '+ error)
//     }
// });

export default router