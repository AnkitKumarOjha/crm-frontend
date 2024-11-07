import React, { useContext, useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import AuthContext from "../context/AuthContext";
import { loginUser } from "../api/authApi";
import { Link } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const { login } = useContext(AuthContext);
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};

    // Email validation
    if (!loginState.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginState.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Password validation
    if (!loginState.password) {
      validationErrors.password = "Password is required";
    } else if (loginState.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      authenticateUser();
    } else {
      setError("Please correct the errors in the form.");
    }
  };

  const authenticateUser = async () => {
    try {
      const data = await loginUser(loginState.email, loginState.password);
      localStorage.setItem("email", loginState.email);

      login(data.roles, data.token);
      const role = data.roles;

      if (role.includes("ROLE_ADMIN")) {
        window.location.href = "/admin";
      } else if (role.includes("ROLE_SALES_REP")) {
        window.location.href = "/sales";
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    
    <div className="rounded-sm border shadow-default   border-strokedark   bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="w-full    border-strokedark xl:border-l-2 ">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5 ">
            <h2 className="mb-9 text-2xl font-bold    text-white sm:text-title-xl2">
              Sign In to CRM App
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium    text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={loginState.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10  outline-none focus:border-primary focus-visible:shadow-none   border-form-strokedark   bg-form-input   text-white   focus:border-primary"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="mb-2.5 block font-medium   text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={loginState.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none  focus-visible:shadow-none   border-form-strokedark   bg-form-input   text-white   focus:border-primary"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
}

