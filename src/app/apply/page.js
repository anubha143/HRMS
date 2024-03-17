'use client'

import { useRouter } from "next/navigation";
import Navbar from "@/src/components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import Image from "next/image";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Context, users } from "../../components/context";

const Apply = ({ searchParams }) => {
    let user = searchParams.user

    if (user) {
        user = JSON.parse(JSON.parse(user))
    }

    const [dates, setDates] = useState({ start: null, end: null })
    const [type, setType] = useState('')
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const router = useRouter()

    const userIndex = users.findIndex(u => u.name === user.name)

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = () => {
        if (!dates?.start || !dates?.end || !type || !reason) {
            alert('Please fill all the details...')
            return;
        }
        setLoading(true)
        let today = new Date().toDateString()
        today = today.substring(4, today.length)

        let start = new Date(dates.start).toDateString()
        start = start.substring(4, start.length)

        let end = new Date(dates.end).toDateString()
        end = end.substring(4, end.length)

        setTimeout(() => {
            context.dispatch({ type: 'add_leave', data: { type, period: `${start} - ${end}`, req_date: today, reason, status: 'pending', employee: userIndex } })
            setLoading(false)
            router.push('/')
        }, 1500)
    }

    return <>
        <Navbar user={user} />
        <div className="flex bg-white space-x-4">
            <Sidebar user={user} />
            <div className="p-4">
                <h1 className="text-3xl font-bold my-8">Apply Leave</h1>
                <div className="my-12">
                    <div className="flex items-center space-x-4">
                        <Image src="/assets/employee.png" alt="avatar" width={40} height={40} className="rounded-full" />
                        <p className="text-lg font-medium">{user?.name}</p>
                    </div>
                    <div className="max-w-lg">
                        <div className="grid grid-cols-3 gap-4 items-center py-8">
                            <div>Date</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="From"
                                    value={dates?.start}
                                    onChange={(newValue) => setDates({ ...dates, start: newValue })} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="To"
                                    value={dates?.end}
                                    onChange={(newValue) => setDates({ ...dates, end: newValue })} />
                            </LocalizationProvider>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center py-8">
                            <div>Leave Type</div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="sick">Sick Leave</MenuItem>
                                    <MenuItem value="vacation">Vacation Leave</MenuItem>
                                    <MenuItem value="annual">Annual Leave</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="grid grid-cols-3 gap-4 items-center py-8">
                            <div>Reason</div>
                            <TextField
                                id="outlined-multiline-static"
                                label="Reason"
                                multiline
                                rows={4}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="col-span-2"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button disabled={loading} onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Apply;