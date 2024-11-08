
import instance from '../utils/axios';

const BASE_URL=process.env.REACT_APP_BASE_URL;


export const loginUser = async (email, password) => {
    console.log(BASE_URL);
    const response = await instance.post(`${BASE_URL}/login`, { email, password });
    return response.data;
};

export const getSales = async () => {
    const response = await instance.get(`${BASE_URL}/total-sales`);
    return response.data;
};

export const getSalesReps = async () => {
    const response = await instance.get(`${BASE_URL}/total-sales-reps`);
    return response.data;
};

export const getTopSales = async () => {
    const response = await instance.get(`${BASE_URL}/top-sales`);
    return response.data;
};

export const getTopConversionRates = async () => {
    const response = await instance.get(`${BASE_URL}/top-conversion`);
    return response.data;
};

export const getAllSalesRepList = async (page = 0, size = 5) => {
    const response = await instance.get(`${BASE_URL}/sales-rep-list`, {
        params: { page, size },
    });
    return response.data;
};

export const getAllSalesRepDetails = async (id) => {
    const response = await instance.get(`${BASE_URL}/sales-reps/${id}`);
    return response.data;
};

export const getAllCustomerDetails = async (id) => {
    const response = await instance.get(`${BASE_URL}/customers/${id}`);
    return response.data;
};

export const createUserRequest = async (req) => {
    const response = await instance.post(`${BASE_URL}/create-user`, req);
    return response.data;
};

export const updateUserRequest = async (id, req) => {
    const response = await instance.put(`${BASE_URL}/update-user/${id}`, req);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await instance.delete(`${BASE_URL}/delete-user/${id}`);
    return response.data;
};

export const createCustomerRequest = async (req) => {
    const response = await instance.post(`${BASE_URL}/create-customer`, req);
    return response.data;
};

export const getAllSalesRepDetailsByEmail = async (email) => {
    const response = await instance.get(`${BASE_URL}/sales?email=${email}`);
    return response.data;
};

export const deleteCustomer = async (id) => {
    const response = await instance.delete(`${BASE_URL}/delete-customer/${id}`);
    return response.data;
};

export const updateCustomerRequest = async (id, req) => {
    const response = await instance.put(`${BASE_URL}/update-customer/${id}`, req);
    return response.data;
};

export const createContactRequest = async (id, req) => {
    const response = await instance.post(`${BASE_URL}/create-contact/${id}`, req);
    return response.data;
};

export const deleteContact = async (customerid, contactid) => {
    const response = await instance.delete(`${BASE_URL}/${customerid}/delete-contact/${contactid}`);
    return response.data;
};
export const editContactRequest = async (customerid,contactid, req) => {
    const response = await instance.put(`${BASE_URL}/${customerid}/edit-contact/${contactid}`, req);
    return response.data;
};
export const editUserProfile = async (id,req) => {
    const response = await instance.put(`${BASE_URL}/update-profile/${id}`,req);
    return response.data;
};
export const getUser = async (id) => {
    const response = await instance.get(`${BASE_URL}/user/${id}`);
    return response.data;
};


// export const loginUser = async (email, password) => {
//     const response = await instance.post('http://localhost:8080/login', {
//         email,
//         password
//     });
//     return response.data;
// };
// export const getSales = async () => {
//     const response = await instance.get('http://localhost:8080/total-sales');
//     return response.data;
// };

// export const getSalesReps = async () => {
//     const response = await instance.get('http://localhost:8080/total-sales-reps');
//     return response.data;
// };

// export const getTopSales = async () => {
//     const response = await instance.get('http://localhost:8080/top-sales');
//     return response.data;
// };
// export const getTopConversionRates = async () => {
//     const response = await instance.get('http://localhost:8080/top-conversion');
//     return response.data;
// };
// export const getAllSalesRepList = async () => {
//     const response = await instance.get('http://localhost:8080/sales-rep-list');
//     return response.data;
// };
// export const getAllSalesRepDetails = async (id) => {
//     const response = await instance.get(`http://localhost:8080/sales-reps/${id}`);
//     return response.data;
// };
// export const getAllCustomerDetails = async (id) => {
//     const response = await instance.get(`http://localhost:8080/customers/${id}`);
//     return response.data;
// };
// export const createUserRequest = async (req) => {
//     const response = await instance.post('http://localhost:8080/create-user',req);
//     return response.data;
// };
// export const updateUserRequest = async (id,req) => {
//     const response = await instance.put(`http://localhost:8080/update-user/${id}`,req);
//     return response.data;
// };
// export const deleteUser = async (id) => {
//     const response = await instance.delete(`http://localhost:8080/delete-user/${id}`);
//     return response.data;
// };
// export const createCustomerRequest = async (req) => {
//     const response = await instance.post('http://localhost:8080/create-customer',req);
//     return response.data;
// };
// export const getAllSalesRepDetailsByEmail = async (email) => {
//     const response = await instance.get(`http://localhost:8080/sales?email=${email}`);
//     return response.data;
// };
// export const deleteCustomer = async (id) => {
//     const response = await instance.delete(`http://localhost:8080/delete-customer/${id}`);
//     return response.data;
// };
// export const updateCustomerRequest = async (id,req) => {
//     const response = await instance.put(`http://localhost:8080/update-customer/${id}`,req);
//     return response.data;
// };
// export const createContactRequest = async (id,req) => {
//     const response = await instance.post(`http://localhost:8080/create-contact/${id}`,req);
//     return response.data;
// };
// export const deleteContact = async (customerid,contactid) => {
//     const response = await instance.delete(`http://localhost:8080/${customerid}/delete-contact/${contactid}`);
//     return response.data;
// };

