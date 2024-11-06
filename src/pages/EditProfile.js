import React, { useState, useEffect } from "react";
import Success from "../components/Alert/Success";
import Failed from "../components/Alert/Failed";
import { createUserRequest, editUserProfile, getUser } from "../api/authApi";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const { id } = useParams();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getUser(id);
        setUserDetails(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserDetails();
  }, [id]);

  useEffect(() => {
    // Update userForm when userDetails changes
    setUserForm({
      name: userDetails.name || "",
      email: userDetails.email || "",
      password: "",
      repassword: ""
    });
  }, [userDetails]);
  const handleLogout = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("color-theme")
    localStorage.removeItem("sidebar-expanded")
    navigate("/login")

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const req = {
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
      };
      const data = await editUserProfile(id,req);
      setNotification({
        message: "User edited successfully!",
        type: "success",
      });
      if(userForm.email!==userDetails.email){
        handleLogout();
        }
      console.log("User edited successfully", data);
    } catch (error) {
      setNotification({ message: "Error editing user", type: "error" });
      console.error("Error editing user", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userForm.name) newErrors.name = "Name is required.";

    if (!userForm.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userForm.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!userForm.password) {
      newErrors.password = "Password is required.";
    } else if (userForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!userForm.repassword) {
      newErrors.repassword = "Password is required.";
    } else if (userForm.password !== userForm.repassword) {
      newErrors.repassword = "Passwords must match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
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
      {notification.type === "success" && (
        <Success message={notification.message} />
      )}
      {notification.type === "error" && (
        <Failed message={notification.message} />
      )}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Edit Details
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-enter new Password
                  </label>
                  <input
                    type="password"
                    name="repassword"
                    value={userForm.repassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.repassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.repassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mb-5 mt-10">
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

export default EditProfile;
