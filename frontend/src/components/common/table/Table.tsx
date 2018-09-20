import React from 'react';
import TableMUI from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import TableHeader from './TableHeader';
import TableBody from './TableBody';


const Wrapper = styled(Paper)`
  width: 100%;
`;

const StyledTable = styled(TableMUI)`
  min-width: 60%;
`;

const EmptyMessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 26px;
  margin: 20px;
`;

export type Column = {
  type?: string,
  property: string,
  icon?: string,
  onClick?: (item: Item) => void,
  header: {
    label: string,
  },
}

export type Item = {
  [key: string]: Item | string | number,
}

type Props = {
  columns: Array<Column>,
  handleChangePage: (forward: true) => void,
  onRowClick: (item: Item) => void,
  data: Array<Item>,
  emptyMessage?: string,
}

export default class Table extends React.Component <Props>{

  render() {
    const { columns, data, onRowClick, emptyMessage = 'Nenhum resultado encontrado :(' } = this.props;

    if (!data.length) {
      return (
        <EmptyMessage>
          {emptyMessage}
        </EmptyMessage>

      )
    }

    return (
      <Wrapper>
        <StyledTable>
          <TableHeader columns={columns}/>
          <TableBody data={data} columns={columns} onRowClick={onRowClick}/>
        </StyledTable>
      </Wrapper>
    );
  }
}
