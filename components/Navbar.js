import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const Navbar = () => {
    const router = useRouter()

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" height="23" alt="" loading="lazy" />
                    </a>

                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" passHref href={`/`}>
                                    <span className={router.pathname == "/" ? "nav-link active" : "nav-link"} aria-current="page" style={{ cursor: "pointer" }}>Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link passHref href={`/categories`}>
                                    <span className={router.pathname == "/categories" ? "nav-link active" : "nav-link"} style={{cursor: "pointer"}}>Categories</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link passHref href={`/subscribe`}>
                                    <span className={router.pathname == "/subscribe" ? "nav-link active" : "nav-link"} style={{cursor: "pointer"}}>Subscription</span>
                                </Link>
                            </li>
                        </ul>

                        <form className="d-flex input-group w-auto">
                            <input type="search" className="form-control" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar