import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "styles/globals.css"
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    useRouter.push(location);
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  const jwt = parseCookies(ctx).jwt

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  //nếu chưa đăng nhập thì điều hướng đến trang đăng nhập
  //đến đã đăng nhập muốn vào trang login thì phải nhấn button logout, nên điều hướng đến manage
  if (!jwt) {
    if (ctx.pathname.includes("/manage")) {
      redirectUser(ctx, "/login");
    }
  } else if (ctx.pathname === "/login" || ctx.pathname === "/") {
    redirectUser(ctx, "/manage/books")
  }

  return {
    pageProps
  }
}

export default MyApp