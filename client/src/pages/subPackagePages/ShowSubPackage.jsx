import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/subpacComp/BackButton';
//import { Spinner } from "flowbite-react";

const ShowSubPackage = () => {
  const [subPackage, setSubPackage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/subpackage/getIdSubPackage/${id}`)
      .then((response) => {
        setSubPackage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id])

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Package</h1>

      <div className="flex flex-col border-2 border-red-700 rounded-xl w-fit p-4">
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Id: </span>
          <span>{subPackage._id}</span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Package Name: </span>
          <span>{subPackage.subPackageName}</span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Price: </span>
          <span>LKR {subPackage.price}</span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Valid Time: </span>
          <span>{subPackage.validTime}</span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Description: </span>
          <span>{subPackage.description}</span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Specific: </span>
          <span>
            <ul className="max-w-md space-y-1 list-disc list-inside">
              <li>{subPackage.note1}</li>
              <li>{subPackage.note2}</li>
              <li>{subPackage.note3}</li>
            </ul>
          </span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Create Time: </span>
          <span>
            {new Date(subPackage.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="m-4">
          <span className="text-xl mr-4 text-gray-500">Last Update Time: </span>
          <span>
            {new Date(subPackage.updatedAt).toLocaleDateString()}
            
          </span>
        </div>

      </div>

    </div>
  )
}

export default ShowSubPackage