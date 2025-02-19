import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ComboDropdown = ({ apiUrl, onProductSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state added
    const inputRef = useRef(null);
    const selectedItemRef = useRef(null); // New ref to track selected item

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedItemRef.current === query) {
            selectedItemRef.current = null;
            return; // Prevent the search if the selected item is the same as the query
        }

        if (query.length >= 1) {
            fetchData(query);
        } else {
            fetchInitialData();
        }
    }, [query]); // Trigger fetch when query changes

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
        fetchInitialData();
    };

    const fetchInitialData = async () => {
        let url = apiUrl + '?search=';
        // setLoading(true); // Set loading to true
        try {
            const resp = await axios.get(url + query);
            setResults(resp.data);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        } finally {
            // setLoading(false); // Set loading to false
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const fetchData = async (query) => {
        let url = apiUrl + '?search=' + query;
        setLoading(true); // Set loading to true
        try {
            const resp = await axios.get(url);
            setResults(resp.data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            setShowDropdown(false);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleItemClick = (item) => {
        setQuery(item.display_name);
        selectedItemRef.current = item.display_name; // Set the selected item
        setResults([]);
        setShowDropdown(false);
        onProductSelect(item.ID); // Update the product field
        // setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    return (
        <div className="relative mt-1">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    ref={inputRef}
                    onClick={handleDropdown}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{ color: '#222222', fontSize: '12px' }}
                    className="absolute left-1 pointer-events-none" />

            </div>

            {/* {loading && <div className="loader mx-auto my-2"></div>} Spinner */}
            {loading &&
                <div className="absolute z-10 w-full bg-white shadow-lg max-h-80 min-h-10 rounded-md  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <div className="loader mx-auto my-2"></div>
                </div>}
            {showDropdown && !loading && (
                <ul className="absolute z-10 w-full bg-white shadow-lg max-h-80 min-h-10 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {results?.map((item, index) => (
                        <li
                            key={index}
                            className="cursor-default select-none relative py-1 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
                            onMouseDown={() => handleItemClick(item)}
                        >
                            {item.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboDropdown;
