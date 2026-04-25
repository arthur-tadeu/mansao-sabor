import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Trophy } from 'lucide-react';

const History = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-8 bg-maromba-dark text-center"
    >
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-7xl md:text-9xl mb-12 italic">NOSSA <span className="text-maromba-purple">HISTÓRIA</span></h1>
        
        <div className="relative mb-20 aspect-video rounded-[3rem] overflow-hidden border border-maromba-neon/20 shadow-[0_0_50px_rgba(204,255,0,0.1)]">
          <img src="/maromba-bg.png" alt="Mansão Maromba Original" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-maromba-neon text-black p-8 rounded-full"
            >
              <Trophy size={48} />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="text-4xl mb-6">DO ZERO AO <span className="text-maromba-neon">TOPO</span></h3>
            <p className="text-white/60 text-lg leading-relaxed font-light italic">
              A Mansão Maromba nasceu de um sonho do Toguro de criar um espaço onde a disciplina e a união falassem mais alto que qualquer desculpa. O que começou como vlogs entre amigos se tornou a maior referência de lifestyle fitness do mundo.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
            <h3 className="text-4xl mb-6">VALORES <span className="text-maromba-purple italic">ETERNOS</span></h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-center">
                <Shield className="text-maromba-neon shrink-0" />
                <span className="text-xl font-anton italic">LEALDADE À BUSCA DO SHAPE</span>
              </li>
              <li className="flex gap-4 items-center">
                <Star className="text-maromba-neon shrink-0" />
                <span className="text-xl font-anton italic">ENERGIA PARA O INEXPLICÁVEL</span>
              </li>
              <li className="flex gap-4 items-center">
                <Trophy className="text-maromba-neon shrink-0" />
                <span className="text-xl font-anton italic">RESPEITO PELA JORNADA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default History;
