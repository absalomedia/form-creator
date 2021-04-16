import { array, boolean, object, optional, string, size } from 'superstruct'

const FormValidation = object({
  title: size(string(), 1),
  description: size(string(), 1),
  completeTitle: size(string(), 1),
  completeDescription: size(string(), 1),
  dateOfExpire: size(string(), 1),
  formFields: array(
    object({
      id: string(),
      name: optional(string()),
      label: string(),
      required: boolean(),
      fieldType: string(),
      options: optional(array(string())),
      max: optional(string()),
      min: optional(string()),
      regexp: optional(string()),
      placeholder: optional(string()),
    })
  ),
})

export default FormValidation
