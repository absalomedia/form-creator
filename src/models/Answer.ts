import { Schema, model, Document, models, Model, ObjectId } from 'mongoose'

interface IAnswer extends Document {
  formId: ObjectId
  answers: [
    {
      label: string
      answer: string
    }
  ]
}

const AnswerSchema = new Schema(
  {
    formId: { type: Schema.Types.ObjectId, ref: 'Form' },
    answers: [
      {
        label: { type: String, required: true },
        answer: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true }
)

export default (models.Answer as Model<IAnswer>) ||
  model<IAnswer>('Answer', AnswerSchema)
