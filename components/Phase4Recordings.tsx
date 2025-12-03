import React, { useState } from 'react';
import { Play, CheckCircle, Zap, Database, Activity, Maximize2, Bell, List, Clock, Check, X } from 'lucide-react';
import { GlitchButton } from './GlitchButton';
import { TapeData } from '../types';

interface Props {
  onComplete: () => void;
}

const TAPES: TapeData[] = [
  {
    id: 'A',
    title: 'ARQUIVO A - OVERLOAD',
    description: 'Cérebro em modo sobrevivência. Identifique os sinais de alerta.',
    insight: 'Overload não é produtividade. É o cérebro tentando sobreviver sem sistema.',
    visualDesc: 'Notificações excessivas, ruído mental.',
    type: 'problem'
  },
  {
    id: 'B',
    title: 'ARQUIVO B - FALHA DE FOCO',
    description: 'Tentativa de execução sem hierarquia. O que você prioriza?',
    insight: 'Seu cérebro foi feito pra criar, não pra armazenar tarefas soltas.',
    visualDesc: 'Loops de tarefas, abas abertas.',
    type: 'problem'
  },
  {
    id: 'C',
    title: 'ARQUIVO C - MODO ZENFLOW',
    description: 'O experimento final. Projeção de futuro com sistema instalado.',
    insight: 'Quando você instala um sistema, seu cérebro finalmente descansa.',
    visualDesc: 'Ordem, clareza e progressão.',
    type: 'solution'
  }
];

