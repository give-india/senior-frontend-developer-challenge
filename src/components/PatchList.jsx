import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Flex,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import UserInputModal from "./UserInputModal";

const PatchList = ({ patches, onAccept, onReject, onAddPatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPatch = (parsedObject, parsedPatches) => {
    onAddPatch(parsedPatches);
    setIsModalOpen(false);
  };
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
          Patch Operations
          <Tooltip label="Add Patch" aria-label="Add Patch Tooltip">
            <IconButton
              icon={<AddIcon />}
              size="sm"
              isRound={true}
              colorScheme="blue"
              onClick={() => setIsModalOpen(true)}
              aria-label="Add Patch"
            />
          </Tooltip>
        </Flex>
      </Heading>
      <Box>
        {patches.length > 0 ? (
          <VStack p={4} spacing={6} align="stretch">
            {patches.map((patch, index) => (
              <Box
                key={index}
                bg="gray.50"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="sm"
                p={4}
              >
                <Box bg="white" p={4} borderRadius="md" whiteSpace="pre-wrap">
                  <Text fontSize="sm">{JSON.stringify(patch, null, 2)}</Text>
                </Box>
                <Flex gap="10px" mt={4} justify="flex-end">
                  <Tooltip
                    label="Accept Patch"
                    aria-label="Accept Patch Tooltip"
                  >
                    <IconButton
                      icon={<CheckIcon />}
                      colorScheme="green"
                      isRound={true}
                      variant="solid"
                      onClick={() => onAccept(index)}
                      aria-label="Accept Patch"
                      size="sm"
                    />
                  </Tooltip>
                  <Tooltip
                    label="Reject Patch"
                    aria-label="Reject Patch Tooltip"
                  >
                    <IconButton
                      icon={<CloseIcon />}
                      colorScheme="red"
                      isRound={true}
                      variant="solid"
                      onClick={() => onReject(index)}
                      aria-label="Reject Patch"
                      size="sm"
                    />
                  </Tooltip>
                </Flex>
              </Box>
            ))}
          </VStack>
        ) : (
          <Box pt="20px" textAlign="center">
            <Text fontSize="lg" color="gray.500">
              Add new patches to see them here.
            </Text>
          </Box>
        )}
      </Box>
      <UserInputModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handleAddPatch}
        initialStep={1}
      />
    </Box>
  );
};

export default PatchList;
