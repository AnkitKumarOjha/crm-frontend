import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ id }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null); // Now stores a single value
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const loadOptions = () => {
      const select = document.getElementById(id);
      if (select) {
        const newOptions = [];
        for (let i = 0; i < select.options.length; i++) {
          newOptions.push({
            value: select.options[i].value,
            text: select.options[i].innerText,
            selected: select.options[i].hasAttribute('selected'),
          });
        }
        setOptions(newOptions);
      }
    };

    loadOptions();
  }, [id]);

  const open = () => {
    setShow(true);
  };

  const isOpen = () => {
    return show === true;
  };

  const selectOption = (index) => {
    const newOptions = [...options];
    // Deselect previous option if there was one
    if (selected !== null) {
      newOptions[selected].selected = false;
    }
    // Select the new option
    newOptions[index].selected = true;
    setSelected(index);
    setOptions(newOptions);
    setShow(false); // Close dropdown after selecting
  };

  const selectedValue = () => {
    return selected !== null ? options[selected].value : '';
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownRef.current) return;
      if (!show || dropdownRef.current.contains(target) || trigger.current.contains(target)) return;
      setShow(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative z-50">
      <div>
        <select className="hidden" id={id}>
          <option value="ADMIN">Admin</option>
          <option value="SALES_REP">Sales Rep</option>
        </select>

        <div className="flex flex-col items-center">
          <input name="role" type="hidden" value={selectedValue()} />
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary">
                  <div className="flex flex-auto flex-wrap gap-3">
                    {selected !== null ? (
                      <div className="my-1.5 flex items-center justify-center rounded border px-2.5 py-1.5">
                        <div>{options[selected].text}</div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <input placeholder="Select a role" className="h-full w-full p-1 px-2 outline-none" readOnly />
                      </div>
                    )}
                  </div>
                  <div className="w-8">
                    <button type="button" onClick={open}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M5.29 8.29a1 1 0 0 1 1.42 0L12 13.59l5.29-5.3a1 1 0 1 1 1.42 1.42l-6 6a1 1 0 0 1-1.42 0l-6-6a1 1 0 0 1 0-1.42z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`absolute top-full left-0 z-40 w-full bg-white ${isOpen() ? '' : 'hidden'}`} ref={dropdownRef}>
                <div className="flex flex-col">
                  {options.map((option, index) => (
                    <div key={index} onClick={() => selectOption(index)} className="cursor-pointer hover:bg-gray-100">
                      <div className={`p-2 ${option.selected ? 'bg-blue-100' : ''}`}>{option.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
