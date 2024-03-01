import { Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminDasAddEmp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password){
      return setError('All fields are required');
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/authemployee/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        return setError("User already exists");
      }
      setLoading(false);
      if(res.ok){
        navigate('/admin-dashboard')
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <div className="flex-grow w-full min-h-[60vh] bg-gray-300 p-10 md:p-20 justify-center">
      <div className=" max-w-[550px] mx-auto rounded-md p-10 shadow-2xl ">
        <div className="flex flex-col mb-2">
          <h3 className="text-2xl font-medium mb-4 text-[#03001C] text-center">
            Add Employees
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              className="text-[#03001C] text-sm py-2 my-2 bg-transparent border-b-[#301E67] border-t-transparent border-r-transparent border-l-transparent border outline-none focus:outline-none placeholder:text-[#03001C] focus:ring-[#03001C]"
              id="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className=" text-[#03001C] text-sm py-2 my-2 bg-transparent border-b-[#301E67] border-t-transparent border-r-transparent border-l-transparent outline-none focus:outline-none placeholder:text-[#03001C] focus:ring-[#03001C]"
              id="email" 
              onChange={handleChange}

            />
            <input
              type="password"
              placeholder="Password"
              className="text-[#03001C] text-sm py-2 my-2 bg-transparent border-b-[#301E67] border-t-transparent border-r-transparent border-l-transparent border outline-none focus:outline-none placeholder:text-[#03001C] focus:ring-[#03001C]"
              id="password" 
              onChange={handleChange}

            />

          </div>
          <div className="flex flex-col my-4">
          <button type="submit" className=" text-white text-sm my-2 bg-[#03001C] border border-white rounded-md p-2 text-center flex items-center justify-center cursor-pointer hover:bg-[#301E67]" disabled={loading}>
            {
              loading ? (<>
              <Spinner size='sm'/>
              <span className="pl-3">Loading...</span>
              </>
              ) : 'Add Employee'}
          </button>
        </div>
        </form>
        {error && (
          <Alert className="mt-5 p-2" color="failure">
            {error}
          </Alert>
        )}

        
      </div>
    </div>
  );
}
