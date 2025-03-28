import { FC } from 'react'
import { CreateAdForm } from '@features/auth'

export const CreatePage: FC = () => {
  return (
    <div className="container mt-20 flex flex-col">
      <h2 className="mb-4 text-[36px] font-semibold">Create an ad</h2>
      <CreateAdForm />
    </div>
  )
}
