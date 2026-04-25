import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const FLAVORS = [
  "Original", "Maçã Verde", "Tropical Mix", "Morango", "Melancia Extreme", "Uva", "Maracujá", "Pêssego", "Blueberry", "Limão",
  "Açaí c/ Guaraná", "Cereja", "Abacaxi", "Pitaya", "Amora", "Manga", "Tangerina", "Melão", "Kiwi", "Maçã Vermelha",
  "Hortelã", "Gengibre", "Banana", "Coco", "Jabuticaba", "Framboesa", "Lichia", "Carambola", "Caju", "Acerola",
  "Goiaba", "Graviola", "Copoçu", "Cranberry"
];

const categories = ["Todos", "Não Alcoólicos", "Morango", "Melancia", "Especiais", "Mais Vendidos"];

interface Props {
  addToCart: (product: any) => void;
}

const Catalogos: React.FC<Props> = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const products = useMemo(() => {
    return FLAVORS.map((flavor, index) => ({
      id: `item-${index}`,
      title: flavor.toUpperCase(),
      price: (Math.random() * 5 + 9).toFixed(2),
      category: index % 4 === 0 ? "Especiais" : (flavor.includes("Sem") ? "Não Alcoólicos" : "Tradicional"),
      tags: [
        flavor.includes("Morango") ? "Morango" : null,
        flavor.includes("Melancia") ? "Melancia" : null,
        index % 3 === 0 ? "Não Alcoólicos" : null
      ].filter(Boolean) as string[],
      rating: (Math.random() * 1 + 4).toFixed(1),
      image: index % 3 === 0 ? "/can-traditional.png" : (index % 3 === 1 ? "/can-tropical.png" : "/can-greenapple.png"),
      description: `A verdadeira explosão de ${flavor} em uma lata de 473ml.`
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "Todos" 
        || p.category === activeFilter 
        || p.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, products]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 bg-maromba-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-9xl mb-6 italic">CATÁLOGO <span className="text-maromba-neon">COMPLETO</span></h1>
          <p className="text-white/40 italic uppercase tracking-widest">Explore nossos 34 sabores de elite</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center bg-maromba-bg p-6 rounded-3xl border border-white/5">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
            <input 
              type="text" 
              placeholder="PESQUISAR SABOR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-16 py-4 rounded-2xl text-white font-anton italic focus:border-maromba-neon outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-3 rounded-xl font-anton text-sm italic transition-all ${activeFilter === cat ? 'bg-maromba-neon text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((p, idx) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-maromba-bg border border-white/5 p-6 rounded-[2.5rem] group hover:border-maromba-neon/40 transition-all flex flex-col"
              >
                <div className="relative h-60 mb-6 flex justify-center items-center">
                  <Link to={`/produto/tradicional`} className="h-full"><img src={p.image} alt={p.title} className="h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" /></Link>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-1 text-maromba-neon text-[10px]"><Star size={10} fill="currentColor" /> {p.rating}</div>
                   <span className="text-white/20 text-[10px] uppercase font-bold">{p.category}</span>
                </div>

                <h3 className="text-2xl font-anton italic leading-none mb-4">{p.title}</h3>
                <div className="text-2xl font-anton text-white italic mb-6">R$ {p.price}</div>

                <div className="mt-auto grid grid-cols-2 gap-2">
                   <Link 
                     to={`/produto/tradicional`} 
                     className="bg-white/5 border border-white/10 flex items-center justify-center py-2 rounded-lg text-[10px] font-anton italic hover:bg-white/10"
                   >
                     VER MAIS
                   </Link>
                   <button 
                     onClick={() => addToCart(p)}
                     className="bg-maromba-neon text-black flex items-center justify-center py-2 rounded-lg text-[10px] font-anton italic hover:scale-105 transition-transform"
                   >
                     ADD <Plus size={12} className="ml-1" />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Catalogos;
