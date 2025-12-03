import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, FileText, Calendar, CreditCard, X, MapPin } from 'lucide-react';
import { Typewriter } from './Typewriter';

interface Props {
  onComplete: () => void;
}

export const Phase2Evidence: React.FC<Props> = ({ onComplete }) => {
  const [revealed, setRevealed] = useState([false, false, false]);
  const [showAlert, setShowAlert] = useState(false);
  
  const evidence = [
    {
      id: 0,
      icon: <FileText className="w-8 h-8 text-yellow-900" />,
      title: "Evidência #01",
      subtitle: "Rotina Caótica",
      desc: "Dias começando sem plano. O dia decide por você.",
      tag: "URGENTE",
      color: "bg-yellow-100",
      textColor: "text-yellow-900",
      pos: "md:rotate-[-2deg]"
    },
    {
      id: 1,
      icon: <Calendar className="w-8 h-8 text-red-900" />,
      title: "Evidência #02",
      subtitle: "Agenda Confusa",
      desc: "Compromissos esquecidos, remarcações e atrasos constantes.",
      tag: "CRÍTICO",
      color: "bg-red-100",
      textColor: "text-red-900",
      pos: "md:rotate-[3deg]"
    },
    {
      id: 2,
      icon: <CreditCard className="w-8 h-8 text-slate-900" />,
      title: "Evidência #03",
      subtitle: "Finanças Escuras",
      desc: "Dinheiro entra e some. Sem categorias, sem metas, só culpa.",
      tag: "SIGILO",
      color: "bg-slate-200",
      textColor: "text-slate-900",
      pos: "md:rotate-[-1deg]"
    }
  ];

  const handleReveal = (index: number) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  useEffect(() => {
    if (revealed.every(r => r) && !showAlert) {
      setTimeout(() => setShowAlert(true), 1500);
      // Wait for user interaction on the Alert, or auto-proceed after delay? 
      // The prompt says: display alert -> simulate call notification.
      // We will handle the transition to "INCOMING CALL" phase via onComplete after a short delay on the alert
      setTimeout(() => onComplete(), 4000); 
    }
  }, [revealed, onComplete, showAlert]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 max-w-7xl mx-auto relative overflow-hidden bg-[#1a1a1a]">
      
      {/* Corkboard Background Texture */}
      <div className="absolute inset-0 bg-[#2d2a26] opacity-100 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cork-1.png')] opacity-30"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
      </div>
      
      {/* Top Bar */}
      <div className="flex justify-between items-end w-full border-b border-white/10 pb-4 mb-8 z-10 bg-black/20 p-4 backdrop-blur-sm rounded">
        <div className="flex items-center gap-4 text-white/80 font-mono text-sm uppercase tracking-widest">
          <Search className="w-4 h-4 animate-pulse" />
          <span>INVESTIGAÇÃO EM CURSO: H-01</span>
        </div>
        <div className="text-xs font-mono text-red-400 border border-red-500/30 px-2 py-1 bg-red-900/10">
          DNF // CASO 49/90
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-rajdhani font-bold text-center mb-12 relative z-10 text-white/90 drop-shadow-md bg-black/50 inline-block px-6 py-2 rounded transform -rotate-1">
        MURAL DE EVIDÊNCIAS
      </h2>

      {/* Connection Lines (Simulated SVG) */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block opacity-60">
        <svg className="w-full h-full">
           {/* Lines connecting cards */}
           <path d="M 30% 40% Q 50% 20% 70% 40%" stroke="#ef4444" strokeWidth="2" fill="none" />
           <path d="M 30% 40% Q 50% 60% 50% 50%" stroke="#ef4444" strokeWidth="2" fill="none" />
           <path d="M 70% 40% Q 60% 70% 50% 50%" stroke="#ef4444" strokeWidth="2" fill="none" />
           
           {/* Pins */}
           <circle cx="30%" cy="40%" r="5" fill="#ef4444" />
           <circle cx="70%" cy="40%" r="5" fill="#ef4444" />
           <circle cx="50%" cy="50%" r="5" fill="#ef4444" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-5xl relative z-10 perspective-1000">
        {evidence.map((item, idx) => (
          <div 
            key={item.id}
            onClick={() => handleReveal(idx)}
            className={`
              relative transform transition-all duration-500 cursor-pointer group hover:z-20
              ${item.pos}
              ${revealed[idx] ? 'scale-105' : 'hover:scale-105'}
            `}
          >
            {/* Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-md z-30 border-2 border-red-800"></div>

            <div className={`
               relative p-6 h-72 flex flex-col items-center text-center shadow-xl 
               transition-all duration-700 overflow-hidden paper-texture
               ${revealed[idx] ? `${item.color} rotate-0` : 'bg-[#e2e8f0]'}
            `}>
                {!revealed[idx] ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                     <div className="w-20 h-20 border-4 border-double border-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-gray-400 font-serif">?</span>
                     </div>
                     <div className="text-xs font-mono text-gray-500 bg-gray-200 px-2">EVIDÊNCIA #{idx + 1}</div>
                  </div>
                ) : (
                  <div className={`animate-in fade-in zoom-in duration-500 h-full flex flex-col ${item.textColor}`}>
                    <div className="flex justify-between w-full mb-2 border-b border-black/10 pb-2">
                       <span className="font-mono text-[10px] font-bold opacity-50 uppercase tracking-widest">{item.title}</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="mb-2 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                        <h3 className="text-xl font-rajdhani font-bold leading-none mb-2 uppercase">{item.subtitle}</h3>
                        <p className="text-sm font-medium opacity-90 leading-tight font-serif italic">"{item.desc}"</p>
                    </div>

                    <div className="mt-auto w-full flex justify-center">
                       <span className="border-2 border-red-800 text-red-800 px-2 py-0 text-[10px] font-black uppercase tracking-wider -rotate-3 opacity-80 mix-blend-multiply">
                         {item.tag}
                       </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-black border border-red-600 p-1 w-full max-w-md shadow-[0_0_50px_rgba(220,38,38,0.5)]">
             <div className="bg-gray-900 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                <div className="relative z-10">
                    <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-2xl font-orbitron text-white mb-2 font-bold">ALERTA DE SEGURANÇA</h3>
                    <p className="font-mono text-red-400 mb-6 text-sm">Caixa Preta tentando conexão com NEURO-LAB 07.</p>
                    <div className="text-xs text-gray-500 font-mono animate-pulse">ESTABELECENDO LINK...</div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};