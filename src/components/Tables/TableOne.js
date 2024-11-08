import React, { useEffect, useState } from "react";
import { getAllSalesRepList } from "../../api/authApi";
import { Link } from "react-router-dom";

const TableOne = () => {
  const [salesRepInfo, setSalesRepInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getSalesRepList = async (page) => {
      try {
        const response = await getAllSalesRepList(page, 5); // Fetch 5 items per page
        setSalesRepInfo(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching all sales rep data:", error);
      }
    };

    getSalesRepList(currentPage); // Fetch data for the current page
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <Link to={`/sales-reps/${salesRep.id}`}>
                <p className=" text-black dark:text-white sm:block">
                  {salesRep.name}
                </p>
              </Link>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {salesRep.customersManaged}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${salesRep.sales * 5550}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{salesRep.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                {salesRep.sales > 0
                  ? `${(
                      (salesRep.sales / salesRep.customersManaged) *
                      100
                    ).toFixed(2)}%`
                  : "0%"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-primary rounded text-white disabled:bg-boxdark-2 "
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-primary rounded text-white disabled:bg-boxdark-2 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableOne;
