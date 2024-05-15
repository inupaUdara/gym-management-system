import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import supplementsCategory from "./supplementsCategory";

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function ManagerUpdateSupplements() {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { supplementId } = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    brandName: '',
    category: '',
    price: '',
    sellingPrice: '',
    description: '',
    imageUrls: []
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch supplement details by ID
  useEffect(() => {
    const fetchSupplementDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/supplements/getAllSupplements?supplementId=${supplementId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch supplement details');
        }
        setFormData(data.supplements[0]); // Assuming data structure is an array with one item
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSupplementDetails();
  }, [supplementId]);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images');
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
      if (+formData.price < +formData.sellingPrice) return setError('Selling price must be lower than price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/supplements/updateSupplements/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/admin-dashboard?tab=show-supplements`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className="max-w-[1000px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex flex-col mb-2">
          <main className='p-3 max-w-4xl'>
            <h1 className='text-3xl font-semibold text-center my-7'>Update Supplements</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-4 flex-1">
                  <label htmlFor="productName" className="mt-3">Product Name :</label>
                  <input type="text" placeholder='Enter product name' name="productName" className='border p-3 rounded-lg' id='productName' maxLength='62' minLength='10' required onChange={handleChange} value={formData.productName} />
                  
                  <label htmlFor="brandName" className="mt-3">Brand Name :</label>
                  <input type="text" placeholder='Enter brand name' name="brandName" className='border p-3 rounded-lg' id='brandName' maxLength='62' minLength='10' required onChange={handleChange} value={formData.brandName} />

                  <label htmlFor="category" className="mt-3">Category :</label>
                  <select className='border p-3 rounded-lg' name="category" required onChange={handleChange} value={formData.category}>
                    <option value="">Select Category</option>
                    {supplementsCategory.map((el, index) => (
                      <option value={el.value} key={el.value + index}>{el.label}</option>
                    ))}
                  </select>
                  
                  <label htmlFor="price" className="mt-3">Price :</label>
                  <input type="number" placeholder='Enter price' name="price" className='border p-3 rounded-lg' id='price' min='1' max='100000' required onChange={handleChange} value={formData.price} />
                  
                  <label htmlFor="sellingPrice" className="mt-3">Selling Price :</label>
                  <input type="number" placeholder='Enter selling price' name="sellingPrice" className='border p-3 rounded-lg' id='sellingPrice' min='1' max='100000' required onChange={handleChange} value={formData.sellingPrice} />

                  <label htmlFor="description" className="mt-3">Product Description :</label>
                  <textarea type="text" placeholder='Description' name="description" className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />
                </div>

                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="productImage" className="mt-3">Product Images :</label>
                  <div className="flex gap-4">
                    <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-700 rounded w-full' type="file" id='images' accept='image/*' multiple />
                    <button type="button" disabled={uploading} onClick={handleImageSubmit} className='p-3 text-white border bg-[#1e5536] border-white rounded-md text-center flex items-center uppercase justify-center cursor-pointer hover:bg-[#326f4d]'>
                      {uploading ? 'uploading...' : 'Upload'}
                    </button>
                  </div>
                  <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                  </p>
                  <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                  {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                    <div key={url} className="flex justify-between p-3 border items-center">
                      <img src={url} alt="product image" className="w-20 h-20 object-contain rounded-lg" />
                      <button type="button" onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                    </div>
                  ))}
                  <button  disabled={loading || uploading} className='text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center uppercase justify-center cursor-pointer hover:bg-[#7e1010]'> {loading ? 'Updating...' : 'Update listing'} </button>
                  {error && <p className="text-red-700">{error}</p>}
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
