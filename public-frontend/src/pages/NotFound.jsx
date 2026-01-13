import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary-500">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-gray-900">Página não encontrada</h2>
        <p className="mb-8 text-lg text-gray-600">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button size="lg" asChild>
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Voltar para Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
