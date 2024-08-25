import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  ModalCloseButton,
} from "@chakra-ui/react";

const CommonModal = ({ isOpen, onClose, title, footerContent, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader bg="#EDF2F7">{title}</ModalHeader>
        {onClose && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Flex>{footerContent}</Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommonModal;
