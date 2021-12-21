import React, { Fragment } from 'react'
import Head from 'next/head'
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
          <Head>
            <title>
              E-Library-Management
            </title>
          </Head>
            <Header />
            <div className="container-fluid">
                <div className="row" style={{ minHeight: '85vh' }}>
                    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse p-0">
                        <Sidebar />
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 p-5">
                        {props.children}
                    </main>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout
