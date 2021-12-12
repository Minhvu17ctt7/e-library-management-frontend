import { Dropdown, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Header = () => {

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('jwt');
    Cookies.set('isLoggedin', false);
    router.push("/");
  }

  return (

    <header class="p-3 border-bottom">
      <div class="container-fluid">
        <Row><Col xs={2}>
          <a href="/">
            <h6>E-LIBRARY-MANAGEMENT</h6>
          </a>
        </Col>
          <Col className="d-flex flex-row-reverse">
            <div>
              <ul class="nav">
                <Link href="/login">
                  <button type="button" class="btn btn-outline-primary me-2">Login</button>
                </Link>
                <button type="button" class="btn btn-primary" onClick={handleLogout}>Logout</button>
              </ul>
            </div>
          </Col>
        </Row>

      </div>
    </header>
  )
}

export default Header
