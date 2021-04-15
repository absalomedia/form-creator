import { Input } from 'models/FormField'
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

export const deleteInput = (id: string) => {
  return {
    type: DELETE_INPUT as typeof DELETE_INPUT,
    payload: { id },
  }
}

export const deleteOption = (id: string, option: string) => {
  return {
    type: DELETE_OPTION as typeof DELETE_OPTION,
    payload: { id, option },
  }
}

export const updateValidation = (
  id: string,
  { regexp, min, max }: { regexp: string; min: string; max: string }
) => {
  return {
    type: UPDATE_VALIDATION as typeof UPDATE_VALIDATION,
    payload: { id, regexp, min, max },
  }
}
