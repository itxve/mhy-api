import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log("pageProps", pageProps);
  return <Component {...pageProps} />;
}

export default MyApp;
