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
}>

export const Select = <T extends FieldValues>({
  label,
  name,
  register,
  options = [],
  error,
  className,
  validate = true,
}: SelectProps<T>) => {
  return (
    <div className="relative flex flex-col">
      {label && <label htmlFor={name} className="mb-2 text-sm font-medium">{label}</label>}
      <select
        id={name}
        {...(validate && register && name ? register(name) : {})}
        className={twMerge(
          'h-11 w-full rounded-xl border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none',
          'transition-all duration-300 ease-in-out hover:shadow-[0px_4px_6px_2px_#0a1828]',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
      >
        <option value="" disabled selected>Choose an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {validate && error && <ValidationError error={error} />}
    </div>
  )
}
