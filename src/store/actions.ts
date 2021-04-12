import { Input } from 'models/FormField'
import {
  CHECKBOX_CHANGE,
  LABEL_CHANGE,
  NEW_INPUT,
  OPTION_ADD,
  PLACEHOLDER_CHANGE,
} from './constants'

export const addNewInput = (inputType: Input) => {
  return {
    type: NEW_INPUT as typeof NEW_INPUT,
    payload: { inputType },
  }
}

export const handleLabelChange = (id: string, inputValue: string) => {
  return {
    type: LABEL_CHANGE as typeof LABEL_CHANGE,
    payload: {
      id,
      inputValue,
    },
  }
}

export const handleCheckboxChange = (id: string, checked: boolean) => {
  return {
    type: CHECKBOX_CHANGE as typeof CHECKBOX_CHANGE,
    payload: {
      id,
      checked,
    },
  }
}

export const handlePlaceholderChange = (id: string, inputValue: string) => {
  return {
    type: PLACEHOLDER_CHANGE as typeof PLACEHOLDER_CHANGE,
    payload: {
      id,
      inputValue,
    },
  }
}

export const handleAddingNewOption = (id: string, option: string) => {
  return {
    type: OPTION_ADD as typeof OPTION_ADD,
    payload: {
      id,
      option,
    },
  }
}
