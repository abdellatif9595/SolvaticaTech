'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Mail, Phone, MapPin } from 'lucide-react'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const contactInfo = [
  {
    title: 'Email',
    content: 'contact@solvaticatech.com',
    icon: Mail,
  },
  {
    title: 'Téléphone',
    content: '+33 1 23 45 67 89',
    icon: Phone,
  },
  {
    title: 'Adresse',
    content: '123 Rue de l\'Innovation, 75001 Paris, France',
    icon: MapPin,
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true)
      // Simuler l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: 'Message envoyé !',
        description: 'Nous vous répondrons dans les plus brefs délais.',
      })
      
      reset()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi du message.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contactez-nous
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mt-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Informations de contact</h2>
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-4">
                    <info.icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      <p className="text-gray-500">{info.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  {...register('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  placeholder="Sujet de votre message"
                  {...register('subject')}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Votre message"
                  className="min-h-[150px]"
                  {...register('message')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </main>
  )
} 