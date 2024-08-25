import React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const ExampleCopiedBox = ({ example }) => {
  const toast = useToast();
  const { onCopy } = useClipboard(example);

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Copied!",
      description: "Copied Text is ready to paste.",
      position: "top",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      mt="20px"
      p="10px"
      bg="gray.100"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      position="relative"
    >
      <Tooltip label="Copy Example" aria-label="Copy Example Tooltip">
        <IconButton
          icon={<CopyIcon />}
          onClick={handleCopy}
          colorScheme="blue"
          variant="solid"
          isRound={true}
          size="sm"
          position="absolute"
          top="10px"
          right="10px"
          aria-label="Copy Example Patch"
        />
      </Tooltip>
      <Box as="pre" fontSize="sm" p="10px" overflowX="auto">
        {example}
      </Box>
    </Box>
  );
};

export default ExampleCopiedBox;
