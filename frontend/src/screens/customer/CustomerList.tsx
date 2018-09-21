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

type Customer = {
  _id: string,
  name: string;
  rewardsNumber: string;
  companyId: number;
  createDate: Date;
  dob: Date;
  email: string;
};

type State = {
  quantityPerPage: number,
  page: number,
  data: Array<Customer>
}

class CustomerList extends React.Component<Props, State> {

  state = {
    quantityPerPage: 10,
    page: 0,
    data: [],
  };

  handleDelete = async (item: Customer) => {
    const { showSnackbar } = this.props;
    const { data } = this.state;
    try {
      const { status, message } = await api(`/customer/${item._id}`, 'delete');
      if (status === 200) {
        showSnackbar({ message });
        const deletedIndex = data.findIndex((row: Customer) => row._id === item._id);
        return this.setState({ data: [...data.slice(0, deletedIndex), ...data.slice(deletedIndex + 1)]})
      }
      return showSnackbar({ message: 'An error occurred when try to delete a company'});
    } catch (e) {
      return showSnackbar({ message: 'An error occurred when try to delete a company'});
    }
  };

  handleEdit = async (item: Customer) => {
    return this.props.history.push(`/customers/edit/${item._id}`);
  }

  async componentDidMount() {
    const { data } = await api('/customer');
    this.setState({ data });
  }

  tableColumns = [
    {
      property: 'name',
      header: {
        label: 'Name',
      }
    },
    {
      property: 'name',
      header: {
        label: 'Email',
      }
    },
    {
      property: 'companyId',
      header: {
        label: 'Customer Id'
      }
    },
    {
      property: 'rewardsNumber',
      header: {
        label: 'Rewards Number'
      }
    },
    {
      type: 'date',
      property: 'dob',
      header: {
        label: 'DOB'
      }
    },
    {
      type: 'date',
      property: 'createDate',
      header: {
        label: 'Create Date'
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
    const { data } = this.state;
    const { history } = this.props;

    return (
      <React.Fragment>
        <ButtonWrapper>
          <Button variant={'contained'} onClick={() => history.push('/customers/add')} color={'primary'}>
            Add Customer
          </Button>
        </ButtonWrapper>
        <Table
          columns={this.tableColumns}
          data={data}
        />
      </React.Fragment>

    )
  }
}

export default withSnackbar(CustomerList);
