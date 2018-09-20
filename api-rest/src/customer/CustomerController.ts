import mongoose from 'mongoose';

import { escapeRegex } from '../utils';
import Customer, { CustomerCreateValidationSchema, CustomerUpdateValidationSchema, ICustomer } from './CustomerModel';

export const create = async (customer: ICustomer) => {
  await CustomerCreateValidationSchema.validate(customer);
  return (new Customer(customer)).save();
};

export const update = async (id: mongoose.Schema.Types.ObjectId, customer: ICustomer) => {
  const customerToUpdate = await Customer.findOne({ _id: id });

  if (!customerToUpdate) throw new Error('NOT_FOUND:COMPANY');

  const updatedCustomer = { ...customerToUpdate, customer };
  await CustomerUpdateValidationSchema.validate(updatedCustomer);

  return customerToUpdate.save();
};

export const getOne = async(id: mongoose.Schema.Types.ObjectId) => {
  const customer = await Customer.findOne({ _id: id });

  if (!customer) throw new Error('NOT_FOUND:COMPANY');

  return customer;
};

type Params = {
  search: string,
  page: number,
  rowsPerPage: number
}

export const getAll = async ({ page = 0, rowsPerPage = 10, search = '' }: Params) => {
  const skip = page * rowsPerPage;
  const where = {
    name: {
      $regex: new RegExp(`${escapeRegex(search)}`, 'ig'),
    },
  };
  return Customer.find(where).skip(skip).limit(rowsPerPage);
};

export const remove = async (id: mongoose.Schema.Types.ObjectId) => {
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  if (!deletedCustomer) throw new Error('NOT_FOUND:COMPANY');
  return deletedCustomer;
};

