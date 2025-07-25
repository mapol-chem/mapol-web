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
  IconX,
  IconRefresh 
} from '@tabler/icons-react';

// Safe Python syntax highlighting component using React elements
const PythonCodeHighlight = ({ code, showLineNumbers = true }) => {
  const highlightPython = (text) => {
    // Define Python keywords and patterns
    const keywords = [
      'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally',
      'import', 'from', 'as', 'return', 'yield', 'lambda', 'with', 'pass', 'break',
      'continue', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'self'
    ];
    
    const builtins = [
      'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple',
      'type', 'isinstance', 'hasattr', 'getattr', 'setattr', 'min', 'max', 'sum',
      'abs', 'round', 'sorted', 'reversed', 'enumerate', 'zip', 'map', 'filter'
    ];

    const lines = text.split('\n');
    const maxLineNumber = lines.length;
    const lineNumberWidth = maxLineNumber.toString().length;
    
    return lines.map((line, lineIndex) => {
      const tokens = [];
      let currentPos = 0;
      
      // Simple tokenization - split by spaces and special characters
      const tokenRegex = /(\s+|[^\w\s#"']+|#[^\n]*|"[^"]*"|'[^']*'|\w+)/g;
      let match;
      
      while ((match = tokenRegex.exec(line)) !== null) {
        const token = match[0];
        let tokenElement;
        
        if (token.match(/^["'].*["']$/)) {
          // String literal
          tokenElement = <span key={`${lineIndex}-${tokens.length}`} style={{ color: '#98c379' }}>{token}</span>;
        } else if (token.startsWith('#')) {
          // Comment
          tokenElement = <span key={`${lineIndex}-${tokens.length}`} style={{ color: '#5c6370', fontStyle: 'italic' }}>{token}</span>;
        } else if (token.match(/^\d+\.?\d*$/)) {
          // Number
          tokenElement = <span key={`${lineIndex}-${tokens.length}`} style={{ color: '#d19a66' }}>{token}</span>;
        } else if (keywords.includes(token)) {
          // Keyword
          tokenElement = <span key={`${lineIndex}-${tokens.length}`} style={{ color: '#c678dd', fontWeight: 'bold' }}>{token}</span>;
        } else if (builtins.includes(token)) {
          // Built-in function
          tokenElement = <span key={`${lineIndex}-${tokens.length}`} style={{ color: '#61dafb' }}>{token}</span>;
        } else {
          // Regular text
          tokenElement = <span key={`${lineIndex}-${tokens.length}`} style={{ color: '#abb2bf' }}>{token}</span>;
        }
        
        tokens.push(tokenElement);
      }
      
      return (
        <div key={lineIndex} style={{ display: 'flex', minHeight: '21px' }}>
          {showLineNumbers && (
            <span
              style={{
                color: '#5c6370',
                fontSize: '12px',
                fontFamily: 'monospace',
                textAlign: 'right',
                paddingRight: '16px',
                minWidth: `${(lineNumberWidth + 1) * 8}px`,
                userSelect: 'none',
                lineHeight: '1.5'
              }}
            >
              {lineIndex + 1}
            </span>
          )}
          <div style={{ flex: 1, lineHeight: '1.5' }}>
            {tokens.length > 0 ? tokens : <span style={{ color: '#abb2bf' }}>{line || '\u00A0'}</span>}
          </div>
        </div>
      );
    });
  };

  return (
    <div 
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        color: '#abb2bf',
        lineHeight: '1.5'
      }}
    >
      {highlightPython(code)}
    </div>
  );
};

// Code editor component with syntax highlighting overlay and line numbers
const CodeEditor = ({ value, onChange, minRows, placeholder }) => {
  const textareaRef = React.useRef(null);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const lines = value.split('\n');
  const maxLineNumber = lines.length;
  const lineNumberWidth = maxLineNumber.toString().length;
  const lineNumbersWidth = (lineNumberWidth + 1) * 8 + 16; // Width + padding

  // Focus the textarea and position cursor at the end when entering edit mode
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Position cursor at the end of the text
      const length = value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, []); // Run only once when component mounts

  const handleBackgroundClick = (e) => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      // Try a simpler approach: use textarea's own methods to position cursor
      // Create a temporary element to measure line height
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.whiteSpace = 'pre';
      tempDiv.style.font = window.getComputedStyle(textareaRef.current).font;
      tempDiv.textContent = 'M\nM'; // Two lines to measure height
      document.body.appendChild(tempDiv);
      
      const singleLineHeight = tempDiv.scrollHeight / 2;
      document.body.removeChild(tempDiv);
      
      // Get click position relative to textarea
      const textareaRect = textareaRef.current.getBoundingClientRect();
      const relativeY = e.clientY - textareaRect.top - 32; // Account for padding
      
      // Calculate line number
      const lineIndex = Math.max(0, Math.floor(relativeY / singleLineHeight));
      const lines = value.split('\n');
      
      if (lineIndex < lines.length) {
        // Calculate position at end of line
        let position = 0;
        for (let i = 0; i < lineIndex; i++) {
          position += lines[i].length + 1; // +1 for newline
        }
        position += lines[lineIndex].length; // End of current line
        
        // Use setTimeout to ensure textarea is focused first
        setTimeout(() => {
          textareaRef.current.setSelectionRange(position, position);
        }, 0);
      }
    }
  };

  return (
    <Box style={{ position: 'relative' }}>
      {/* Syntax highlighted background */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'auto', // Allow click events
          padding: '16px',
          paddingTop: '32px',
          fontFamily: '"Fira Code", "Monaco", "Consolas", "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          backgroundColor: '#282c34',
          borderRadius: '8px',
          border: `1px solid ${isFocused ? '#61dafb' : '#3e4451'}`,
          zIndex: 1,
          overflow: 'hidden',
          cursor: 'text'
        }}
        onClick={handleBackgroundClick}
      >
        <PythonCodeHighlight code={value} showLineNumbers={true} />
      </Box>
      
      {/* Transparent textarea overlay */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        minRows={minRows}
        autosize
        placeholder={placeholder}
        style={{ 
          position: 'relative',
          zIndex: 2,
          fontFamily: '"Fira Code", "Monaco", "Consolas", "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          padding: '16px',
          paddingTop: '32px',
          paddingLeft: `${lineNumbersWidth + 16}px`, // Account for line numbers + original padding
          margin: 0
        }}
        styles={{
          input: {
            backgroundColor: 'transparent',
            color: 'transparent',
            border: 'none',
            borderRadius: '8px',
            caretColor: '#61dafb',
            margin: 0,
            padding: 0,
            cursor: 'text',
            '&:focus': {
              borderColor: 'transparent',
              boxShadow: 'none'
            },
            '&::placeholder': {
              color: '#5c6370'
            },
            '&::selection': {
              backgroundColor: 'rgba(97, 218, 251, 0.2)'
            }
          }
        }}
        mb="md"
      />
      
      {/* Editing indicator */}
      <Box
        style={{
          position: 'absolute',
          top: '8px',
          right: '12px',
          fontSize: '10px',
          color: '#61dafb',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        Python (Editing)
      </Box>
    </Box>
  );
};
const PlainTextOutput = ({ text }) => {
  // Simplified text cleaning - focus only on escape sequences and color codes
  const sanitizeText = (input) => {
    if (!input) return '';
    
    let result = String(input);
    
    // Remove escape sequences and color codes only
    result = result.replace(/\x1b\[[0-9;]*[mK]/g, ''); // ANSI
    result = result.replace(/\\u001b\[[0-9;]*[mK]/g, ''); // Unicode escapes
    result = result.replace(/\u001b\[[0-9;]*[mK]/g, ''); // Actual unicode
    result = result.replace(/#[0-9a-fA-F]{3,6}/g, ''); // Hex colors
    
    return result.trim();
  };

  return (
    <div 
      style={{ 
        fontFamily: 'monospace', 
        whiteSpace: 'pre-wrap',
        backgroundColor: '#f8f9fa',
        padding: '8px',
        borderRadius: '4px',
        marginBottom: '8px',
        fontSize: '14px'
      }}
    >
      {sanitizeText(text)}
    </div>
  );
};

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
        const response = await fetch('/api/list-notebooks', {
          credentials: 'include'
        });
        
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

  // Reset execution session
  const resetSession = async () => {
    try {
      const response = await fetch('/api/reset-session', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        setOutputs({});
        // Show success message or notification
        console.log('Session reset successfully');
      }
    } catch (error) {
      console.error('Error resetting session:', error);
    }
  };

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
          credentials: 'include',
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
        credentials: 'include',
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

    // Check if execution was successful but has no output
    const hasContent = output.textOutput || output.htmlOutput || (output.images && output.images.length > 0);
    const wasSuccessful = !output.error && output.textOutput !== undefined; // textOutput will be defined even if empty after execution
    
    return (
      <Box>
        {output.error && (
          <Alert color="red" mb="sm">
            <PlainTextOutput text={output.error} />
          </Alert>
        )}
        
        {output.textOutput && (
          <PlainTextOutput text={output.textOutput} />
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

        {/* Show success message when code runs without errors but produces no output */}
        {wasSuccessful && !hasContent && (
          <Group spacing="xs" align="center">
            <IconCheck size={16} color="green" />
            <Text size="sm" color="green">
              Code executed successfully. 
            </Text>
          </Group>
        )}
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
        <Group align="flex-end" spacing="md">
          <Box style={{ flex: 1 }}>
            <Select
              placeholder="Choose notebook"
              data={notebooks.map((nb) => ({ value: nb, label: nb }))}
              value={selectedNotebook}
              onChange={setSelectedNotebook}
              searchable
              nothingFoundMessage="No notebooks found"
            />
          </Box>
          {selectedNotebook && (
            <Button
              leftSection={<IconRefresh size={14} />}
              variant="outline"
              color="orange"
              onClick={resetSession}
              size="sm"
            >
              Reset Session
            </Button>
          )}
        </Group>
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
                        leftSection={<IconPlayerPlay size={14} />}
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
                      <CodeEditor
                        value={editedCode}
                        onChange={(e) => setEditedCode(e.target.value)}
                        minRows={Math.max(3, block.code.split('\n').length)}
                        placeholder="Enter Python code..."
                      />
                    ) : (
                      <Box
                        mb="md"
                        p="md"
                        onDoubleClick={() => startEditing(block.id, block.code)}
                        style={{
                          backgroundColor: '#282c34',
                          borderRadius: '8px',
                          fontFamily: '"Fira Code", "Monaco", "Consolas", "Courier New", monospace',
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                          border: '1px solid #3e4451',
                          cursor: 'pointer',
                          color: '#abb2bf',
                          lineHeight: '1.5',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          e.target.style.borderColor = '#61dafb';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                          e.target.style.borderColor = '#3e4451';
                        }}
                      >
                        <Box
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '12px',
                            fontSize: '10px',
                            color: '#5c6370',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Python
                        </Box>
                        <PythonCodeHighlight code={block.code} showLineNumbers={true} />
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