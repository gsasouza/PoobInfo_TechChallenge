import * as React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

import { Item, Column } from './Table';

const Row = styled(TableRow)`
  cursor: pointer;
`;

type Props = {
  columns: Array<Column>,
  data: Array<Item>,
  onRowClick?: (item: Item) => void,
}

export default class Body extends React.Component<Props> {

  formatDate = (value: Date) => `${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`;

  getValue = (keys: Array<string>, item: string | Item, type?: string): string | Item => {
    if(!item) return '---';
    const [firstKey, ...rest] = keys;
    // @ts-ignore
    const value = item[firstKey];
    if (![...rest].length) {
      if (type === 'date') return this.formatDate(new Date(value));
      return value;
    }
    return this.getValue([...rest], value, type);
  };

  render() {
    const { data = [], columns, onRowClick } = this.props;
    return (
      <TableBody>
        {
          data.map((item, index) => (
            <Row key={index} hover>
              {
                columns.map((column, index) => {
                  if (column.type === 'icon') {
                    return (
                      <TableCell component="th" scope="row" key={`${item.id}:${index}`}>
                        <IconButton onClick={() => column.onClick!(item)}>
                          <Icon>
                            {column.icon}
                          </Icon>
                        </IconButton>
                      </TableCell>
                    )
                  }
                  const value = this.getValue(column.property.split('.'), item, column.type);
                  return (
                    <TableCell component="th" onClick={() => onRowClick ? onRowClick(item): {}} scope="row" key={`${item.id}:${value}:${index}`}>
                      {value}
                    </TableCell>
                  )
                })
              }
            </Row>
          ))
        }
      </TableBody>
    )
  }
}