export const Phase4Recordings: React.FC<Props> = ({ onComplete }) => {
  const [activeTape, setActiveTape] = useState<TapeData | null>(null);
  const [analyzedTapes, setAnalyzedTapes] = useState<string[]>([]);
  
  // Game States
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [gameFeedback, setGameFeedback] = useState<string>('');

  const handleOpenTape = (tape: TapeData) => {
    setActiveTape(tape);
    setGameState('intro');
    setGameFeedback('');
  };

  const handleMarkAnalyzed = () => {
    if (activeTape && !analyzedTapes.includes(activeTape.id)) {
      setAnalyzedTapes([...analyzedTapes, activeTape.id]);
    }
    setActiveTape(null);
  };

  // --- MINI GAMES LOGIC ---
  const renderMiniGame = () => {
     if (!activeTape) return null;

     // --- GAME A: OVERLOAD ---
     if (activeTape.id === 'A') {
        return (
           <div className="flex flex-col items-center justify-center h-full p-4 text-center relative z-10">
              {gameState === 'intro' && (
                 <>
                    <Zap className="w-16 h-16 text-yellow-400 mb-4 animate-pulse" />
                    <p className="mb-6 font-mono text-sm">SIMULAÇÃO: O cérebro da vítima está recebendo estímulos demais.</p>
                    <GlitchButton onClick={() => setGameState('playing')}>[ INICIAR DIAGNÓSTICO ]</GlitchButton>
                 </>
              )}
              {gameState === 'playing' && (
                 <div className="space-y-4 w-full max-w-sm">
                    <p className="text-white font-orbitron mb-4">IDENTIFIQUE O SINTOMA PRINCIPAL:</p>
                    <button onClick={() => { setGameState('result'); setGameFeedback('Correto. O sistema está em colapso por excesso de ruído.'); }} className="w-full bg-gray-800 p-3 hover:bg-red-900 border border-gray-600 hover:border-red-500 transition-colors flex items-center gap-2 cursor-pointer z-20 relative">
                       <Bell className="w-4 h-4" /> Ansiedade por Notificação
                    </button>
                    <button onClick={() => { setGameState('result'); setGameFeedback('Correto. Sem filtro, tudo parece urgente.'); }} className="w-full bg-gray-800 p-3 hover:bg-red-900 border border-gray-600 hover:border-red-500 transition-colors flex items-center gap-2 cursor-pointer z-20 relative">
                       <Activity className="w-4 h-4" /> Cansaço Mental Crônico
                    </button>
                 </div>
              )}
           </div>
        );
     }

     // --- GAME B: FOCUS ---
     if (activeTape.id === 'B') {
        return (
           <div className="flex flex-col items-center justify-center h-full p-4 text-center relative z-10">
              {gameState === 'intro' && (
                 <>
                    <List className="w-16 h-16 text-blue-400 mb-4 animate-bounce" />
                    <p className="mb-6 font-mono text-sm">SIMULAÇÃO: A lista de tarefas é infinita. Tente priorizar.</p>
                    <GlitchButton onClick={() => setGameState('playing')}>[ TENTAR FOCAR ]</GlitchButton>
                 </>
              )}
              {gameState === 'playing' && (
                 <div className="w-full max-w-sm">
                    <p className="text-white font-orbitron mb-4 text-xs">QUAL TAREFA EXECUTAR PRIMEIRO?</p>
                    <div className="space-y-2 opacity-80">
                        {['Responder Email Cliente', 'Pagar Boleto', 'Criar Relatório', 'Agendar Reunião'].map((task, i) => (
                           <button key={i} onClick={() => { setGameState('result'); setGameFeedback('ERRO: Você escolheu uma, mas esqueceu as outras. Sem um sistema externo, a prioridade é impossível.'); }} className="w-full text-left bg-gray-800 p-2 border-l-4 border-blue-500 hover:bg-blue-900/50 text-xs font-mono cursor-pointer z-20 relative">
                              [ ] {task}
                           </button>
                        ))}
                    </div>
                 </div>
              )}
           </div>
        );
     }

     // --- GAME C: ZENFLOW ---
     if (activeTape.id === 'C') {
        return (
           <div className="flex flex-col items-center justify-center h-full p-4 text-center relative z-10">
              {gameState === 'intro' && (
                 <>
                    <Database className="w-16 h-16 text-green-400 mb-4" />
                    <p className="mb-6 font-mono text-sm">SIMULAÇÃO: Projeção de futuro. Escolha o caminho.</p>
                    <GlitchButton onClick={() => setGameState('playing')}>[ VISUALIZAR FUTURO ]</GlitchButton>
                 </>
              )}
              {gameState === 'playing' && (
                 <div className="w-full max-w-sm space-y-4">
                    <p className="text-white font-orbitron mb-2">SELECIONE A LINHA DO TEMPO DA VÍTIMA:</p>
                    <button onClick={() => { setGameState('result'); setGameFeedback('Análise: O caos continua. Burnout iminente em 3 meses.'); }} className="w-full p-4 bg-gray-800 border border-gray-600 hover:border-red-500 flex justify-between items-center group cursor-pointer z-20 relative">
                       <span className="text-gray-400 group-hover:text-red-400">Sem Mudança (Padrão)</span>
                       <X className="w-4 h-4 opacity-0 group-hover:opacity-100 text-red-500" />
                    </button>
                    <button onClick={() => { setGameState('result'); setGameFeedback('Protocolo Aceito. Organização, clareza e leveza instalados.'); }} className="w-full p-4 bg-gray-800 border border-cyber-cyan hover:bg-cyber-cyan/10 flex justify-between items-center cursor-pointer z-20 relative">
                       <span className="text-cyber-cyan font-bold">Instalar Protocolo Zenflow</span>
                       <Check className="w-4 h-4 text-cyber-cyan" />
                    </button>
                 </div>
              )}
           </div>
        );
     }
  };

  const allAnalyzed = TAPES.every(t => analyzedTapes.includes(t.id));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-6xl mx-auto relative z-10">
      
      {!allAnalyzed ? (
         <div className="text-center mb-16">
            <div className="inline-block border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1 rounded-full mb-4">
               <span className="text-cyber-cyan text-xs font-mono animate-pulse">● ACESSO À MEMÓRIA: H-01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-2">GRAVAÇÕES DA MENTE</h2>
            <p className="font-mono text-gray-400">Jogue as simulações para extrair os dados.</p>
         </div>
      ) : (
        <div className="text-center mb-16 animate-in zoom-in duration-500 opacity-20">
            <h2 className="text-3xl md:text-5xl font-orbitron text-green-400 mb-2 drop-shadow-lg">ANÁLISE CONCLUÍDA</h2>
            <p className="font-mono text-green-400/60 tracking-widest uppercase">Dados prontos para envio à Central</p>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
        {TAPES.map((tape) => {
          const isAnalyzed = analyzedTapes.includes(tape.id);
          return (
            <div 
              key={tape.id}
              onClick={() => handleOpenTape(tape)}
              className={`
                relative h-64 border-2 rounded-xl cursor-pointer transition-all duration-300 group flex flex-col items-center justify-center gap-4 bg-gray-900/40 backdrop-blur-sm overflow-hidden
                ${isAnalyzed ? 'border-green-500/30 opacity-60 grayscale' : 'border-gray-700 hover:border-cyber-cyan hover:bg-gray-800/60'}
              `}
            >
               <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-500">{tape.type === 'solution' ? 'EXP-01' : 'ERR-09'}</div>
              <div className={`relative w-16 h-16 flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                 {isAnalyzed ? (
                   <CheckCircle className="w-12 h-12 text-green-500" />
                 ) : (
                   <Play className="w-10 h-10 text-white fill-white ml-1" />
                 )}
              </div>
              <div className="text-center px-4">
                <h3 className="font-rajdhani font-bold text-lg text-white tracking-wider">{tape.title}</h3>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded mt-2 inline-block ${isAnalyzed ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                  {isAnalyzed ? 'DADOS EXTRAÍDOS' : 'ACESSAR'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {allAnalyzed && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-500 p-4">
            <div className="bg-gray-900/90 border-2 border-cyber-cyan p-8 rounded-2xl shadow-[0_0_100px_rgba(6,182,212,0.4)] text-center max-w-md w-full relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-cyber-cyan shadow-[0_0_10px_#06b6d4]"></div>
               <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                   <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                   </div>
                   
                   <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2">DADOS COMPILADOS</h3>
                   <p className="font-mono text-gray-400 mb-8 text-sm">A Caixa Preta foi decodificada com sucesso.</p>
                   
                   <GlitchButton onClick={onComplete} variant="primary" fullWidth className="text-lg py-4 font-bold tracking-wider shadow-xl">
                     [ ENVIAR LAUDO PARA A CENTRAL ]
                   </GlitchButton>
               </div>
            </div>
        </div>
      )}

      {/* Interactive Modal */}
      {activeTape && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 animate-in fade-in duration-300">
          <div className={`max-w-4xl w-full bg-gray-900 border-2 ${activeTape.type === 'solution' ? 'border-green-500' : 'border-red-500'} relative shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px]`}>
             
             {/* Left: Mini-Game Area */}
             <div className="w-full md:w-1/2 bg-black relative border-r border-gray-800 flex flex-col items-center justify-center overflow-hidden p-6">
                <div className={`absolute inset-0 opacity-10 ${activeTape.type === 'problem' ? 'bg-red-900' : 'bg-green-900'}`}></div>
                
                {renderMiniGame()}

                {gameState === 'result' && (
                   <div className="mt-6 p-4 bg-gray-800/80 border border-gray-600 rounded text-center animate-in zoom-in relative z-20">
                      <p className="text-sm text-white font-rajdhani">{gameFeedback}</p>
                   </div>
                )}
             </div>

             {/* Right: Info & Action */}
             <div className="w-full md:w-1/2 p-8 relative flex flex-col z-20 bg-gray-900/90 md:bg-transparent">
                <div className="absolute top-4 right-4 cursor-pointer hover:text-white text-gray-500 z-50" onClick={() => setActiveTape(null)}>
                   <X className="w-6 h-6" />
                </div>

                <div className="mb-4">
                   <h2 className="text-2xl font-orbitron font-bold text-white leading-tight mb-2">
                     {activeTape.title}
                   </h2>
                   <div className="h-px w-20 bg-gray-700"></div>
                </div>

                <p className="text-gray-400 font-rajdhani text-lg italic leading-relaxed mb-6 flex-1">
                  "{activeTape.description}"
                </p>

                {gameState === 'result' && (
                  <div className="animate-in fade-in slide-in-from-bottom-5">
                      <div className="bg-cyber-cyan/5 border border-cyber-cyan/20 p-4 rounded mb-6">
                        <h4 className="text-cyber-cyan text-xs font-bold uppercase mb-2 flex items-center gap-2">
                          <Activity className="w-3 h-3" /> Insight DNF
                        </h4>
                        <p className="text-white text-sm font-medium">
                          {activeTape.insight}
                        </p>
                      </div>

                      <GlitchButton onClick={handleMarkAnalyzed} fullWidth variant={activeTape.type === 'solution' ? 'primary' : 'danger'}>
                        [ REGISTRAR E FECHAR ]
                      </GlitchButton>
                  </div>
                )}
                
                {gameState !== 'result' && (
                   <div className="mt-auto text-center opacity-50 text-xs font-mono">
                      Complete a simulação ao lado para liberar o insight.
                   </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};