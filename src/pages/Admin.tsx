import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { checkIfAdmin, addProduct } from '../services/db';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, Database, Lock } from 'lucide-react';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({ title: '', price: '', category: 'Tradicional', description: '', image: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      if (auth.currentUser) {
        const result = await checkIfAdmin(auth.currentUser.uid);
        setIsAdmin(result);
        if (!result) navigate('/');
      } else {
        navigate('/');
      }
      setLoading(false);
    };
    check();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(product);
      alert("Produto cadastrado com sucesso!");
      setProduct({ title: '', price: '', category: 'Tradicional', description: '', image: '' });
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar.");
    }
  };

  if (loading) return <div className="min-h-screen bg-maromba-dark flex items-center justify-center text-maromba-neon font-anton italic">VERIFICANDO CREDENCIAIS EXTREMAS...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 bg-maromba-dark">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <Lock className="text-maromba-neon" size={40} />
          <h1 className="text-6xl font-anton italic">PAINEL <span className="text-maromba-neon">ADMIN</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-maromba-bg border border-white/10 p-8 rounded-3xl">
              <h3 className="text-2xl font-anton italic mb-8 flex items-center gap-2">
                <Plus className="text-maromba-neon" /> CADASTRAR NOVO SABOR/COMBO
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase text-white/40 mb-2 font-anton italic">Nome do Produto</label>
                  <input 
                    type="text" 
                    value={product.title}
                    onChange={e => setProduct({...product, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-maromba-neon"
                    placeholder="EX: COMBO MONSTRO"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-2 font-anton italic">Preço (R$)</label>
                    <input 
                      type="text" 
                      value={product.price}
                      onChange={e => setProduct({...product, price: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-maromba-neon"
                      placeholder="9.90"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-white/40 mb-2 font-anton italic">Categoria</label>
                    <select 
                      value={product.category}
                      onChange={e => setProduct({...product, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-maromba-neon appearance-none"
                    >
                      <option value="Tradicional">Tradicional</option>
                      <option value="Especiais">Especiais</option>
                      <option value="Combos">Combos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-white/40 mb-2 font-anton italic">Descrição</label>
                  <textarea 
                    value={product.description}
                    onChange={e => setProduct({...product, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-maromba-neon h-32"
                    placeholder="Descreva o poder desse produto..."
                  />
                </div>

                <button type="submit" className="w-full btn-maromba">SALVAR NA BASE DE DADOS</button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <Database className="text-maromba-neon mb-4" />
              <h4 className="font-anton italic text-xl mb-2">STATUS DB</h4>
              <p className="text-white/40 text-xs">Conectado ao Cloud Firestore</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <Package className="text-maromba-neon mb-4" />
              <h4 className="font-anton italic text-xl mb-2">ESTOQUE</h4>
              <p className="text-white/40 text-xs">Sincronização em tempo real ativa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
