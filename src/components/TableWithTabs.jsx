import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf, faReply, faPauseCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import fetchApi from '../services/FetchApi';
import CustomSelect from './CustomSelect';

const TableWithTabs = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState({
        tabName: "پاسخ داده شده",
        tabIndex: 0
    });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const ticketStatuses = [
        { name: "پاسخ داده شده", icon: faCheckCircle },
        { name: "در حال بررسی", icon: faHourglassHalf },
        { name: "پاسخ مشتری", icon: faReply },
        { name: "نگه داشته شده", icon: faPauseCircle },
        { name: "بسته شده", icon: faTimesCircle }
    ];

    const fetchTicketData = async ({ queryKey }) => {
        const [_, tabName, page, pageSize] = queryKey;
        const response = await fetchApi.get(`Nv-adminTicets/v1/tikets?status=&page=${page}&pageSize=${pageSize}`);
        return response.data;
    };

    const { data, isLoading, isError } = useQuery(
        ['tableData', activeTab.tabName, page, pageSize],
        fetchTicketData,
        {
            keepPreviousData: true,
        }
    );

    const handleTabClick = (tabIndex, tabName) => {
        setPage(1);
        setActiveTab({
            tabName,
            tabIndex
        });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    if (isLoading) return <div className="text-center py-4">در حال بارگذاری...</div>;
    if (isError) return <div className="text-center py-4 text-red-500">خطا در بارگذاری داده‌ها</div>;

    const filteredData = data || [];

    return (
        <div className="container mx-auto p-4 overflow-auto" dir="rtl">
            {/* Tabs */}
            <div className="flex mb-4">
                {ticketStatuses.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-grow px-4 py-2 mx-4 rounded-md transition-transform duration-200 flex items-center justify-center space-x-2 
                                    ${activeTab.tabIndex === index ? 'bg-gray-700 text-white scale-110' : 'bg-gray-50 text-gray-500 border shadow-lg'}`}
                        style={{ padding: activeTab.tabIndex === index ? '12px 20px' : '8px 16px', fontSize: activeTab.tabIndex === index ? '18px' : '14px' }}
                        onClick={() => handleTabClick(index, tab.name)}
                    >
                        <FontAwesomeIcon icon={tab.icon} className={`${activeTab.tabIndex === index ? 'text-xl' : 'text-lg'}`} />
                        <span className='px-2'>{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* Grid Container */}
            <div className="overflow-hidden rounded-lg shadow-lg border border-gray-500" style={{ height: '400px' }}>
                {/* Grid headers */}
                <div className="grid grid-cols-3 p-5 m-4 rounded-lg shadow-lg border border-gray-500">
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">شماره تیکت</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">عنوان</div>
                    <div className="font-medium text-gray-700 px-2 py-1 text-center">موضوع</div>
                </div>

                {/* Grid data */}
                <div className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 hover:bg-gray-50 py-2 px-4">
                            <div className="text-center">{item.id}</div>
                            <div className="text-center">{item.title}</div>
                            <div className="text-center">{item.subjectTitle}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center my-4">
                {/* Pagination Controls */}
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

                {/* Custom Select for Page Size */}
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <label className="flex items-center">
                        ردیف‌ها در هر صفحه: {' '}
                        <CustomSelect
                            options={[5, 10, 20]}
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="ml-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TableWithTabs;
