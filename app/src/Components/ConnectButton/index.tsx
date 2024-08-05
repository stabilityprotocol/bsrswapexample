import { Button } from "@chakra-ui/react";
import { useConnect } from "wagmi";

export const ConnectButton = () => {
  const { connect, connectors, isPending } = useConnect();
  return (
    <Button
      colorScheme="teal"
      w={"100%"}
      onClick={() => {
        if (isPending) return;
        connect({
          connector: connectors[0],
        });
      }}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
