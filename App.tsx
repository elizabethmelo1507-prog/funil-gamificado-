import React, { useState, useEffect } from 'react';
import { GamePhase } from './types';
import { Phase1Intro } from './components/Phase1Intro';
import { Phase2Chat } from './components/Phase2Chat';
import { Phase2Evidence } from './components/Phase2Evidence';
import { Phase3Call } from './components/Phase3Call';
import { Phase4Recordings } from './components/Phase4Recordings';
import { Phase5Report } from './components/Phase5Report';
import { Phase6Offer } from './components/Phase6Offer';
import { SalesPage } from './components/SalesPage';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.INTRO);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSalesPage, setShowSalesPage] = useState(false);

  const nextPhase = () => {
    setIsTransitioning(true);
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setPhase((prev) => prev + 1);
        setTimeout(() => setIsTransitioning(false), 500);
    }, 1000);
  };

  const handleShowDetails = () => {
      setShowSalesPage(true);
  };

  const renderPhase = () => {
    switch (phase) {
      case GamePhase.INTRO:
        return <Phase1Intro onComplete={nextPhase} />;
      case GamePhase.CHAT:
        return <Phase2Chat onComplete={nextPhase} />;
      case GamePhase.EVIDENCE_BOARD:
        return <Phase2Evidence onComplete={nextPhase} />;
      case GamePhase.INCOMING_CALL: 
      case GamePhase.ACTIVE_CALL:   
        return <Phase3Call onComplete={() => {
             setIsTransitioning(true);
             setTimeout(() => {
                 setPhase(GamePhase.RECORDINGS);
                 setIsTransitioning(false);
             }, 1500);
        }} />;
      case GamePhase.RECORDINGS:
        return <Phase4Recordings onComplete={nextPhase} />;
      case GamePhase.REPORT:
        return <Phase5Report onComplete={nextPhase} />;
      case GamePhase.OFFER:
        return <Phase6Offer onShowDetails={handleShowDetails} />;
      default:
        return <div className="text-white text-center pt-20">Erro no sistema. Reinicie o terminal.</div>;
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-cyber-black text-gray-200 selection:bg-cyber-cyan selection:text-black">
      
      {/* Transition Screen */}
      <div 
        className={`fixed inset-0 bg-black z-[100] transition-opacity duration-500 pointer-events-none flex flex-col items-center justify-center ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
         <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-cyber-cyan animate-[width_1s_ease-in-out_infinite]"></div>
         </div>
         <p className="font-mono text-xs text-cyber-cyan animate-pulse">CARREGANDO DADOS...</p>
      </div>

      <main className="relative z-10 min-h-screen">
         {renderPhase()}
         
         {/* Render Sales Page below everything if triggered */}
         {showSalesPage && <SalesPage />}
      </main>

      {/* Persistent HUD */}
      <div className="fixed bottom-4 left-4 z-40 font-mono text-[10px] text-cyber-cyan/30 pointer-events-none hidden md:block select-none">
        DNF.SECURE.V.4.92 // CONNECTED
      </div>
    </div>
  );
};

export default App;