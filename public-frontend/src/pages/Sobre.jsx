import { Target, Eye, Users, Award, TrendingUp, Heart } from 'lucide-react'

export default function Sobre() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-12 gradient text-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-loose text-sm md:text-base mb-4">Conheça a 2IAD</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Sobre a Incubadora 2IAD
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Transformando ideias inovadoras em negócios de sucesso através de suporte completo e especializado.
            </p>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="relative -mt-12">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
            </g>
          </g>
        </svg>
      </div>

      {/* Missão e Visão */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="w-full my-2 text-4xl lg:text-5xl font-bold leading-tight text-center text-gray-800 mb-4">
            Nosso Propósito
          </h2>
          <div className="w-full mb-12">
            <div className="h-1 mx-auto bg-blue-500 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-6">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full border-l-4 border-blue-500">
                <Target className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Missão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fomentar o empreendedorismo inovador através do suporte técnico, estratégico e estrutural, 
                  capacitando startups a desenvolverem soluções que impactem positivamente a sociedade e 
                  gerem valor sustentável.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-6">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full border-l-4 border-purple-500">
                <Eye className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Visão</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser referência nacional em incubação de startups, reconhecida pela excelência no apoio 
                  ao desenvolvimento de negócios inovadores, sustentáveis e com alto potencial de crescimento 
                  no mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que é a 2IAD */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                O que é a 2IAD?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A Incubadora 2IAD é um <span className="font-semibold text-gray-800">ambiente de inovação</span> que oferece suporte completo 
                  para empreendedores que desejam transformar suas ideias em negócios de sucesso.
                </p>
                <p>
                  Oferecemos <span className="font-semibold text-gray-800">infraestrutura física, mentoria especializada</span>, networking com 
                  investidores e parceiros, além de capacitação contínua em gestão, tecnologia 
                  e desenvolvimento de negócios.
                </p>
                <p>
                  Nossa atuação abrange startups de diversos segmentos, com <span className="font-semibold text-gray-800">foco especial em 
                  tecnologia, inovação social, saúde e sustentabilidade</span>.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <Users className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
                  <p className="text-gray-600 text-sm">Startups Incubadas</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <Award className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">85%</h3>
                  <p className="text-gray-600 text-sm">Taxa de Sucesso</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">R$ 10M+</h3>
                  <p className="text-gray-600 text-sm">Investimentos Captados</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <Heart className="h-10 w-10 text-red-500 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">200+</h3>
                  <p className="text-gray-600 text-sm">Empregos Gerados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="w-full my-2 text-4xl lg:text-5xl font-bold leading-tight text-center text-gray-800 mb-4">
            Como Funciona a Incubação
          </h2>
          <div className="w-full mb-12">
            <div className="h-1 mx-auto bg-blue-500 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            Processo estruturado em etapas para garantir o crescimento sustentável da sua startup
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-5/12 md:text-right p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Seleção</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Processo seletivo por meio de editais públicos. Avaliamos potencial de 
                    inovação, viabilidade e impacto do negócio.
                  </p>
                </div>
                <div className="flex items-center justify-center w-full md:w-2/12">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                    1
                  </div>
                </div>
                <div className="w-full md:w-5/12 p-6"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-5/12 p-6"></div>
                <div className="flex items-center justify-center w-full md:w-2/12">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                    2
                  </div>
                </div>
                <div className="w-full md:w-5/12 p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Incubação</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Período de 12 a 24 meses com acesso a infraestrutura, mentoria, 
                    capacitações e networking intensivo.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-5/12 md:text-right p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Graduação</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Startups consolidadas se graduam e continuam fazendo parte da rede 
                    como cases de sucesso e mentores.
                  </p>
                </div>
                <div className="flex items-center justify-center w-full md:w-2/12">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                    3
                  </div>
                </div>
                <div className="w-full md:w-5/12 p-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Pronto para transformar sua ideia em realidade?
          </h2>
          <p className="mb-8 text-lg lg:text-xl text-white opacity-90">
            Junte-se às startups que estão revolucionando o mercado com o apoio da 2IAD
          </p>
          <a
            href="/editais"
            className="inline-block bg-white text-purple-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Ver Editais Abertos
          </a>
        </div>
      </section>
    </div>
  )
}
