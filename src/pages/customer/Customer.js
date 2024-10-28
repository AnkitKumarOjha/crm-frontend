import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getAllCustomerDetails } from '../../api/authApi';
import Breadcrumb from '../../components/Header/Breadcrumb';
import userSix from '../../images/user/user-06.png';

const Customer = () => {
    
    const { customerid } = useParams();
    const [customerDetails , setCustomerDetails] = useState({});
    const [contacts , setContacts] = useState([]);

  useEffect(() => {
    const getCustomerDetails = async () => {
      try {
        const response = await getAllCustomerDetails(customerid);
      
        setCustomerDetails(response);
        setContacts(response.contacts)
  
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    getCustomerDetails();
  }, [customerid]);

  return (
    <>
      {customerDetails.createdBy ? (
        <>
          <Breadcrumb pageName={`${customerDetails.createdBy.name}'s Customer`} />
  
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="relative z-30 mx-auto mt-15 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                  <img src={userSix} alt="profile" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  {customerDetails.name}
                </h3>
                <p className="font-medium">Customer</p>
                <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {contacts.length}
                    </span>
                    <span className="text-sm">Contacts</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {customerDetails.customerType}
                    </span>
                    <span className="text-sm">Type</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {customerDetails.id}
                    </span>
                    <span className="text-sm">ID</span>
                  </div>
                </div>
  
                <div className="mx-auto max-w-180">
                  <h4 className="font-semibold text-black dark:text-white">
                    Details
                  </h4>
                  <p className="mt-4.5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque posuere fermentum urna, eu condimentum mauris
                    tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                    ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                    pharetra ligula sed, aliquam lacus.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Contacts
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
                    title
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Notes
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Date
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Phone
                  </h5>
                </div>
              </div>
  
              {contacts.map((contact, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-5 ${
                    key === contacts.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={key}
                >
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-meta-5">{contact.id}</p>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <Link to={`/contacts/${contact.id}`}>
                      <p className="hidden text-black dark:text-white sm:block">
                        {contact.title}
                      </p>
                    </Link>
                  </div>
  
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{contact.notes}</p>
                  </div>
  
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{contact.date}</p>
                  </div>
  
                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">
                      {customerDetails.phoneNumber}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
  
}

export default Customer