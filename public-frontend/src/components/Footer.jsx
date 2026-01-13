import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="mb-4 text-2xl font-bold text-white">Incubadora 2IAD</div>
            <p className="mb-4 text-sm">
              Transformamos ideias inovadoras em startups de sucesso. 
              Oferecemos infraestrutura, mentoria e networking para empreendedores.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links rápidos */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="hover:text-primary-400 transition-colors">Sobre</Link></li>
              <li><Link to="/startups" className="hover:text-primary-400 transition-colors">Startups</Link></li>
              <li><Link to="/editais" className="hover:text-primary-400 transition-colors">Editais</Link></li>
              <li><Link to="/parceiros" className="hover:text-primary-400 transition-colors">Parceiros</Link></li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>contato@incubadora2iad.com.br</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>(79) 3218-2100</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Aracaju, Sergipe</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Incubadora 2IAD. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
