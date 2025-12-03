import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock } from 'lucide-react';
import { GlitchButton } from './GlitchButton';

interface Props {
  onShowDetails: () => void;
}

export const Phase6Offer: React.FC<Props> = ({ onShowDetails }) => {
  const [showSadModal, setShowSadModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyber-cyan/10 to-transparent -z-10"></div>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-green-500/50 text-green-400 px-6 py-2 font-mono text-sm mb-6 rounded bg-green-900/10 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" /> LAUDO OFICIAL CONCLUÍDO
          </div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] uppercase tracking-tight">
            Diagnóstico Final
          </h1>
          <p className="text-gray-400 font-rajdhani text-xl md:text-2xl max-w-2xl mx-auto">
            A infraestrutura digital necessária para solucionar o CASO 49/90 foi identificada.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
           {/* Reveal Card */}
           <div className="w-full max-w-2xl bg-gray-900/80 border border-gray-700 p-1 rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
              
              <div className="bg-black/90 p-8 md:p-12 rounded-[1.3rem] flex flex-col items-center text-center relative z-10 backdrop-blur-sm">
                 
                 {!isUnlocked ? (
                    <div className="py-12 flex flex-col items-center animate-pulse">
                       <Lock className="w-20 h-20 text-gray-600 mb-6" />
                       <h3 className="text-2xl font-orbitron text-gray-300 mb-2">SOLUÇÃO RECOMENDADA</h3>
                       <p className="text-gray-500 font-mono text-sm mb-8">Confirme sua identidade de Vítima para visualizar o protocolo.</p>
                       <GlitchButton onClick={handleUnlock}>
                         [ LIBERAR ACESSO AO PROTOCOLO ]
                       </GlitchButton>
                    </div>
                 ) : (
                    <div className="animate-in zoom-in duration-500 w-full">
                        <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan mb-6 mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <Unlock className="w-10 h-10 text-cyber-cyan" />
                        </div>
                        
                        <h3 className="text-3xl font-orbitron text-white mb-4">PROTOCOLO ZENFLOW</h3>
                        <p className="text-gray-400 font-rajdhani text-lg mb-8 leading-relaxed">
                            "Com base nos seus padrões de sobrecarga e foco, o sistema Zenflow é a única solução estrutural recomendada para reverter o colapso."
                        </p>

                        <div className="w-full h-px bg-gray-800 mb-8"></div>

                        <div className="space-y-4">
                            <GlitchButton onClick={onShowDetails} fullWidth className="text-lg py-5 bg-cyber-cyan text-black hover:bg-white border-none shadow-lg">
                                [ VER DETALHES DO PROTOCOLO ZENFLOW ]
                            </GlitchButton>
                            
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-4">
                                Clique para acessar o dossiê completo
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                             <button 
                                onClick={() => setShowSadModal(true)}
                                className="text-gray-600 hover:text-gray-400 text-xs font-rajdhani transition-colors underline decoration-dotted hover:decoration-solid"
                            >
                                [ Recusar ajuda e fechar dossiê ]
                            </button>
                        </div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {showSadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="max-w-md w-full border border-gray-800 bg-gray-900 p-8 text-center shadow-2xl relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-red-900"></div>
             <h3 className="text-xl font-mono text-gray-400 mb-4">DECISÃO REGISTRADA</h3>
             <p className="text-gray-500 mb-8 font-rajdhani">
               "Caso arquivado. O caos continuará sem intervenção."
             </p>
             <GlitchButton onClick={() => setShowSadModal(false)} variant="secondary">
               [ VOLTAR ]
             </GlitchButton>
          </div>
        </div>
      )}
    </div>
  );
};