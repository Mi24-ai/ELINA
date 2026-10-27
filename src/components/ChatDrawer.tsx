import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, X, CheckCheck } from 'lucide-react';
import { ChatMessage } from '../types';
import { useDrawer } from './useDrawer';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  defaultRecipient?: string;
}

const QUICK = [
  'Bisa kirim sertifikat uji lab COA Batch ELN-2026-SP881?',
  'Berapa minimal pesanan untuk harga grosir?',
  'Mohon saran mentor: pH kolam naik ke 10,8',
  'Apakah ada pengiriman cold-chain untuk biomassa segar?',
];

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen, onClose, messages, onSendMessage,
  defaultRecipient = 'Customer Support ELINA'
}) => {
  const [inputText, setInputText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useDrawer(isOpen, onClose);
  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages.length]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-fade-in" onClick={onClose}>
      <aside
        role="dialog" aria-modal="true" aria-label={`Percakapan dengan ${defaultRecipient}`}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-drawer-in"
      >
        <header className="p-4 flex items-center justify-between bg-linear-to-r from-emerald-900 to-teal-900 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 shrink-0 rounded-full bg-white/15 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm leading-tight truncate">{defaultRecipient}</h3>
              <p className="flex items-center gap-1.5 text-xs text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-300" /> Online, biasanya membalas cepat
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Tutup percakapan" className="p-2 rounded-lg text-emerald-100 hover:bg-white/10 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50" aria-live="polite">
          <p className="text-center text-[11px] text-slate-500">Percakapan terenkripsi di ekosistem ELINA</p>
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
              {!m.isMe && <span className="text-[11px] text-slate-500 font-semibold mb-0.5 ml-1">{m.sender}</span>}
              <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.isMe ? 'bg-emerald-700 text-white rounded-br-md' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
              }`}>
                {m.text}
                <span className={`mt-1 flex items-center gap-1 justify-end text-[10px] ${m.isMe ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {m.timestamp} {m.isMe && <CheckCheck className="w-3 h-3" />}
                </span>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="px-3 pt-2 border-t border-slate-200 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
          {QUICK.map((q) => (
            <button key={q} onClick={() => onSendMessage(q)}
              className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer">
              {q}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white flex items-center gap-2">
          <label htmlFor="chat-input" className="sr-only">Tulis pesan</label>
          <input
            id="chat-input" type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis pesan ke pembudidaya atau admin"
            className="flex-1 px-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
          <button type="submit" disabled={!inputText.trim()} aria-label="Kirim pesan"
            className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-colors cursor-pointer">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </aside>
    </div>
  );
};
