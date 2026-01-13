import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="my-20">
      <p className="text-center text-sm text-slate-500">
        Copyright © {currentYear} Incubadora 2IAD. Todos os direitos reservados.
      </p>
      <p className="text-center text-xs text-slate-500 mt-1">
        Transformando ideias em startups de sucesso
      </p>
    </footer>
  )
}
