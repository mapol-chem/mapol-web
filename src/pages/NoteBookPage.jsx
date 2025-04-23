import React, { useState, useEffect } from 'react';
import { Container, Button, Box, Text, Title, Code } from '@mantine/core';

export const NoteBookPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [outputs, setOutputs] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch Python code snippets from the backend
  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await fetch('/api/get-python-snippets'); // pulls from backend and gets converted jypyter notebook blocks
        const data = await response.json();
        setCodeBlocks(data.codeBlocks || []); // Expecting an array of code snippets
        setLoading(false);
      } catch (error) {
        setCodeBlocks([{ id: 0, code: 'Error fetching code snippets' }]);
        setLoading(false);
      }
    };

    fetchCodeBlocks();
  }, []);
  // code to run jypyter notebook blocks
  const runCode = async (id, code) => {
    try {
      const response = await fetch('/api/execute-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutputs((prevOutputs) => ({
        ...prevOutputs,
        [id]: data.output || 'No output',
      }));
    } catch (error) {
      setOutputs((prevOutputs) => ({
        ...prevOutputs,
        [id]: 'Error executing code',
      }));
    }
  };

  return (
    <Container>
      <Title order={2} mb="lg">
        Jupyter Notebooks for MAPOL
      </Title>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        codeBlocks.map((block) => (
          <Box key={block.id} mb="lg" p="sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <Text weight={500}>Python Code:</Text>
            <Code block>{block.code}</Code>
            <Button mt="sm" onClick={() => runCode(block.id, block.code)}>
              Run Code
            </Button>
            <Box mt="md" p="sm" style={{ backgroundColor: '#e9ecef', borderRadius: '4px' }}>
              <Text weight={500}>Output:</Text>
              <Text>{outputs[block.id] || 'No output yet'}</Text>
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
};
