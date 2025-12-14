interface Step {
  id: string
  label: string
  description?: string
  status: 'complete' | 'current' | 'upcoming'
}

interface StepperProps {
  steps: Step[]
  className?: string
}

export default function Stepper({ steps, className = '' }: StepperProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <div
              className={`
                group flex flex-col border-l-4 py-2 pl-4
                ${step.status === 'complete'
                  ? 'border-primary-600'
                  : step.status === 'current'
                    ? 'border-primary-600'
                    : 'border-gray-200'
                }
                md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4
              `}
            >
              <span className="text-sm font-medium">
                {step.status === 'complete' ? (
                  <span className="flex items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-800">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.label}
                    </span>
                  </span>
                ) : step.status === 'current' ? (
                  <span className="flex items-center" aria-current="step">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-primary-600">
                      {step.label}
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      {step.label}
                    </span>
                  </span>
                )}
              </span>

              {step.description && (
                <span
                  className={`
                    mt-2 text-sm
                    ${step.status === 'complete'
                      ? 'text-gray-900'
                      : step.status === 'current'
                        ? 'text-primary-600'
                        : 'text-gray-500'
                    }
                  `}
                >
                  {step.description}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Exemple d'utilisation :
/*
// Stepper simple
<Stepper
  steps={[
    {
      id: 'step1',
      label: 'Étape 1',
      description: 'Détails de l\'étape 1',
      status: 'complete'
    },
    {
      id: 'step2',
      label: 'Étape 2',
      description: 'Détails de l\'étape 2',
      status: 'current'
    },
    {
      id: 'step3',
      label: 'Étape 3',
      description: 'Détails de l\'étape 3',
      status: 'upcoming'
    }
  ]}
/>

// Stepper avec style personnalisé
<Stepper
  className="my-8"
  steps={[
    {
      id: 'step1',
      label: 'Informations personnelles',
      description: 'Vos coordonnées',
      status: 'complete'
    },
    {
      id: 'step2',
      label: 'Adresse',
      description: 'Votre adresse de livraison',
      status: 'current'
    },
    {
      id: 'step3',
      label: 'Paiement',
      description: 'Informations de paiement',
      status: 'upcoming'
    },
    {
      id: 'step4',
      label: 'Confirmation',
      description: 'Récapitulatif de la commande',
      status: 'upcoming'
    }
  ]}
/>
*/ 