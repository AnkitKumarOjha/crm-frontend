import React, { useState, useEffect } from 'react';
import MultiSelect from '../../components/MultiSelect'; 
import { createUserRequest } from '../../api/authApi'; // Adjust the import path accordingly
import Success from '../../components/Alert/Success';
import Failed from '../../components/Alert/Failed';

const CreateUser = () => {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: null, // Assuming a single role
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createUserRequest(userForm);
      setNotification({ message: 'User created successfully!', type: 'success' });
      console.log('User created successfully', data);
    } catch (error) {
      setNotification({ message:  'Error creating user', type: 'error' });
      console.error('Error creating user', error);
    }
  };
  const handleRoleChange = (selectedRole) => {
    setUserForm((prev) => ({
      ...prev,
      role: selectedRole ? selectedRole : null, // Set to null if no role is selected
    }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  return (
    <>
      {/* Notification Display */}
      {notification.type === 'success' && <Success message={notification.message} />}
      {notification.type === 'error' && <Failed message={notification.message} />}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Expansion is true success</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Create New User
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
                    placeholder="Enter your full name"
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
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                  <label className="block font-medium text-black">Role</label>
                  <MultiSelect 
                    id="roles" 
                    selected={userForm.role} // Accessing role from userForm
                    onChange={handleRoleChange} // Updated handler
                  />
                </div>

                {/* Submit Button */}
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create User"
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

export default CreateUser;
