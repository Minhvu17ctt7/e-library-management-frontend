import { Dropdown, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import React from 'react'

const Header = () => {
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
                <Link href="/login">
                  <button type="button" class="btn btn-primary">Logout</button>
                </Link>
              </ul>
            </div>
          </Col>
        </Row>

      </div>
    </header>
  )
}

export default Header
