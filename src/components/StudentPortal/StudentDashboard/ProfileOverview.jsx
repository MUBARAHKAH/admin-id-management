import React, { useEffect, useRef, useState } from "react";
// import * as htmlToImage from "html-to-image";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.svg";

const ProfileOverview = () => {
  const [users, setUsers] = useState([]);
  const [qrCode, setQrCode] = useState(false);
  const [loading, setLoading] = useState("");
  const [searchValue, setSearchValue] = useState("");
  // const [qrCodeImage, setQrcodeImage] = useState("");
  // const qrCodeRef = useRef(null);
  useEffect(() => {
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://studentbackendportal.onrender.com/users`
        );
        const data = await response.json();
        setUsers(data);
        console.log(data[1].photo);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    })();
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (userId, data) => {
    // htmlToImage
    //   .toPng(matricNumber)
    //   .then(function (dataUrl) {
    //     setQrcodeImage(dataUrl);

    //   })
    //   .catch(function (error) {
    //     console.error("Error generating QR code:", error);
    //   });
    setLoading(true);
    try {
      const response = await axios.post(
        `https://studentbackendportal.onrender.com/createId`,
        {
          userId,
          qrCodeImage: JSON.stringify(data),
        }
      );
      if (response.status === 201) {
        setLoading(false);

        navigate("/identity-cards");
      }
    } catch (error) {
      setLoading(false);

      console.log(`${error.response.data.message} Please try again`);
    }
  };
  return (
    <div className="flex flex-col gap-[1rem] w-full ">
      <div className="flex w-full justify-center  gap-[1rem]">
        <h2 className="text-xl font-semibold text-blue-500">
          Pending Id Cards
        </h2>
      </div>
      <div className="cursor-pointer flex justify-center  items-center w-full">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-[1rem_2rem] sm:w-[60%] w-full border  rounded-lg  "
          placeholder="Search for a user"
        />
      </div>
      <div className="flex flex-wrap gap-[1rem] justify-center items-center">
        {users.length > 0 ? (
          users
            .filter(({ fullName }) =>
              searchValue
                ? fullName.toLowerCase().includes(searchValue.toLowerCase())
                : true
            )
            .map(
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
                    <h2 className="text-lg font-semibold mt-2 text-green-500">
                      {fullName}
                    </h2>
                  </div>

                  <div className="">
                    <div className="flex-col text-sm gap-[0.5rem] text-gray-600  mb-6 flex  justify-between w-full ">
                      <strong>Matric No</strong>{" "}
                      <p className="w-full text-right">{matricNumber}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
                      <strong>Department</strong>{" "}
                      <p className="text-right">{department}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
                      <strong>Faculty</strong>{" "}
                      <p className="text-right"> {faculty}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
                      <strong>Level </strong>{" "}
                      <p className="text-right">{level}</p>
                    </div>
                    <div className="flex-col gap-[0.5rem] text-gray-600 mb-6 flex w-full  justify-between">
                      <strong>Email </strong>{" "}
                      <p className="text-right">{email}</p>
                    </div>
                  </div>
                  <button
                    className="blue_btn mt-[1rem] text-center items-center  justify-center w-full flex gap-[1rem] "
                    onClick={() =>
                      handleSubmit(_id, {
                        fullName,
                        photo,
                        level,
                        faculty,
                        department,
                        matricNumber,
                        email,
                        _id,
                      })
                    }
                  >
                    Generate Id Card & QR Code
                  </button>
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
