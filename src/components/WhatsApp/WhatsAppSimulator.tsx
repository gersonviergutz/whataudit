
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, PlusIcon } from 'lucide-react';
import { whatsappMessages } from '@/lib/mockData';

interface WhatsAppMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const WhatsAppSimulator = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>(whatsappMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: WhatsAppMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      // Simple response logic
      const userText = inputValue.toLowerCase();
      if (userText.includes('balance')) {
        botResponse = 'Your current balance is $3,660. You have $3,500 in income and $840 in expenses this month.';
      } else if (userText.includes('spent') || userText.includes('paid') || userText.includes('expense')) {
        const amount = userText.match(/\$?(\d+)/)?.[1] || '50';
        botResponse = `I've recorded a $${amount} expense. Would you like to categorize it?`;
      } else if (userText.includes('earned') || userText.includes('received') || userText.includes('income')) {
        const amount = userText.match(/\$?(\d+)/)?.[1] || '100';
        botResponse = `Great! I've recorded $${amount} as income. Your updated balance is $3,760.`;
      } else {
        botResponse = "I'm sorry, I didn't understand that. You can track expenses by saying 'Spent $X on Y' or check your balance by asking 'What's my balance?'";
      }
      
      const botMessage: WhatsAppMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col h-[500px] shadow-lg">
      <div className="bg-primary/5 p-3 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="text-xl">💬</span>
          </div>
          <div>
            <h3 className="font-medium">Finance Assistant</h3>
            <p className="text-xs text-muted-foreground">Track expenses via chat</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={`${message.timestamp.getTime()}-${index}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-white text-foreground rounded-tl-none'
                } shadow-sm`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-[10px] text-right mt-1 opacity-70">
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white text-foreground rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full flex-shrink-0"
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="rounded-full bg-secondary border-secondary focus-visible:ring-primary/20"
          />
          
          <Button
            onClick={handleSendMessage}
            variant="default"
            size="icon"
            className="rounded-full flex-shrink-0"
            disabled={!inputValue.trim() || isTyping}
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
        
        <p className="text-xs text-center mt-2 text-muted-foreground">
          Try saying: "Spent $25 on lunch" or "What's my balance?"
        </p>
      </div>
    </div>
  );
};
