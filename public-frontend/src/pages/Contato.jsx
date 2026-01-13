import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="pt-24 pb-12 gradient text-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-loose text-sm md:text-base mb-4">Fale Conosco</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Entre em Contato
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Tire suas dúvidas ou envie sua proposta. Nossa equipe está pronta para ajudar!
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
      
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:contato@incubadora2iad.com.br" 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      contato@incubadora2iad.com.br
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Telefone</h3>
                    <a 
                      href="tel:+557932182100" 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      (79) 3218-2100
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Endereço</h3>
                    <div className="text-gray-600">
                      Aracaju, Sergipe<br />
                      Brasil
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Horário de Atendimento</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Segunda a Sexta:</span>
                        <span className="font-semibold">08:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado:</span>
                        <span className="font-semibold">Fechado</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo:</span>
                        <span className="font-semibold">Fechado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h2>
              
              {submitted && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center gap-3">
                    <div className="text-green-600 text-2xl">✓</div>
                    <div>
                      <p className="font-semibold text-green-800">Mensagem enviada com sucesso!</p>
                      <p className="text-sm text-green-700">Entraremos em contato em breve.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Assunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Selecione...</option>
                      <option value="incubacao">Processo de Incubação</option>
                      <option value="parceria">Parceria</option>
                      <option value="investimento">Investimento</option>
                      <option value="visita">Visita Técnica</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Digite sua mensagem..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg px-8 py-4 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-white">
            Visite nossa incubadora
          </h2>
          <p className="mb-8 text-lg lg:text-xl text-white opacity-90">
            Agende uma visita e conheça nossa estrutura e equipe pessoalmente
          </p>
          <a
            href="tel:+557932182100"
            className="inline-block bg-white text-purple-600 font-bold rounded-full py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Ligar Agora
          </a>
        </div>
      </section>
    </div>
  )
}
