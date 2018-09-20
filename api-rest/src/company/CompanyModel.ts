import mongoose, { Document } from 'mongoose';
import shortId from 'shortid';
import * as yup from 'yup';

export interface ICompany extends Document {
  name: string;
  companyId: string;
  createDate: string;
}

export const CompanyValidationSchema = yup.object().shape({
  name: yup.string().required(),
});

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    companyId: {
      type: String,
      default: shortId.generate,
    },
  },
  {
    timestamps: {
      createdAt: 'createDate',
    },
  },
);


export default mongoose.model('Company', Schema);
