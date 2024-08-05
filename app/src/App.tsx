import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/config";
import { Header } from "./Components/Header";
import theme from "./theme";

import "./App.css";
import { Main } from "./Pages/Main";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Flex flexDir={"column"} w={"100vw"}>
              <Header />
              <Main />
            </Flex>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
