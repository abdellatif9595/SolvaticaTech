'use client'

import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { RadioGroup } from './ui/radio-group'
import { Switch } from './ui/switch'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
  error?: string
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, label, description, error, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext()
    const errorMessage = error || errors[name]?.message

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={name}>
            {label}
          </Label>
        )}
        <Input
          {...register(name)}
          id={name}
          ref={ref}
          className={cn(
            errorMessage && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
FormField.displayName = 'FormField'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  description?: string
  error?: string
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ name, label, description, error, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext()
    const errorMessage = error || errors[name]?.message

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={name}>
            {label}
          </Label>
        )}
        <Textarea
          {...register(name)}
          id={name}
          ref={ref}
          className={cn(
            errorMessage && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
FormTextarea.displayName = 'FormTextarea'

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  description?: string
  error?: string
  options: { value: string; label: string }[]
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ name, label, description, error, options, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext()
    const errorMessage = error || errors[name]?.message

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={name}>
            {label}
          </Label>
        )}
        <Select
          {...register(name)}
          id={name}
          ref={ref}
          className={cn(
            errorMessage && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
FormSelect.displayName = 'FormSelect'

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
  error?: string
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ name, label, description, error, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext()
    const errorMessage = error || errors[name]?.message

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            {...register(name)}
            id={name}
            ref={ref}
            className={cn(
              errorMessage && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {label && (
            <Label htmlFor={name} className="text-sm font-medium">
              {label}
            </Label>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
FormCheckbox.displayName = 'FormCheckbox'

interface FormRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
  error?: string
  options: { value: string; label: string }[]
}

const FormRadio = forwardRef<HTMLInputElement, FormRadioProps>(
  ({ name, label, description, error, options, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext()
    const errorMessage = error || errors[name]?.message

    return (
      <div className="space-y-2">
        {label && (
          <Label>
            {label}
          </Label>
        )}
        <RadioGroup
          className={cn(
            errorMessage && 'border-red-500 focus:ring-red-500',
            className
          )}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                {...register(name)}
                id={`${name}-${option.value}`}
                value={option.value}
                ref={ref}
                {...props}
              />
              <Label htmlFor={`${name}-${option.value}`}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
FormRadio.displayName = 'FormRadio'

interface FormSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
  error?: string
}

const FormSwitch = forwardRef<HTMLInputElement, FormSwitchProps>(
  ({ name, label, description, error, className, ...props }, ref) => {
    const { register, formState: { errors } } = useFormContext()
    const errorMessage = error || errors[name]?.message

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            {...register(name)}
            id={name}
            ref={ref}
            className={cn(
              errorMessage && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {label && (
            <Label htmlFor={name} className="text-sm font-medium">
              {label}
            </Label>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
FormSwitch.displayName = 'FormSwitch'

export {
  FormField,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadio,
  FormSwitch,
} 