import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: loginState['email-address'], 
                password: loginState['password']     
            });

            if (response.data.success) { 
                const role = response.data.role; 

                if (role === 'ADMIN') {
                    window.location.href = '/admin'; 
                } else if (role === 'SALES_REP') {
                    window.location.href = '/sales';
                }
            } else {
                setError('Login failed! Please check your credentials.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError('An error occurred. Please try again.');
        }
    };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
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
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}