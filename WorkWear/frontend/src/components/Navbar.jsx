import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Navbar({ login }) {

    //re-render component whenever login variable changes state 
    useEffect(() => { }, [login])
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">WorkWear</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/products"}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about"}>About Us</Link>
                            </li>

                            {!login ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>Login | Register</Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to={'/cart'} className='nav-link'>Cart</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/account"}>Account</Link>
                                    </li>
                                </>
                            )
                            }
                        </ul>
                        <div className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
