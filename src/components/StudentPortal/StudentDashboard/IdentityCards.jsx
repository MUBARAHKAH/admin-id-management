import React from "react";
import IdCardDetails from "../IDcardDetails";
import QRCode from "./QrCodeDisplay";
import { Outlet } from "react-router-dom";
import QrCodeDisplay from "./QrCodeDisplay";
import { useEffect } from "react";
import { useState } from "react";

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
  return (
    <div className="flex flex-col gap-[2rem] p-[2rem_1rem]  w-full">
      <div className="flex max-lg:flex-col justify-between  gap-[1rem]">
        <h2 className="text-xl font-semibold">User IdCards</h2>
      </div>

      <div className="flex flex-wrap gap-[1rem] justify-center items-center">
        {idcards.length > 0 ? (
          idcards.map((data, _id) => (
            <div
              className=" rounded-md p-8 w-full  bg-white  sm:w-[40%]"
              key={_id}
            >
              <IdCardDetails data={data} />
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};
export default IdentityCards;
