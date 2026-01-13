import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Building2, Users, Award, TrendingUp, Rocket, Target, Lightbulb } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { startupsAPI, parceirosAPI } from '../lib/api'

export default function Home() {
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
  
  return (
    <div className="min-h-screen leading-normal tracking-normal text-white gradient">
      {/* Hero Section */}
      <div className="pt-24 pb-12 md:pb-24">
        <div className="container px-3 md:px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {/* Left Col */}
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left px-6">
            <p className="uppercase tracking-loose w-full text-sm md:text-base">Inovação e Empreendedorismo</p>
            <h1 className="my-4 text-4xl md:text-5xl font-bold leading-tight">
              Transformando <span className="text-blue-200">Ideias</span> em Startups de Sucesso
            </h1>
            <p className="leading-normal text-lg md:text-2xl mb-8">
              Infraestrutura, mentoria e networking para empreendedores que desejam inovar e crescer!
            </p>
            <Link to="/candidatura">
              <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <Rocket className="inline w-5 h-5 mr-2 mb-1" />
                Candidate-se Agora
              </button>
            </Link>
          </div>
          
          {/* Right Col - Empty for clean design */}
          <div className="w-full md:w-3/5 py-6 text-center">
            {/* Espaço reservado para futuras ilustrações ou imagens */}
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="relative -mt-12 lg:-mt-24">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
            </g>
          </g>
        </svg>
      </div>
      
      {/* Features Section */}
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="w-full my-2 text-4xl lg:text-5xl font-bold leading-tight text-center text-gray-800">
            Tudo que você precisa para crescer
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-blue-500 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 p-6">
              <div className="group hover-lift glass-card rounded-xl p-6 shadow-card hover:shadow-card-hover h-full">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 w-12 h-12 flex items-center justify-center shadow-soft mb-4">
                  <Lightbulb className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Infraestrutura Completa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Coworking equipado, salas de reunião e internet de alta velocidade para sua equipe trabalhar com excelência.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-6">
              <div className="group hover-lift glass-card rounded-xl p-6 shadow-card hover:shadow-card-hover h-full">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 w-12 h-12 flex items-center justify-center shadow-soft mb-4">
                  <Users className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Mentoria Especializada</h3>
                <p className="text-gray-600 leading-relaxed">
                  Acompanhamento com especialistas em negócios, tecnologia, marketing e vendas para acelerar seu crescimento.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-6">
              <div className="group hover-lift glass-card rounded-xl p-6 shadow-card hover:shadow-card-hover h-full">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-3 w-12 h-12 flex items-center justify-center shadow-soft mb-4">
                  <Target className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Networking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Conecte-se com investidores, parceiros e outras startups do ecossistema de inovação nacional.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-6">
              <div className="group hover-lift glass-card rounded-xl p-6 shadow-card hover:shadow-card-hover h-full">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 w-12 h-12 flex items-center justify-center shadow-soft mb-4">
                  <TrendingUp className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Acesso a Investimento</h3>
                <p className="text-gray-600 leading-relaxed">
                  Conexão com investidores anjo, aceleradoras e programas de financiamento para sua startup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar with Enhanced Visual */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100/50">
        <div className="container px-5 mx-auto">
          <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {startups.length}+
              </div>
              <div className="text-sm md:text-base text-slate-600 mt-3 font-medium">Startups Incubadas</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-sm md:text-base text-slate-600 mt-3 font-medium">Empreendedores</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-pink-600 to-red-600 bg-clip-text text-transparent">
                {parceiros.length}+
              </div>
              <div className="text-sm md:text-base text-slate-600 mt-3 font-medium">Parceiros</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-sm md:text-base text-slate-600 mt-3 font-medium">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Startups Section with Enhanced Cards */}
      <section className="py-16 md:py-24">
        <div className="container px-5 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
              Startups Incubadas
            </h2>
            <p className="text-lg md:text-xl mt-4 text-slate-600">
              Conheça as empresas inovadoras que fazem parte do nosso ecossistema
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16 max-w-6xl mx-auto">
            {startups.slice(0, 6).map((startup) => (
              <div key={startup.id} className="group hover-lift">
                <div className="glass-card rounded-xl p-6 h-full shadow-card hover:shadow-card-hover border border-slate-200/60 hover:border-blue-200 transition-all">
                  <div className="mb-4">
                    <span className="text-xs text-blue-600 uppercase font-semibold tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                      {startup.segment}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {startup.name}
                  </h3>
                  <p className="text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {startup.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <Link 
                      to={`/startups/${startup.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 group/link"
                    >
                      Saiba mais 
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/startups">
              <Button 
                size="lg"
                variant="outline"
                className="rounded-lg border-2 border-black/20 hover:border-black hover:bg-black text-black hover:text-white transition-all shadow-soft hover:shadow-card"
              >
                Ver Todas as Startups
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Parceiros Logos with Modern Design */}
      <section className="py-16 bg-white">
        <div className="container px-5 mx-auto">
          <h2 className="text-center text-slate-500 text-xs md:text-sm uppercase tracking-widest font-semibold">
            Parceiros que confiam na 2IAD
          </h2>
          <div className="flex gap-12 md:gap-16 items-center justify-center mt-12 flex-wrap">
            {parceiros.slice(0, 6).map((parceiro) => (
              <div 
                key={parceiro.id} 
                className="text-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
              >
                <div className="font-bold text-gray-800 text-base md:text-lg">{parceiro.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link 
              to="/parceiros" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 group"
            >
              Ver todos os parceiros 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-16 md:py-24">
        <div className="container px-5 mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 md:px-16 md:py-20 rounded-2xl flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden shadow-glow">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Pronto para decolar?
              </h2>
              <p className="text-slate-300 mt-6 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                Candidate-se agora e transforme sua ideia em uma startup de sucesso com o apoio da Incubadora 2IAD.
              </p>
              <div className="flex flex-col sm:flex-row mt-10 gap-4 justify-center">
                <Link to="/candidatura">
                  <Button 
                    size="lg"
                    className="rounded-lg bg-white text-black hover:bg-gray-100 border-2 border-transparent shadow-soft hover:shadow-card transition-all"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Candidate-se Agora
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="rounded-lg bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all"
                  >
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
