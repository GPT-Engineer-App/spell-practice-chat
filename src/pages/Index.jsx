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

    const correctedSpelling = correctSpelling(input);
    const correctedGrammar = correctGrammar(correctedSpelling);
    setMessages([...messages, { text: input, correctedSpelling, correctedGrammar }]);
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

  const correctGrammar = (text) => {
    const corrections = {
      "I is": "I am",
      "you was": "you were",
      "he don't": "he doesn't",
    };

    const words = text.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (corrections[phrase.toLowerCase()]) {
        words[i] = corrections[phrase.toLowerCase()].split(" ")[0];
        words[i + 1] = corrections[phrase.toLowerCase()].split(" ")[1];
      }
    }
    return words.join(" ");
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
                Corrected Spelling:
              </Text>
              <Text>{message.correctedSpelling}</Text>
              <Text fontWeight="bold" mt={2}>
                Corrected Grammar:
              </Text>
              <Text>{message.correctedGrammar}</Text>
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
