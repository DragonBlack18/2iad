import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { 
  ArrowLeft, Globe, Instagram, Linkedin, Calendar, Users, Briefcase,
  Mail, Phone, MapPin, Download, FileText, TrendingUp, Target, Award,
  Facebook, Twitter, Play, ExternalLink, Building2
} from 'lucide-react'
import { startupsAPI } from '../lib/api'
import { formatDate } from '../lib/utils'
import { useState } from 'react'

export default function StartupDetail() {
  const { slug } = useParams()
  const [selectedImage, setSelectedImage] = useState(null)
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['startup', slug],
    queryFn: () => startupsAPI.getBySlug(slug)
  })
  
  const startup = data?.data?.startup
  
  // Helper para redes sociais
  const getSocialLink = (platform, username) => {
    const links = {
      instagram: `https://instagram.com/${username?.replace('@', '')}`,
      linkedin: `https://linkedin.com/company/${username}`,
      facebook: `https://facebook.com/${username}`,
      twitter: `https://twitter.com/${username?.replace('@', '')}`
    }
    return links[platform] || '#'
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando startup...</p>
        </div>
      </div>
    )
  }
  
  if (error || !startup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Startup não encontrada</h2>
          <Link
            to="/startups"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full py-3 px-8 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Voltar para Startups
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50">
      {/* Banner Hero com Logo Sobreposto */}
      <div className="relative h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        {startup.banner && (
          <img 
            src={startup.banner} 
            alt={startup.nome}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
        )}
        
        {/* Overlay escuro para melhor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        
        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container max-w-6xl mx-auto px-6">
            <Link
              to="/startups"
              className="inline-flex items-center text-white hover:text-white/80 transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar para Startups
            </Link>
          </div>
        </div>
        
        {/* Logo Sobreposto */}
        <div className="absolute -bottom-16 left-0 right-0">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="flex items-end gap-6">
              {startup.logo ? (
                <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl p-4 border-4 border-white flex-shrink-0">
                  <img 
                    src={startup.logo} 
                    alt={startup.nome}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl p-4 border-4 border-white flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-16 h-16 text-gray-400" />
                </div>
              )}
              
              <div className="pb-2 flex-1">
                {/* Badges em linha com melhor design */}
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  {startup.setor && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/25 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                      <Briefcase className="w-3.5 h-3.5" />
                      {startup.setor}
                    </span>
                  )}
                  {startup.modelo_negocio && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/25 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                      <Target className="w-3.5 h-3.5" />
                      {startup.modelo_negocio}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md border-2 ${
                    startup.status === 'ATIVA' ? 'bg-green-500/90 text-white border-green-300' :
                    startup.status === 'GRADUADA' ? 'bg-blue-500/90 text-white border-blue-300' :
                    'bg-gray-500/90 text-white border-gray-300'
                  }`}>
                    {startup.status === 'ATIVA' ? '● ' : startup.status === 'GRADUADA' ? '✓ ' : '○ '}
                    {startup.status || 'ATIVA'}
                  </span>
                </div>
                
                {/* Título grande e visível */}
                <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl" style={{ textShadow: '0 4px 6px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)' }}>
                  {startup.nome}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-gray-50 mt-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Descrição Resumida */}
              <div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {startup.descricao}
                </p>
              </div>
              
              {/* Redes Sociais */}
              {(startup.website || startup.redes_sociais) && (
                <div className="flex flex-wrap gap-3">
                  {startup.website && (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <Globe className="h-5 w-5" />
                      Website
                    </a>
                  )}
                  {startup.redes_sociais?.instagram && (
                    <a
                      href={getSocialLink('instagram', startup.redes_sociais.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:border-pink-500 hover:bg-pink-50 transition-all"
                    >
                      <Instagram className="h-5 w-5" />
                      Instagram
                    </a>
                  )}
                  {startup.redes_sociais?.linkedin && (
                    <a
                      href={getSocialLink('linkedin', startup.redes_sociais.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:border-blue-700 hover:bg-blue-50 transition-all"
                    >
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </a>
                  )}
                  {startup.redes_sociais?.facebook && (
                    <a
                      href={getSocialLink('facebook', startup.redes_sociais.facebook)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:border-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <Facebook className="h-5 w-5" />
                      Facebook
                    </a>
                  )}
                  {startup.redes_sociais?.twitter && (
                    <a
                      href={getSocialLink('twitter', startup.redes_sociais.twitter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:border-sky-500 hover:bg-sky-50 transition-all"
                    >
                      <Twitter className="h-5 w-5" />
                      Twitter
                    </a>
                  )}
                </div>
              )}
              
              {/* Sobre a Empresa (Descrição Completa) */}
              {startup.descricao_completa && (
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Briefcase className="h-7 w-7 text-blue-600" />
                    Sobre a Empresa
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {startup.descricao_completa}
                  </div>
                </div>
              )}
              
              {/* Métricas */}
              {startup.metricas && Object.keys(startup.metricas).length > 0 && (
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp className="h-7 w-7" />
                    Números que Impressionam
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {startup.metricas.usuarios && (
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{startup.metricas.usuarios.toLocaleString()}</div>
                        <div className="text-blue-100">Usuários Ativos</div>
                      </div>
                    )}
                    {startup.metricas.receita && (
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">R$ {startup.metricas.receita.toLocaleString()}</div>
                        <div className="text-blue-100">Receita Mensal</div>
                      </div>
                    )}
                    {startup.metricas.crescimento && (
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">+{startup.metricas.crescimento}%</div>
                        <div className="text-blue-100">Crescimento</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Galeria de Imagens */}
              {startup.startup_imagens && startup.startup_imagens.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeria</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {startup.startup_imagens.map((img, index) => (
                      <div 
                        key={img.id}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img.url} 
                          alt={img.titulo || `Imagem ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Vídeo Pitch */}
              {startup.video_pitch && (
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Play className="h-7 w-7 text-red-600" />
                    Conheça Nosso Pitch
                  </h2>
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                    <iframe
                      src={startup.video_pitch}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              {/* Equipe */}
              {startup.startup_membros && startup.startup_membros.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Users className="h-7 w-7 text-purple-600" />
                    Nossa Equipe
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {startup.startup_membros.map((membro) => (
                      <div key={membro.id} className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                        {membro.foto ? (
                          <img 
                            src={membro.foto} 
                            alt={membro.nome}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                            {membro.nome.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{membro.nome}</h3>
                          <p className="text-purple-600 font-medium text-sm mb-2">{membro.cargo}</p>
                          {membro.bio && (
                            <p className="text-gray-600 text-sm line-clamp-2">{membro.bio}</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            {membro.email && (
                              <a href={`mailto:${membro.email}`} className="text-gray-400 hover:text-blue-600">
                                <Mail className="h-4 w-4" />
                              </a>
                            )}
                            {membro.linkedin && (
                              <a href={membro.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Documentos */}
              {startup.startup_documentos && startup.startup_documentos.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FileText className="h-7 w-7 text-green-600" />
                    Documentos e Recursos
                  </h2>
                  <div className="space-y-3">
                    {startup.startup_documentos.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{doc.titulo}</div>
                            <div className="text-sm text-gray-500">
                              {doc.tipo} • {doc.tamanho ? `${(doc.tamanho / 1024 / 1024).toFixed(1)} MB` : 'Tamanho desconhecido'}
                            </div>
                          </div>
                        </div>
                        <Download className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
                      </a>
                    ))}
                  </div>
                  
                  {/* Pitch Deck Download */}
                  {startup.pitch_deck && (
                    <a
                      href={startup.pitch_deck}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-bold">Pitch Deck Completo</div>
                          <div className="text-sm text-blue-100">Apresentação da startup</div>
                        </div>
                      </div>
                      <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
              
              {/* Card de Informações */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Informações</h3>
                <div className="space-y-5">
                  
                  {startup.fundacao_ano && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Fundada em</div>
                        <div className="text-gray-700">{startup.fundacao_ano}</div>
                      </div>
                    </div>
                  )}
                  
                  {startup.setor && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Setor</div>
                        <div className="text-gray-700">{startup.setor}</div>
                      </div>
                    </div>
                  )}
                  
                  {startup.modelo_negocio && (
                    <div className="flex items-start gap-3">
                      <Target className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Modelo de Negócio</div>
                        <div className="text-gray-700">{startup.modelo_negocio}</div>
                      </div>
                    </div>
                  )}
                  
                  {startup.startup_membros && (
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Equipe</div>
                        <div className="text-gray-700">
                          {startup.startup_membros.length} {startup.startup_membros.length === 1 ? 'membro' : 'membros'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {startup.cidade && startup.estado && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Localização</div>
                        <div className="text-gray-700">{startup.cidade}, {startup.estado}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Contatos */}
                  {startup.email && (
                    <div className="pt-4 border-t border-gray-200">
                      <a 
                        href={`mailto:${startup.email}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span className="text-sm">{startup.email}</span>
                      </a>
                    </div>
                  )}
                  
                  {startup.telefone && (
                    <div>
                      <a 
                        href={`tel:${startup.telefone}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                        <span className="text-sm">{startup.telefone}</span>
                      </a>
                    </div>
                  )}
                  
                  {startup.endereco && (
                    <div>
                      <div className="flex items-start gap-3 text-gray-700">
                        <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{startup.endereco}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Timeline da Jornada */}
              {(startup.data_entrada || startup.data_graduacao) && (
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    Nossa Jornada
                  </h3>
                  <div className="space-y-4">
                    {startup.fundacao_ano && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                            1
                          </div>
                          <div className="w-0.5 h-full bg-white/20 mt-2"></div>
                        </div>
                        <div className="pb-6">
                          <div className="font-bold text-lg">Fundação</div>
                          <div className="text-white/80">{startup.fundacao_ano}</div>
                        </div>
                      </div>
                    )}
                    
                    {startup.data_entrada && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                            2
                          </div>
                          <div className="w-0.5 h-full bg-white/20 mt-2"></div>
                        </div>
                        <div className="pb-6">
                          <div className="font-bold text-lg">Entrada na Incubadora</div>
                          <div className="text-white/80">{formatDate(startup.data_entrada)}</div>
                        </div>
                      </div>
                    )}
                    
                    {startup.data_graduacao && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-purple-600">
                            ✓
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">Graduação</div>
                          <div className="text-white/80">{formatDate(startup.data_graduacao)}</div>
                        </div>
                      </div>
                    )}
                    
                    {!startup.data_graduacao && startup.status === 'ATIVA' && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">Em Desenvolvimento</div>
                          <div className="text-white/80">Atualmente na incubadora</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Lightbox para Imagens */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage.url} 
            alt={selectedImage.titulo}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {selectedImage.titulo && (
            <div className="absolute bottom-4 left-4 right-4 text-center text-white text-lg font-medium">
              {selectedImage.titulo}
            </div>
          )}
        </div>
      )}

      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Conheça Outras Startups Incubadas
          </h2>
          <p className="mb-8 text-lg lg:text-xl text-white opacity-90">
            Explore o ecossistema de inovação da 2IAD
          </p>
          <Link
            to="/startups"
            className="inline-block bg-white text-purple-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Ver Todas as Startups
          </Link>
        </div>
      </section>
    </div>
  )
}
