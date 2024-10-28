// import axios from 'axios';
import instance from '../utils/axios';


export const loginUser = async (email, password) => {
    const response = await instance.post('http://localhost:8080/login', {
        email,
        password
    });
    return response.data;
};
export const getSales = async () => {
    const response = await instance.get('http://localhost:8080/total-sales');
    return response.data;
};

export const getSalesReps = async () => {
    const response = await instance.get('http://localhost:8080/total-sales-reps');
    return response.data;
};

export const getTopSales = async () => {
    const response = await instance.get('http://localhost:8080/top-sales');
    return response.data;
};
export const getTopConversionRates = async () => {
    const response = await instance.get('http://localhost:8080/top-conversion');
    return response.data;
};
export const getAllSalesRepList = async () => {
    const response = await instance.get('http://localhost:8080/sales-rep-list');
    return response.data;
};
export const getAllSalesRepDetails = async (id) => {
    const response = await instance.get(`http://localhost:8080/sales-reps/${id}`);
    return response.data;
};
export const getAllCustomerDetails = async (id) => {
    const response = await instance.get(`http://localhost:8080/customers/${id}`);
    return response.data;
};
export const createUserRequest = async (req) => {
    const response = await instance.post('http://localhost:8080/create-user',req);
    return response.data;
};

