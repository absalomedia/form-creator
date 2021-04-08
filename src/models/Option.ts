import { Schema, Document, model } from 'mongoose'

export interface IOption extends Document {
  value: string
}

export const Option = new Schema({
  value: { type: String, required: true },
})

export default model<IOption>('Option', Option)
