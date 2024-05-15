import { Button, Card } from 'flowbite-react';
import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function MemberRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [UserWorkoutRequest, setWorkoutRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUserWorkoutRequest = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/WorkoutPlans/getWorkoutUserRequests`);
        const data = await res.json();
        if (res.ok) {
          setWorkoutRequest(data.UserWorkoutRequest);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    



    if (currentUser.role === 'Instructor'){
      fetchUserWorkoutRequest()
    }
  }, [currentUser._id])

  const fetchUserById = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/getusers?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setUsers(data.users[0]);
        setError(false); 
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  console.log(UserWorkoutRequest)


  return (
    <div className='p-3 flex flex-wrap gap-2'>
      
      {UserWorkoutRequest.map((req) =>(

      <Card className="max-w-sm" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {req.name}
      </h5>
     
      <p className="font-normal text-gray-700 dark:text-gray-400">
         <span className='m-2 font-semibold'>Age</span>
        {req.age}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Gender</span>
        {req.gender}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Number</span>
        {req.number}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Email</span>
        {req.email}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Do you have any existing medical conditions?</span>
        {req.h1}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Are you currently taking any medications?</span>
        {req.h2}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Have you ever had any surgeries or serious injuries?</span>
        {req.h3}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Do you have any allergies (food, medication,environmental, etc.)?</span>
        {req.h4}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Are you pregnant or planning to become pregnant in the near future?</span>
        {req.h5}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>What are your primary fitness goals?</span>
        {req.f1}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Are there any specific areas of your body you would like to focus on?</span>
        {req.f2}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>What is your current level of physical activity?</span>
        {req.f3}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>How much time can you dedicate to each workout session?</span>
        {req.f4}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Have you previously followed a workout program?</span>
        {req.f5}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>How would you describe your stress level on a daily basis?</span>
        {req.l1}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>How many hours of sleep do you typically get per night?</span>
        {req.l2}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Do you smoke? If yes, how many cigarettes per day?</span>

        {req.l3}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>How would you describe your overall energy levels throughout the day?</span>
        {req.l4}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      <span className='m-2 font-semibold'>Additional Comments or Concerns</span>
        {req.addi}
      </p>
      <Link to={`/create-workout/${req.userID}`}>
      <Button>Create Plan</Button>
      </Link>
      
            
    </Card>
      ))}
    
    </div>
  )
}
