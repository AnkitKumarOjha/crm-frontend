import React, { useContext, useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import AuthContext from "../context/AuthContext";
import { loginUser } from "../api/authApi";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const { login } = useContext(AuthContext);
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    try {
      const data = await loginUser(loginState["email"], loginState["password"]);
      localStorage.setItem("email",loginState["email"]);
      
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
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message if exists */}
    </form>
  );
}
