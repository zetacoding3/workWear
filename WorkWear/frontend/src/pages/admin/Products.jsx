import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Products() {

    //variable for adding new product
    const [newProduct, setNewProduct] = useState({
        p_name: '',
        desc: '',
        price: 0,
        stock: 0,
        img: 0,
    });

    //variable for gettign all the products
    const [products, setProducts] = useState([]);

    // function to handle input change
    function handleChange(e) {
        const { name, value } = e.target;
        setNewProduct((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    //functiont to handle image upload
    const handleImageChange = (e) => {
        setNewProduct((prevData) => ({
            ...prevData,
            img: e.target.files[0], // Store the first selected file
        }));
    };

    //functino to handle add new product submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        //creating new formdata
        const formData = new FormData();
        formData.append('p_name', newProduct.p_name);
        formData.append('price', newProduct.price);
        formData.append('desc', newProduct.desc);
        formData.append('stock', newProduct.stock);
        if (newProduct.img) {
            formData.append('image', newProduct.img); // Append the image file
        }

        try {
            const response = await axios.post('http://localhost:5000/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            console.log('Product created:', response.data);
            // Reset form or show success message
            setNewProduct({ p_name: '', price: '', desc: '', img: undefined, stock: '' });

            setProducts([]);
            getProducts();
            document.getElementById('addBtn').click();

        } catch (error) {
            console.error('Error creating product:', error);
            // Handle error (e.g., show error message)
        }
    };

    // function to get all the products for rendering 
    function getProducts() {
        axios
            .get('http://localhost:5000/products')
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleRemove(e) {
        console.log(e.target.dataset.id);

        //add code to remove a product
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <div className="container-fluid bg-light p-3">
                <div className="container d-flex justify-content-end">
                    <button className="btn btn-primary" id='addBtn' data-bs-target="#addProduct" data-bs-toggle="collapse">
                        Add New Product
                    </button>
                </div>
            </div>

            <div className="container collapse p-2" id="addProduct">
                <div className="row p-2">
                    <div className="col-md-5 p-3">
                        <label htmlFor="p_name" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name='p_name'
                            id='p_name'
                            value={newProduct.p_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-5 p-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            name='price'
                            id='price'
                            value={newProduct.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-5 p-3">
                        <label htmlFor="stock" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            name='stock'
                            id='stock'
                            value={newProduct.stock}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-5 p-3">
                        <label htmlFor="desc" className="form-label">Product Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            name='desc'
                            id='desc'
                            rows={4}
                            value={newProduct.desc}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="col-md-5 p-3">
                        <label htmlFor="img" className="form-label">Product Image</label>
                        <input
                            type="file"
                            name="img"
                            id="img"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                    </div>
                    <hr />
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success" onClick={handleSubmit}>Add</button>
                    </div>
                </div>
            </div>

            <hr className='m-0' />

            <div className="container-fluid p-3 mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!products ? '' :
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.p_name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td className='d-flex gap-3'>
                                        <div className="dropdown">
                                            <button className="btn btn-light " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link to={`/admin/products/${product._id}`} className="dropdown-item">Update</Link></li>
                                                <li><button data-id={product._id} onClick={handleRemove} className="dropdown-item bg-danger text-white">Remove</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products
