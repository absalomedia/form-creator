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
} from './constants'

export interface IFormField {
  id: string
  label: string
  required: boolean
  fieldType: Input
  options?: string[]
  name: string
  maxLength?: string
  max?: number
  min?: number
  regexp?: RegExp
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

const FormCtx = createContext<{
  form: IFormField[]
  dispatch: React.Dispatch<Actions>
}>({
  form: [] as IFormField[],
  dispatch: () => null,
})

const FormCtxProvider: React.FC = ({ children }) => {
  const [form, dispatch] = useReducer(reducer, [] as IFormField[])

  return (
    <FormCtx.Provider value={{ form, dispatch }}>{children}</FormCtx.Provider>
  )
}

export default FormCtxProvider

const useForm = () => useContext(FormCtx)

export { useForm }
