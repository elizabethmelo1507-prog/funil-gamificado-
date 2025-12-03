import React, { useEffect, useState } from 'react';
import { Check, ArrowRight, Fingerprint, FileCheck } from 'lucide-react';
import { GlitchButton } from './GlitchButton';

interface Props {
  onComplete: () => void;
}

export const Phase5Report: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); 
    const timer2 = setTimeout(() => setStep(2), 2500); 
    const timer3 = setTimeout(() => setStep(3), 4000); 
    const timer4 = setTimeout(() => setStep(4), 5500); 
    const timer5 = setTimeout(() => setStep(5), 7500); // Reveal Plot Twist

    return () => {
      clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 max-w-4xl mx-auto relative">
      
      <div className="w-full bg-[#e6e4e0] text-black relative shadow-2xl transform rotate-0 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-10 min-h-[850px] overflow-hidden rounded-sm">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply paper-texture"></div>

        {/* Header Section */}
        <div className="bg-[#1a1a1a] text-white p-8 relative z-10 flex justify-between items-start">
           <div>
                <h1 className="text-3xl font-orbitron font-black tracking-tighter">DNF // CONFIDENCIAL</h1>
                <p className="text-xs font-mono text-gray-400 mt-1">DIVISÃO NACIONAL DE FOCO // CASO 49/90</p>
           </div>
           <div className="border-2 border-red-500 text-red-500 font-bold px-2 py-1 text-xs rotate-[-10deg] uppercase opacity-80">
              TOP SECRET
           </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 relative z-10 font-mono">
           
           <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-8">
              <h2 className="text-xl font-bold">LAUDO TÉCNICO FINAL</h2>
              <span className="text-sm">DATA: {new Date().toLocaleDateString()}</span>
           </div>

           <div className="space-y-6 mb-12">
              <div className={`flex items-center gap-4 ${step >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                 <div className="w-5 h-5 border border-black flex items-center justify-center bg-black text-white text-xs">X</div>
                 <p className="text-sm uppercase tracking-wide">Padrão de Caos: <span className="font-bold">CONFIRMADO</span></p>
              </div>
              <div className={`flex items-center gap-4 ${step >= 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                 <div className="w-5 h-5 border border-black flex items-center justify-center bg-black text-white text-xs">X</div>
                 <p className="text-sm uppercase tracking-wide">Sobrecarga Cognitiva: <span className="font-bold text-red-700">NÍVEL CRÍTICO</span></p>
              </div>
              <div className={`flex items-center gap-4 ${step >= 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                 <div className="w-5 h-5 border border-black flex items-center justify-center bg-black text-white text-xs">X</div>
                 <p className="text-sm uppercase tracking-wide">Recomendação: <span className="font-bold bg-yellow-300 px-1">PROTOCOLO ZENFLOW</span></p>
              </div>
           </div>

           {/* PLOT TWIST SECTION */}
           {step >= 4 && (
             <div className="animate-in fade-in duration-1000 bg-gray-200 p-6 border-l-4 border-red-600 mb-8 relative">
                <h3 className="text-red-700 font-bold mb-2 flex items-center gap-2">
                   <Fingerprint className="w-4 h-4" /> IDENTIFICAÇÃO DO SUJEITO
                </h3>
                <p className="font-rajdhani text-lg leading-relaxed text-gray-900">
                  "Agente, cruzamos os dados. Padrão de comportamento financeiro, agenda e sobrecarga."
                </p>
                {step >= 5 && (
                   <p className="font-rajdhani text-xl leading-relaxed font-bold mt-4 animate-pulse text-red-900">
                     "A Vítima H-01 é você."
                   </p>
                )}
             </div>
           )}

           {step >= 5 && (
             <div className="animate-in slide-in-from-bottom-4 duration-1000 text-center mt-12">
                <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto italic">
                   "Você não estava apenas investigando um estranho. Você estava se vendo em terceira pessoa."
                </p>
                
                <div className="secret-stamp animate-stamp mb-8 mx-auto w-48 text-center text-sm border-2">
                   SOLUÇÃO RECOMENDADA
                </div>
                
                <GlitchButton onClick={onComplete} variant="dark" className="shadow-xl text-xs uppercase tracking-widest px-8">
                  ATIVAR PROTOCOLO ZENFLOW <ArrowRight className="ml-2 w-4 h-4 inline" />
                </GlitchButton>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full bg-[#1a1a1a] h-4"></div>
      </div>
    </div>
  );
};