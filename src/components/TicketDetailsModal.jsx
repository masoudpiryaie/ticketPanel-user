import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import fetchApi from '../services/FetchApi';

const TicketDetailsModal = ({ ticketId, show, onClose }) => {
    const [ticketData, setTicketData] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch the ticket details and messages
    useEffect(() => {
        if (ticketId && show) {
            fetchApi.get(`Nv-adminTickets/v1/tickets/${ticketId}`)
                .then(response => setTicketData(response.data))
                .catch(error => console.error('Error fetching ticket data:', error));
        }
    }, [ticketId, show]);

    const handleAddMessage = async () => {
        if (newMessage.trim()) {
            setIsSubmitting(true);
            try {
                await fetchApi.post(`Nv-adminTickets/v1/tickets/${ticketId}`, { msg: newMessage });
                setNewMessage('');
                const updatedData = await fetchApi.get(`Nv-adminTickets/v1/tickets/${ticketId}`);
                setTicketData(updatedData.data);
            } catch (error) {
                console.error('Error adding message:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (!ticketData) return null;

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 overflow-auto" > {/* Increased max-width for a larger modal */}
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-lg font-semibold">{ticketData.ticketInfo.title || 'جزئیات تیکت'}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                                &times;
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="mb-4">
                                <h5 className="font-medium">نام مشتری: {ticketData.ticketInfo.clientName}</h5>
                                <p>دپنارتمان: {ticketData.ticketInfo.department_title}</p>
                                <p>وضعیت: {ticketData.ticketInfo.status}</p>
                            </div>

                            <h6 className="font-semibold">گفتگو</h6>
                            <div className="flex flex-col space-y-3 mb-4"> {/* Use flex to position messages */}
                                {ticketData.messages.map((msg) => (
                                    <div key={msg.id} className={`message p-2 rounded-md shadow-sm ${msg.sender === 'client' ? 'bg-blue-100 text-right self-start' : 'bg-gray-100 text-right self-end'}`}>
                                        <p>{msg.body}</p>
                                        {msg.attachmentURL && (
                                            <a href={msg.attachmentURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                <FontAwesomeIcon icon={faPaperclip} /> پیوست
                                            </a>
                                        )}
                                        <small className="text-gray-500">{msg.date}</small>
                                    </div>
                                ))}
                            </div>

                            <div className="new-message mt-4">

                                <textarea
                                    placeholder="پیام جدید را اضافه کنید"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="w-full p-2 border rounded-md ml-2" // Add margin-left to the textarea
                                />

                            </div>
                            <div className="flex justify-end space-x-2 mt-4 gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    انصراف
                                </button>
                                <button
                                    onClick={handleAddMessage}
                                    disabled={isSubmitting}
                                    className={`h-10 px-3 rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} text-white`} // Smaller button
                                >
                                    {isSubmitting ? 'در حال ارسال...' : 'ارسال'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TicketDetailsModal;
