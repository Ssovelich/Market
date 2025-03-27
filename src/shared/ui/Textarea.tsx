import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ValidationError } from '../utils'

type TextareaProps<T extends FieldValues = FieldValues> = Partial<{
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  error: string
  className: string
  validate: boolean
  placeholder: string
}>

export const Textarea = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  className,
  validate = true,
  placeholder = '',
}: TextareaProps<T>) => {
  return (
    <div className="relative flex flex-col">
      {label && <label htmlFor={name} className="mb-2 text-sm font-medium">{label}</label>}
      <textarea
        id={name}
        placeholder={placeholder}
        rows={4}
        {...(validate && register && name ? register(name) : {})}
        className={twMerge(
          'w-full rounded-xl border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none',
          'transition-all duration-300 ease-in-out hover:shadow-[0px_4px_6px_2px_#0a1828]',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
      />
      {validate && error && <ValidationError error={error} />}
    </div>
  )
}
