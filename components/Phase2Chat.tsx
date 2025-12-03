import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Terminal } from 'lucide-react';
import { GlitchButton } from './GlitchButton';

interface Props {
  onComplete: () => void;
}

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string | React.ReactNode;
}

export const Phase2Chat: React.FC<Props> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showFinalAction, setShowFinalAction] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (sender: 'bot' | 'user', text: string | React.ReactNode) => {
    setMessages(prev => [...prev, { id: Date.now(), sender, text }]);
  };

  useEffect(() => {
    // Initial Sequence
    setTimeout(() => addMessage('bot', "Conexão estabelecida com CENTRAL - DNF."), 500);
    setTimeout(() => addMessage('bot', "Bem-vindo, agente. Recebemos um novo caso crítico."), 1500);
    setTimeout(() => addMessage('bot', (
      <div className="bg-gray-800/50 p-2 rounded border-l-2 border-red-500 font-mono text-xs">
        <p>CASO 49/90 – Caixa Preta do Cérebro</p>
        <p>Vítima: H-01</p>
        <p>Sintomas: caos na rotina, foco fragmentado, finanças desorganizadas.</p>
      </div>
    )), 2500);
    setTimeout(() => {
        addMessage('bot', "Você aceita assumir a investigação?");
        setShowOptions(true);
    }, 3500);
  }, []);

  const handleChoice = (accepted: boolean) => {
    setShowOptions(false);
    addMessage('user', accepted ? "Aceitar missão." : "Recusar missão.");

    if (accepted) {
      setTimeout(() => addMessage('bot', "Perfeito, agente."), 1000);
      setTimeout(() => addMessage('bot', "Iniciando Operação Caixa Preta."), 2000);
      setTimeout(() => {
        addMessage('bot', "👉 Primeiro passo: analisar o MURAL DE EVIDÊNCIAS.");
        setShowFinalAction(true);
      }, 3000);
    } else {
      setTimeout(() => addMessage('bot', "Missão recusada... Processando..."), 1000);
      setTimeout(() => addMessage('bot', "Brincadeira. Você foi selecionado justamente porque conhece esse caos de perto."), 2500);
      setTimeout(() => {
        addMessage('bot', "A pasta do caso já foi liberada. 👉 Acesse o MURAL DE EVIDÊNCIAS.");
        setShowFinalAction(true);
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-2xl mx-auto w-full">
       <div className="w-full bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[600px]">
          
          {/* Header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-mono text-sm text-cyber-cyan font-bold tracking-wider">CENTRAL_DNF // SECURE_CHANNEL</span>
             </div>
             <Terminal className="w-5 h-5 text-gray-500" />
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 relative">
             <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
             
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-cyber-cyan text-black' : 'bg-gray-700 text-white'}`}>
                        {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                     </div>
                     <div className={`p-3 rounded-lg text-sm font-rajdhani leading-relaxed ${msg.sender === 'user' ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>
                        {msg.text}
                     </div>
                  </div>
               </div>
             ))}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area / Actions */}
          <div className="p-4 bg-gray-800 border-t border-gray-700 min-h-[80px] flex items-center justify-center">
             {showOptions && (
               <div className="flex gap-4 w-full animate-in slide-in-from-bottom-2 fade-in">
                  <button 
                    onClick={() => handleChoice(false)}
                    className="flex-1 py-3 px-4 rounded border border-gray-600 text-gray-400 hover:bg-gray-700 font-mono text-xs uppercase transition-colors"
                  >
                    [ RECUSAR ]
                  </button>
                  <button 
                    onClick={() => handleChoice(true)}
                    className="flex-1 py-3 px-4 rounded bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-mono text-xs uppercase font-bold transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  >
                    [ ACEITAR MISSÃO ]
                  </button>
               </div>
             )}

             {showFinalAction && (
                <GlitchButton onClick={onComplete} fullWidth className="animate-in zoom-in fade-in duration-300">
                   [ VER MURAL DE EVIDÊNCIAS ]
                </GlitchButton>
             )}

             {!showOptions && !showFinalAction && (
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs w-full">
                   <span className="animate-pulse">_</span>
                   <span>Aguardando transmissão...</span>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};