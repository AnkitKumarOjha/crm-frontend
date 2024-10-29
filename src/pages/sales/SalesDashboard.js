import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Header/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import userSix from '../../images/user/user-06.png';
import {  getAllSalesRepDetails, getAllSalesRepDetailsByEmail } from '../../api/authApi'; // Assuming this is your Success message component
import Success from '../../components/Alert/Success';

const SalesDashboard = () => {
    const [salesRepDetails , setSalesRepDetails] = useState([]);
    const [customers , setCustomers] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const email=localStorage.getItem("email");
    useEffect(() => {
      const getSalesRepDetails = async () => {
        try {
          
          const response = await getAllSalesRepDetailsByEmail(email);
        
          setSalesRepDetails(response);
          setCustomers(response.customers);
    
        } catch (error) {
          console.error("Error fetching all sales rep data:", error);
        }
      };

      getSalesRepDetails();
    }, [email]);

    

    return (
        <>
          <Breadcrumb pageName="Sales Representative" />


          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="flex items-center gap-x-2">
                <label
                  htmlFor="cover"
                  className="flex items-end cursor-pointer w-20 mt-2 justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
                >
                  <Link to={`/edit-profile`}>
                    Edit
                  </Link>
                </label>
              </div>

              <div className="relative z-30 mx-auto mt-15 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                  <img src={userSix} alt="profile" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  {salesRepDetails.name}
                </h3>
                <p className="font-medium">Sales Representative</p>
                <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {salesRepDetails.customersManaged}
                    </span>
                    <span className="text-sm">Customers</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {salesRepDetails.sales}
                    </span>
                    <span className="text-sm">Sales</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {((salesRepDetails.sales / salesRepDetails.customersManaged) * 100).toFixed(0)}%
                    </span>
                    <span className="text-sm">Conversion</span>
                  </div>
                </div>

                <div className="mx-auto max-w-180">
                  <h4 className="font-semibold text-black dark:text-white">
                    Details
                  </h4>
                  <p className="mt-4.5">
                    {salesRepDetails.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer list rendering */}
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Customers
            </h4>

            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    ID
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Name
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    E-Mail
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Type
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Phone
                  </h5>
                </div>
              </div>

              {customers.map((customer, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-5 ${
                    key === customers.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={key}
                >
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-5">{customer.id}</p>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <Link
                      to={`/customer/${customer.id}`}
                    >
                      <p className="hidden text-black dark:text-white sm:block">
                        {customer.name}
                      </p>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{customer.email}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{customer.customerType}</p>
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">{customer.phoneNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
}

export default SalesDashboard;
