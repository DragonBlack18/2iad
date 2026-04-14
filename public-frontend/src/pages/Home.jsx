import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Building2, Users, Award, TrendingUp, Rocket, Target, Lightbulb } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { startupsAPI, parceirosAPI } from '../lib/api'

export default function Home() {
  console.log('Home component rendering...')
  
  const { data: startupsData } = useQuery({
    queryKey: ['startups'],
    queryFn: () => startupsAPI.getAll({ status: 'ATIVA' })
  })
  
  const { data: parceirosData } = useQuery({
    queryKey: ['parceiros'],
    queryFn: () => parceirosAPI.getAll()
  })
  
  const startups = startupsData?.data?.startups || []
  const parceiros = parceirosData?.data?.parceiros || []
  
  console.log('Startups:', startups, 'Parceiros:', parceiros)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh"></div>
        <div className="relative pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container px-6 md:px-8 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Col - Content */}
              <div className="text-center lg:text-left space-y-8 animate-fade-in">
                <div className="inline-block">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Inovação e Empreendedorismo
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                  Transformando <br />
                  <span className="relative inline-block">
                    <span className="relative z-10">Ideias</span>
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-white/30 -rotate-1"></span>
                  </span> em <br />
                  Startups de Sucesso
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Infraestrutura completa, mentoria especializada e networking para empreendedores que desejam inovar e crescer.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/candidatura">
                    <button className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-glow hover:shadow-brutal transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                      <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Candidate-se Agora</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  
                  <Link to="/sobre">
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Saiba Mais</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto lg:mx-0">
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold text-white">50+</div>
                    <div className="text-white/80 text-sm mt-1">Startups</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold text-white">85%</div>
                    <div className="text-white/80 text-sm mt-1">Sucesso</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold text-white">R$10M+</div>
                    <div className="text-white/80 text-sm mt-1">Investidos</div>
                  </div>
                </div>
              </div>
              
              {/* Right Col - Visual Element */}
              <div className="hidden lg:block relative">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm transform rotate-6"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm transform -rotate-6"></div>
                  <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-glow transform hover:scale-105 transition-transform">
                      <Target className="w-12 h-12 text-purple-600 mb-3" />
                      <div className="text-2xl font-bold text-gray-900">Mentoria</div>
                      <div className="text-gray-600 text-sm mt-1">Especializada</div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-glow transform hover:scale-105 transition-transform mt-12">
                      <Users className="w-12 h-12 text-blue-600 mb-3" />
                      <div className="text-2xl font-bold text-gray-900">Network</div>
                      <div className="text-gray-600 text-sm mt-1">Qualificado</div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-glow transform hover:scale-105 transition-transform -mt-6">
                      <Building2 className="w-12 h-12 text-green-600 mb-3" />
                      <div className="text-2xl font-bold text-gray-900">Estrutura</div>
                      <div className="text-gray-600 text-sm mt-1">Completa</div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-glow transform hover:scale-105 transition-transform mt-6">
                      <Award className="w-12 h-12 text-yellow-600 mb-3" />
                      <div className="text-2xl font-bold text-gray-900">Resultados</div>
                      <div className="text-gray-600 text-sm mt-1">Comprovados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
            </g>
          </g>
        </svg>
      </div>
      
      {/* Features Section */}
      <section className="section-spacing bg-white relative">
        <div className="absolute inset-0 gradient-radial opacity-50"></div>
        <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center content-spacing">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tudo que você precisa
              <span className="block text-gradient mt-2">para crescer</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Uma infraestrutura completa e suporte especializado para transformar sua startup em um negócio de sucesso
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="glass-card rounded-2xl p-8 h-full hover-lift hover-glow">
                <div className="relative mb-6">
                  <div className="icon-container w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 shadow-glow">
                    <Lightbulb className="text-white w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Infraestrutura Completa</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Espaço de coworking equipado, salas de reunião e internet de alta velocidade.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="glass-card rounded-2xl p-8 h-full hover-lift hover-glow">
                <div className="relative mb-6">
                  <div className="icon-container w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 shadow-glow">
                    <Users className="text-white w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mentoria Especializada</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Acompanhamento com experts em negócios, tecnologia e marketing.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="glass-card rounded-2xl p-8 h-full hover-lift hover-glow">
                <div className="relative mb-6">
                  <div className="icon-container w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 shadow-glow">
                    <TrendingUp className="text-white w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conexão com Investidores</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Networking qualificado e acesso a investidores e parceiros estratégicos.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="glass-card rounded-2xl p-8 h-full hover-lift hover-glow">
                <div className="relative mb-6">
                  <div className="icon-container w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-glow">
                    <Target className="text-white w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Capacitação Contínua</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Workshops, cursos e eventos para desenvolver suas habilidades.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Final */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
                <Rocket className="w-4 h-4 mr-2" />
                Comece sua jornada
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Pronto para transformar
              <br />
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                sua ideia em realidade?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Junte-se a dezenas de startups que estão inovando e crescendo com o apoio da Incubadora 2IAD.
              Candidate-se agora e faça parte do futuro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/candidatura">
                <button className="group relative px-10 py-5 bg-white text-gray-900 font-bold rounded-xl shadow-glow hover:shadow-brutal transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>Candidate-se Agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to="/contato">
                <button className="px-10 py-5 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                  <span>Fale Conosco</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-white/10">
              <div>
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-gray-400 text-sm mt-1">Startups Ativas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">R$ 10M+</div>
                <div className="text-gray-400 text-sm mt-1">Investido</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">85%</div>
                <div className="text-gray-400 text-sm mt-1">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
