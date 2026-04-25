import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import RegistrationModal from './components/RegistrationModal';
import ProductDetail from './components/ProductDetail';
import Community from './components/Community';
import History from './components/History';
import Catalogos from './components/Catalogos';
import CartView from './components/CartView';
import Recipes from './components/Recipes';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const location = useLocation();

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, q) } : item));
  };

  const clearCart = () => setCart([]);

  const handleGoogleLogin = (userData: any) => {
    setUser(userData);
    setIsModalOpen(false);
    localStorage.setItem('maromba_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('maromba_user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('maromba_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-maromba-dark overflow-x-hidden">
      <AnimatePresence>
        {!showContent && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-maromba-dark flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-maromba-neon font-anton text-6xl italic"
            >
              MANSÃO
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar 
            user={user} 
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onLogout={handleLogout} 
            onOpenModal={() => setIsModalOpen(true)} 
          />
          
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <MenuSection addToCart={addToCart} />
                  <div className="container mx-auto px-8 pb-32 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-4xl md:text-6xl font-anton italic mb-8">QUER VER <span className="text-maromba-neon">MAIS?</span></h3>
                      <Link to="/catalogos" className="btn-maromba inline-block">
                        EXPLORAR TODOS OS SABORES
                      </Link>
                    </motion.div>
                  </div>
                </>
              } />
              <Route path="/produto/:id" element={<ProductDetail addToCart={addToCart} />} />
              <Route path="/catalogos" element={<Catalogos addToCart={addToCart} />} />
              <Route path="/carrinho" element={
                <CartView 
                  cart={cart} 
                  onRemove={removeFromCart} 
                  onUpdate={updateQuantity} 
                  onClear={clearCart}
                />
              } />
              <Route path="/comunidade" element={<Community />} />
              <Route path="/receitas" element={<Recipes />} />
              <Route path="/historia" element={<History />} />
            </Routes>
          </main>
          
          <footer className="py-12 border-t border-white/5 text-center text-white/20 text-[10px] tracking-[0.5em] uppercase">
            <p>&copy; {new Date().getFullYear()} Mansão Maromba Energy. Todos os direitos reservados ao Shape.</p>
          </footer>

          <RegistrationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onGoogleLogin={handleGoogleLogin}
          />
        </motion.div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
