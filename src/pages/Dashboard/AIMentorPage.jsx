import { useState } from 'react';
import { Send, FileText, Lightbulb, BookOpen } from 'lucide-react';
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubDark } from "@uiw/codemirror-theme-github";
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const AIMentorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: "Hello! I'm your AI mentor. How can I help you with your learning today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const initialCode = `# Welcome to the Python Code Playground!
# Try running this code to see the output

# Variables and data types
name = "Alice"
age = 25
height = 5.7

print(f"Hello, {name}! You are {age} years old.")

# Example of a for loop
for i in range(3):
    print(f"Iteration {i}")

# Example of a while loop
count = 0
while count < 2:
    print(f"Count is {count}")
    count += 1

# Lists and basic operations
numbers = [1, 2, 3, 4, 5]
print(f"The list contains {len(numbers)} elements")
print(f"The first element is {numbers[0]}")

# Try modifying this code or writing your own!`;
  
  const [code, setCode] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        const errorMessage = {
          id: updatedMessages.length + 1,
          sender: 'ai',
          content: "Authentication required. Please log in again.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Log the request for debugging
      console.log('Sending message to AI chatbot:', inputMessage);
      
      // Make API call to AI chat endpoint
      const response = await api.post('/auth/student/chatbot', {
        messages: [
          {
            role: 'user',
            content: inputMessage
          }
        ]
      });
      
      if (response.data.status) {
        // Add AI response
        const newAiMessage = {
          id: updatedMessages.length + 1,
          sender: 'ai',
          content: response.data.data.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newAiMessage]);
      } else {
        // Handle error response
        const errorMessage = {
          id: updatedMessages.length + 1,
          sender: 'ai',
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('AI Chat API error:', error);
      
      // Log more detailed error information
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        
        // Handle specific error codes
        if (error.response.status === 404) {
          const errorMessage = {
            id: updatedMessages.length + 1,
            sender: 'ai',
            content: "Sorry, the AI chat service is currently unavailable. Please make sure the backend server is running and try again later.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          return;
        } else if (error.response.status === 401) {
          const errorMessage = {
            id: updatedMessages.length + 1,
            sender: 'ai',
            content: "Authentication failed. Please log in again.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          return;
        } else if (error.response.status >= 500) {
          const errorMessage = {
            id: updatedMessages.length + 1,
            sender: 'ai',
            content: "Sorry, the AI service is experiencing technical difficulties. Please try again later.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          return;
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        const errorMessage = {
          id: updatedMessages.length + 1,
          sender: 'ai',
          content: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running and try again.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      } else {
        console.error('Error message:', error.message);
        const errorMessage = {
          id: updatedMessages.length + 1,
          sender: 'ai',
          content: `Sorry, an unexpected error occurred: ${error.message}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleViewNotes = () => {
    alert("AI-generated study notes would appear here in a modal or sidebar.");
  };

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt);
    // Optionally, you could automatically send the message:
    // setTimeout(() => handleSendMessage(), 100);
  };

  const handleAskForExample = () => {
    const exampleMessage = "Can you show me more examples of loops?";
    setInputMessage(exampleMessage);
    // Optionally, you could automatically send the message:
    // setTimeout(() => handleSendMessage(), 100);
  };

  const handleRequestPracticeProblem = () => {
    const problemMessage = "Can you give me a practice problem using loops?";
    setInputMessage(problemMessage);
    // Optionally, you could automatically send the message:
    // setTimeout(() => handleSendMessage(), 100);
  };

  const runCode = async () => {
    setOutput('Running code...');
    
    try {
      // In a production environment, you would send the code to a backend service
      // For demonstration purposes, we'll simulate execution
      
      // To integrate with a real backend code execution service, you would do something like:
      // const response = await api.post('/auth/student/execute-code', { code });
      // setOutput(response.data.output);
      
      // Simulate API call to backend code execution service
      // This is a placeholder - in a real app, you would make an actual API call
      
      // For now, let's simulate the execution with a timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // More comprehensive simulation of code execution
      let outputs = [];
      
      // Split code into lines for processing
      const lines = code.split('\n');
      
      // Process each line for print statements
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Handle print statements
        if (trimmedLine.startsWith('print(') && trimmedLine.endsWith(')')) {
          try {
            // Extract the content inside print()
            const content = trimmedLine.slice(6, -1);
            
            if (content.includes('f"') || content.includes("f'")) {
              // Handle f-strings
              let result = content.replace(/f"|f'/g, '').replace(/"|'/g, '');
              
              // Replace variables in f-strings
              const varMatches = result.match(/\{[^}]+\}/g);
              if (varMatches) {
                for (const varMatch of varMatches) {
                  const varName = varMatch.slice(1, -1);
                  
                  // Look for variable assignments in the code
                  const varPattern = new RegExp(`${varName}\s*=\s*([^\n]+)`);
                  const varMatchResult = code.match(varPattern);
                  
                  if (varMatchResult) {
                    result = result.replace(varMatch, varMatchResult[1].trim());
                  }
                }
              }
              
              outputs.push(result);
            } else if (content.startsWith('"') || content.startsWith("'")) {
              // Handle string literals
              outputs.push(content.slice(1, -1));
            } else {
              // Handle variables and expressions
              // Look for variable assignments in the code
              const varPattern = new RegExp(`${content}\s*=\s*([^\n]+)`);
              const varMatchResult = code.match(varPattern);
              
              if (varMatchResult) {
                outputs.push(varMatchResult[1].trim());
              } else {
                // If it's a literal value, just output it
                outputs.push(content);
              }
            }
          } catch (e) {
            outputs.push(`Error processing: ${trimmedLine}`);
          }
        }
      }
      
      if (outputs.length > 0) {
        setOutput(outputs.join('\n'));
      } else {
        setOutput('Code executed successfully (no output)');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🤖 AI Mentor</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col md:flex-row p-4 gap-4">
         {/* Left Side - Chat Interface */}
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-lg font-bold">Chat with AI Mentor</h2>
              <p className="text-blue-100 text-sm">Ask questions and get personalized learning assistance</p>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-300 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[85%] rounded-2xl p-4 bg-white border border-gray-300 rounded-bl-none shadow-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here... (Press Enter to send)"
                  className="flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              
              {/* Quick Prompts */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button 
                  onClick={() => handleQuickPrompt("Explain today's topic again.")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  Explain topic
                </button>
                <button 
                  onClick={() => handleQuickPrompt("Show me more examples of loops.")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  More examples
                </button>
                <button 
                  onClick={() => handleQuickPrompt("Give me a real-world project using this concept.")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  Real-world project
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Code Editor / Notes Section */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <h2 className="text-lg font-bold">Code Playground</h2>
              <p className="text-green-100 text-sm">Write and test code examples</p>
              {/* <p className="text-green-200 text-xs mt-1">Note: Code execution is simulated. In production, this would run on a secure backend.</p> */}
            </div>
            
            {/* Code Editor */}
            <div className="flex-1 overflow-hidden">
              <CodeMirror
                value={code}
                height="100%"
                extensions={[python()]}
                onChange={(value) => setCode(value)}
                theme={githubDark}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                  autocompletion: true,
                  foldGutter: true,
                  allowMultipleSelections: true,
                }}
                className="w-full h-full text-sm"
              />
            </div>
            
            {/* Output Panel */}
            <div className="border-t border-gray-700 bg-gray-800">
              <div className="p-2 bg-gray-700 text-gray-300 text-xs font-medium">
                Output
              </div>
              <div className="p-4 h-10 overflow-y-auto font-mono text-sm text-green-400 bg-gray-900 whitespace-pre-wrap">
                {output || <span className="text-gray-500">Run your code to see the output here...</span>}
              </div>
            </div>
            
            {/* Editor Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button 
                    onClick={runCode}
                    className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 shadow-sm"
                  >
                    <FileText size={16} className="mr-1" />
                    Run Code
                  </button>
                  <button 
                    onClick={() => setOutput('')}
                    className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 shadow-sm"
                  >
                    <FileText size={16} className="mr-1" />
                    Clear Output
                  </button>
                  <button 
                    onClick={() => setCode(initialCode)}
                    className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 shadow-sm"
                  >
                    <FileText size={16} className="mr-1" />
                    Reset Code
                  </button>
                  <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 shadow-sm">
                    <Lightbulb size={16} className="mr-1" />
                    Get Hint
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Python 3.x Interpreter
                </div>
              </div>
            </div>
            
            {/* Suggested Prompts Section */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              {/* <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Prompts:</h3> */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={handleViewNotes}
                  className="flex items-center text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-full"
                >
                  <FileText size={12} className="mr-1" />
                  <span>View Notes</span>
                </button>
                <button 
                  onClick={handleAskForExample}
                  className="flex items-center text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded-full"
                >
                  <BookOpen size={12} className="mr-1" />
                  <span>Ask for Example</span>
                </button>
                <button 
                  onClick={handleRequestPracticeProblem}
                  className="flex items-center text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full"
                >
                  <Lightbulb size={12} className="mr-1" />
                  <span>Practice Problem</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIMentorPage;