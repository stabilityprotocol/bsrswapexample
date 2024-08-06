// import { Button, Flex, Input } from "@chakra-ui/react";
// import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// export const AccountWidget = () => {
//   const { address, isConnected } = useAccount();
//   console.log("🚀 ~ AccountWidget ~ address:", address);
//   // const { disconnect } = useDisconnect();

//   // if (!isConnected) return <ConnectButton />;
//   return <ConnectButton />;

//   // return (
//   //   <Flex gap={4}>
//   //     <Input
//   //       disabled
//   //       value={"0x" + address?.slice(2, 8) + "..." + address?.slice(-6)}
//   //       bg="gray.700"
//   //       textAlign={"center"}
//   //     />
//   //     <Button
//   //       w={"100%"}
//   //       colorScheme="red"
//   //       onClick={() => {
//   //         disconnect();
//   //       }}
//   //     >
//   //       Disconnect
//   //     </Button>
//   //   </Flex>
//   // );
// };

export const AccountWidget = () => {
  return <ConnectButton showBalance={false} />;
};
