import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



interface Column {
  id: 'date' | 'duration' | 'billedDuration' | 'maxMemUsed' | 'initDuration';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'date', label: 'Date (UTC)', minWidth: 170 },
  { id: 'duration', label: 'Duration\u00a0(ms)', minWidth: 100 },
  {
    id: 'billedDuration',
    label: 'Billed\u00a0Duration\u00a0(ms)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'maxMemUsed',
    label: 'Max\u00a0Memory\u00a0Used\u00a0(mb)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'initDuration',
    label: 'Init\u00a0Duration\u00a0(ms)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  date: string;
  duration: number;
  billedDuration: number;
  maxMemUsed: number;
  initDuration: (number | string);
}

function createData(
  date: string,
  duration: number,
  billedDuration: number,
  maxMemUsed: number,
  initDuration: (number | string)
): Data {
  return { date, duration, billedDuration, maxMemUsed, initDuration };
}

export default function LogTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(props.functionClick);

  React.useEffect(() => {
    const allRows = [];
    for(let i = 0; i < props.logData.length; i++) {
      let initDuration = 'N/A'
      if(props.logData[i].hasOwnProperty('InitDuration')) {
        initDuration = props.logData[i].InitDuration;
      }
      allRows.push(createData(props.logData[i].Date + " " + props.logData[i].Time, props.logData[i].Duration, props.logData[i].BilledDuration, props.logData[i].MaxMemUsed, initDuration));
    }
    setRows(allRows);
  }, [props.functionClick]);

  React.useEffect(() => {
    setPage(0)
  }, [props.logData]);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 230 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
