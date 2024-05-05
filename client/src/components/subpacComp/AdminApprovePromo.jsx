import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "flowbite-react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from "notistack";

const AdminApprovePromo = () => {
  const [subPackages, setSubPackages] = useState([]);
  const [status, setStatus] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [subStatus, setSubStatus] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      axios
        .get(`/api/subpackage/getSubPackage`)
        .then((response) => {
          setSubPackages(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [currentUser._id]);

  const handleUpdatePackage = (subId) => {
    if (!subId) {
      console.error("Missing subPackage ID for update");
      return;
    }
    setLoading(true);
    axios
     .put(`/api/subpackage/updateSubPackage/${subId}`, subStatus)
     .then(() => {
        setLoading(false);
        enqueueSnackbar("Package edit is Successfully!", {variant: 'success'}, { anchorOrigin: { vertical: "bottom", horizontal: "right" }});
        navigate('/admin-dashboard?tab=admin-approval-subpackage-panel');
     })
     .catch((error) => {
      setLoading(false);
      enqueueSnackbar("Error", {variant: 'error'});
      console.log(error);
    });
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { currentUser.isAdmin || currentUser.role === "Manager" ? ( 
        <>
          <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              No
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Package Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Price (LKR)
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Valid Time
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Specific
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Start Date
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              End Date
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Update Status
            </Table.HeadCell>
          </Table.Head>
          {subPackages.map((subPackage, index) => (
            <>
              <Table.Body className='divide-y' key={subPackage._id}>
              {subPackage.Pactype === "PromotionPackage" && (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]'>
                  <Table.Cell>
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.subPackageName}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.price}
                  </Table.Cell>
                  <Table.Cell>
                    per {subPackage.validTime}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.description}
                  </Table.Cell>
                  <Table.Cell>
                    <ul className="max-w-md space-y-1 list-disc list-inside">
                      <li>{subPackage.note1}</li>
                      <li>{subPackage.note2}</li>
                      <li>{subPackage.note3}</li>
                    </ul>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(subPackage.startDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(subPackage.endDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.status}
                  </Table.Cell>
                  <Table.Cell className="flex items-center m-10">
                    <select className="mr-2" onChange={(e) =>setSubStatus( {...subStatus, status: e.target.value})}>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button className="bg-[#a80000] text-[#d4d4d4] p-2 rounded-lg font-semibold hover:opacity-80" onClick={() => handleUpdatePackage(subPackage._id)}>
                      Update
                    </button>
                  </Table.Cell>
                </Table.Row> 
              )}
            </Table.Body>
            </>
          ))}
          </Table>
        </>
      ) : (
        <p> No packages yet!</p>
      )}
    </div>
  );
};

export default AdminApprovePromo;
