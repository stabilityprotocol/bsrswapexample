import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/config";
import { Header } from "./Components/Header";
import { Main } from "./Pages/Main";
import theme from "./theme";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <Flex flexDir={"column"} w={"100vw"}>
                <Header />
                <Main />
              </Flex>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
