import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Context, users } from '../context';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const headers = [
  'Leave Type',
  'Leave Period',
  'Request Date',
  'Reason',
  'Status'
]

export default function LeaveTable({ user }) {
  const context = useContext(Context);
  //user index
  const userIndex = users.findIndex(u => u.name === user.name)

  //filter my leaves 
  const leaves = context.state.leaves.filter(leave => leave.employee === userIndex)

  return (
    <TableContainer className='w-full' component={Paper}>
      <Table className='w-full' aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, key) => (
              <TableCell key={key} className='font-bold' {...(key === 0 ? {} : { align: 'right' })}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((row, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className='capitalize'>{row.type}</TableCell>
              <TableCell align="right">{row.period}</TableCell>
              <TableCell align="right">{row.req_date}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right" className={`capitalize ${row.status === 'approved' ? 'text-green-600' : (row.status === 'pending' ? 'text-yellow-500' : 'text-red-600')}`}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}