import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react';

interface Props {
  cart: any[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, q: number) => void;
  onClear: () => void;
}

const CartView: React.FC<Props> = ({ cart, onRemove, onUpdate, onClear }) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.toString().replace(',','.')) * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSuccess(true);
    setTimeout(() => {
      onClear();
      navigate('/');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-4 bg-maromba-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h1 className="text-6xl mb-12 italic">SEU <span className="text-maromba-neon">CARRINHO</span></h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                      <ShoppingBag size={48} className="mx-auto text-white/10 mb-4" />
                      <p className="text-white/40 italic">O carrinho está vazio. Bora buscar esse shape?</p>
                      <Link to="/catalogos" className="text-maromba-neon font-anton italic mt-4 inline-block hover:underline">VER CATÁLOGO</Link>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="bg-maromba-bg border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                        <img src={item.image} alt={item.title} className="w-20 h-24 object-contain" />
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl font-anton italic">{item.title}</h3>
                          <span className="text-maromba-neon font-bold">R$ {item.price}</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl">
                          <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="p-1 hover:text-maromba-neon"><Minus size={16} /></button>
                          <span className="font-anton italic w-6 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="p-1 hover:text-maromba-neon"><Plus size={16} /></button>
                        </div>
                        <div className="text-xl font-anton italic min-w-[100px] text-right">
                          R$ {(parseFloat(item.price.toString().replace(',','.')) * item.quantity).toFixed(2)}
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-maromba-purple/10 border border-maromba-purple/30 p-8 rounded-[2.5rem] h-fit">
                  <h3 className="text-3xl font-anton italic mb-8">RESUMO DO PEDIDO</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/60"><span>Itens ({cart.length})</span><span>R$ {total.toFixed(2)}</span></div>
                    <div className="flex justify-between text-white/60"><span>Frete</span><span className="text-maromba-neon uppercase text-xs">Grátis</span></div>
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-10">
                    <span className="text-xl font-anton italic text-white/40 leading-none">TOTAL</span>
                    <span className="text-5xl font-anton italic text-maromba-neon leading-none">R$ {total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className={`w-full btn-maromba ${cart.length === 0 ? 'opacity-20 grayscale cursor-not-allowed' : ''}`}
                  >
                    COMPRAR TUDO
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-40"
            >
              <div className="inline-block p-12 bg-maromba-neon text-black rounded-full mb-8">
                <CheckCircle size={100} />
              </div>
              <h2 className="text-7xl font-anton italic mb-4 uppercase">COMPRA <span className="text-maromba-neon">CONCLUÍDA</span>!</h2>
              <p className="text-2xl text-white/40 italic">O estoque da Mansão está a caminho do seu endereço.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CartView;
