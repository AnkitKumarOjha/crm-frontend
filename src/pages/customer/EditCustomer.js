import React, { useState, useEffect } from 'react';
import Success from '../../components/Alert/Success';
import Failed from '../../components/Alert/Failed';
import { getAllCustomerDetails, updateCustomerRequest, updateUserRequest } from '../../api/authApi';
import { useParams } from 'react-router-dom';

const EditCustomer = () => {
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        customerType: '',
    });
    const [customerDetails, setCustomerDetails] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getCustomerDetails = async () => {
            try {
                const response = await getAllCustomerDetails(id);
                setCustomerDetails(response);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };
        getCustomerDetails();
    }, [id]);

    useEffect(() => {
        setUserForm({
            name: customerDetails.name || '',
            email: customerDetails.email || '',
            phoneNumber: customerDetails.phoneNumber?.toString() || '',
            customerType: customerDetails.customerType || '',
        });
    }, [customerDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Convert phoneNumber back to an integer before sending
            const updatedForm = { ...userForm, phoneNumber: parseInt(userForm.phoneNumber, 10) };
            const data = await updateCustomerRequest(id, updatedForm);
            setNotification({ message: 'Customer updated successfully!', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Error updating user', type: 'error' });
            console.error('Error updating user', error);
        }
    };

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    return (
        <>
            {notification.type === 'success' && <Success message={notification.message} />}
            {notification.type === 'error' && <Failed message={notification.message} />}

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                Update Details
                            </h2>

                            <form onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userForm.name}
                                        onChange={handleChange}
                                        placeholder="name"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userForm.email}
                                        onChange={handleChange}
                                        placeholder="email"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                {/* Phone Number Input */}
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={userForm.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter Phone Number"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                {/* Customer Type Input */}
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">Customer Type</label>
                                    <input
                                        required
                                        type="text"
                                        name="customerType"
                                        value={userForm.customerType}
                                        onChange={handleChange}
                                        placeholder="LEAD or CONVERTED"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mb-5">
                                    <input
                                        type="submit"
                                        value="Update Details"
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

export default EditCustomer;
