import React, { useState, useEffect } from 'react';
import Success from '../../components/Alert/Success';
import Failed from '../../components/Alert/Failed';
import { createContactRequest, editContactRequest } from '../../api/authApi';
import { useParams } from 'react-router-dom';

const EditContact = () => {
  const [contactForm, setContactForm] = useState({
    title: '',
    notes: '',
    date: '',
  });
  const { customerid,contactid } = useParams();
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        

      const data = await editContactRequest(customerid,contactid,contactForm);
      setNotification({ message: 'Contact Edited successfully!', type: 'success' });
      console.log('Contact created successfully', data);
    } catch (error) {
      setNotification({ message: 'Error Editing contact', type: 'error' });
      console.error('Error creating contact', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      {/* Notification Display */}
      {notification.type === 'success' && <Success message={notification.message} />}
      {notification.type === 'error' && <Failed message={notification.message} />}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Edit Contact
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Title</label>
                  <input
                    required={true}
                    type="text"
                    name="title"
                    value={contactForm.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Notes Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Notes</label>
                  <input
                    required={true}
                    type="text"
                    name="notes"
                    value={contactForm.notes}
                    onChange={handleChange}
                    placeholder="Enter contact's notes"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Date Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Date</label>
                  <input
                    required={true}
                    type="text"
                    name="date"
                    value={contactForm.date}
                    onChange={handleChange}
                    placeholder="YYYYMMDD"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create Contact"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditContact;
