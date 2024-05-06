import React, { useState, useEffect } from 'react';
import { Alert, FileInput, TextInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

export default function UpdateTasks() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/gettasks?taskId=${taskId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setSubmitError(data.message);
          return;
        }
        if (res.ok) {
          setSubmitError(null);
          setFormData(data.tasks[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleProgressButtonClick = () => {
    const newButtonState = formData.buttonState === 'Progress' ? 'Complete' : 'Progress';
    setFormData({ ...formData, buttonState: newButtonState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      const formDataToSend = {
        ...formData,
        startDate: formData.startDate || currentDate,
        endDate: formData.endDate || currentDate,
      };

      const res = await fetch(`/api/tasks/updatetasks/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message);
        return;
      }

      if (res.ok) {
        setSubmitError(null);
        setSubmitSuccess(true); // Set submit success
        // navigate(`/admin-dashboard?tab=member-task`);
        setTimeout(() => {
          navigate(`/admin-dashboard?tab=member-task`);
        }, 1000); // Delay the navigation by 1 second (1000 milliseconds)
      }
    } catch (error) {
      setSubmitError('Something went wrong');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  return (
    <div style={{ backgroundColor: '#1f1f1f' }}>
      <Header />
      <div className='max-w-3xl min-h-screen p-3 mx-auto'>
        <h1 className='mb-10 text-3xl font-semibold text-center text-white ay-7'> Update a Task</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title}
          />
          <div className='flex items-center justify-between p-3 gap-7'>
            <h3 className='text-white'> Start Date </h3>
            <input
              type='text'
              id='startDate'
              value={formatDate(formData.startDate)}
              className='w-full p-2 mt-1 text-black border border-gray-300 rounded-md dark:text-gray-400'
            />
            <h3 className='text-white'> End Date </h3>
            <input
              type='text'
              id='endDate'
              value={formatDate(formData.endDate)}
              className='w-full p-2 mt-1 text-black border rounded-md dark:text-gray-400'
            />
          </div>
          <div className='flex items-center justify-between w-full gap-4'>
            <FileInput type='file' className='w-full' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
            <button
              type='button'
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              size='sm'
              outline='true'
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className='w-16 h-16'>
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                </div>
              ) : (
                'Upload Image'
              )}
            </button>
          </div>
          {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
          {formData.image && <img src={formData.image} alt='upload' className='object-cover w-full h-72' />}
          <button
            type="button"
            className={`px-4 py-2 font-bold text-white transition-colors duration-300 bg-${formData.buttonState === 'Progress' ? 'green' : 'red'}-500 rounded hover:bg-${formData.buttonState === 'Progress' ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={handleProgressButtonClick}
          >
            {formData.buttonState}
          </button>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Update
          </button>
          {submitError && <Alert className='mt-5' color='failure'>{submitError}</Alert>}
          {submitSuccess && <Alert className='mt-5' color='success'>Form Updated successfully!</Alert>}
        </form>
      </div>
    </div>
  );
}
