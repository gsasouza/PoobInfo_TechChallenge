import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import api from '../../api/api';
import { Table } from '../../components/common';
import { withSnackbar } from '../../hoc';
import { SnackbarContextProps } from '../../context/SnackbarContext';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  width: 100%;
`;

type Props = {} & RouteComponentProps<{}> & SnackbarContextProps;

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

class CompanyList extends React.Component<Props, State> {

  state = {
    quantityPerPage: 10,
    page: 0,
    data: [],
    isLoading: true,
  };

  handleDelete = async (item: Company) => {
    const { showSnackbar } = this.props;
    const { data } = this.state;
    try {
      const { status, message } = await api(`/company/${item._id}`, 'delete');
      if (status === 200) {
        showSnackbar({ message });
        const deletedIndex = data.findIndex((row: Company) => row._id === item._id);
        return this.setState({ data: [...data.slice(0, deletedIndex), ...data.slice(deletedIndex + 1)]})
      }
      return showSnackbar({ message: 'An error occurred when try to delete a company'});
    } catch (e) {
      return showSnackbar({ message: 'An error occurred when try to delete a company'});
    }
  };

  handleEdit = async (item: Company) => this.props.history.push(`/companies/edit/${item._id}`);

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
        label: 'Company Id'
      }
    },
    {
      property: 'customerId',
      header: {
        label: 'Customer Id'
      }
    },
    {
      type: 'date',
      property: 'createDate',
      header: {
        label: 'Create  Date'
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
        label: 'Edit'
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
          onRowClick={this.handleDetail}
          data={data}
          handleLoading={this.handleLoading}
          isLoading={isLoading}
        />
      </React.Fragment>

    )
  }
}

export default withSnackbar(CompanyList);
