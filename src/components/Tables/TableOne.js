import React, { useEffect, useState } from 'react';
import {  getAllSalesRepList } from '../../api/authApi';
import { Link } from 'react-router-dom';

const TableOne = () => {

  const [salesRepInfo , setSalesRepInfo] = useState([]);

  useEffect(() => {
    const getSalesRepList = async () => {
      try {
        const response = await getAllSalesRepList();
      
        setSalesRepInfo(response);
  
      } catch (error) {
        console.error("Error fetching all sales rep data:", error);
      }
    };

    getSalesRepList();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Sales Representatives
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Customers Managed
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenue Generated
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion Rate
            </h5>
          </div>
        </div>

        {salesRepInfo.map((salesRep, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === salesRepInfo.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {/* <img src={brand.logo} alt="Brand" /> */}
                {/* {salesRep.id} */}
              </div>
              <Link
                to={`/sales-reps/${salesRep.id}`}
              >
              <p className="hidden text-black dark:text-white sm:block">
                {salesRep.name}
              </p>
              </Link>
              
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{salesRep.customersManaged}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${salesRep.sales*5550}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{salesRep.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{((salesRep.sales/salesRep.customersManaged)*100).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
