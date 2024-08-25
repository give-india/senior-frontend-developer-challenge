import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

const DiffViewer = ({ original, modified, onReset }) => {
  const smallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Box>
      <Heading
        bg="white"
        position="sticky"
        top="0"
        w="100%"
        p={4}
        size="md"
        boxShadow="sm"
        zIndex="1"
        borderBottom="1px solid "
        borderColor="gray.300"
      >
        <Flex justifyContent="space-between">
          Difference Between Original and Modified JSON
          <Tooltip
            label="Reset patches and JSONs"
            aria-label="Reset patches and JSONs Tooltip"
          >
            <IconButton
              icon={<RepeatIcon />}
              size="sm"
              isRound={true}
              colorScheme="blue"
              aria-label="Reset Patches and JSONs"
              onClick={onReset}
            />
          </Tooltip>
        </Flex>
      </Heading>
      <Box>
        <ReactDiffViewer
          oldValue={JSON.stringify(original, null, 2)}
          newValue={JSON.stringify(modified, null, 2)}
          splitView={!smallScreen}
          hideLineNumbers={smallScreen}
        />
      </Box>
    </Box>
  );
};

export default DiffViewer;
