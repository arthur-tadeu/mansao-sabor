import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Share2, Zap } from 'lucide-react';
import axios from 'axios';

const API_URL = "http://localhost:3001/api/threads";

const Community = () => {
  const [comment, setComment] = useState("");
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchThreads = async () => {
    try {
      const res = await axios.get(API_URL);
      setThreads(res.data);
    } catch (err) {
      console.error("Erro ao carregar threads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handlePublish = async () => {
    if (!comment) return;
    
    const newThread = {
      author: "Visitante Maromba",
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
      content: comment,
      likes: "0",
      replies: 0,
      time: "Agora"
    };

    try {
      await axios.post(API_URL, newThread);
      setComment("");
      fetchThreads(); // Refresh list
    } catch (err) {
      console.error("Erro ao publicar:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 pb-20 px-4 bg-maromba-dark"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl mb-4 italic">COMUNIDADE <span className="text-maromba-neon">THREADS</span></h1>
          <p className="text-white/40 italic">Onde o shape e a resenha se encontram. Posts reais e persistentes.</p>
        </div>

        {/* Input Area */}
        <div className="bg-maromba-bg border border-white/10 p-6 rounded-3xl mb-8">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-maromba-purple flex items-center justify-center shrink-0">
              <Zap size={20} className="text-maromba-neon" fill="currentColor" />
            </div>
            <div className="flex-1">
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="No que está pensando, Maromba?" 
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/10 text-lg resize-none h-20 font-light"
              />
              <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                <span className="text-xs text-white/20 uppercase tracking-widest font-anton italic">Publique seu legado</span>
                <button 
                  onClick={handlePublish}
                  disabled={!comment}
                  className={`bg-maromba-neon text-black px-6 py-2 rounded-full font-anton italic text-sm transition-all ${!comment ? 'opacity-20 grayscale' : 'hover:scale-105 active:scale-95'}`}
                >
                  PUBLICAR
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-maromba-neon font-anton italic animate-pulse">CARREGANDO FEED...</div>
          ) : (
            threads.map((thread, idx) => (
              <motion.div 
                key={thread.id || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-maromba-bg border border-white/10 p-6 rounded-3xl group hover:border-maromba-neon/30 transition-colors"
              >
                <div className="flex gap-4">
                  <img src={thread.avatar} alt={thread.author} className="w-12 h-12 rounded-full border border-maromba-neon/20" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-anton italic text-lg text-white group-hover:text-maromba-neon transition-colors">
                        {thread.author}
                      </h3>
                      <span className="text-white/20 text-xs">{thread.time}</span>
                    </div>
                    <p className="text-white/70 leading-relaxed font-light mb-4 text-base">
                      {thread.content}
                    </p>
                    <div className="flex gap-6 text-white/30">
                      <button className="flex items-center gap-1.5 hover:text-maromba-neon transition-colors">
                        <Heart size={18} /> <span className="text-xs font-anton italic">{thread.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-maromba-neon transition-colors">
                        <MessageCircle size={18} /> <span className="text-xs font-anton italic">{thread.replies}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-maromba-neon transition-colors">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Community;
