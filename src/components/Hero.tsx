import { motion, useScroll, useTransform } from 'framer-motion';
import { Beer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-maromba-dark">
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img 
          src="/energy-hero.png" 
          alt="Mansão Energy" 
          className="w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maromba-dark via-maromba-dark/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-maromba-neon/10 border border-maromba-neon/30 px-4 py-1 rounded-full text-maromba-neon mb-6"
          >
            <Zap size={16} fill="currentColor" />
            <span className="text-[10px] uppercase font-bold tracking-widest">O Energético da Mansão</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl leading-[0.8] mb-8 font-anton italic">
            SABOR <br />
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-transparent stroke-maromba-neon stroke-2" 
              style={{ WebkitTextStroke: '2px #CCFF00' }}
            >
              EXPLOSIVO
            </motion.span>
          </h1>
          
          <p className="text-xl text-white/70 mb-10 max-w-lg font-light leading-relaxed">
            A energia da Mansão Maromba agora em latas. Feito para quem não para, seja no treino pesado ou no drink da madrugada.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link to="/catalogos" className="btn-maromba">
              COMPRAR COMBO
            </Link>
            <Link to="/receitas" className="flex items-center gap-3 text-maromba-purple font-anton italic text-2xl group hover:text-maromba-neon transition-colors">
              <span className="bg-maromba-purple group-hover:bg-maromba-neon group-hover:text-black p-3 rounded-full text-maromba-neon transition-all">
                <Beer />
              </span>
              RECEITAS DE DRINKS
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring" }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-maromba-purple/20 blur-[120px] rounded-full animate-pulse" />
          <motion.img 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            src="/can-hero.png" 
            alt="Energy Can" 
            className="w-[300px] md:w-[400px] drop-shadow-[0_20px_50px_rgba(204,255,0,0.3)] z-10"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
