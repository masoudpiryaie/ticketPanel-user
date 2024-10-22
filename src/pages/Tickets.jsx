import React from 'react'
import TableWithTabs from '../components/TableWithTabs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { QueryClient } from 'react-query';
const queryClient = new QueryClient();


const Tickets = () => {
    const navigate = useNavigate(); // Create navigate instance
    return (
        <div className="container mx-auto p-4" dir="rtl">
            <button
                className='rounded-md bg-gray-700 px-6 py-2 text-white my-6'
                onClick={() => navigate('/addticket')} // Navigate to AddTicket
            >
                <FontAwesomeIcon icon={faPlus} />
                <span className='px-2'>تیکت جدید</span>
            </button>
            <TableWithTabs />
        </div>
    )
}

export default Tickets