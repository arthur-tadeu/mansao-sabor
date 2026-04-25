import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, CreditCard, QrCode, Truck, CheckCircle, MapPin } from 'lucide-react';

const products = {
  "tradicional": {
    title: "TRADICIONAL",
    price: 9.90,
    image: "/can-traditional.png",
    description: "O sabor clássico da Mansão. Energia pura para quem não aceita menos que o topo."
  },
  "tropical": {
    title: "TROPICAL MIX",
    price: 11.50,
    image: "/can-tropical.png",
    description: "Refrescância máxima com frutas selecionadas. Perfeito para o verão na Mansão."
  },
  "maca-verde": {
    title: "MAÇÃ VERDE",
    price: 12.00,
    image: "/can-greenapple.png",
    description: "Equilíbrio perfeito entre acidez e energia. O favorito dos Marombas."
  }
};

interface Props {
  addToCart: (product: any) => void;
}

const ProductDetail: React.FC<Props> = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products[id as keyof typeof products];
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState<'detail' | 'checkout' | 'success'>('detail');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [address, setAddress] = useState("");
  const [freight, setFreight] = useState(0);
  const [calculating, setCalculating] = useState(false);

  if (!product) return <div className="text-white text-center pt-40">Produto não encontrado</div>;

  const totalProducts = product.price * quantity;
  const totalOrder = totalProducts + freight;

  const calculateFreight = () => {
    if (!address) return;
    setCalculating(true);
    // Simulate Google Maps Distance Matrix API call from Rondonópolis - MT
    setTimeout(() => {
      const simulatedDistance = Math.floor(Math.random() * 50) + 15;
      setFreight(simulatedDistance);
      setCalculating(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-8 bg-maromba-dark"
    >
      <div className="container mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {view === 'detail' && (
            <motion.div key="detail" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-maromba-neon hover:text-white transition-colors mb-12 font-anton italic uppercase tracking-widest">
                <ArrowLeft size={20} /> Voltar ao Catálogo
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-maromba-purple/20 blur-[100px] rounded-full" />
                  <img src={product.image} alt={product.title} className="w-full max-w-md mx-auto drop-shadow-[0_20px_50px_rgba(204,255,0,0.2)]" />
                </div>
                <div>
                  <span className="text-maromba-neon font-anton text-xl italic mb-4 block underline decoration-maromba-purple">SÉRIE PLATINUM</span>
                  <h1 className="text-6xl md:text-8xl mb-6">{product.title}</h1>
                  <p className="text-2xl text-white/60 mb-8 font-light italic leading-relaxed">{product.description}</p>
                  <div className="text-5xl font-anton text-maromba-neon mb-12">R$ {product.price.toFixed(2)}</div>
                  <div className="flex flex-col sm:flex-row gap-8 mb-12">
                    <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-2 rounded-xl">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-maromba-neon hover:text-black transition-all text-maromba-neon"><Minus size={20} /></button>
                      <span className="text-3xl font-anton italic min-w-[40px] text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-maromba-neon hover:text-black transition-all text-maromba-neon"><Plus size={20} /></button>
                    </div>
                    <button 
                      onClick={() => {
                        addToCart({ ...product, id, quantity });
                        navigate('/carrinho');
                      }}
                      className="btn-maromba flex-1 flex items-center justify-center gap-4"
                    >
                      <ShoppingCart /> ADICIONAR E VER CARRINHO
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'checkout' && (
            <motion.div key="checkout" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-anton italic mb-12 text-center">FINALIZAR <span className="text-maromba-neon">PEDIDO</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <h3 className="text-2xl font-anton italic mb-6 text-maromba-neon underline">ENTREGA</h3>
                    <div className="relative mb-6">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-maromba-neon" size={18} />
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="DIGITE SEU ENDEREÇO"
                        className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/10 font-anton italic focus:border-maromba-neon outline-none"
                      />
                    </div>
                    <button 
                      onClick={calculateFreight}
                      className="w-full border border-white/20 py-2 text-xs font-anton italic uppercase tracking-widest hover:bg-white/10 transition-all mb-4"
                    >
                      {calculating ? 'CALCULANDO ROTA...' : 'CALCULAR FRETE (SAINDO DE RONDONÓPOLIS)'}
                    </button>
                    {freight > 0 && (
                      <div className="text-maromba-neon text-right font-anton italic">
                         Frete calculado via Google Maps: R$ {freight.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <h3 className="text-2xl font-anton italic mb-6 text-maromba-neon underline">PAGAMENTO</h3>
                    <div className="space-y-4">
                      <div onClick={() => setPaymentMethod('pix')} className={`p-4 border-2 rounded-xl cursor-pointer flex items-center justify-between ${paymentMethod === 'pix' ? 'border-maromba-neon' : 'border-white/10'}`}>
                        <div className="flex items-center gap-3"><QrCode size={18} /> <span className="font-anton italic">PIX (-5%)</span></div>
                      </div>
                      <div onClick={() => setPaymentMethod('card')} className={`p-4 border-2 rounded-xl cursor-pointer flex items-center justify-between ${paymentMethod === 'card' ? 'border-maromba-neon' : 'border-white/10'}`}>
                        <div className="flex items-center gap-3"><CreditCard size={18} /> <span className="font-anton italic">CARTÃO</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-maromba-purple/10 border border-maromba-purple/30 p-8 rounded-3xl h-fit">
                  <h3 className="text-3xl font-anton italic mb-8">TOTAL DO SHAPE</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/60"><span>Produtos</span><span>R$ {totalProducts.toFixed(2)}</span></div>
                    <div className="flex justify-between text-white/60"><span>Frete</span><span>R$ {freight.toFixed(2)}</span></div>
                    {paymentMethod === 'pix' && <div className="flex justify-between text-maromba-neon text-xs"><span>Desconto Pix (5%)</span><span>- R$ {(totalProducts * 0.05).toFixed(2)}</span></div>}
                  </div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <span className="text-xl font-anton italic text-white/40 leading-none">TOTAL GERAL</span>
                    <span className="text-5xl font-anton italic text-maromba-neon leading-none">R$ {(totalOrder - (paymentMethod === 'pix' ? totalProducts * 0.05 : 0)).toFixed(2)}</span>
                  </div>
                  <button onClick={() => setView('success')} className="w-full btn-maromba mt-10">CONFIRMAR PEDIDO</button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
              <div className="inline-block p-8 bg-maromba-neon text-black rounded-full mb-8"><CheckCircle size={80} /></div>
              <h2 className="text-6xl font-anton italic mb-4 uppercase">PEDIDO <span className="text-maromba-neon">CONFIRMADO</span>!</h2>
              <p className="text-xl text-white/40 mb-12 italic">Saindo de Rondonópolis para {address || 'sua casa'}.</p>
              <button onClick={() => navigate('/')} className="btn-maromba">VOLTAR À MANSÃO</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
