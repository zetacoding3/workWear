import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);

    //get all the products from database
    const getProducts = () => {
        axios
            .get('http://localhost:5000/products')
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((err) => {
                console.log(err);

            })
    }
    const navigator = useNavigate();

    //handle add to cart operation
    function handleAddCart(e) {
        //check if the user is logged in or not
        if (!localStorage.getItem('userToken')) {
            //redirect to login page since the user has not logged in
            navigator('/login');
        } else {
            //get user token since logged in and add the cart item to database
            const token = localStorage.getItem('userToken');
            axios
                .post('http://localhost:5000/cart/add', {
                    p_id: e.target.dataset.id,
                    qty: 1
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                .then((response) => {
                    window.alert("Item added to cart")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        }
    }

    //get all the products from database on render
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <>
            <div className="container-fluid bg-light p-4 shadow mt-4">
                <h3 className="text-center">New Arrivals</h3>
                <hr />
                <div className="row flex-jcenter">

                    {!products ? (
                        <h1 className="fw-normal">Ooops! Something went Wrong.</h1>
                    ) : products.slice(0, 4).map((product) => (
                        <div className="col-md-3 flex-center" key={product._id}>
                            <div className="card">
                                <img src={`http://localhost:5000${product.img[0]}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{product.p_name}</h5>
                                    <p className="card-text">{product.desc}</p>
                                    <div className="d-flex gap-3">
                                        <Link to={`/products/${product._id}`} className="btn btn-primary">Details</Link>
                                        <button className="btn btn-warning" data-id={product._id} onClick={handleAddCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="container-fluid bg-light p-4 shadow mt-4">
                <h3 className="text-center">Popular Products</h3>
                <hr />
                <div className="row flex-jcenter">

                    {!products ? (
                        <h1 className="fw-normal">Ooops! Something went Wrong.</h1>
                    ) : products.slice(4, 8).map((product) => (
                        <div className="col-md-3 flex-center" key={product._id}>
                            <div className="card">
                                <img src={`http://localhost:5000${product.img[0]}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{product.p_name}</h5>
                                    <p className="card-text">{product.desc}</p>
                                    <div className="d-flex gap-3">
                                        <Link to={`/products/${product._id}`} className="btn btn-primary">Details</Link>
                                        <button className="btn btn-warning" data-id={product._id} onClick={handleAddCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="container-fluid bg-light p-4 shadow mt-4">
                <h3 className="text-center">Our Choice</h3>
                <hr />
                <div className="row flex-jcenter">

                    {!products ? (
                        <h1 className="fw-normal">Ooops! Something went Wrong.</h1>
                    ) : products.slice(8, 12).map((product) => (
                        <div className="col-md-3 flex-center" key={product._id}>
                            <div className="card">
                                <img src={`http://localhost:5000${product.img[0]}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{product.p_name}</h5>
                                    <p className="card-text">{product.desc}</p>
                                    <div className="d-flex gap-3">
                                        <Link to={`/products/${product._id}`} className="btn btn-primary">Details</Link>
                                        <button className="btn btn-warning" data-id={product._id} onClick={handleAddCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Products
