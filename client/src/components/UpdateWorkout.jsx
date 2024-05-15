import Header from "./Header";
import {
  Alert,
  Spinner,
  Select,
  Textarea,
  Modal,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function UpdateWorkout() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [workoutIdToDelete, setWorkoutIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  console.log(workouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(
          `/api/createworkoutplans/getWorkout?workoutsId=${workoutId}`
        );
        const data = await res.json();
        if (res.ok) {
          setWorkouts(data.workouts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWorkouts();
  }, [workoutId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/createworkoutplans/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard?tab=create-workout");
        setSuccess("Plan succsesfull created");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      const res = await fetch(
        `/api/createworkoutplans/deleteWorkout/${workoutIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWorkouts((prev) =>
          prev.filter((workout) => workout._id !== workoutIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/createworkoutplans/updateWorkout/${workouts._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (res.ok) {
        setError(null);
        setSuccess("Plan updated successfully.")
        navigate(`/admin-dashboard?tab=create-workout`);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }

  return (
    <>
      <Header />
      <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-5 md:p-10">
        <div className="max-w-[900px] mx-auto rounded-md p-5 flex flex-col bg-white shadow-lg  justify-center">
          <div className="rounded-md p-5 mx-4 max-h-[800px]">
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col mb-2">
                <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
                  Update Plan
                </h3>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Member Id
                </label>
                <input
                  type="text"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  onChange={(e) =>
                    setFormData({ ...formData, memberId: e.target.value })
                  }
                  defaultValue={workouts && workouts.memberId}
                />
                <select
                  className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
                  onChange={(e) =>
                    setFormData({ ...formData, planType: e.target.value })
                  }
                  value={workouts.planType}
                >
                  <option value="none">Select a Plan type</option>
                  <option value="mealplan">Meal Plan</option>
                  <option value="workoutplan">Workout Plan</option>
                </select>
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Valid Date - {workouts && new Date(workouts.validDate).toLocaleDateString()}
                </label>
                <input
                  type="date"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  onChange={(e) =>
                    setFormData({ ...formData, validDate: e.target.value })
                  }
                  
                />

                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Plan
                </label>
                <Textarea
                  type="text"
                  className="h-60 text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  placeholder="Create a Plan"
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                  defaultValue={workouts && workouts.plan}
                />
              </div>
              <div className="flex flex-col my-4">
                <button
                  type="submit"
                  className=" text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Update plan"
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
       
      </div>
    </>
  );
}
