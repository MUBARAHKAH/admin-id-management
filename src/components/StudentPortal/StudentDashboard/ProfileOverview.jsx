import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileOverview = ({ userData }) => {
  const [users, setUsers] = useState([]);
  // const { sessionData, updateSessionData } = useSession();
  // const { userId } = sessionData;
  // const { token } = sessionData;
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/users`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async (userId) => {
    try {
      const response = await axios.post(
        `https://studentbackendportal.onrender.com/createId`,
        {
          userId,
        }
      );
      if (response.status === 201) {
        navigate("/identity-cards");
      }
    } catch (error) {
      console.log(`${error.response.data.message} Please try again`);
    }
  };
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex w-full justify-center  gap-[1rem]">
        <h2 className="text-xl font-semibold">Users Without IdCard</h2>
      </div>
      <div className="flex flex-wrap gap-[1rem] justify-center items-center">
        {users.length > 0 ? (
          users.map(
            ({
              fullName,
              photo,
              level,
              faculty,
              department,
              matricNumber,
              email,
              _id,
            }) => (
              <div
                className=" rounded-md p-8 w-full  bg-white  sm:w-[40%]"
                key={_id}
              >
                <div className="text-center mb-8 ">
                  <img
                    src={
                      `https://studentbackendportal.onrender.com/assets/${photo}` ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="rounded-full w-24 h-24 mx-auto"
                  />
                  <h2 className="text-lg font-semibold mt-2">{fullName}</h2>
                </div>
                <div className="">
                  <div className="text-sm text-gray-600  mb-6 flex  justify-between w-full ">
                    <strong>Matric No</strong>{" "}
                    <p className="text-left">{matricNumber}</p>
                  </div>
                  <div className="text-gray-600 mb-6 flex w-full  justify-between">
                    <strong>Department</strong>{" "}
                    <p className="text-right">{department}</p>
                  </div>
                  <div className="text-gray-600 mb-6 flex w-full  justify-between">
                    <strong>Faculty</strong>{" "}
                    <p className="text-right"> {faculty}</p>
                  </div>
                  <div className="text-gray-600 mb-6 flex w-full  justify-between">
                    <strong>Level </strong>{" "}
                    <p className="text-right">{level}</p>
                  </div>
                  <div className="text-gray-600 mb-6 flex w-full  justify-between">
                    <strong>Email </strong>{" "}
                    <p className="text-right">{email}</p>
                  </div>
                  <div className="text-gray-600 flex justify-between w-full">
                    <strong>Phone Number </strong> <p>07011280726</p>
                  </div>
                </div>
                <div
                  className="blue_btn mt-[1rem] text-center cursor-pointer"
                  onClick={() => handleSubmit(_id)}
                >
                  Generate Id Card
                </div>
              </div>
            )
          )
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverview;
