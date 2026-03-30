import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Mic, Paperclip, Bot, User, MoreHorizontal,
  Share2, ShieldCheck, FileText, MessageSquare, Plus,
  Loader2, AlertCircle, Trash2
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

/* ── Quick prompt suggestions ── */
const SUGGESTIONS = [
  'Am I eligible for PMAY housing scheme?',
  'What government jobs match my profile?',
  'How do I apply for Stand Up India scheme?',
  'What documents do I need for Aadhaar update?',
  'Tell me about PM-KUSUM solar scheme benefits',
  'What is the Digital India Internship stipend?',
];

/* ── Chat history sidebar sessions ── */
const HISTORY = [
  { id: 1, title: 'PMAY Eligibility Check' },
  { id: 2, title: 'Pension Scheme Enquiry' },
  { id: 3, title: 'ID Renewal Process' },
  { id: 4, title: 'Agricultural Subsidies' },
];

/* ── Message bubble component ── */
const MessageBubble = ({ msg }) => {
  const isAi = msg.role === 'assistant';
  return (
    <div className={`flex gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1
                ${isAi ? 'bg-[#84CC16]' : 'bg-gray-200'}`}>
        {isAi ? <Bot className="w-5 h-5 text-black" /> : <User className="w-5 h-5 text-gray-600" />}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[78%] ${isAi ? 'items-start' : 'items-end'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                    ${isAi
            ? 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none'
            : 'bg-black text-white rounded-tr-none'
          }`}>
          {msg.content}
        </div>
        <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
      </div>
    </div>
  );
};

/* ── Typing indicator ── */
const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="w-9 h-9 rounded-full bg-[#84CC16] flex items-center justify-center shrink-0">
      <Bot className="w-5 h-5 text-black animate-pulse" />
    </div>
    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
      {[0, 150, 300].map(d => (
        <span key={d} className="w-2 h-2 bg-[#84CC16] rounded-full animate-bounce"
          style={{ animationDelay: `${d}ms` }} />
      ))}
      <span className="text-xs text-gray-400 ml-1">govAI is thinking…</span>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════ */
const AiAssistant = () => {
  const { user, authFetch } = useAuth();
  const [messages, setMessages] = useState([]);   // { role, content, time }
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [activeChat, setActiveChat] = useState(1);
  const endRef = useRef(null);
  const textaRef = useRef(null);

  /* Auto-scroll */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* Auto-resize textarea */
  useEffect(() => {
    if (textaRef.current) {
      textaRef.current.style.height = 'auto';
      textaRef.current.style.height = Math.min(textaRef.current.scrollHeight, 128) + 'px';
    }
  }, [input]);

  /* Add welcome message on first render */
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `👋 Hello${user?.full_name ? ', ' + user.full_name.split(' ')[0] : ''}! I'm govAI, your personal government services assistant.\n\nI can help you with:\n• Finding schemes you're eligible for\n• Government job opportunities\n• Application processes & document requirements\n• Policy explanations & updates\n\nWhat would you like to know today?`,
      time: now(),
    }]);
  }, []);

  const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  /* ── Send message ── */
  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isTyping) return;

    setError('');
    setInput('');

    const userMsg = { role: 'user', content: userText, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Build conversation history for context (last 10 messages, no time field)
      const history = [...messages, userMsg]
        .slice(-10)
        .map(({ role, content }) => ({ role, content }));

      const res = await authFetch('/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();

      if (data.success && data.message) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
          time: now(),
        }]);
      } else {
        throw new Error(data.message || 'No response from AI');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to get response. Please try again.');
      // Fallback response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologise, I encountered an issue connecting to my knowledge base. Please ensure the backend server is running and try again.\n\nError: ${err.message}`,
        time: now(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: '👋 Chat cleared! I\'m ready to help you with government services. What would you like to know?',
      time: now(),
    }]);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#F5F5F0]">

      {/* ── LEFT: History Sidebar ─────────────────────── */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col">
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={clearChat}
            className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
            Recent History
          </p>
          <div className="space-y-1">
            {HISTORY.map(h => (
              <button
                key={h.id}
                onClick={() => setActiveChat(h.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeChat === h.id
                    ? 'bg-[#84CC16]/10 text-gray-900 font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <MessageSquare className={`w-4 h-4 shrink-0 ${activeChat === h.id ? 'text-[#84CC16]' : 'text-gray-400'}`} />
                <span className="truncate">{h.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User info */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#84CC16]/20 flex items-center justify-center">
              <span className="text-xs font-bold text-[#65A30D]">
                {user?.full_name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.full_name || 'Citizen'}
              </p>
              <p className="text-xs text-[#84CC16] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified
              </p>
            </div>
            <button
              onClick={clearChat}
              title="Clear chat"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: Chat Area ───────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
        {/* Chat header */}
        <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#84CC16] rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">govAI Assistant</p>
              <p className="text-xs text-[#65A30D] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#84CC16] rounded-full inline-block animate-pulse" />
                Powered by NVIDIA NIM · Llama 3.3 70B
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-[#65A30D] bg-[#84CC16]/10 px-3 py-1.5 rounded-full text-xs font-bold border border-[#84CC16]/20">
              <ShieldCheck className="w-3 h-3" /> Secure Connection
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-lg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mx-6 mt-3 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Date pill */}
          <div className="flex justify-center">
            <span className="bg-gray-100 text-gray-400 text-xs px-3 py-1 rounded-full font-medium">TODAY</span>
          </div>

          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={endRef} />
        </div>

        {/* Quick suggestions (shown only when chat is empty or first message) */}
        {messages.length <= 1 && !isTyping && (
          <div className="px-6 pb-3">
            <p className="text-xs text-gray-400 mb-2 font-medium">QUICK QUESTIONS</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.slice(0, 4).map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="text-xs bg-[#84CC16]/10 hover:bg-[#84CC16]/20 text-[#65A30D] font-medium px-3 py-1.5 rounded-full transition-all border border-[#84CC16]/20"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-gray-100 px-4 lg:px-6 py-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2
                            focus-within:ring-2 focus-within:ring-[#84CC16]/30 focus-within:border-[#84CC16] transition-all">
              {/* Attach button */}
              <button className="text-gray-400 hover:text-gray-600 p-1.5 shrink-0 mb-0.5 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Textarea */}
              <textarea
                ref={textaRef}
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about government schemes, jobs, or policies…"
                disabled={isTyping}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder-gray-400 resize-none py-2 max-h-32 disabled:opacity-60"
              />

              {/* Mic + Send */}
              <div className="flex items-center gap-1 shrink-0 mb-0.5">
                <button className="text-gray-400 hover:text-gray-600 p-1.5 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-[#84CC16] hover:bg-[#65A30D] disabled:bg-gray-200 disabled:cursor-not-allowed
                                        text-black rounded-xl flex items-center justify-center transition-all"
                >
                  {isTyping
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Send className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              End-to-end encrypted · Supports 22 Official Languages · Powered by NVIDIA NIM
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiAssistant;
