import { useState } from 'react';
import { Send, FileText, Lightbulb, BookOpen } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const AIMentorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: "Hello Hannan! I'm your AI mentor. How can I help you with loops in Python today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [code, setCode] = useState(`# Example of a for loop
for i in range(5):
    print(f"Iteration {i}")

# Example of a while loop
count = 0
while count < 5:
    print(f"Count is {count}")
    count += 1`);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "Great question! Loops are used to execute a block of code repeatedly. Let me show you another example...",
        "That's a common confusion. The key difference is that 'for' loops are used when you know how many times to iterate, while 'while' loops continue until a condition is met.",
        "Sure! Here's a real-world example: processing items in a shopping cart using a for loop...",
        "I see you're asking about nested loops. These are loops inside other loops, commonly used for working with 2D data structures."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
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

  const handleAskForExample = () => {
    const exampleMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: "Can you show me more examples of loops?",
      timestamp: new Date()
    };
    
    setMessages([...messages, exampleMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const exampleResponse = `Here are some additional examples of loops in Python:

# Nested loops for matrix operations
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
for row in matrix:
    for item in row:
        print(item, end=' ')
    print()  # New line after each row

# Loop with enumerate to get index and value
fruits = ['apple', 'banana', 'orange']
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# While loop with break condition
number = 0
while True:
    print(number)
    number += 1
    if number > 3:
        break`;
      
      const newAiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: `Sure! Here are more examples of loops:\n\n${exampleResponse}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  const handleRequestPracticeProblem = () => {
    const problemMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: "Can you give me a practice problem using loops?",
      timestamp: new Date()
    };
    
    setMessages([...messages, problemMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const problemResponse = `Here's a practice problem for you:

Write a program that prints a multiplication table for numbers 1 through 5.
The output should look like:
1 x 1 = 1
1 x 2 = 2
...
5 x 5 = 25

Try solving this using nested loops!`;
      
      const newAiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: problemResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🧠 AI Mentor</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col md:flex-row p-4 gap-6">
          {/* Left Side - Chat Interface */}
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h2 className="text-lg font-bold">Chat with AI Mentor</h2>
              <p className="text-blue-100 text-sm">Ask questions, get explanations, and receive personalized guidance</p>
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
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              
              {/* Quick Prompts */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button 
                  onClick={() => setInputMessage("Explain today's topic again.")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  Explain today's topic again
                </button>
                <button 
                  onClick={() => setInputMessage("Show me more examples of loops.")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  Show me more examples
                </button>
                <button 
                  onClick={() => setInputMessage("Give me a real-world project using this concept.")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  Real-world project example
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Code Editor / Notes Section */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <h2 className="text-lg font-bold">Code Playground</h2>
              <p className="text-green-100 text-sm">Test concepts and get instant feedback</p>
            </div>
            
            {/* Code Editor */}
            <div className="flex-1 overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full font-mono text-sm p-4 resize-none focus:outline-none bg-gray-900 text-green-400"
                spellCheck="false"
              />
            </div>
            
            {/* Editor Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 shadow-sm">
                    <FileText size={16} className="mr-1" />
                    Run Code
                  </button>
                  <button className="flex items-center text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 shadow-sm">
                    <Lightbulb size={16} className="mr-1" />
                    Get Hint
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Python Interpreter
                </div>
              </div>
            </div>
            
            {/* Floating Features */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <button 
                onClick={handleViewNotes}
                className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-lg hover:bg-gray-50 text-sm"
              >
                <FileText size={16} className="mr-1 text-blue-500" />
                <span>View Notes</span>
              </button>
              <button 
                onClick={handleAskForExample}
                className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-lg hover:bg-gray-50 text-sm"
              >
                <BookOpen size={16} className="mr-1 text-green-500" />
                <span>Ask for Example</span>
              </button>
              <button 
                onClick={handleRequestPracticeProblem}
                className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-lg hover:bg-gray-50 text-sm"
              >
                <Lightbulb size={16} className="mr-1 text-yellow-500" />
                <span>Practice Problem</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIMentorPage;