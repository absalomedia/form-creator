import { Schema, Document, model, models } from 'mongoose'

export interface IOption extends Document {
  value: string
}

export const OptionModel = new Schema({
  value: { type: String, required: true },
})

export default models.OptionModel || model<IOption>('OptionModel', OptionModel)
