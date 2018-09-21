import mongoose from 'mongoose';

import { escapeRegex } from '../utils';
import Company, { CompanyValidationSchema, ICompany } from './CompanyModel';

export const create = async (company: ICompany) => {
  await CompanyValidationSchema.validate(company);
  return (new Company(company)).save();
};

export const update = async (id: mongoose.Schema.Types.ObjectId, company: ICompany) => {

  await CompanyValidationSchema.validate(company);

  const companyToUpdate = await Company.findOneAndUpdate(
    {
      _id: id
    },
    {
      ...company
    }
  );

  if (!companyToUpdate) throw new Error('NOT_FOUND:COMPANY');

  return companyToUpdate;
};

export const getOne = async(id: mongoose.Schema.Types.ObjectId) => {
  const company = await Company.findOne({ _id: id });

  if (!company) throw new Error('NOT_FOUND:COMPANY');

  return company;
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
  return Company.find(where).skip(skip).limit(rowsPerPage);
};

export const remove = async (id: mongoose.Schema.Types.ObjectId) => {
  const deletedCompany = await Company.findByIdAndDelete(id);
  if (!deletedCompany) throw new Error('NOT_FOUND:COMPANY');
  return deletedCompany;
};

