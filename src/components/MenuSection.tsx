import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const products = [
  {
    id: "tradicional",
    title: "TRADICIONAL",
    type: "LATA 473ML",
    price: "9,90",
    description: "O sabor clássico da Mansão. Energia pura com o toque inconfundível do Toguro.",
    image: "/can-traditional.png"
  },
  {
    id: "tropical",
    title: "TROPICAL MIX",
    type: "LATA 473ML",
    price: "11,50",
    description: "Explosão de frutas tropicais. Ideal para dias quentes e drinks refrescantes.",
    image: "/can-tropical.png"
  },
  {
    id: "maca-verde",
    title: "MAÇÃ VERDE",
    type: "LATA 473ML",
    price: "12,00",
    description: "O favorito da galera. Ácido, gelado e com um boost imbatível de foco.",
    image: "/can-greenapple.png"
  }
];

interface Props {
  addToCart: (product: any) => void;
}

const MenuSection: React.FC<Props> = ({ addToCart }) => {
  return (
    <section id="catalogo" className="py-32 px-8 bg-maromba-bg relative">
      <div className="container mx-auto">
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <h2 className="text-6xl md:text-8xl italic">LANÇAMENTOS <span className="text-maromba-neon underline">BRABOS</span></h2>
            <p className="text-white/40 font-anton uppercase tracking-widest italic">Escolha sua dose de energia</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((item, idx) => (
              <motion.div 
                key={idx}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="maromba-card p-8 text-center flex flex-col items-center group"
              >
                <div className="relative h-64 mb-6">
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-maromba-neon/20 transition-all" />
                  <Link to={`/produto/${item.id}`}><img src={item.image} alt={item.title} className="h-full relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:rotate-12" /></Link>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-maromba-neon font-anton text-sm mb-2">{item.type}</span>
                  <h3 className="text-4xl mb-2">{item.title}</h3>
                  <div className="text-2xl font-anton text-white mb-4 italic">R$ {item.price}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <Link 
                      to={`/produto/${item.id}`}
                      className="border border-white/20 py-3 font-anton italic text-white/40 hover:text-white transition-all transform hover:skew-x-[-10deg]"
                    >
                      DETALHES
                    </Link>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-maromba-neon text-black py-3 font-anton italic hover:bg-white transition-all transform hover:skew-x-[-10deg] flex items-center justify-center gap-2"
                    >
                      ADD <Plus size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
