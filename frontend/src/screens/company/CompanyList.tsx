import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
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

type Props = {} & RouteComponentProps<{}>;

type Company = {
  _id: string,
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

  handleEdit = async (item: Company) => this.props.history.push(`/companies/edit/${item._id}`);

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
      type: 'date',
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
      },
    },
    {
      property: 'edit',
      type: 'icon',
      icon: 'edit',
      onClick: this.handleEdit,
      header: {
        label: 'Editar'
      }
    }
  ];

  render() {
    const { data, isLoading } = this.state;
    const { history } = this.props;

    return (
      <React.Fragment>
        <ButtonWrapper>
          <Button variant={'contained'} onClick={() => history.push('/companies/add')} color={'primary'}>
            Add Company
          </Button>
        </ButtonWrapper>
        <Table
          columns={this.tableColumns}
          handleChangePage={this.handlePageChange}
          onRowClick={this.handleDetail}
          data={data}
          handleLoading={this.handleLoading}
          isLoading={isLoading}
        />
      </React.Fragment>

    )
  }
}
