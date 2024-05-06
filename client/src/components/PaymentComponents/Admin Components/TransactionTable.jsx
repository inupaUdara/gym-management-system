import { useState, useEffect } from "react";
import axios from "axios";

const TransacTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    { key: "_id", title: "Payment ID" },
    { key: "email", title: "Email" },
    { key: "phoneNumber", title: "Phone Number" },
    { key: "firstName", title: "First Name" },
    { key: "lastName", title: "Last Name" },
    { key: "productName", title: "Product Name" },
    { key: "description", title: "Product Info" },
    { key: "sellingPrice", title: "Product Price" },
    { key: "shippingfee", title: "Shipping Fee" },
    { key: "totalPrice", title: "Total Price" },
    { key: "actions", title: "Actions" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pay/getPayments");
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>All Transactions</h3>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 px-5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs font-medium text-left text-gray-700 uppercase tracking-wider">
                  {columns.map((column) => (
                    <th key={column.key} scope="col" className="px-6 py-3">
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(data) &&
                  data.map((row, index) => (
                    <tr key={index} className="whitespace-nowrap">
                      {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4">
                          {row[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransacTable;
