'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { Message, ChatRole, CHAT_ROLES } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function RolePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<ChatRole>(CHAT_ROLES[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 역할이 변경될 때 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [selectedRole]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          systemPrompt: selectedRole.systemPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('API 요청에 실패했습니다.');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      alert('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="main-title">공공기관 민원 상담</h1>
        <div className="role-selector"> 
          {CHAT_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`role-button ${
                selectedRole.id === role.id ? 'role-button-active' : ''
              }`}
            >
              <span className="text-2xl">{role.icon}</span>
              <span className="font-medium">{role.name}</span>
            </button>
          ))}
        </div>
        <p className="role-description">{selectedRole.description}</p>
      </div>
      
      <div className="chat-container">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div className={`chat-bubble ${
                message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
              }`}>
                {message.role === 'assistant' ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center py-2">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${selectedRole.name}에게 질문하기...`}
          className="input-primary"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="button-primary"
        >
          전송
        </button>
      </form>
    </div>
  );
} 