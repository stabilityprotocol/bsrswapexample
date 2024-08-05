import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Text, Heading, Link } from "@chakra-ui/react";

export const Box1 = () => {
  return (
    <Box p={4} w={["100vw", "xl"]} bg={"gray.700"} borderRadius={4}>
      <Heading size="md">What is this?</Heading>
      <Text mt={2}>
        The Business Share Revenue (BSR) feature in the Stability blockchain
        automates the distribution of transaction fees between validators and
        decentralized applications (dapps). Using a smart contract called
        FeeRewardsVaultController, it ensures that both parties receive their
        designated share of transaction fees transparently and efficiently.
      </Text>
      <Text mt={2}>
        Validators can claim their rewards directly, while dapps need to be
        whitelisted to participate. This setup enhances trust and efficiency in
        the ecosystem by providing a clear, automated revenue-sharing mechanism,
        reducing manual intervention and potential errors.
      </Text>
      <Text mt={2}>
        For more details, refer to the{" "}
        <Link
          href="https://github.com/stabilityprotocol/stability/blob/main/docs/BUSINESS-SHARE-REVENUE.md"
          isExternal
        >
          official documentation <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </Box>
  );
};
