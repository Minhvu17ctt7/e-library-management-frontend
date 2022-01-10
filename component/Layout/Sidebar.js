import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "styles/Header.module.css"

const Sidebar = () => {
  const router = useRouter();
  const routerPath = router.pathname.split('/')[2];
  return (
    <div>
      {/* // <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "100%", height: "100%", }}> */}
      {/* <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span class="fs-4">Sidebar</span>
            </a>
            <hr /> */}
      {/* <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link href="/manage" exact>
                        <a className={!routerPath ? "nav-link link-dark active" : "nav-link link-dark"}>
                        <i class="bi bi-house"></i>Home
                        </a>
                    </Link>
                </li>
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link href="/manage/books">
                        <a className={routerPath === "books" ? "nav-link link-dark active" : "nav-link link-dark"}>
                        <i class="bi bi-book"></i>Books
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/manage/members">
                        <a className={routerPath === "members" ? "nav-link link-dark active" : "nav-link link-dark"}>
                        <i class="bi bi-person"></i>Members
                        </a>
                    </Link>
                </li>
                <li>
                    <a className="nav-link link-dark">
                    <i class="bi bi-newspaper"></i>Transaction
                    </a>
                    <Link href="/manage/transactions">
                        <a className={routerPath === "transactions" ? "nav-link link-dark active" : "nav-link link-dark"}>
                            Transaction
                        </a>
                    </Link>
                </li>
                <li>
                    <a className="nav-link link-dark">
                    <i class="bi bi-gear"></i>Setting
                    </a>
                </li>
            </ul> */}
      <div className={styles.sidebarContainer}>
        <ul className={styles.sidebarNavigation}>
          <li className={styles.header}>Menu</li>
          <li>
            <Link href="/manage/books">
              <a className={routerPath === "books" ? styles.active : null}>
                <i className="bi bi-book"></i>Books
              </a>
            </Link>
          </li>
          <li>
            <Link href="/manage/members">
              <a className={routerPath === "members" ? styles.active : null}>
                <i className="bi bi-person"></i>Members
              </a>
            </Link>
          </li>
          <li>
            <Link href="/manage/transactions">
              <a className={routerPath === "transactions" ? styles.active : null}>
                <i className="bi bi-person"></i>Transactions
              </a>
            </Link>
          </li>
          {/* <li>
            <a href="#">
              <i className="bi bi-gear"></i>Setting
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
