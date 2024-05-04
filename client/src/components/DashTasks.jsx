import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button, Alert } from 'flowbite-react';

export default function DashTasks() {
  const { currentUser } = useSelector((state) => state.user);
  const [userTasks, setUserTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (currentUser && !currentUser.isAdmin) {
          const res = await fetch(`/api/tasks/gettasks`);
          const data = await res.json();
          if (res.ok) {
            setUserTasks(data.tasks.filter(task => task.userId === currentUser._id));
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser && !currentUser.isAdmin) {
      fetchTasks();
    }
  }, [currentUser, deleteSuccess]);

  const handleDeleteTask = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/tasks/deletetasks/${taskIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserTasks(prev => prev.filter(task => task._id !== taskIdToDelete));
        setDeleteSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterTasks = (status) => {
    switch (status) {
      case 'All':
        setUserTasks(userTasks);
         break;
      case 'Progress':
      case 'Complete':
        setUserTasks(userTasks.filter(task => task.buttonState === status));
         break;
      default:
        setUserTasks([]);
    }
  };

  return (
    <div className='container mt-5 ml-5'>
      <h2 className="mb-5 text-center">Your Tasks</h2>
      <div className="flex justify-center mb-5">
        <button className="px-4 py-2 mr-3 text-white bg-blue-500 rounded-md" onClick={() => filterTasks('All')}>
          All
        </button>
        <button className="px-4 py-2 mr-3 text-white bg-blue-500 rounded-md" onClick={() => filterTasks('Progress')}>
          In Progress
        </button>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={() => filterTasks('Complete')}>
          Complete
        </button>
      </div>
      <div className="flex flex-wrap w-300">
        {userTasks.map((task) => (
          <div key={task._id} className='max-w-sm mb-5 mr-5'>
            <div className="bg-white border border-gray-200 rounded-lg shadow task-card-container dark:bg-gray-800 dark:border-gray-700">
              <div className='relative'>
                <img src={task.image} alt={task.title} className='rounded-t-lg' style={{ width: '100%', height: '200px' }} />
                <span className={`absolute top-0 right-0 m-2 bg-gray-200 dark:bg-gray-600 p-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-300`}>{task.buttonState}</span>
              </div>
              <div className='p-5'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{task.title}</h5>
                <div className='flex justify-between mb-3 '>
                  <p className='mr-1 text-gray-700 dark:text-gray-400'>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
                  <p className='ml-1 text-gray-700 dark:text-gray-400'>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
                </div>
                <button className={`px-4 py-1 mb-2 w-full font-bold text-white text-base transition-colors duration-300 rounded hover:bg-${task.buttonState === 'Progress' ? 'green' : 'red'}-700 ${task.buttonState === 'Progress' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {task.buttonState}
                </button>
                <div className='flex justify-between'>
                  <button onClick={() => navigate(`/update-tasks/${task._id}`)} className='inline-flex items-center justify-center w-2/5 px-3 py-1 text-sm font-medium text-center text-white bg-gray-700 rounded-md rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300'>
                    Edit
                  </button>
                  <span onClick={() => {
                    setShowModal(true);
                    setTaskIdToDelete(task._id);
                  }} className='inline-flex items-center justify-center w-2/5 px-3 py-1 text-sm font-medium text-center text-white bg-red-700 rounded-md rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300'>
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this task?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteTask}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {deleteSuccess && (
        <Alert color='success' className='mt-5'>
          Task deleted successfully!
        </Alert>
      )}
    </div>
  );
}
