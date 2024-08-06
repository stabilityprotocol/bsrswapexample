import { Box, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";

export const Box5 = () => {
  return (
    <Box p={4} w={["100vw", "xl"]} bg={"gray.700"} borderRadius={4}>
      <Box>
        <Heading size="md">Links</Heading>
        <UnorderedList mt={4}>
          <ListItem>
            <Link
              href="https://github.com/stabilityprotocol/bsrswapexample/tree/main"
              isExternal
            >
              App Source Code
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://stabilityprotocol.com/contact-us" isExternal>
              Contact Us
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://discord.gg/C9T2hdMh" isExternal>
              Discord
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://x.com/STABILITYinc" isExternal>
              X
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
};
