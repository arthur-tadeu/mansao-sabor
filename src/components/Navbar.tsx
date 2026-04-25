import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, LogOut, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  user: any;
  cartCount: number;
  onLogout: () => void;
  onOpenModal: () => void;
}

const Navbar: React.FC<Props> = ({ user, cartCount, onLogout, onOpenModal }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-maromba-dark/90 backdrop-blur-xl border-b border-maromba-neon/20 px-8 py-4 flex justify-between items-center"
    >
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-maromba-purple p-2 rounded-lg rotate-12">
          <Ghost className="text-maromba-neon w-6 h-6" />
        </div>
        <span className="text-3xl font-anton text-white italic tracking-tighter">
          MANSÃO <span className="text-maromba-neon underline decoration-maromba-purple">SABOR</span>
        </span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-10 font-anton text-lg tracking-widest text-white/60">
        <Link to="/" className={`hover:text-maromba-neon transition-all hover:skew-x-[-10deg] ${isActive('/') ? 'text-maromba-neon' : ''}`}>
          INÍCIO
        </Link>
        <Link to="/catalogos" className={`hover:text-maromba-neon transition-all hover:skew-x-[-10deg] ${isActive('/catalogos') ? 'text-maromba-neon' : ''}`}>
          CATÁLOGO
        </Link>
        <Link to="/receitas" className={`hover:text-maromba-neon transition-all hover:skew-x-[-10deg] ${isActive('/receitas') ? 'text-maromba-neon' : ''}`}>
          RECEITAS
        </Link>
        <Link to="/historia" className={`hover:text-maromba-neon transition-all hover:skew-x-[-10deg] ${isActive('/historia') ? 'text-maromba-neon' : ''}`}>
          NOSSA HISTÓRIA
        </Link>
        <Link to="/comunidade" className={`hover:text-maromba-neon transition-all hover:skew-x-[-10deg] ${isActive('/comunidade') ? 'text-maromba-neon' : ''}`}>
          COMUNIDADE
        </Link>
      </div>
      
      <div className="flex items-center gap-6">
        <Link to="/carrinho" className="relative p-2 text-white/60 hover:text-maromba-neon transition-colors">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 bg-maromba-neon text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
            >
              {cartCount}
            </motion.span>
          )}
        </Link>

        <AnimatePresence mode="wait">
          {user ? (
            <motion.div 
              key="logged-in"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-4 bg-white/5 pr-2 pl-4 py-1 rounded-full border border-white/10"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-anton italic text-maromba-neon leading-none">VIP MAROMBA</span>
                <span className="text-xs font-bold text-white uppercase">{user.name}</span>
              </div>
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-maromba-neon/40" />
              <button 
                onClick={onLogout}
                className="p-2 hover:text-maromba-neon transition-colors"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.button 
              key="logged-out"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={onOpenModal}
              className="bg-maromba-purple text-maromba-neon border-2 border-maromba-neon px-6 py-2 font-anton italic hover:bg-maromba-neon hover:text-black transition-all"
            >
              ENTRAR
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
