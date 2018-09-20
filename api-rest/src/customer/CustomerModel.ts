import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import * as yup from 'yup';
import { MONGO_URI } from '../common/config';

const connection = mongoose.createConnection(MONGO_URI, { useNewUrlParser: true });
autoIncrement.initialize(connection);

export interface ICustomer {
  name: string;
  rewardsNumber: string;
  companyId: number;
  createDate: Date;
  dob: Date;
  email: string;
}

export const CustomerCreateValidationSchema = yup.object().shape({
  name: yup.string().required(),
  companyId: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.string().required(),
  rewardsNumber: yup.string().required(),
});

export const CustomerUpdateValidationSchema = yup.object().shape({
  name: yup.string(),
  companyId: yup.string(),
  email: yup.string().email(),
  dob: yup.string(),
  rewardsNumber: yup.string(),
});

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    rewardsNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      require: true,
    }
  },
  {
    timestamps: {
      createdAt: 'createDate',
    },
  },
);

Schema.plugin(autoIncrement.plugin, { model: 'Customer', field: 'customerId' });


export default mongoose.model('Customer', Schema);
