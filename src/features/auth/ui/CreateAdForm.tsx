import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@shared/ui'
import { Button } from '@shared/ui'
import { Select } from '@shared/ui'
import { Textarea } from '@shared/ui'
import { Switch } from '@shared/ui'
import { AdFormInputs } from '../model/types'
import { MdOutlinePhotoCamera } from 'react-icons/md'
import { useRef, useState } from 'react'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { adFormSchema } from '../model/yupSchema'

const MAX_IMAGES = 7
const CATEGORY = [
  'Help',
  "Children's World",
  'Real Estate',
  'Cars',
  'Animals',
  'Home & Garden',
  'Electronics',
  'Business & Services',
  'Rent & Hire',
  'Fashion & Style',
  'Hobbies & Sports',
  'Giveaway',
  'Exchange',
  'Gamer Goods',
]
const LOCATION = ['Kyiv', 'Lviv', 'Ternopil', 'Dnipro']

export const CreateAdForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdFormInputs>({})

  const handleFormSubmit = (data: AdFormInputs) => {
    console.log(data)
    reset()
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(Array(MAX_IMAGES).fill(null))

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prevImages) => {
        const updatedImages = [...prevImages]
        let imageIndex = 0

        for (let i = 0; i < updatedImages.length && imageIndex < newImages.length; i++) {
          if (!updatedImages[i]) {
            updatedImages[i] = newImages[imageIndex]
            imageIndex++
          }
        }
        return updatedImages
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex w-320 flex-col gap-4">
      <div className="flex flex-col gap-6 rounded-[16px] bg-neutral-100 p-10 pr-94 pl-22">
        <h3 className="text-[32px] font-medium">Describe in detail</h3>
        <Input
          label="Enter a name"
          name="name"
          placeholder="Iphone 16 Pro Max"
          register={register}
          error={errors.name?.message}
        />
        <Select
          label="Category"
          name="category"
          options={CATEGORY}
          placeholder="Сhoose a category"
          register={register}
          error={errors.category?.message}
        />
      </div>

      <div className="rounded-[16px] bg-neutral-100 p-6 pr-[112] pl-22">
        <h3 className="mb-2 text-[36px] font-medium">Photo</h3>
        <p className="mb-10 text-[16px] font-medium text-gray-400">
          The first photo will be on the cover of the ad. Drag to change the order of the photos.
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-8">
          <Button
            type="button"
            variant="tertiary"
            className="bg-inh h-58 w-60 rounded-[16px] border-0 text-[24px] font-medium text-black"
            onClick={handleAddPhotoClick}
          >
            +Add photo
          </Button>

          <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

          {images.map((src, index) => (
            <div
              key={index}
              className="relative flex h-58 w-60 items-center justify-center overflow-hidden rounded-[16px] border border-gray-400 bg-gray-400"
            >
              {src ? (
                <img src={src} alt={`Uploaded ${index + 1}`} className="h-full w-full object-cover" />
              ) : (
                <MdOutlinePhotoCamera className="h-10 w-[45px] text-white" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-[16px] bg-neutral-100 p-[24px_88px]">
        <h3 className="text-lg font-medium">Description</h3>
        <Textarea
          name="description"
          className="h-[534px] w-[1100px]"
          register={register}
          placeholder="Add a description of your ad"
          error={errors.description?.message}
        />
      </div>
      <p className="mb-10 text-[24px] font-medium text-gray-400">Please enter at least 40 characters</p>

      <div className="flex items-center gap-[40px] rounded-[16px] bg-neutral-100 p-13 pl-22">
        <div>
          <h3 className="text-2xl font-medium">Auto-continue</h3>
          <p className="text-[16px] font-normal text-gray-400">The ad will be deactivated after 30 days</p>
        </div>
        <Switch name="autoContinue" register={register} />
      </div>

      <div className="flex flex-col gap-5 rounded-[16px] bg-neutral-100 p-11 pl-22">
        <Select
          label="Location"
          name="location"
          options={LOCATION}
          className="w-90"
          placeholder="Сhoose a district"
          register={register}
          error={errors.location?.message}
        />
      </div>

      <div className="flex flex-col gap-6 rounded-[16px] bg-neutral-100 p-6 pl-22">
        <h3 className="text-[36px] font-medium">Your contact details</h3>
        <Input
          label="Contact person"
          name="contactPerson"
          className="w-90"
          register={register}
          placeholder="Enter your name"
          error={errors.contactPerson?.message}
        />
        <Input
          label="Email-address"
          type="email"
          name="email"
          className="w-90"
          register={register}
          placeholder="Enter your email"
          error={errors.email?.message}
        />
        <Input
          label="Phone number"
          type="tel"
          name="phone"
          className="w-90"
          register={register}
          placeholder="Enter your phone"
          error={errors.phone?.message}
        />
      </div>

      <div className="mt-8 flex items-center justify-end gap-16 rounded-[16px] bg-neutral-100 p-9 pr-10">
        <a href="" className="text-[32px] font-medium text-black underline">
          Preview
        </a>
        <Button type="submit" variant="tertiary" className="h-[87px] w-[197px] bg-[#32ade6] text-[32px] font-medium">
          Publish
        </Button>
      </div>
    </form>
  )
}
