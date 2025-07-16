import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Button, 
  Box, 
  Text, 
  Title, 
  Select, 
  Group, 
  Loader,
  Paper,
  Textarea,
  Image,
  Alert,
  ActionIcon,
  Flex
} from '@mantine/core';
import { 
  IconPlayerPlay, 
  IconEdit, 
  IconCheck, 
  IconX 
} from '@tabler/icons-react';

export const NoteBookPage = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState('');
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [outputs, setOutputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [editedCode, setEditedCode] = useState('');
  const [executingBlocks, setExecutingBlocks] = useState(new Set());

  // Fetch list of notebooks on mount
  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const response = await fetch('/api/list-notebooks');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNotebooks(data.notebooks || []);
      } catch (error) {
        console.error('Error fetching notebooks:', error);
        setNotebooks([]);
      }
    };
    fetchNotebooks();
  }, []);

  // Fetch code blocks when a notebook is selected
  useEffect(() => {
    if (!selectedNotebook) return;
    
    setLoading(true);
    setCodeBlocks([]);
    setOutputs({});
    
    const fetchNotebookContent = async () => {
      try {
        const response = await fetch('/api/get-notebook-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notebook: selectedNotebook }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.error('Error:', data.error);
        } else {
          setCodeBlocks(data.codeBlocks || []);
        }
      } catch (error) {
        console.error('Error fetching notebook content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotebookContent();
  }, [selectedNotebook]);

  const startEditing = (blockId, code) => {
    setEditingBlock(blockId);
    setEditedCode(code);
  };

  const saveEdit = (blockId) => {
    setCodeBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { ...block, code: editedCode }
          : block
      )
    );
    setEditingBlock(null);
    setEditedCode('');
  };

  const cancelEdit = () => {
    setEditingBlock(null);
    setEditedCode('');
  };

  const runCode = async (blockId, code) => {
    setExecutingBlocks(prev => new Set([...prev, blockId]));
    setOutputs(prev => ({ ...prev, [blockId]: { loading: true } }));
    
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      
      const data = await response.json();
      
      setOutputs(prev => ({
        ...prev,
        [blockId]: {
          loading: false,
          textOutput: data.text_output || '',
          images: data.images || [],
          htmlOutput: data.html_output || '',
          error: data.error
        }
      }));
      
    } catch (error) {
      setOutputs(prev => ({
        ...prev,
        [blockId]: {
          loading: false,
          error: 'Failed to execute code: ' + error.message
        }
      }));
    } finally {
      setExecutingBlocks(prev => {
        const newSet = new Set(prev);
        newSet.delete(blockId);
        return newSet;
      });
    }
  };

  const renderOutput = (blockId) => {
    const output = outputs[blockId];
    
    if (!output) {
      return <Text color="dimmed">No output yet</Text>;
    }
    
    if (output.loading) {
      return <Loader size="sm" />;
    }
    
    return (
      <Box>
        {output.error && (
          <Alert color="red" mb="sm">
            <Text size="sm" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {output.error}
            </Text>
          </Alert>
        )}
        
        {output.textOutput && (
          <Text 
            size="sm" 
            style={{ 
              fontFamily: 'monospace', 
              whiteSpace: 'pre-wrap',
              backgroundColor: '#f8f9fa',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '8px'
            }}
          >
            {output.textOutput}
          </Text>
        )}
        
        {output.htmlOutput && (
          <Box 
            mb="sm"
            dangerouslySetInnerHTML={{ __html: output.htmlOutput }}
          />
        )}
        
        {output.images && output.images.map((img, idx) => (
          <Image
            key={idx}
            src={`data:image/png;base64,${img.data}`}
            alt={`Output ${idx + 1}`}
            style={{ maxWidth: '100%', marginBottom: '8px' }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Container size="xl">
      <Title order={2} mb="lg">
        Jupyter Notebooks for MAPOL
      </Title>
      
      <Box mb="xl">
        <Text weight={500} mb="sm">Select a Notebook:</Text>
        <Select
          placeholder="Choose notebook"
          data={notebooks.map((nb) => ({ value: nb, label: nb }))}
          value={selectedNotebook}
          onChange={setSelectedNotebook}
          searchable
          nothingFound="No notebooks found"
        />
      </Box>

      {!selectedNotebook ? (
        <Text color="dimmed">Please select a notebook to view its code blocks.</Text>
      ) : loading ? (
        <Group position="center">
          <Loader />
          <Text>Loading notebook content...</Text>
        </Group>
      ) : (
        <Box>
          {codeBlocks.length === 0 ? (
            <Text color="dimmed">No code blocks found in this notebook.</Text>
          ) : (
            codeBlocks.map((block, index) => (
              <Paper key={block.id} p="md" mb="lg" withBorder>
                <Flex align="flex-start" gap="md">
                  {/* Left side - Controls */}
                  <Box style={{ minWidth: '120px' }}>
                    <Text size="sm" weight={500} mb="xs">
                      Cell [{index + 1}]
                    </Text>
                    
                    <Group spacing="xs" orientation="vertical">
                      <Button
                        size="xs"
                        leftIcon={<IconPlayerPlay size={14} />}
                        onClick={() => runCode(block.id, block.code)}
                        loading={executingBlocks.has(block.id)}
                        disabled={editingBlock === block.id}
                      >
                        Run
                      </Button>
                      
                      {editingBlock === block.id ? (
                        <Group spacing="xs">
                          <ActionIcon
                            color="green"
                            onClick={() => saveEdit(block.id)}
                            size="sm"
                          >
                            <IconCheck size={14} />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            onClick={cancelEdit}
                            size="sm"
                          >
                            <IconX size={14} />
                          </ActionIcon>
                        </Group>
                      ) : (
                        <ActionIcon
                          onClick={() => startEditing(block.id, block.code)}
                          size="sm"
                        >
                          <IconEdit size={14} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Box>

                  {/* Right side - Code and Output */}
                  <Box style={{ flex: 1 }}>
                    <Text weight={500} mb="xs">Code:</Text>
                    
                    {editingBlock === block.id ? (
                      <Textarea
                        value={editedCode}
                        onChange={(e) => setEditedCode(e.target.value)}
                        minRows={Math.max(3, editedCode.split('\n').length)}
                        style={{ 
                          fontFamily: 'monospace',
                          fontSize: '14px'
                        }}
                        mb="md"
                      />
                    ) : (
                      <Box
                        mb="md"
                        p="sm"
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderRadius: '4px',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                          border: '1px solid #e9ecef'
                        }}
                      >
                        {block.code}
                      </Box>
                    )}

                    <Text weight={500} mb="xs">Output:</Text>
                    <Box
                      p="sm"
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '4px',
                        border: '1px solid #e9ecef',
                        minHeight: '50px'
                      }}
                    >
                      {renderOutput(block.id)}
                    </Box>
                  </Box>
                </Flex>
              </Paper>
            ))
          )}
        </Box>
      )}
    </Container>
  );
};