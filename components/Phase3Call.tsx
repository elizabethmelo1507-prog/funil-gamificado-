import React, { useState, useEffect, useRef } from 'react';
import { Phone, Radio, Lock, Unlock } from 'lucide-react';
import { GlitchButton } from './GlitchButton';

interface Props {
  onComplete: () => void;
}

export const Phase3Call: React.FC<Props> = ({ onComplete }) => {
  const [callStatus, setCallStatus] = useState<'incoming' | 'active' | 'ended' | 'decrypting'>('incoming');
  const [showRefusalModal, setShowRefusalModal] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isTalking, setIsTalking] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambienceOscRef = useRef<OscillatorNode | null>(null);
  const ringtoneIntervalRef = useRef<number | null>(null);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);

  const transcriptLines = [
    "Agente, aqui é o Dr. Rocha.",
    "A vítima H-01 está em colapso mental crítico.",
    "Seu cérebro está operando em modo de sobrevivência.",
    "Consegui extrair três arquivos criptografados da memória dele.",
    "Vamos liberar o acesso à Caixa Preta agora.",
    "Analise cada gravação. O tempo está correndo."
  ];

  // --- AUDIO LOGIC ---
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const startRingtone = () => {
    try {
      const ctx = initAudioContext();
      const playPulse = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      };
      playPulse();
      ringtoneIntervalRef.current = window.setInterval(playPulse, 2000);
    } catch (e) { console.error("Audio init failed", e); }
  };

  const stopRingtone = () => {
    if (ringtoneIntervalRef.current) {
      window.clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }
  };

  const startAmbience = () => {
    try {
      const ctx = initAudioContext();
      if (ambienceOscRef.current) { ambienceOscRef.current.stop(); ambienceOscRef.current.disconnect(); }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.value = 50; 
      filter.type = 'lowpass';
      filter.frequency.value = 400; 
      gain.gain.value = 0.02; 
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      ambienceOscRef.current = osc;
    } catch (e) { console.error("Ambience failed", e); }
  };

  const stopAmbience = () => {
    if (ambienceOscRef.current) {
      try { ambienceOscRef.current.stop(); ambienceOscRef.current.disconnect(); } catch (e) {}
      ambienceOscRef.current = null;
    }
  };

  const playCallSequence = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    utterancesRef.current = [];
    const voices = window.speechSynthesis.getVoices();
    const ptVoices = voices.filter(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'));
    let selectedVoice = ptVoices.find(v => v.name.includes('Daniel') || v.name.includes('Luciano'));
    if (!selectedVoice && ptVoices.length > 0) selectedVoice = ptVoices[0];

    transcriptLines.forEach((text, index) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      u.pitch = 0.6; 
      u.rate = 1.05; 
      u.volume = 1.0;
      if (selectedVoice) u.voice = selectedVoice;

      u.onstart = () => {
        setCurrentLineIndex(index);
        setIsTalking(true);
      };

      u.onend = () => {
        setIsTalking(false);
        if (index === transcriptLines.length - 1) {
           setTimeout(() => {
             stopAmbience();
             setCallStatus('decrypting');
             startDecryption();
           }, 1000);
        }
      };
      utterancesRef.current.push(u);
      window.speechSynthesis.speak(u);
    });
  };

  const startDecryption = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setDecryptionProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 50);
  };

  useEffect(() => {
    startRingtone();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
       window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
    }
    return () => { stopRingtone(); stopAmbience(); window.speechSynthesis.cancel(); };
  }, []);

  useEffect(() => {
    if (callStatus === 'active') {
      stopRingtone();
      startAmbience();
      setTimeout(() => playCallSequence(), 1000);
    }
  }, [callStatus]);

  const handleAccept = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setCallStatus('active');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black"></div>
      <div className="absolute top-0 w-full h-1 bg-cyber-cyan/50 shadow-[0_0_20px_#06b6d4]"></div>

      {callStatus === 'incoming' && (
        <div className="flex flex-col items-center z-10 w-full max-w-md p-6 relative">
          <div className="absolute inset-0 border border-cyber-cyan/20 rounded-xl bg-black/50 backdrop-blur-sm -z-10"></div>
          
          <div className="mb-8 relative">
             <div className="w-32 h-32 rounded-full border border-cyber-cyan flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/50">
                  <Phone className="w-10 h-10 text-cyber-cyan animate-bounce" />
                </div>
             </div>
             <div className="absolute -inset-4 border border-dashed border-cyber-cyan/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          </div>

          <h2 className="text-3xl font-orbitron text-white mb-2 animate-pulse">CHAMADA ENTRANTE</h2>
          <p className="text-cyber-cyan font-mono tracking-[0.3em] mb-12 text-sm bg-cyber-cyan/10 px-4 py-1">NEURO-LAB 07 // H-01</p>

          <div className="flex gap-4 w-full">
            <button 
              onClick={() => setShowRefusalModal(true)}
              className="flex-1 border border-red-900/50 bg-red-900/10 text-red-700 py-4 font-rajdhani font-bold hover:bg-red-900/20 transition-all uppercase tracking-widest text-sm"
            >
              [ IGNORAR ]
            </button>
            <button 
              onClick={handleAccept}
              className="flex-1 border border-green-500 bg-green-500/10 text-green-400 py-4 font-rajdhani font-bold hover:bg-green-500/20 transition-all uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse"
            >
              [ ATENDER ]
            </button>
          </div>
        </div>
      )}

      {callStatus === 'active' && (
        <div className="w-full max-w-2xl px-6 flex flex-col items-center z-10">
          <div className="w-full bg-black/80 border border-gray-800 p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-2 left-4 text-[10px] text-cyber-cyan/40 font-mono">FREQ: SECURE</div>
            <div className="absolute top-2 right-4 text-[10px] text-red-500/60 font-mono animate-pulse">● REC</div>

            <div className="flex flex-col items-center mb-8">
               <div className="w-24 h-24 bg-gray-900 rounded-full border-2 border-cyber-cyan/30 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <Radio className="w-10 h-10 text-cyber-cyan/80" />
               </div>
               <h3 className="font-orbitron font-bold text-xl text-white">Dr. N. Rocha</h3>
               <p className="text-xs text-cyber-cyan font-mono tracking-widest mt-1">DNF // NEUROINVESTIGAÇÃO</p>
            </div>

            {/* Audio Waveform */}
            <div className="h-24 w-full flex items-center justify-center gap-1 mb-8 bg-gray-900/50 rounded border border-white/5 p-4">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-cyber-cyan rounded-full transition-all duration-75"
                  style={{
                    height: isTalking ? `${Math.random() * 100}%` : '4px',
                    opacity: isTalking ? 1 : 0.2
                  }}
                ></div>
              ))}
            </div>

            <div className="min-h-[6rem] flex items-center justify-center text-center">
               {currentLineIndex >= 0 && (
                  <p key={currentLineIndex} className="text-lg md:text-xl font-rajdhani text-gray-200 animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-cyber-cyan mr-2">›</span>
                    {transcriptLines[currentLineIndex]}
                  </p>
               )}
            </div>
          </div>
        </div>
      )}

      {callStatus === 'decrypting' && (
         <div className="z-20 text-center w-full max-w-lg p-6">
            <div className="mb-6 flex justify-center">
               {decryptionProgress < 100 ? (
                 <Lock className="w-16 h-16 text-red-500 animate-pulse" />
               ) : (
                 <Unlock className="w-16 h-16 text-green-500 animate-bounce" />
               )}
            </div>
            <h2 className="text-2xl font-orbitron text-white mb-4">ACESSANDO CAIXA PRETA</h2>
            
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700 mb-2">
               <div 
                 className="h-full bg-cyber-cyan shadow-[0_0_10px_#06b6d4]"
                 style={{ width: `${decryptionProgress}%` }}
               ></div>
            </div>
            
            <div className="flex justify-between font-mono text-xs text-cyber-cyan/60">
               <span>ARQUIVO: H01_MEMORY.DUMP</span>
               <span>{decryptionProgress}%</span>
            </div>
         </div>
      )}

      {showRefusalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
          <div className="border border-red-500/50 bg-red-950/20 p-8 max-w-md w-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.05)_10px,rgba(255,0,0,0.05)_20px)]"></div>
            <h3 className="text-xl font-orbitron text-white mb-4">PROTOCOLO OBRIGATÓRIO</h3>
            <p className="font-mono text-red-400 mb-8">Sem essa chamada, o caso não avança. O DNF exige análise completa.</p>
            <GlitchButton onClick={() => { setShowRefusalModal(false); }} fullWidth variant="secondary">
              [ VOLTAR E ATENDER ]
            </GlitchButton>
          </div>
        </div>
      )}
    </div>
  );
};