import { TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"

export default function DasProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [ imageFile, setImageFile ] = useState(null);
  const [ imageFileUrl, setImageFileUrl ] = useState(null);
  const filePickerRef = useRef();
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
    console.log("uploading image...");
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
        <img src={imageFileUrl || currentUser.profilePicture} 
        alt="user" 
        className="rounded-full w-full h-full border-8 object-cover border-[#707070]"
        onClick={() => filePickerRef.current.click()}/>
        </div>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
        <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email}/>
        <TextInput type="password" id="password" placeholder="password"/>
        <button type="submit" className="rounded-md text-[#d4d4d4] bg-[#4c0000] p-2 font-semibold">Update</button>
        <div className="flex mt-2 text-[#a80000]">
          <span>Sign Out</span>
        </div>
      </form>
    </div>
  )
}
