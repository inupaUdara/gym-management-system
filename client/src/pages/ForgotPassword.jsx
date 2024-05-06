import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'; // Import any necessary components
import Cookies from 'js-cookie';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        // If the email is successfully sent for OTP verification, navigate to OTP verification page
        Cookies.set('userEmail', email, { expires: 1 });
        navigate(`/otp-verify`, { state: { email } });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value.trim());
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f]">
      <div className="flex flex-col max-w-3xl gap-10 p-3 mx-auto md:flex-row md:items-center">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h4 className="text-xl font-bold" style={{ color: 'white' }}>
              Forgot Password
            </h4>
            <div>
              <Label value="Email" style={{ color: 'white' }} />
              <TextInput
                type="email"
                placeholder="Enter your email"
                value={email}
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
                  <span className="pl-3">Sending...</span>
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
            <Link to="/sign-in" style={{ color: 'white' }}>
              Back to Sign In
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

export default ForgotPassword;
