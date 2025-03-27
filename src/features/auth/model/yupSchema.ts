import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Required'),
  password: Yup.string().min(4, 'Too Short!').required('Required'),
})

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'First name is too short!')
    .max(20, 'First name is too long!')
    .required('First name is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(4, 'Password is too short!')
    .required('Password is required'),
})

export const adFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short!')
    .max(20, 'Name is too long!')
    .required('Name is required'),

  category: Yup.string()
    .required('Category is required'),

  photos: Yup.array()
    .of(Yup.string().url('Invalid image URL'))
    .max(7, 'You can upload up to 7 images'),

  description: Yup.string()
    .min(40, 'Description is too short!')
    .max(1000, 'Description is too long!')
    .required('Description is required'),

  autoContinue: Yup.boolean(),

  location: Yup.string()
    .required('Location is required'),

  contactPerson: Yup.string()
    .min(3, 'Contact person name is too short!')
    .max(50, 'Contact person name is too long!')
    .required('Contact person is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  phoneNumber: Yup.string()
    .required('Phone number is required'),
});
