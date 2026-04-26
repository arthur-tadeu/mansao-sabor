import { motion } from 'framer-motion';
import { GlassWater, Flame, Beaker } from 'lucide-react';

const FLAVORS = [
  { name: "Original", ingredients: ["1 lata Mansão Original", "50ml Vodka", "Gelo à vontade", "Limão siciliano"] },
  { name: "Maçã Verde", ingredients: ["1 lata Maçã Verde", "60ml Gin", "Fatias de maçã", "Hortelã"] },
  { name: "Tropical Mix", ingredients: ["1 lata Tropical", "50ml Rum Branco", "Pedaços de abacaxi", "Gelo"] },
  { name: "Morango", ingredients: ["1 lata Morango", "200ml de Whisky", "Dois morangos inteiros", "Suco de morango"] },
  { name: "Melancia Extreme", ingredients: ["1 lata Melancia", "Tequila", "Suco de cranberry", "Sal na borda"] },
  { name: "Uva", ingredients: ["1 lata Uva", "Cachaça Premium", "Uvas congeladas", "Açúcar"] },
  { name: "Maracujá", ingredients: ["1 lata Maracujá", "Poli de maracujá", "Vodka", "Pimenta rosa"] },
  { name: "Pêssego", ingredients: ["1 lata Pêssego", "Champagne", "Pedaços de pêssego em calda", "Gelo"] },
  { name: "Blueberry", ingredients: ["1 lata Blueberry", "Gin Premium", "Zimbro", "Mirtilos frescos"] },
  { name: "Limão", ingredients: ["1 lata Limão", "Cachaça", "Hortelã", "Muito gelo moído"] },
];

const Recipes = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-8 bg-maromba-dark"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h1 className="text-7xl md:text-9xl mb-6 italic">GUIA DE <span className="text-maromba-neon">MIXOLOGIA</span></h1>
          <p className="text-white/40 italic uppercase tracking-widest">Receitas insanas para o seu Sabor Maromba</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLAVORS.map((recipe, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="maromba-card p-8 group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-maromba-neon transition-all">
                <GlassWater size={48} />
              </div>

              <div className="relative z-10">
                <span className="text-maromba-neon font-anton text-xs tracking-widest mb-2 block">RECEITA EXCLUSIVA</span>
                <h3 className="text-4xl mb-6 italic">DRINK {recipe.name.toUpperCase()}</h3>
                
                <div className="space-y-4">
                  <h4 className="font-anton text-sm text-white/30 tracking-widest uppercase">Ingredientes:</h4>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70 italic text-lg border-l-2 border-maromba-purple/30 pl-4 py-1 hover:border-maromba-neon transition-colors">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 flex items-center gap-2 text-maromba-neon font-anton italic text-xs">
                  <Flame size={14} fill="currentColor" />
                  PREPARO EXTREMO
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Decorative placeholder for more */}
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-[2.5rem] opacity-20">
            <Beaker size={48} className="mb-4" />
            <span className="font-anton italic">MAIS 24 RECEITAS EM BREVE...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Recipes;
