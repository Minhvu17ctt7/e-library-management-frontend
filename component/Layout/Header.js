import { Dropdown, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import { parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

const Header = () => {

  const router = useRouter();
  // const isLoggedIn = parseCookies().isLoggedIn === 'true'
  const isLoggedIn = Cookies.get("isLoggedIn") === 'true';

  const handleLogout = () => {
    Cookies.remove('jwt');
    Cookies.remove('user');
    Cookies.set('isLoggedIn', false);
    // localStorage.removeItem("user");
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("isLoggedIn");
    router.push("/");
  }

  return (

    <header className="p-3 border-bottom">
      <div className="container-fluid">
        <Row>
          <Col xs={2} className="d-flex align-items-center">
            <a href={isLoggedIn ? "/manage/books" : "/"}>
              <h6 className='m-auto'>E-LIBRARY-MANAGEMENT</h6>
            </a>
          </Col>
          <Col className="d-flex flex-row-reverse">
            <div>
              <ul className="nav">
                {!isLoggedIn &&
                  (<Link href="/login">
                    <button type="button" className="btn btn-outline-primary me-2">Login</button>
                  </Link>)}
                {isLoggedIn &&
                  (<button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>)}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </header>
  )
}

export default Header
