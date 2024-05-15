import { Alert, Spinner } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InventoryAddNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleImageSubmit = (e) => {
    if (!file) {
      setImageUploadError('Please select an image to upload');
      return;
    }
    
    if (formData.itemPicture && formData.itemPicture.length >= 1) {
      setImageUploadError('You can only upload 1 image');
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    storeImage(file)
      .then((url) => {
        setFormData({ ...formData, itemPicture: [...(formData.itemPicture || []), url] });
        setImageUploadError(false);
        setUploading(false);
        setFile(null); // Clear the file after successful upload
      })
      .catch((err) => {
        setImageUploadError('Image upload failed (2mb max per image)');
        setUploading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        !formData.itemName ||
        !formData.itemCode  ||   
        !formData.description ||
        !formData.quantity ||
        !formData.itemStatus ||
        !formData.itemPicture
    ) {
      return setError("All field are required");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/inventory/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setError("Item already exists");
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard");
        setSuccess("Item added successfully");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className="max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex flex-col mb-2">
          <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
            Inventory Add Item
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="itemCode" className="text-[#1f1f1f] mt-3">
                  Item Code
                </label>
                <input
                  type="text"
                  placeholder="Enter item code"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder-text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemCode"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="itemName" className="text-[#1f1f1f] mt-3">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Enter item name"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder-text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemName"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <label htmlFor="description" className="text-[#1f1f1f] mt-3">
              About Item
            </label>
            <input
              type="text"
              placeholder="Enter details about this item"
              className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder-text-[#d4d4d4] focus:ring-[#03001C]"
              id="description"
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="quantity" className="text-[#1f1f1f] mt-3">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter item quantity"
              className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder-text-[#d4d4d4] focus:ring-[#03001C]"
              id="quantity"
              onChange={handleChange}
              min="0"
              autoComplete="off"
            />
            <label htmlFor="itemStatus" className="text-[#1f1f1f] mt-3">
              Status
            </label>
            <select
              className="mt-3 rounded-md bg-[#707070] text-[#d4d4d4]"
              id="itemStatus"
              onChange={(e) =>
                setFormData({ ...formData, itemStatus: e.target.value })
              }
            >
              <option value="none">Select Status</option>
              <option value="in_use">In Use</option>
              <option value="in_service">In Service</option>
              <option value="not_good_for_use">Unusable</option>
            </select>

            <div className="flex flex-col gap-4">
              <label htmlFor="productImage" className="mt-3">
                Product Image:
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                className="p-3 border border-gray-700 rounded"
                type="file"
                id="itemPicture"
                accept="image/*"
                multiple={false} // Allow only single file selection
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-3 text-white border bg-[#1e5536] border-white rounded-md text-center flex items-center uppercase justify-center cursor-pointer hover:bg-[#326f4d]"
              >
                {uploading ? "uploading..." : "Upload"}
              </button>
              <p className="text-red-700 text-sm">
                {imageUploadError && imageUploadError}
              </p>
              {file && (
                <div className="flex justify-between p-3 border items-center">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="product image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col my-4">
            <button
              type="submit"
              className="text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Add Item to Inventory"
              )}
            </button>
          </div>
        </form>
        {error && (
          <Alert className="mt-5 p-2" color="failure">
            {error}
          </Alert>
        )}
        {success && (
          <Alert className="mt-5 p-2" color="success">
            {success}
          </Alert>
        )}
      </div>
    </div>
  );
}
