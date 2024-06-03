import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleSend = () => {
    if (input.trim() === "") {
      toast({
        title: "Input is empty.",
        description: "Please enter a message.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const correctedMessage = correctSpelling(input);
    setMessages([...messages, { text: input, corrected: correctedMessage }]);
    setInput("");
  };

  const correctSpelling = (text) => {
    // Dummy spell correction logic
    // In a real-world scenario, you would use a spell-check API or library
    const corrections = {
      teh: "the",
      recieve: "receive",
      adress: "address",
      definately: "definitely",
    };

    return text
      .split(" ")
      .map((word) => corrections[word.toLowerCase()] || word)
      .join(" ");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box width="100%" height="60vh" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          {messages.map((message, index) => (
            <Box key={index} mb={4}>
              <Text fontWeight="bold">You:</Text>
              <Text>{message.text}</Text>
              <Text fontWeight="bold" mt={2}>
                Corrected:
              </Text>
              <Text>{message.corrected}</Text>
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
          <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSend} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
