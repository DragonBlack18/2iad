import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Globe, Instagram, Linkedin, Calendar, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
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
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center">Carregando...</div>
        </div>
      </div>
    )
  }
  
  if (error || !startup) {
    return (
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <div className="text-red-600 mb-4">Startup não encontrada</div>
            <Button asChild>
              <Link to="/startups">Voltar para Startups</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="py-16">
      <div className="container px-4 md:px-6">
        {/* Back Button */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/startups">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Startups
          </Link>
        </Button>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-sm font-medium text-primary-500">
                {startup.segment}
              </span>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                startup.status === 'ATIVA' ? 'bg-green-100 text-green-800' :
                startup.status === 'GRADUADA' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {startup.status}
              </span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {startup.name}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600">{startup.description}</p>
            </div>
            
            {/* Links */}
            {(startup.website || startup.instagram || startup.linkedin) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                {startup.instagram && (
                  <a
                    href={`https://instagram.com/${startup.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                )}
                {startup.linkedin && (
                  <a
                    href={`https://linkedin.com/company/${startup.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {startup.foundedAt && (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Fundada em</div>
                      <div className="text-sm text-gray-600">{formatDate(startup.foundedAt)}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Users className="mt-1 h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Equipe</div>
                    <div className="text-sm text-gray-600">
                      {startup.members?.length || 0} {startup.members?.length === 1 ? 'membro' : 'membros'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Team Card */}
            {startup.members && startup.members.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Equipe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {startup.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{member.user.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
