import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cover_Image from "../assets/coverphoto.jpg";
import { Alert, Spinner } from "flowbite-react";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.username || !formData.password){

      return setError('All fields are required');
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/authemployee/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        return setError("Invalid credentials");
      }
      setLoading(false);
      if(res.ok){
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

  }

  return (
    <div className="w-full h-screen flex items-start">
      <div className="hidden md:relative md:w-1/2 h-full md:flex flex-col">
        <div className="absolute top-[50%] left-[10%] flex flex-col"></div>
        <img src={Cover_Image} className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 h-full bg-[#03001C] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[550px] m-auto">
          <div className="w-full flex flex-col mb-2">
            <h1 className="text-2xl font-normal text-[#B6EADA] my-8">
              CJ Gym & Fitness Centre
            </h1>
            <h3 className="text-4xl font-semibold mb-4 text-[#B6EADA]">
              Login
            </h3>
            <p className="text-base mb-2 text-[#B6EADA]">
              Welcome Back! Please enter your details
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                type="text"
                placeholder="Username"
                className="w-full text-white py-2 my-2 bg-transparent border-b-[#5B8FB9] border-t-[#03001C] border-r-[#03001C] border-l-[#03001C] outline-none focus:outline-none placeholder:text-[#B6EADA] focus:ring-[#03001C]"
                id="username"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full text-white py-2 my-2 bg-transparent border-b-[#5B8FB9] border-t-[#03001C] border-r-[#03001C] border-l-[#03001C] border outline-none focus:outline-none placeholder:text-[#B6EADA] focus:ring-[#03001C]"
                id="password"
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <button type="submit" className="w-full text-white my-2 bg-[#301E67] rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:ring-2" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Login'}
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
    </div>
  );
}
