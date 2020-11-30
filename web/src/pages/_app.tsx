import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider, createClient } from "urql";
import theme from "../theme";
const client = createClient({
  url: "http://localhost:4210/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
