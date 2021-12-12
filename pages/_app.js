import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "styles/globals.css"
import Router from 'next/router'
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  const isLoggedIn = Cookies.get("isLoggedIn");

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }


  if (!isLoggedIn) {
    if (ctx.pathname.includes("/manage")) {
      redirectUser(ctx, "/login");
    }
  }

  return {
    pageProps
  }
}

export default MyApp
