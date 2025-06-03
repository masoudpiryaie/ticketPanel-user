import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf, faReply, faPauseCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import fetchApi from '../services/FetchApi';
import CustomSelect from './CustomSelect';
import TicketDetailsModal from './TicketDetailsModal'
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TableWithTabs = () => {
    const [activeTab, setActiveTab] = useState({
        tabName: "پاسخ داده شده",
        tabIndex: 0,
        statusId: ''
    });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [departId, setDepartId] = useState(null);
    const [filters, setFilters] = useState({ search: '', phoneNumber: '' });
    const [showModal, setShowModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const ticketStatuses = [
        { id: 1, name: "باز شده", icon: faHourglassHalf },
        { id: 2, name: "پاسخ داده شده", icon: faCheckCircle },
        { id: 3, name: "پاسخ مشتری", icon: faReply },
        { id: 4, name: "در حال بررسی", icon: faPauseCircle },
        { id: 5, name: "نگه داشته شده", icon: faPauseCircle },
        { id: 6, name: "بسته شده", icon: faTimesCircle }
    ];

    // let Home_URL = window?.nvApiSettings?.home;
    let Home_URL = "https://daroomokamel.ir/plugintest/"
    // let Home_URL = "https://daroomokamel.ir/plugintest";
    let API_URL = Home_URL + "wp-json/Nv-clientTickets/v1/";

    const fetchTicketData = async () => {
        const response = await axios.get(API_URL + 'tickets', {
            params: {
                page,
                pageSize,
                search: filters.search,
                phoneNumber: filters.phoneNumber,
                departId,
                statusId: activeTab.statusId
            }
        });
        return response.data;
    };

    const { data, isLoading, isError, refetch } = useQuery(
        ['tableData', filters, page, pageSize, departId, activeTab.statusId],
        fetchTicketData,
        {
            keepPreviousData: false,
            retry: 0, // Disable retries
            onError: () => {
                toast.error("خطا در بارگذاری داده‌ها. لطفاً دوباره تلاش کنید.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    );

    const handleTabClick = (tabIndex, tabName, statusId) => {
        setPage(1);
        setActiveTab({ tabName, tabIndex, statusId });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    const handleSearch = () => {
        setFilters({ search, phoneNumber });
        refetch();
    };

    const handleViewTicket = (ticketId) => {
        setSelectedTicketId(ticketId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTicketId(null);
    };

    const filteredData = data || [];

    return (
        <div className="container mx-auto p-4" dir="rtl">
            {/* Toast Container */}
            {/* <ToastContainer /> */}

            {/* Tabs */}
            <div className="flex mb-4">
                {ticketStatuses.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-grow px-4 py-2 mx-4 rounded-md transition-transform duration-200 flex items-center justify-center space-x-2 
                                    ${activeTab.tabIndex === index ? 'bg-gray-700 text-white scale-110' : 'bg-gray-50 text-gray-500 border shadow-lg'}`}
                        style={{ padding: activeTab.tabIndex === index ? '12px 20px' : '8px 16px', fontSize: activeTab.tabIndex === index ? '18px' : '14px' }}
                        onClick={() => handleTabClick(index, tab.name, tab.id)}
                    >
                        <FontAwesomeIcon icon={tab.icon} className={`${activeTab.tabIndex === index ? 'text-xl' : 'text-lg'}`} />
                        <span className='px-2'>{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* Filter Fields */}
            <div className="mb-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="جستجو در پیام"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded shadow"
                />
                <input
                    type="text"
                    placeholder="شماره تلفن"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border px-4 py-2 rounded shadow"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-[#514737] text-white rounded shadow hover:bg-orange-600 transition"
                >
                    جستجو
                </button>

            </div>

            {/* Loader or Error */}
            {isLoading && <Loader />}
            {/* {isError && <div className="text-center py-4 text-red-500">خطا در بارگذاری داده‌ها</div>} */}

            {/* Table Container */}
            <div className="rounded-lg overflow-y-scroll shadow-lg border border-gray-500" style={{ height: '500px' }}>
                {/* Grid headers */}
                <div className="grid grid-cols-6 p-5 m-4 rounded-lg shadow-lg border border-gray-500">
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">شماره تیکت</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">عنوان</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">موضوع</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">نام مشتری</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">آخرین پیام</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">تاریخ آخرین پیام</div>
                </div>

                {/* Grid data */}
                <div className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-6 hover:bg-gray-50 py-2 px-4 cursor-pointer" // Add cursor-pointer for better UX
                            onClick={() => handleViewTicket(item.id)} // Make the whole row clickable
                        >
                            <div className="text-center">{item.id}</div>
                            <div className="text-center">{item.title}</div>
                            <div className="text-center">{item.subjectTitle}</div>
                            <div className="text-center">{item.clientName}</div>
                            <div className="text-center">{item.lastMessageBody}</div>
                            <div className="text-center">{item.lastMessageDate}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center my-4">
                <div className="flex items-center space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-700 text-white align-middle rounded-md transition duration-200 disabled:bg-gray-300"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        قبلی
                    </button>
                    <span className="self-center px-3">صفحه {page}</span>
                    <button
                        className="px-4 py-2 bg-gray-700 text-white rounded-md transition duration-200 disabled:bg-gray-300"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={filteredData.length < pageSize}
                    >
                        بعدی
                    </button>
                </div>
                <div>
                    <span className="self-center px-3">تعداد نمایش:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="border border-gray-500 rounded-md shadow-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            {/* Modal for viewing single ticket */}
            {showModal && (
                <TicketDetailsModal
                    ticketId={selectedTicketId}
                    show={showModal}
                    onClose={handleCloseModal}
                />

            )}
        </div>
    );
};

export default TableWithTabs;
