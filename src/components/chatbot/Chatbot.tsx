
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Send, MessagesSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Define response type structure
type ResponseContent = {
  greeting: string;
  attendance: string;
  employee: string;
  team: string;
  blacklist: string;
  settings: string;
  fallback: string;
};

// Mock responses for the chatbot
const mockResponses: { [key: string]: ResponseContent } = {
  en: {
    greeting: "Hello! I'm your NLT Assistant. How can I help you today?",
    attendance: "To mark attendance, go to the Attendance page, select the date and team, then you can mark each employee as present, late, or absent.",
    employee: "You can manage employees through the Employees page. Here you can add, edit, or remove team members, and view their details.",
    team: "Teams can be managed through the Teams page. You can create new teams, assign leaders and co-leaders, and add members to teams.",
    blacklist: "The Blacklist feature allows you to restrict access for former members who violated rules. Go to the Blacklist page to manage these records.",
    settings: "You can change your settings, including language and theme preferences, in the Settings page accessible from the sidebar.",
    fallback: "I'm not sure about that. Could you provide more details or try asking something else about the NLT System?",
  },
  vi: {
    greeting: "Xin chào! Tôi là Trợ lý NLT. Tôi có thể giúp gì cho bạn hôm nay?",
    attendance: "Để chấm công, hãy đi đến trang Chấm Công, chọn ngày và nhóm, sau đó bạn có thể đánh dấu từng nhân viên là có mặt, đi trễ hoặc vắng mặt.",
    employee: "Bạn có thể quản lý thành viên thông qua trang Thành Viên. Tại đây bạn có thể thêm, sửa hoặc xóa thành viên và xem thông tin chi tiết của họ.",
    team: "Các nhóm có thể được quản lý thông qua trang Nhóm. Bạn có thể tạo nhóm mới, chỉ định trưởng nhóm và phó nhóm, và thêm thành viên vào nhóm.",
    blacklist: "Tính năng Danh Sách Đen cho phép bạn hạn chế quyền truy cập cho các thành viên cũ vi phạm quy tắc. Đi đến trang Danh Sách Đen để quản lý những bản ghi này.",
    settings: "Bạn có thể thay đổi cài đặt của mình, bao gồm ngôn ngữ và chủ đề, trong trang Cài Đặt có thể truy cập từ thanh bên.",
    fallback: "Tôi không chắc về điều đó. Bạn có thể cung cấp thêm chi tiết hoặc thử hỏi điều gì đó khác về Hệ thống NLT không?",
  }
};

// Function to get a response based on the input
const getResponse = (input: string, language: 'en' | 'vi'): string => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || 
      lowercaseInput.includes('xin chào') || lowercaseInput.includes('chào')) {
    return mockResponses[language].greeting;
  } else if (lowercaseInput.includes('attendance') || lowercaseInput.includes('chấm công')) {
    return mockResponses[language].attendance;
  } else if (lowercaseInput.includes('employee') || lowercaseInput.includes('thành viên') || 
             lowercaseInput.includes('staff') || lowercaseInput.includes('nhân viên')) {
    return mockResponses[language].employee;
  } else if (lowercaseInput.includes('team') || lowercaseInput.includes('nhóm')) {
    return mockResponses[language].team;
  } else if (lowercaseInput.includes('blacklist') || lowercaseInput.includes('danh sách đen')) {
    return mockResponses[language].blacklist;
  } else if (lowercaseInput.includes('settings') || lowercaseInput.includes('cài đặt') || 
             lowercaseInput.includes('preference') || lowercaseInput.includes('tùy chỉnh')) {
    return mockResponses[language].settings;
  } else {
    return mockResponses[language].fallback;
  }
};

const Chatbot = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: t('chatbot.welcome'),
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [t, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(input, language as 'en' | 'vi'),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <Button
        onClick={handleToggleChatbot}
        className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg"
      >
        <MessagesSquare className="h-6 w-6" />
      </Button>

      {/* Chatbot Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-80 sm:w-96 rounded-lg shadow-lg bg-background border transition-transform duration-300 transform",
          isOpen ? "scale-100" : "scale-0"
        )}
        style={{ zIndex: 50 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center space-x-2">
            <MessagesSquare className="h-5 w-5 text-primary" />
            <h3 className="font-medium">{t('chatbot.title')}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={handleToggleChatbot}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 h-80 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-end space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={t('chatbot.placeholder')}
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={input.trim() === '' || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
