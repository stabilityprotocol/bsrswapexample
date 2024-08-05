import { Button } from "@chakra-ui/react";
import { useConnect } from "wagmi";

export const ConnectButton = () => {
  const { connect, connectors, isPending } = useConnect();
  console.log("🚀 ~ ConnectButton ~ isPending:", isPending);
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
      Connect Wallet
    </Button>
  );
};
