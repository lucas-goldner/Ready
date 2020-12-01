import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
