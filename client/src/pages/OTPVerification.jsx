import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'; // Import any necessary components
import Cookies from 'js-cookie';

const OTPVerification = (props) => {
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userEmail = Cookies.get('userEmail');
      const requestBody = {
        otp: otp,
        userEmail: userEmail
      };
      
      const res = await fetch('/api/auth/otpverification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
  
      if (res.ok) {
        // If OTP verification is successful, navigate to the reset password page
        navigate(`/reset-password`);
      } else {
        // If OTP verification fails, set error message based on response status
        const data = await res.json();
        setErrorMessage(data.status);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    setOTP(e.target.value.trim());
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f]">
      <div className="flex flex-col max-w-3xl gap-10 p-3 mx-auto md:flex-row md:items-center">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h4 className="text-xl font-bold" style={{ color: 'white' }}>
              OTP Verification
            </h4>
            <div>
              <Label value="OTP" style={{ color: 'white' }} />
              <TextInput
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleChange}
                style={{ color: 'grey' }}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Verifying...</span>
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
            <Link to="/forgot-password" style={{ color: 'white' }}>
              Back to Forgot Password
            </Link>
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
