import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Zap } from 'lucide-react';
import { signInWithGoogle, registerWithEmail, loginWithEmail } from '../services/auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const RegistrationModal: React.FC<Props> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
        setMessage("Código de verificação enviado! Verifique seu e-mail.");
      } else {
        const user = await loginWithEmail(email, password);
        onLoginSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-maromba-dark/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-maromba-bg border border-maromba-neon/20 p-8 md:p-12 shadow-[0_0_50px_rgba(204,255,0,0.1)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-maromba-neon transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="bg-maromba-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(109,40,217,0.5)]">
                <Zap className="text-maromba-neon" size={32} fill="currentColor" />
              </div>
              <h2 className="text-4xl font-anton italic mb-2 tracking-tighter">
                {isRegistering ? "CADASTRAR NA MANSÃO" : "ENTRAR NA MANSÃO"}
              </h2>
              <p className="text-white/40 text-sm">O legado te espera. Verificação obrigatória.</p>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs mb-6 font-anton italic uppercase">{error}</div>}
            {message && <div className="bg-maromba-neon/10 border border-maromba-neon/20 p-4 rounded-xl text-maromba-neon text-xs mb-6 font-anton italic uppercase">{message}</div>}

            <form className="space-y-6" onSubmit={handleEmailAuth}>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="EMAIL MAROMBA"
                    className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/10 font-anton italic focus:border-maromba-neon outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="SENHA"
                    className="w-full bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/10 font-anton italic focus:border-maromba-neon outline-none"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full btn-maromba">
                {isRegistering ? "ENVIAR CÓDIGO DE ACESSO" : "ENTRAR AGORA"}
              </button>

              <p 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-center text-xs text-white/40 hover:text-maromba-neon cursor-pointer font-anton italic uppercase"
              >
                {isRegistering ? "Já tem conta? Login" : "Não tem conta? Cadastre-se"}
              </p>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-maromba-bg px-2 text-white/20">Ou continue com</span></div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black py-4 font-anton italic flex items-center justify-center gap-3 hover:bg-maromba-neon transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                ENTRAR COM GOOGLE
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
