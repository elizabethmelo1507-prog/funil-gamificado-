import React, { useState } from 'react';
import { GlitchButton } from './GlitchButton';
import { Typewriter } from './Typewriter';
import { Brain, Activity, Scan, ShieldAlert } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const Phase1Intro: React.FC<Props> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute inset-0 bg-grid bg-[size:50px_50px] opacity-10 -z-20"></div>
      
      {/* DNF Logo / Header */}
      <div className="absolute top-8 left-0 w-full flex justify-center opacity-70">
         <div className="flex items-center gap-2 border border-cyber-cyan/30 px-4 py-1 rounded bg-black/40 backdrop-blur-sm">
            <ShieldAlert className="w-4 h-4 text-cyber-cyan" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-cyan">DNF // DIVISÃO NACIONAL DE FOCO</span>
         </div>
      </div>

      {/* Radar / Scanner Visuals */}
      <div className="mb-12 relative animate-float mt-12">
        <div className="relative">
           <Brain className="w-32 h-32 text-cyber-cyan opacity-80" strokeWidth={0.5} />
           <div className="absolute inset-0 border-t border-cyber-cyan/50 animate-scanline h-full w-full opacity-50"></div>
        </div>
        <Activity className="absolute -bottom-4 -right-4 w-12 h-12 text-cyber-purple animate-pulse" />
        <Scan className="absolute -top-4 -left-4 w-8 h-8 text-white/20" />
        
        {/* Rotating Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyber-cyan/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-cyber-cyan/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
      </div>

      <div className="space-y-2 mb-8 font-mono text-xs text-cyber-cyan/40 tracking-[0.2em] uppercase">
         <p>CASO: 49/90</p>
         <p>VÍTIMA: H-01 [DESCONHECIDO]</p>
      </div>

      <h1 className="text-3xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan mb-8 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] tracking-tight max-w-4xl">
        <Typewriter 
          text="Estamos prestes a abrir a caixa preta da sua mente." 
          speed={40}
          onComplete={() => setTimeout(() => setShowButton(true), 2000)}
        />
      </h1>

      <div className="max-w-2xl mx-auto p-6 bg-black/40 border-l-2 border-cyber-cyan backdrop-blur-sm">
        <div className="text-lg md:text-xl font-mono text-cyber-cyan/90 leading-relaxed min-h-[4rem]">
          <Typewriter 
            text="Respire. Acesso ao Laboratório Neuro-Investigativo solicitado." 
            startDelay={2500}
            speed={30}
          />
        </div>
      </div>

      <div className={`mt-12 transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <GlitchButton onClick={onComplete}>
          [ ENTRAR NA OPERAÇÃO COMO AGENTE ]
        </GlitchButton>
        <p className="mt-4 text-[10px] text-gray-500 font-mono uppercase tracking-widest animate-pulse">
           Credencial Temporária Emitida
        </p>
      </div>
    </div>
  );
};