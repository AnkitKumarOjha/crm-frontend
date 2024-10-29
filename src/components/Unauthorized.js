import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl text-red-500">403 - Unauthorized Access</h1>
      <p className="mt-2 text-lg">You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
