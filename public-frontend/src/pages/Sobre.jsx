import { Target, Eye, Building2, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

export default function Sobre() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Sobre a Incubadora 2IAD
            </h1>
            <p className="text-lg text-gray-600">
              Somos uma incubadora dedicada a transformar ideias inovadoras em negócios de sucesso, 
              oferecendo suporte completo para empreendedores.
            </p>
          </div>
        </div>
      </section>
      
      {/* Missão e Visão */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-primary-200">
              <CardHeader>
                <Target className="mb-4 h-12 w-12 text-primary-500" />
                <CardTitle>Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fomentar o empreendedorismo inovador através do suporte técnico, 
                  estratégico e estrutural, capacitando startups a desenvolverem 
                  soluções que impactem positivamente a sociedade.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary-200">
              <CardHeader>
                <Eye className="mb-4 h-12 w-12 text-primary-500" />
                <CardTitle>Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ser referência nacional em incubação de startups, reconhecida pela 
                  excelência no apoio ao desenvolvimento de negócios inovadores e sustentáveis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* O que é a 2IAD */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              O que é a 2IAD?
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                A Incubadora 2IAD é um ambiente de inovação que oferece suporte completo 
                para empreendedores que desejam transformar suas ideias em negócios de sucesso.
              </p>
              <p>
                Oferecemos infraestrutura física, mentoria especializada, networking com 
                investidores e parceiros, além de capacitação contínua em gestão, tecnologia 
                e desenvolvimento de negócios.
              </p>
              <p>
                Nossa atuação abrange startups de diversos segmentos, com foco especial em 
                tecnologia, inovação social, saúde e sustentabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Como funciona a incubação */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Como Funciona a Incubação
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Processo estruturado em etapas para garantir o crescimento sustentável da sua startup
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Seleção</h3>
              <p className="text-gray-600">
                Processo seletivo por meio de editais públicos. Avaliamos potencial de 
                inovação, viabilidade e impacto do negócio.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Incubação</h3>
              <p className="text-gray-600">
                Período de 12 a 24 meses com acesso a infraestrutura, mentoria, 
                capacitações e networking intensivo.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Graduação</h3>
              <p className="text-gray-600">
                Startups consolidadas se graduam e continuam fazendo parte da rede 
                como cases de sucesso e mentores.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Infraestrutura */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Nossa Infraestrutura
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Building2 className="mb-2 h-8 w-8 text-primary-500" />
                <CardTitle>Espaço de Coworking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ambiente colaborativo com estações de trabalho, internet de alta velocidade 
                  e acesso 24/7 para equipes incubadas.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary-500" />
                <CardTitle>Salas de Reunião</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Salas equipadas com projetor, videoconferência e quadros para reuniões 
                  com clientes, investidores e equipe.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Target className="mb-2 h-8 w-8 text-primary-500" />
                <CardTitle>Laboratório de Prototipagem</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Espaço maker com ferramentas e equipamentos para desenvolvimento 
                  de protótipos e testes de produtos.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Eye className="mb-2 h-8 w-8 text-primary-500" />
                <CardTitle>Auditório</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Espaço para eventos, workshops, palestras e pitches com capacidade 
                  para até 100 pessoas.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Building2 className="mb-2 h-8 w-8 text-primary-500" />
                <CardTitle>Copa e Lounge</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Área de descompressão para networking informal, coffee breaks 
                  e momentos de descontração.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary-500" />
                <CardTitle>Estacionamento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Vagas exclusivas para startups incubadas e visitantes, 
                  com segurança e controle de acesso.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
