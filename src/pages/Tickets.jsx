import React, { useState } from 'react';
import TableWithTabs from '../components/TableWithTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewTicketModal from '../components/NewTicketModal';

const Tickets = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormSubmit = async (formData) => {
        try {
            // Simulate an API request
            console.log('Sending ticket data:', formData);

            // Close the modal
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to submit ticket:', error);
        }
    };

    return (
        <div className="container mx-auto p-4" dir="rtl">
            <button
                className='rounded-md bg-gray-700 px-6 py-2 text-white my-6'
                onClick={handleOpenModal}
            >
                <FontAwesomeIcon icon={faPlus} />
                <span className='px-2'>تیکت جدید</span>
            </button>

            <NewTicketModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
            />
            <TableWithTabs />
        </div>
    );
}

export default Tickets;
