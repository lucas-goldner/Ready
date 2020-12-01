import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="black" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="black">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box>{data.me.username}</Box>
        <Button variant="link" ml={2}>
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
