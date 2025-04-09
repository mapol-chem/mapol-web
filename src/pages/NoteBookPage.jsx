import React, { useState } from 'react';
import { Title, Container, Textarea, Button, Box, Text } from '@mantine/core';

export const NotebookPage = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      // Replace with your backend API endpoint for executing Python code
      const response = await fetch('/api/execute-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output || 'No output');
    } catch (error) {
      setOutput('Error executing code');
    }
  }

  return (
    <Container>
      <Title order={2} mb="lg">
        Jupyter Notebook Integration
      </Title>
      <Box mb="md">
        <Textarea
          placeholder="Write your Python code here..."
          value={code}
          onChange={(event) => setCode(event.currentTarget.value)}
          autosize
          minRows={6}
        />
        <Button mt="sm" onClick={runCode}>
          Run Code
        </Button>
      </Box>
      <Box mt="md" p="sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text weight={500}>Output:</Text>
        <Text>{output}</Text>
      </Box>
    </Container>
  )
}

