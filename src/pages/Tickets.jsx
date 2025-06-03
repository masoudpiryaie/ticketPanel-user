import React, { useState } from 'react';
import TableWithTabs from '../components/TableWithTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewTicketModal from '../components/NewTicketModal';
import axios from 'axios';

const Tickets = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    let Home_URL = window?.nvApiSettings?.home;
    const siteUrl = Home_URL + 'wp-json/Nv-adminTickets/v1'

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    // const siteUrl = 'https://daroomokamel.ir/plugintest/wp-json/Nv-clientTickets/v1'
    let Home_URL = window?.nvApiSettings?.home;

    const handleFormSubmit = async (formData) => {
        try {
<<<<<<< HEAD
            let api = siteUrl + '/tickets'
=======
            let api = Home_URL + 'wp-json/Nv-clientTickets/v1/tickets'
>>>>>>> a1a6d3ceafdf7ea8ea4fa16793e97edcf11d4b67
            const formDataInput = new FormData()
            formDataInput.append('Ticket_department', formData.departmentId)
            formDataInput.append('Ticket_title', formData.subject)
            formDataInput.append('msg', formData.message)
            formDataInput.append('attachment', formData.attachment)

            const resp = axios.post(api, formDataInput)
            // Simulate an API request
            console.log('Sending ticket data:', formData);

            // Close the modal
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to submit ticket:', error);
        }
    };

    return (
        <div className="container mx-auto my-4 p-4" dir="rtl">
            {/* <button
                className='rounded-md bg-gray-700 px-6 py-2 text-white my-6'
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon icon={faPlus} />
                <span className='px-2'>تیکت جدید</span>
            </button> */}

            {/* <NewTicketModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
            /> */}
            <TableWithTabs />
        </div>
    );
}

export default Tickets;
