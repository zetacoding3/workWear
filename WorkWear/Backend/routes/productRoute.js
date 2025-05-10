import express from 'express';

//importing product model
import { Product } from '../models/productModel.js';

//Middleware to upload image with multer
import upload from '../middleware/upload.js';

//creating router
const router = express.Router();

//Get All products
router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        //return no products if array is empty
        if (products.length == 0)
            return res.status(400).json({ Error: "No products found" });

        return res.status(200).json({ products });
    } catch (err) {
        console.log('Server error : ' + err.message);
        res.status(500).send({ message: err.message });
    }
});

//Get only 1 product details
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const productDetails = await Product.findById(id);
        //return error if no product is found
        if (!productDetails)
            return res.status(400).json({ Error: 'No products found' })

        return res.status(200).json({ productDetails })
    } catch (err) {
        console.log('Server error : ' + err.message);
        res.status(500).send({ message: err.message });
    }
});

//Add new product
router.post('/add', upload.single("image"), async(req, res) => {
    //get data sent from frontend
    const { p_name, desc, price, stock } = req.body;
    try {
        //check if the data is present
        if (!p_name ||
            !desc ||
            !price ||
            !stock
        ) {
            return res.status(404).send({
                message: 'Send all required fields'
            });
        }

        //create new product of Product model
        const newProduct = new Product({
            p_name: p_name,
            price: price,
            desc: desc,
            stock: stock,
            img: [`/uploads/${req.file.filename}`]
        });

        //save new product details in database
        await newProduct.save();

        // return the product and success message
        return res.status(201).json({
            Success: 'New product created',
            product: newProduct
        });

    } catch (err) {
        console.log('Server error : ' + err.message);
        res.status(500).send({ message: err.message });
    }
});

//Delete a product
router.delete('/:id', async(req, res) => {

    //get the product id in url
    const { id } = req.params;
    try {
        //delete the product with id
        await Product.findByIdAndDelete(id);

        return res.status(200).json({ Success: 'Product deleted successfully' })
    } catch (err) {
        console.log('Server error : ' + err.message);
        res.status(500).send({ message: err.message });
    }
});

//Update a product
router.put('/', async(req, res) => {
    //get parameters to update
    const { id, p_name, price, stock, desc } = req.body;
    try {
        //check if minimum data has been recieved
        if (!id && (p_name || price || stock || desc)) {
            return res.status(404).send({
                message: 'Send atleast any of the updating fields'
            });
        }

        //create a new payload for updating
        const payload = {};

        //check if the parameter value is present and add to payload if present
        if (p_name) payload.p_name = p_name;
        if (price) payload.price = price;
        if (stock) payload.stock = stock;
        if (desc) payload.desc = desc;

        //update product with id and payload
        await Product.findByIdAndUpdate(id, payload);

        return res.status(200).json({ Succeess: "Product has been Updated" });
    } catch (err) {
        console.log('Server error : ' + err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;