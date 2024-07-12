import React from "react";
import IdCardDetails from "../IDcardDetails";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IdentityCards = () => {
  const [idcards, setIdcards] = useState([]);
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/idcard`
        );
        const data = await response.json();
        setIdcards(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  const navigate = useNavigate();
  const HandleDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/idcard/delete/${_id}`
      );
      if (response.status === 200) navigate("/");
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  return (
    <div className="flex flex-col gap-[2rem] p-[2rem_1rem]  w-full">
      <div className="flex max-lg:flex-col justify-between  gap-[1rem]">
        <h2 className="text-xl font-semibold">User IdCards</h2>
      </div>

      <div className="flex flex-wrap gap-[1rem] justify-center items-center">
        {idcards.length > 0 ? (
          idcards.map(
            (
              { fullName, _id, matricNimber, level, department, email, userId },
              index
            ) => (
              <div
                className="space-y-[1rem] rounded-md p-8 w-full  bg-white  sm:w-[40%]"
                key={index}
              >
                <IdCardDetails
                  data={{
                    fullName,
                    _id,
                    matricNimber,
                    level,
                    department,
                    email,
                  }}
                />
                <div
                  className="bg-red-500 text-white cursor-pointer text-center w-full p-[1rem] rounded-md"
                  onClick={() => HandleDelete(userId)}
                >
                  Revoke Id card
                </div>
              </div>
            )
          )
        ) : (
          <div>No Idcards Found</div>
        )}
      </div>
    </div>
  );
};
export default IdentityCards;
