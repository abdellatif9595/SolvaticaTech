'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  ChevronUp,
  ChevronDown,
  Phone
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const chatbotResponses = {
  greetings: [
    "Bonjour ! Je suis l'assistant virtuel de SolvaticaTech. Comment puis-je vous aider aujourd'hui ?",
    "Salut ! Bienvenue sur SolvaticaTech. Que puis-je faire pour vous ?",
    "Bonjour ! Je suis là pour répondre à vos questions sur nos services."
  ],
  services: [
    "Nous proposons plusieurs services : développement web, applications mobiles, solutions cloud, et analyse de données. Quel service vous intéresse ?",
    "Nos services incluent le développement web moderne, les applications mobiles, les solutions cloud sécurisées, et l'analyse de données. Que souhaitez-vous savoir ?"
  ],
  contact: [
    "Vous pouvez nous contacter via notre page contact, par email à contact@solvaticatech.com, ou par WhatsApp au +22247776444.",
    "Pour nous contacter, visitez notre page contact, envoyez-nous un email à contact@solvaticatech.com, ou contactez-nous directement sur WhatsApp au +22247776444."
  ],
  pricing: [
    "Nos tarifs varient selon la complexité du projet. Contactez-nous pour un devis personnalisé gratuit.",
    "Chaque projet est unique, c'est pourquoi nous proposons des devis sur mesure. Contactez-nous pour en discuter."
  ],
  portfolio: [
    "Vous pouvez voir nos réalisations dans notre section portfolio. Nous avons travaillé sur des projets e-commerce, applications bancaires, et tableaux de bord analytiques.",
    "Découvrez nos projets dans la section portfolio. Nous sommes fiers de nos réalisations variées."
  ],
  default: [
    "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ?",
    "Je n'ai pas la réponse à cette question. Contactez-nous directement pour plus d'informations.",
    "Pour cette question spécifique, je vous recommande de nous contacter directement."
  ]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis l'assistant virtuel de SolvaticaTech. Comment puis-je vous aider ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)]
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('offre') || lowerMessage.includes('propose')) {
      return chatbotResponses.services[Math.floor(Math.random() * chatbotResponses.services.length)]
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('contacter') || lowerMessage.includes('email') || lowerMessage.includes('téléphone')) {
      return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)]
    }
    
    if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('devis') || lowerMessage.includes('coût')) {
      return chatbotResponses.pricing[Math.floor(Math.random() * chatbotResponses.pricing.length)]
    }
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('projet') || lowerMessage.includes('réalisation')) {
      return chatbotResponses.portfolio[Math.floor(Math.random() * chatbotResponses.portfolio.length)]
    }
    
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simuler un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "Vos services",
    "Nous contacter",
    "Voir nos projets",
    "Demander un devis"
  ]

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const whatsappNumber = '+22247776444'
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center transition-colors"
          aria-label="Contacter sur WhatsApp"
        >
          <Phone className="h-6 w-6 text-white" />
        </a>
        
        {/* Chatbot Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Assistant SolvaticaTech</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 h-6 w-6 p-0"
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'bot' ? (
                          <Bot className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-3 w-3" />
                        <span className="text-xs opacity-70">En train d'écrire...</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-gray-500 mb-2">Questions rapides :</p>
                  <div className="flex flex-wrap gap-1">
                    {quickQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 text-xs"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
} 