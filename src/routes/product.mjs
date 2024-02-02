import router from 'express'
import { Product } from '../Schemas/Product.mjs'

const productRouter = router()

productRouter.get("/api/get-products", async (req, res) => {
    try {
        const allProducts = await Product.find({});
        return res.status(200).json({products: allProducts })
    } catch (error) {
       return res.status(500).json({message: "Internal Server Error"})
    }

})

productRouter.post("/api/add-product", async (req, res) => {
    const { body } = req;
    const product  = new Product(body);
    const savedProduct = await product.save();
    if(savedProduct) return res.status(201).json({message: "successfully created"});
    return res.status(500).json({message: "Internal Server Error"})
})



export default productRouter