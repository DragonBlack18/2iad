import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { LockClosedIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, ArrowRightIcon, SparklesIcon } from '@radix-ui/react-icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-dark-950">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-500/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary-500/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left Side - Branding */}
          <motion.div variants={itemVariants} className="hidden lg:block space-y-8">
            <motion.div variants={floatingVariants} animate="animate">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-50" />
                <div className="relative card-glass p-8">
                  <SparklesIcon className="w-16 h-16 text-primary-400 mb-4" />
                  <h1 className="text-5xl font-display font-bold text-gradient-primary mb-4">
                    Incubadora 2IAD
                  </h1>
                  <p className="text-xl text-dark-300 leading-relaxed">
                    Plataforma completa para gestão de startups, editais e planilhas colaborativas.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[
                { number: '150+', label: 'Startups', icon: '🚀' },
                { number: '50+', label: 'Parceiros', icon: '🤝' },
                { number: '30+', label: 'Editais', icon: '📋' },
                { number: '500+', label: 'Usuários', icon: '👥' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-glass p-6 text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gradient-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
              <div className="relative card-glass p-8 md:p-12">
                {/* Logo Mobile */}
                <div className="lg:hidden mb-8 text-center">
                  <h1 className="text-3xl font-display font-bold text-gradient-primary mb-2">
                    2IAD
                  </h1>
                  <p className="text-dark-400">Bem-vindo de volta</p>
                </div>

                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">
                    Acessar Painel
                  </h2>
                  <p className="text-dark-400">
                    Entre com suas credenciais para continuar
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-dark-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-glass pl-12"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-dark-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-glass pl-12 pr-12"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Entrando...
                        </>
                      ) : (
                        <>
                          Entrar
                          <ArrowRightIcon className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Demo Credentials */}
                  <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
                    <p className="text-xs text-dark-400 text-center mb-3">
                      Credenciais de demonstração:
                    </p>
                    <div className="bg-dark-900/50 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Email:</span>
                        <code className="text-primary-400 font-mono text-xs">rose@incubadora2iad.com.br</code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Senha:</span>
                        <code className="text-primary-400 font-mono">123456</code>
                      </div>
                    </div>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-primary-400 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
