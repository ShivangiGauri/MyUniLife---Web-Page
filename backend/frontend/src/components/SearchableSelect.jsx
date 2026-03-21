import { useState, useRef, useEffect } from "react";

export default function SearchableSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);
    setIsOpen(true);
    if (val.trim() === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(options.filter(opt => opt.toLowerCase().includes(val.toLowerCase())));
    }
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          setIsOpen(true);
          setFilteredOptions(options);
        }}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border bg-white dark:bg-[#1A1A22] dark:border-gray-600 focus:outline-[#9F7AEA] transition-colors"
      />
      
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#1A1A22] border dark:border-gray-600 rounded-lg shadow-lg">
          {filteredOptions.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleOptionClick(option)}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm transition-colors"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
