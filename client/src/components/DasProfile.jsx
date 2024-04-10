import { TextInput, Alert, Modal } from "flowbite-react"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DasProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [ imageFile, setImageFile ] = useState(null);
  const [ imageFileUrl, setImageFileUrl ] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));

    }
  }
  useEffect(() => {
    if(imageFile) {
      uploadImage();
    }
  }, [imageFile])

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/employee/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Your profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  console.log(formData)

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[#1f1f1f] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Firstname</label>
        <TextInput type="text" id="firstname" placeholder="firstname" defaultValue={currentUser.firstname} onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Lastname</label>
        <TextInput type="text" id="lastname" placeholder="lastname" defaultValue={currentUser.lastname}
        onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Username</label>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}
        onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Email</label>
        <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email}
        onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Email</label>
        <TextInput type="text" id="phone" placeholder="phone" defaultValue={currentUser.phone}
        onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Address</label>
        <TextInput type="text" id="address" placeholder="address" defaultValue={currentUser.address}
        onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">NIC</label>
        <TextInput type="text" id="nic" placeholder="NIC" defaultValue={currentUser.nic}
        onChange={handleChange}/>
        <label htmlFor="" className="text-[#1f1f1f] text-sm font-semibold">Password</label>
        <TextInput type="password" id="password" placeholder="password"
        onChange={handleChange}/>
        <button type="submit" className="rounded-md text-[#d4d4d4] bg-[#4c0000] p-2 font-semibold">{loading ? 'Loading...' : 'Update'}</button>
        
      </form>
     
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
    </div>
  )
}
