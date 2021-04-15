/* eslint-disable @typescript-eslint/no-empty-function */
import { Input } from 'models/FormField'
import React, { createContext, useContext } from 'react'
import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  CHECKBOX_CHANGE,
  DELETE_INPUT,
  DELETE_OPTION,
  LABEL_CHANGE,
  NEW_INPUT,
  OPTION_ADD,
  PLACEHOLDER_CHANGE,
  UPDATE_VALIDATION,
} from './constants'

export interface IFormField {
  id: string
  label: string
  required: boolean
  fieldType: Input
  options?: string[]
  name: string
  max?: string
  min?: string
  regexp?: string
  placeholder?: string
}

type Actions =
  | { type: typeof NEW_INPUT; payload: { inputType: string } }
  | { type: typeof LABEL_CHANGE; payload: { id: string; inputValue: string } }
  | { type: typeof CHECKBOX_CHANGE; payload: { id: string; checked: boolean } }
  | {
      type: typeof PLACEHOLDER_CHANGE
      payload: { id: string; inputValue: string }
    }
  | { type: typeof OPTION_ADD; payload: { id: string; option: string } }
  | { type: typeof DELETE_INPUT; payload: { id: string } }
  | { type: typeof DELETE_OPTION; payload: { id: string; option: string } }
  | {
      type: typeof UPDATE_VALIDATION
      payload: { id: string; regexp: string; min: string; max: string }
    }

const reducer = (state: IFormField[], action: Actions) => {
  switch (action.type) {
    case NEW_INPUT:
      return [
        ...state,
        {
          id: uuidv4(),
          label: 'Default label',
          required: false,
          fieldType: action.payload.inputType,
          name: '',
        },
      ] as IFormField[]
    case LABEL_CHANGE: {
      const prevState = [...state]
      const index = prevState.findIndex((el) => el.id === action.payload.id)
      prevState[index] = {
        ...prevState[index],
        label: action.payload.inputValue,
      }
      return [...prevState]
    }
    case CHECKBOX_CHANGE: {
      const prevState = [...state]
      const index = prevState.findIndex((el) => el.id === action.payload.id)
      prevState[index] = {
        ...prevState[index],
        required: action.payload.checked,
      }
      return [...prevState]
    }
    case PLACEHOLDER_CHANGE: {
      const prevState = [...state]
      const index = prevState.findIndex((el) => el.id === action.payload.id)
      prevState[index] = {
        ...prevState[index],
        placeholder: action.payload.inputValue,
      }
      return [...prevState]
    }
    case OPTION_ADD: {
      const prevState = [...state]
      const index = prevState.findIndex((el) => el.id === action.payload.id)
      const options = prevState[index].options || []
      prevState[index] = {
        ...prevState[index],
        options: [...options, action.payload.option],
      }
      return [...prevState]
    }
    case DELETE_INPUT: {
      const newState = state.filter((input) => input.id !== action.payload.id)
      return [...newState]
    }
    case UPDATE_VALIDATION: {
      const prevState = [...state]
      const index = prevState.findIndex((el) => el.id === action.payload.id)
      prevState[index] = {
        ...prevState[index],
        regexp: action.payload.regexp,
        min: action.payload.min,
        max: action.payload.max,
      }

      return [...prevState]
    }
    case DELETE_OPTION: {
      const prevState = [...state]
      const index = prevState.findIndex((el) => el.id === action.payload.id)
      prevState[index].options = prevState[index].options?.filter(
        (el) => el !== action.payload.option
      )

      return [...prevState]
    }
    default:
      return [...state]
  }
}
interface IFormData {
  title: string
  description: string
  completeTitle: string
  completeDescription: string
  dateOfExpire: string
}

const FormCtx = createContext<{
  form: IFormField[]
  dispatch: React.Dispatch<Actions>
  handleCreateNewForm: (data: IFormData) => Promise<void>
}>({
  form: [] as IFormField[],
  dispatch: () => null,
  handleCreateNewForm: async () => {},
})

const FormCtxProvider: React.FC = ({ children }) => {
  const [form, dispatch] = useReducer(reducer, [] as IFormField[])

  const handleCreateNewForm = async (data: IFormData) => {
    try {
      const response = await fetch('/api/form', {
        body: JSON.stringify({ ...data, formFields: form }),
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      })

      const createdForm = await response.json()
      console.log(createdForm)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FormCtx.Provider value={{ form, dispatch, handleCreateNewForm }}>
      {children}
    </FormCtx.Provider>
  )
}

export default FormCtxProvider

const useForm = () => useContext(FormCtx)

export { useForm }