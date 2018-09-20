import * as React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import api from '../../api/api';
import { Table } from "../../components/common";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  width: 100%;
`;

type Props ={}

type Company = {
  name: string,
  companyId: string,
  createDate: string,
};

type State = {
  quantityPerPage: number,
  page: number,
  data: Array<Company>
  isLoading: boolean,
}

export default class CompanyList extends React.Component<Props, State> {

  state = {
    quantityPerPage: 10,
    page: 0,
    data: [],
    isLoading: true,
  };

  handleDelete = (item: Company) => { console.log(item) };

  handlePageChange = (forward: true) => { };

  handleDetail = (item: Company) => { };

  handleLoading = (isLoading: boolean, callback: Function) => this.setState({ isLoading }, callback);

  async componentDidMount() {
    const { data } = await api('/company');
    this.setState({ isLoading: false, data });
  }

  tableColumns = [
    {
      property: 'name',
      header: {
        label: 'Name',
      }
    },
    {
      property: 'companyId',
      header: {
        label: 'CompanyId'
      }
    },
    {
      property: 'createDate',
      header: {
        label: 'CreateDate'
      }
    },
    {
      property: 'remove',
      type: 'icon',
      icon: 'delete',
      onClick: this.handleDelete,
      header: {
        label: 'Remove'
      }
    }
  ];

  render() {
    const { data, isLoading } = this.state;

    return (
      <React.Fragment>
        <ButtonWrapper>
          <Button variant={'contained'} color={'primary'}>
            Add Company
          </Button>
        </ButtonWrapper>
        <Table
          columns={this.tableColumns}
          handleChangePage={this.handlePageChange}
          onRowClick={this.handleDetail}
          data={data}
          handleLoading={this.handleLoading}
          isLoading={this.isLoading}
        />
      </React.Fragment>

    )
  }
}
