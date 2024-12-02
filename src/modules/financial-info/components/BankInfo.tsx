const BankInfo = () => {
  return (
    <div className="p-4 mb-4 border rounded-lg shadow-lg bg-white">
      <div className="relative">
        <button className="absolute top-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
        <h2 className="text-2xl font-semibold mb-4 text-black">Bank Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
        <div>
          <p><strong>Account Number:</strong> 123-456-7890</p>
        </div>
        <div>
          <p><strong>Bank Name:</strong> ABC Bank</p>
        </div>
        <div>
          <p><strong>Branch:</strong> Springfield Branch</p>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;
