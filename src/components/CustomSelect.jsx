import { useEffect, useRef, useState } from "react";

const CustomSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleSelect = (option) => {
        setIsOpen(false); // Close the dropdown first
        onChange(option); // Then handle the option change
    };


    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative justify-between" ref={selectRef}>
            <button
                className="flex items-center justify-around w-16 border border-gray-500 rounded-md  py-1 mr-2 bg-white text-gray-500 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value} <span className="ml-1">▼</span>
            </button>
            {isOpen && (
                <ul className="absolute z-10 mt-1 w-16 border border-gray-500 rounded-md bg-white shadow-lg mx-2">
                    {options.map((option) => (
                        <li
                            key={option}
                            className="px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer transition duration-200"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;