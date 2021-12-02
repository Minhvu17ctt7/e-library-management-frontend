import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = (props) => {
    return (
        // <Container fluid classNameName="p-0">
        //     <Header />
        //     <main style={{ minHeight: '75vh' }}>{props.children}</main>
        //     <Footer />
        // </Container>
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row" style={{ minHeight: '85vh' }}>
                    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse p-0">
                        <Sidebar />
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10">
                        {props.children}
                    </main>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout
