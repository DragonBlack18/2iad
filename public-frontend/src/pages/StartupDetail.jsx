import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Globe, Instagram, Linkedin, Calendar, Users, Briefcase } from 'lucide-react'
import { startupsAPI } from '../lib/api'
import { formatDate } from '../lib/utils'

export default function StartupDetail() {
  const { slug } = useParams()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['startup', slug],
    queryFn: () => startupsAPI.getBySlug(slug)
  })
  
  const startup = data?.data?.startup
  
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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-16 gradient text-white">
        <div className="container max-w-5xl mx-auto px-6">
          <Link
            to="/startups"
            className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para Startups
          </Link>
          
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-white/90 bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                  {startup.segment}
                </span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  startup.status === 'ATIVA' ? 'bg-green-100 text-green-800' :
                  startup.status === 'GRADUADA' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {startup.status}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {startup.name}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                {startup.description}
              </p>
            </div>
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

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Social Links */}
              {(startup.website || startup.instagram || startup.linkedin) && (
                <div className="flex flex-wrap gap-4">
                  {startup.website && (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
                    >
                      <Globe className="h-5 w-5" />
                      Website
                    </a>
                  )}
                  {startup.instagram && (
                    <a
                      href={`https://instagram.com/${startup.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 hover:border-pink-500 hover:text-pink-600 transition-all"
                    >
                      <Instagram className="h-5 w-5" />
                      Instagram
                    </a>
                  )}
                  {startup.linkedin && (
                    <a
                      href={`https://linkedin.com/company/${startup.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 hover:border-blue-700 hover:text-blue-700 transition-all"
                    >
                      <Linkedin className="h-5 w-5" />
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Informações</h3>
                <div className="space-y-4">
                  {startup.foundedAt && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-6 w-6 text-blue-500 mt-1" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Fundada em</div>
                        <div className="text-gray-600">{formatDate(startup.foundedAt)}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Segmento</div>
                      <div className="text-gray-600">{startup.segment}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Equipe</div>
                      <div className="text-gray-600">
                        {startup.members?.length || 0} {startup.members?.length === 1 ? 'membro' : 'membros'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Card */}
              {startup.members && startup.members.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Equipe</h3>
                  <div className="space-y-4">
                    {startup.members.map((member) => (
                      <div key={member.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="font-semibold text-gray-900">{member.user.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{member.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Conheça outras startups incubadas
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
