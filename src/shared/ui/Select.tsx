import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ValidationError } from '../utils'

type SelectProps<T extends FieldValues = FieldValues> = Partial<{
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  options: string[]
  error: string
  className: string
  validate: boolean
  placeholder: string
}>

export const Select = <T extends FieldValues>({
  label,
  name,
  register,
  options = [],
  error,
  className,
  validate = true,
  placeholder = 'Choose an option',
}: SelectProps<T>) => {
  return (
    <div className="relative flex flex-col">
      {label && <label htmlFor={name} className="mb-2 text-sm font-medium">{label}</label>}
      <select
        id={name}
        defaultValue=""
        {...(validate && register && name ? register(name) : {})}
        
        className={twMerge(
          'h-11 w-full rounded-xl border px-4 py-2 text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none',
          'transition-all duration-300 ease-in-out hover:shadow-[0px_4px_6px_2px_#0a1828]',
          error ? 'border-red-500' : 'border-gray-300',
          'text-gray-500 invalid:text-gray-500',
          className
        )}
      >
        <option value="" disabled >{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
      {validate && error && <ValidationError error={error} />}
    </div>
  )
}
