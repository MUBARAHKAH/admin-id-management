import React, { useEffect, useState } from "react";
import { useSession } from "../../context/session";

const IdCardDetails = ({ data }) => {
  const { fullName, matricNimber, department, level, email, photo } = data;

  return (
    <div>
      <div className="text-center mb-8 ">
        <img
          src={
            `https://studentbackendportal.onrender.com/assets/${
              photo && photo
            }` || "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="rounded-full w-24 h-24 mx-auto"
        />
        <h2 className="text-lg font-semibold mt-2">{fullName}</h2>
      </div>
      <div className="">
        <div className="text-sm text-gray-600  mb-6 flex  justify-between w-full ">
          <strong>Matric No</strong> <p className="text-left">{matricNimber}</p>
        </div>
        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Department</strong> <p className="text-right">{department}</p>
        </div>

        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Level </strong> <p className="text-right">{level}</p>
        </div>
        <div className="text-gray-600 mb-6 flex w-full  justify-between">
          <strong>Email </strong> <p className="text-right">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default IdCardDetails;
