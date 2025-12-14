import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Chatbot from '@/components/Chatbot'

describe('Chatbot', () => {
  beforeEach(() => {
    render(<Chatbot />)
  })

  it('renders chatbot button', () => {
    const button = screen.getByRole('button', { name: /message circle/i })
    expect(button).toBeInTheDocument()
  })

  it('opens chatbot window when button is clicked', () => {
    const button = screen.getByRole('button', { name: /message circle/i })
    fireEvent.click(button)
    
    expect(screen.getByText('Assistant SolvaticaTech')).toBeInTheDocument()
    expect(screen.getByText("Bonjour ! Je suis l'assistant virtuel de SolvaticaTech. Comment puis-je vous aider ?")).toBeInTheDocument()
  })

  it('sends message when user types and presses enter', async () => {
    const button = screen.getByRole('button', { name: /message circle/i })
    fireEvent.click(button)
    
    const input = screen.getByPlaceholderText('Tapez votre message...')
    fireEvent.change(input, { target: { value: 'Bonjour' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByText('Bonjour')).toBeInTheDocument()
    })
  })

  it('shows quick questions when chatbot opens', () => {
    const button = screen.getByRole('button', { name: /message circle/i })
    fireEvent.click(button)
    
    expect(screen.getByText('Vos services')).toBeInTheDocument()
    expect(screen.getByText('Nous contacter')).toBeInTheDocument()
    expect(screen.getByText('Voir nos projets')).toBeInTheDocument()
    expect(screen.getByText('Demander un devis')).toBeInTheDocument()
  })

  it('closes chatbot when close button is clicked', () => {
    const button = screen.getByRole('button', { name: /message circle/i })
    fireEvent.click(button)
    
    const closeButton = screen.getByRole('button', { name: /x/i })
    fireEvent.click(closeButton)
    
    expect(screen.queryByText('Assistant SolvaticaTech')).not.toBeInTheDocument()
  })
}) 