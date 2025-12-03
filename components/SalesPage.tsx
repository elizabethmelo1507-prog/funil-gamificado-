import React, { useEffect } from 'react';
import { Check, ShieldCheck, Zap, BookOpen, BarChart3, Clock, X, AlertTriangle, Star, HelpCircle } from 'lucide-react';
import { GlitchButton } from './GlitchButton';

export const SalesPage: React.FC = () => {
    useEffect(() => {
        const element = document.getElementById('zenflow-sales-page');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const scrollToCheckout = () => {
         window.open("https://pay.kirvano.com/04deb45a-3d79-47ec-bc6f-fd1acfac8e26", "_blank");
    };

    return (
        <div id="zenflow-sales-page" className="w-full bg-black text-gray-200 font-rajdhani relative overflow-hidden pb-20 animate-in fade-in duration-1000 mt-12 border-t-4 border-cyber-cyan">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

            {/* SEÇÃO A – HERO */}
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto pt-12">
                    <div className="inline-block border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1 rounded-full mb-6">
                       <span className="text-cyber-cyan text-xs font-mono tracking-widest uppercase">Protocolo Liberado // DNF</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 leading-tight">
                        Você investigou o caos.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">Agora é hora de instalar o sistema.</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        O Protocolo Zenflow é o painel central que organiza suas tarefas, sua agenda e sua vida financeira, baseado exatamente no que você viu na Operação Caixa Preta.
                    </h2>
                    <p className="text-lg text-gray-500 mb-12 italic border-l-2 border-cyber-cyan pl-4 inline-block text-left">
                        “Não é só um curso, nem só uma planilha. É um sistema completo pra tirar sua vida do modo emergência.”
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mb-12 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                        {[
                            "Dashboard de produtividade: tarefas, projetos e áreas",
                            "Central de agenda: compromissos e rotinas",
                            "Painel financeiro: ganhos, gastos e investimentos",
                            "Assistente de IA que entende sua rotina",
                            "Aulas semanais sobre neurociência",
                            "E-books práticos e planilha oficial"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm md:text-base">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <span className="text-gray-400 text-sm block mb-2">Por apenas <strong className="text-white text-lg">R$ 49,90</strong> – acesso vitalício.</span>
                        <GlitchButton onClick={scrollToCheckout} className="text-xl px-12 py-6">
                            [ ATIVAR PROTOCOLO ZENFLOW AGORA ]
                        </GlitchButton>
                    </div>
                    <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mt-4">
                        Você já viu o laudo. O caos não se organiza sozinho. Instale o sistema.
                    </p>
                </div>
            </section>

            {/* SEÇÃO B – O QUE VOCÊ RECEBE */}
            <section className="py-20 px-6 bg-gray-900/30 border-y border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-orbitron text-center mb-16 text-white">ARQUIVOS DO PACOTE</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <BarChart3 className="w-8 h-8 text-cyber-cyan" />, title: "Dashboard de Produtividade", desc: "Painel visual pra organizar tarefas, projetos, áreas da vida e prioridades do dia." },
                            { icon: <Clock className="w-8 h-8 text-purple-500" />, title: "Central de Agenda", desc: "Visão clara da semana, compromissos, estudos, trabalho, vida pessoal – tudo conectado." },
                            { icon: <ShieldCheck className="w-8 h-8 text-green-500" />, title: "Painel Financeiro", desc: "Controle de entradas, saídas, categorias, metas e visão de longo prazo." },
                            { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Assistente de IA Integrado", desc: "IA que entende seus dados e responde dúvidas sobre prioridades e gastos." },
                            { icon: <BookOpen className="w-8 h-8 text-blue-500" />, title: "Aulas Semanais", desc: "Conteúdo contínuo sobre neurociência pra entender seu cérebro e criar hábitos." },
                            { icon: <Star className="w-8 h-8 text-red-500" />, title: "E-books & Planilha", desc: "Materiais complementares prontos para aplicar rápido na sua rotina." }
                        ].map((card, i) => (
                            <div key={i} className="bg-black border border-gray-800 p-8 rounded-xl hover:border-cyber-cyan/50 transition-colors group">
                                <div className="mb-6 p-4 bg-gray-900 rounded-full w-fit group-hover:scale-110 transition-transform">{card.icon}</div>
                                <h4 className="text-xl font-bold text-white mb-3 font-orbitron">{card.title}</h4>
                                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEÇÃO C – COMO FUNCIONA */}
            <section className="py-20 px-6 relative">
                <div className="max-w-4xl mx-auto">
                     <h3 className="text-3xl font-orbitron text-center mb-16 text-white">EXECUÇÃO DO PROTOCOLO</h3>
                     <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-gray-800">
                        {[
                            "Recebe acesso imediato ao painel Zenflow via email.",
                            "Preenche suas principais áreas (trabalho, estudos, finanças).",
                            "Começa a rodar o dia olhando o painel – e não sua cabeça.",
                            "Usa a IA para tirar dúvidas e definir prioridades.",
                            "Acompanha o progresso nas aulas e ajusta o sistema."
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                <div className="hidden md:block w-1/2 text-right pr-8 font-mono text-cyber-cyan opacity-50">ETAPA 0{i+1}</div>
                                <div className="w-8 h-8 bg-gray-900 border border-cyber-cyan rounded-full flex items-center justify-center text-cyber-cyan font-bold text-sm shrink-0">
                                    {i+1}
                                </div>
                                <div className="w-full md:w-1/2 pl-0 md:pl-8">
                                    <p className="text-lg text-white">{step}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* SEÇÃO D – PRA QUEM É */}
            <section className="py-20 px-6 bg-gray-900/20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-green-900/10 border border-green-900/30 p-8 rounded-xl">
                        <h4 className="text-xl font-orbitron text-green-400 mb-6 flex items-center gap-2"><Check className="w-5 h-5" /> PARA VOCÊ SE...</h4>
                        <ul className="space-y-4">
                            {[
                                "Vive com sensação de estar atrasado em tudo",
                                "Se perde fácil em notificações e tarefas soltas",
                                "Não tem clareza pra onde o dinheiro está indo",
                                "Começa o dia sem saber exatamente o que fazer",
                                "Quer um sistema único pra organizar vida, tempo e grana"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-900/10 border border-red-900/30 p-8 rounded-xl">
                        <h4 className="text-xl font-orbitron text-red-400 mb-6 flex items-center gap-2"><X className="w-5 h-5" /> NÃO É PRA VOCÊ SE...</h4>
                        <ul className="space-y-4">
                            {[
                                "Você ama viver no improviso total",
                                "Não está disposto a mexer 30 minutos na rotina",
                                "Não quer olhar pra sua vida financeira de forma adulta"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <X className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

             {/* SEÇÃO E – ANTES X DEPOIS */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-orbitron text-center mb-12 text-white">SIMULAÇÃO DE RESULTADO</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800 border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="bg-black/80 p-8">
                            <h4 className="font-mono text-red-500 mb-6 uppercase tracking-widest">Estado Atual (Caos)</h4>
                            <ul className="space-y-4 text-gray-500">
                                <li className="flex gap-2"><AlertTriangle className="w-4 h-4" /> Acorda e vai direto pro celular</li>
                                <li className="flex gap-2"><AlertTriangle className="w-4 h-4" /> Vive reagindo a urgências</li>
                                <li className="flex gap-2"><AlertTriangle className="w-4 h-4" /> Esquece prazos</li>
                                <li className="flex gap-2"><AlertTriangle className="w-4 h-4" /> Não sabe quanto pode gastar</li>
                                <li className="flex gap-2"><AlertTriangle className="w-4 h-4" /> Sente culpa no fim do dia</li>
                            </ul>
                        </div>
                        <div className="bg-gray-900/50 p-8">
                             <h4 className="font-mono text-cyber-cyan mb-6 uppercase tracking-widest">Com Zenflow</h4>
                             <ul className="space-y-4 text-white">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-cyber-cyan" /> Acorda e checa o painel do dia</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-cyber-cyan" /> Sabe as 3 prioridades principais</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-cyber-cyan" /> Tem clareza de prazos</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-cyber-cyan" /> Sabe quanto pode gastar sem medo</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-cyber-cyan" /> Sente que o dia fez sentido</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO F – PROVA SOCIAL */}
            <section className="py-20 px-6 bg-black border-y border-gray-800">
                 <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-orbitron text-center mb-12 text-white">RELATÓRIOS DE AGENTES</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg relative">
                             <div className="absolute -top-3 -left-3 bg-cyber-cyan text-black px-2 py-1 text-xs font-bold font-mono">AGENTE ALINE</div>
                             <p className="text-gray-300 italic mb-4">"Eu vivia apagando incêndio. O Zenflow virou meu painel central. Hoje eu sei o que é prioridade e parei de viver em atraso constante."</p>
                             <div className="text-sm text-gray-500 font-mono">27 anos, Analista</div>
                        </div>
                        <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg relative">
                             <div className="absolute -top-3 -left-3 bg-cyber-cyan text-black px-2 py-1 text-xs font-bold font-mono">AGENTE RICARDO</div>
                             <p className="text-gray-300 italic mb-4">"Achava que organização matava a criatividade. O Zenflow me mostrou que é o contrário. Sobra tempo pra criar quando você não tá perdido."</p>
                             <div className="text-sm text-gray-500 font-mono">31 anos, Designer</div>
                        </div>
                    </div>
                 </div>
            </section>

             {/* SEÇÃO G – PREÇO */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto bg-gradient-to-b from-gray-900 to-black border border-cyber-cyan/50 p-10 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.1)]">
                    <h3 className="text-2xl font-orbitron text-white mb-8">CONDIÇÃO ESPECIAL // CASO 49/90</h3>
                    
                    <div className="mb-8">
                        <span className="text-gray-500 line-through text-lg">De R$ 197,00</span>
                        <div className="text-5xl md:text-7xl font-black text-white font-orbitron mt-2 mb-2">R$ 49,90</div>
                        <p className="text-cyber-cyan uppercase tracking-widest text-sm">Pagamento único • Acesso vitalício</p>
                    </div>
                    
                    <div className="bg-yellow-900/20 text-yellow-500 text-xs font-mono p-2 mb-8 inline-block rounded border border-yellow-500/30">
                        ⚠️ CONDIÇÃO PODE SER ENCERRADA SEM AVISO PRÉVIO
                    </div>

                    <div className="mb-6">
                        <GlitchButton onClick={scrollToCheckout} fullWidth className="text-xl py-6">
                            [ ATIVAR PROTOCOLO ZENFLOW AGORA ]
                        </GlitchButton>
                    </div>

                    <div className="flex justify-center gap-4 text-xs text-gray-500 font-mono">
                        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Compra Segura</span>
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Acesso Imediato</span>
                    </div>
                </div>
            </section>

             {/* SEÇÃO H – FAQ */}
            <section className="py-20 px-6 max-w-3xl mx-auto">
                 <h3 className="text-2xl font-orbitron text-center mb-12 text-white">PERGUNTAS FREQUENTES</h3>
                 <div className="space-y-4">
                    {[
                        { q: "Em quanto tempo eu tenho acesso?", a: "Imediatamente após a confirmação do pagamento, você recebe os dados de acesso no seu email." },
                        { q: "Preciso entender muito de tecnologia?", a: "Não. O sistema foi desenhado para ser intuitivo, como usar um app simples." },
                        { q: "O Zenflow funciona pra quem trabalha e estuda?", a: "Sim, foi criado justamente para quem tem múltiplas áreas na vida." },
                        { q: "O acesso é vitalício mesmo?", a: "Sim, pagou uma vez, é seu pra sempre. Incluindo atualizações futuras." },
                        { q: "É só um curso?", a: "Não, é um ecossistema com aulas, templates, planilhas e IA integrada." }
                    ].map((faq, i) => (
                        <div key={i} className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-gray-500" /> {faq.q}</h4>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                        </div>
                    ))}
                 </div>
            </section>

            {/* SEÇÃO I – CTA FINAL */}
            <section className="py-20 px-6 text-center border-t border-gray-800 bg-black">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-3xl font-orbitron text-white mb-6">
                        Seu cérebro já mostrou o diagnóstico.<br/>
                        Agora é sua vez de escolher o protocolo.
                    </h3>
                     <GlitchButton onClick={scrollToCheckout} className="text-xl px-10 py-5">
                            [ ATIVAR PROTOCOLO ZENFLOW – R$ 49,90 ]
                    </GlitchButton>
                    <p className="text-gray-600 text-xs mt-8 max-w-md mx-auto">
                        "Se nada mudar hoje, nada muda nos próximos meses. Você já viu o que acontece quando não instala um sistema."
                    </p>
                    <div className="mt-12 text-gray-800 font-mono text-[10px]">
                        DNF // DIVISÃO NACIONAL DE FOCO © 2024
                    </div>
                </div>
            </section>
        </div>
    );
};