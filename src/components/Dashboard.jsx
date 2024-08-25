import { useCallback, useEffect, useState } from "react";
import UserInputModal from "./UserInputModal";
import { applyPatch, deepClone } from "fast-json-patch";
import PatchList from "./PatchList";
import DiffViewer from "./DiffViewer";
import { Grid, GridItem, useToast } from "@chakra-ui/react";

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [baseObject, setBaseObject] = useState({});
  const [patches, setPatches] = useState([]);
  const [currentPatches, setCurrentPatches] = useState([]);
  const [acceptedPatches, setAcceptedPatches] = useState([]);
  const [modifiedObject, setModifiedObject] = useState({});
  const toast = useToast();

  const handleSubmit = (object, patches) => {
    setBaseObject(object);
    setPatches(patches);
    setCurrentPatches(patches);
    setAcceptedPatches([]);
  };

  const handleAddPatch = (newPatches) => {
    setPatches([...newPatches, ...patches]);
    setCurrentPatches([...newPatches, ...currentPatches]);
  };

  const applyCurrentPatches = useCallback(() => {
    try {
      let updatedObject = deepClone(baseObject);
      const allPatches = [...acceptedPatches, ...currentPatches];
      allPatches.forEach((patch) => {
        const { newDocument } = applyPatch(updatedObject, [patch]);
        updatedObject = newDocument;
      });
      setModifiedObject(updatedObject);
    } catch (error) {
      toast({
        title: "Error Applying Patches",
        description:
          "An error occurred while applying patches. Check the example below for the correct format.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [acceptedPatches, baseObject, currentPatches, toast]);

  useEffect(() => {
    applyCurrentPatches();
  }, [applyCurrentPatches]);

  const handleAcceptPatch = (index) => {
    const acceptedPatch = currentPatches[index];
    const updatedCurrentPatches = currentPatches.filter((_, i) => i !== index);
    setAcceptedPatches([...acceptedPatches, acceptedPatch]);
    setCurrentPatches(updatedCurrentPatches);
  };

  const handleRejectPatch = (index) => {
    const updatedPatches = patches.filter((_, i) => i !== index);
    const updatedCurrentPatches = currentPatches.filter((_, i) => i !== index);
    setPatches(updatedPatches);
    setCurrentPatches(updatedCurrentPatches);
  };

  const handleReset = () => {
    setIsModalOpen(true);
    setBaseObject([]);
    setPatches([]);
    setCurrentPatches([]);
    setAcceptedPatches([]);
    setModifiedObject([]);
  };

  return (
    <>
      {isModalOpen ? (
        <UserInputModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialStep={0}
        />
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "repeat(10, 1fr)" }} gap={4}>
          <GridItem
            height={{ base: "auto", md: "100vh" }}
            borderRight="1px solid"
            borderColor="gray.300"
            boxShadow="md"
            overflow="auto"
            colSpan={{ base: 5, md: 8 }}
          >
            <DiffViewer
              original={baseObject}
              modified={modifiedObject}
              onReset={handleReset}
            />
          </GridItem>
          <GridItem
            colSpan={{ base: 5, md: 2 }}
            borderLeft="1px solid"
            borderColor="gray.300"
            height={{ base: "auto", md: "100vh" }}
            overflow="auto"
          >
            <PatchList
              patches={currentPatches}
              onAccept={handleAcceptPatch}
              onReject={handleRejectPatch}
              onAddPatch={handleAddPatch}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
