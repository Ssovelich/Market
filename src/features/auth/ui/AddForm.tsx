import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@shared/ui'
import { Button } from '@shared/ui'
import { Select } from '@shared/ui'
import { Textarea } from '@shared/ui'
import { Switch } from '@shared/ui'
import { FaPlus } from 'react-icons/fa'
import { AdFormInputs } from '../model/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { adFormSchema } from '../model/yupSchema'

export const CreateAdForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<AdFormInputs>({ resolver: yupResolver(adFormSchema) })

      const handleFormSubmit = (data: AdFormInputs) => { 
        console.log(data)
        reset()
    }

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className="mx-auto flex w-full max-w-[335px] flex-col lg:max-w-90"
    >
      {/* Describe in detail */}
      <p className="mb-4 text-lg font-medium">Describe in detail</p>
      <div className="flex flex-col gap-5">
        <Input label="Enter a name" name="name" register={register} error={errors.name?.message} />
        <Select 
          label="Category" 
          name="category" 
          options={["Electronics", "Furniture", "Clothing", "Vehicles"]} 
          register={register} 
          error={errors.category?.message} 
        />
      </div>

      {/* Photo */}
      <p className="mt-8 mb-4 text-lg font-medium">Photo</p>
      <div className="grid grid-cols-4 gap-2">
        <button type="button" className="flex h-20 w-20 items-center justify-center border border-gray-300">
          <FaPlus className="text-gray-500" />
        </button>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="h-20 w-20 border border-gray-300"></div>
        ))}
      </div>

      {/* Description */}
      <p className="mt-8 mb-4 text-lg font-medium">Description</p>
      <Textarea name="description" register={register} error={errors.description?.message} />

      {/* Auto-continue */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-lg font-medium">Auto-continue</p>
        <Switch name="autoContinue" register={register} />
      </div>

      {/* Location */}
      <p className="mt-8 mb-4 text-lg font-medium">Location</p>
      <Select 
        label="Select location" 
        name="location" 
        options={["Kyiv", "Lviv", "Ternopil", "Dnipro"]} 
        register={register} 
        error={errors.location?.message} 
      />

      {/* Your contact details */}
      <p className="mt-8 mb-4 text-lg font-medium">Your contact details</p>
      <div className="flex flex-col gap-5">
        <Input label="Contact person" name="contactPerson" register={register} error={errors.contactPerson?.message} />
        <Input label="Email-address" type="email" name="email" register={register} error={errors.email?.message} />
        <Input label="Phone number" type="tel" name="phone" register={register} error={errors.phone?.message} />
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        <a href="#" className="text-blue-500">Preview</a>
        <Button type="submit" variant="tertiary">Publish</Button>
      </div>
    </form>
  )
}
