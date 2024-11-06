import React, { useState, useEffect } from 'react';
import Success from '../../components/Alert/Success';
import Failed from '../../components/Alert/Failed';
import { createCustomerRequest } from '../../api/authApi';

const CreateCustomer = () => {
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    createdBy: localStorage.getItem("email") // Assuming this will be the logged-in user's email
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createCustomerRequest(customerForm);
      setNotification({ message: 'Customer created successfully!', type: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      setNotification({ message: errorMessage, type: 'error' });
      console.error('Error creating customer:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm({ ...customerForm, [name]: value });
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
                Create New Customer
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={customerForm.name}
                    onChange={handleChange}
                    placeholder="Enter customer's full name"
                    maxLength={50} // Limit name to 50 characters
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={customerForm.email}
                    onChange={handleChange}
                    placeholder="Enter customer's email"
                    maxLength={50} // Limit email to 50 characters
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Email pattern validation
                    title="Please enter a valid email address"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Phone Number Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Phone Number</label>
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    value={customerForm.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter customer's phone number"
                    maxLength={10} // Limit phone number to 10 characters
                    pattern="^\d{10}$" // Pattern for a 10-digit number
                    title="Please enter a 10-digit phone number"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create Customer"
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

export default CreateCustomer;
