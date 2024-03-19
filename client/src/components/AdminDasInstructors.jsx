import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function AdminDasInstructors() {
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`/api/employee/getemployee?role=Instructor`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.employees);
          if (data.employees.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchEmployees();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = employees.length;
    try {
      const res = await fetch(`/api/employee/getemployee?role=Instructor?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.employees]);
        if (data.employees.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleDeleteUser = async () => {
  //   try {
  //       const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
  //           method: 'DELETE',
  //       });
  //       const data = await res.json();
  //       if (res.ok) {
  //           setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
  //           setShowModal(false);
  //       } else {
  //           console.log(data.message);
  //       }
  //   } catch (error) {
  //       console.log(error.message);
  //   }
  // };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && employees.length > 0? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date of register</Table.HeadCell>
              <Table.HeadCell>Profile picture</Table.HeadCell>
              <Table.HeadCell>First name</Table.HeadCell>
              <Table.HeadCell>Last name</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>NIC</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {employees.map((employee) => (
              <Table.Body className='divide-y' key={employee._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(employee.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={employee.profilePicture}
                      alt={employee.username}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{employee.firstname}</Table.Cell>
                  <Table.Cell>{employee.lastname}</Table.Cell>
                  <Table.Cell>{employee.username}</Table.Cell>
                  <Table.Cell>{employee.address}</Table.Cell>
                  <Table.Cell>{employee.email}</Table.Cell>
                  <Table.Cell>{employee.nic}</Table.Cell>
                  <Table.Cell>{employee.phone}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(employee._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure'>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
