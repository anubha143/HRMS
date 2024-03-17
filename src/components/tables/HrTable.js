import { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Context, users } from '../context';
import Image from 'next/image';
import { Button } from '@mui/material';

const tabs = [{ name: 'Awaiting review' }, { name: 'Approved' }, { name: 'Rejected' }]

const headers = [
    'Employee',
    'Leave Type',
    'Leave Period',
    'Request Date',
    'Reason',
    'Status'
]


export default function HrLeaveTable() {
    const context = useContext(Context);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);

    //filter leaves according to the active tab and also add the index of the leave in the array
    const leaves = context.state.leaves.map((leave, index) => ({ ...leave, index })).filter(leave => {
        if (active === 0) {
            return leave.status === 'pending'
        } else if (active === 1) {
            return leave.status === 'approved'
        } else {
            return leave.status === 'rejected'
        }
    })

    const handleApprove = (index) => {
        setLoading(index)
        setTimeout(() => {
            context.dispatch({ type: 'approve_leave', index })
            setLoading(false)
        }, 1500)
    }

    const handleReject = (index) => {
        setLoading(index)
        setTimeout(() => {
            context.dispatch({ type: 'reject_leave', index })
            setLoading(false)
        }, 1000)
    }

    return (<>
        <div className='flex items-start py-4 space-x-4'>
            {tabs.map((tab, index) => (
                <div onClick={() => setActive(index)} key={index} className={`flex items-center justify-center border border-solid border-blue-100 px-2 py-1 rounded-xl cursor-pointer ${active === index ? 'bg-blue-600 text-white' : ''}`}>
                    {tab.name}
                </div>
            ))}
        </div>
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
                    {leaves.map((row) => (
                        <TableRow
                            key={row.index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <div className='flex items-center space-x-2'>
                                    <Image src={`/assets/${users[row.employee].dp}.png`} width={40} height={40} alt='employee' className='rounded-full' />
                                    <div>{users[row.employee].name}</div>
                                </div>
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.period}</TableCell>
                            <TableCell align="right">{row.req_date}</TableCell>
                            <TableCell align="right">{row.reason}</TableCell>
                            <TableCell align="right" className={`capitalize ${row.status === 'approved' ? 'text-green-600' : (row.status === 'pending' ? 'text-yellow-500' : 'text-red-600')}`}>
                                {row.status === 'pending' ? <div className='flex items-center space-x-2 justify-end'>
                                    <Button disabled={loading === row.index} onClick={() => handleApprove(row.index)} variant='contained' color='primary' size='small'>Approve</Button>
                                    <Button disabled={loading === row.index} onClick={() => handleReject(row.index)} variant='outlined' color='secondary' size='small'>Reject</Button>
                                </div> : row.status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    );
}