import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentId: '',
        subject: '',
        message: '',
        attachment: null,
    });

    // Fetch departments from the API
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('https://daroomokamel.ir/plugintest/wp-json/Nv-clientTickets/v1/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Submit form data to parent component
        onClose(); // Close modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">ایجاد تیکت جدید</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Department Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">بخش</label>
                        <select
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="">انتخاب بخش</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">موضوع</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">پیام</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* Attachment Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">پیوست</label>
                        <input
                            type="file"
                            name="attachment"
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end space-x-2 mt-4 gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            انصراف
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-900"
                        >
                            ارسال
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTicketModal;
