import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ id }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
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

  const select = (index, event) => {
    const newOptions = [...options];
    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      setSelected([...selected, index]);
    } else {
      const selectedIndex = selected.indexOf(index);
      if (selectedIndex !== -1) {
        newOptions[index].selected = false;
        setSelected(selected.filter((i) => i !== index));
      }
    }
    setOptions(newOptions);
  };

  const remove = (index) => {
    const newOptions = [...options];
    const selectedIndex = selected.indexOf(index);
    if (selectedIndex !== -1) {
      newOptions[index].selected = false;
      setSelected(selected.filter((i) => i !== index));
      setOptions(newOptions);
    }
  };

  const selectedValues = () => {
    return selected.map((option) => options[option].value);
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
          <option value="Admin">Admin</option>
          <option value="Sales_Rep">Sales Rep</option>
        </select>

        <div className="flex flex-col items-center">
          <input name="roles" type="hidden" value={selectedValues()} />
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary">
                  <div className="flex flex-auto flex-wrap gap-3">
                    {selected.map((index) => (
                      <div key={index} className="my-1.5 flex items-center justify-center rounded border px-2.5 py-1.5">
                        <div>{options[index].text}</div>
                        <div className="pl-2" onClick={() => remove(index)}>
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <path d="M9.35 3.35a.5.5 0 0 0-.7 0L6 6l-2.65-2.65a.5.5 0 0 0-.7.7L5.3 6 2.65 8.65a.5.5 0 1 0 .7.7L6 6.7l2.65 2.65a.5.5 0 0 0 .7-.7L6.7 6l2.65-2.65a.5.5 0 0 0 0-.7z"></path>
                          </svg>
                        </div>
                      </div>
                    ))}
                    {selected.length === 0 && (
                      <div className="flex-1">
                        <input placeholder="Select a role" className="h-full w-full p-1 px-2 outline-none" />
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
                    <div key={index} onClick={(event) => select(index, event)} className="cursor-pointer hover:bg-gray-100">
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
