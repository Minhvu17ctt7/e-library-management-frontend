import React from 'react'
import Link from 'next/link'
import styles from "../../styles/Header.module.css"

const Sidebar = () => {
    return (
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "100%", height: "100%", }}>
            {/* <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span class="fs-4">Sidebar</span>
            </a>
            <hr /> */}
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link href="/" exact>
                        <a class="nav-link link-dark active">
                            Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/books">
                        <a class="nav-link link-dark">
                            Books
                        </a>
                    </Link>
                </li>
                <li>
                    <a class="nav-link link-dark">
                        Member
                    </a>
                </li>
                <li>
                    <a class="nav-link link-dark">
                        Products
                    </a>
                </li>
                <li>
                    <a class="nav-link link-dark">
                        Customers
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
