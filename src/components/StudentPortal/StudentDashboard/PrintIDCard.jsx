import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/unilorin_logo2.png";
import passport from "../../assets/passport.jpg";
import Qr from "../../assets/Qr2.png";
import print from "../../assets/print.png";
const IDCard = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className="flex justify-center items-start space-x-8 p-4 bg-gray-100 min-h-screen"
  >
    {/* Front Side of the ID Card */}
    <div className="w-1/3 h-96 mt-32 border px-6 py-2 font-sans bg-white shadow-md flex flex-col justify-between rounded-3xl">
      <div>
        <div className="flex items-center mb-4">
          <div className="w-16 h-16">
            <img
              src={logo}
              alt="University Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-3xl text-blue-900 font-bold whitespace-nowrap">
              UNIVERSITY OF ILORIN
            </h2>
            <p className="text-sm text-center">P.M.B. 1515, ILORIN, NIGERIA</p>
          </div>
        </div>
        <div className="text-center mb-2">
          <h3 className="text-red-600 text-lg font-semibold mt-6">
            STUDENT IDENTITY CARD
          </h3>
        </div>
        <div className="text-right mb-2 border-b-2 border-black">
          <p className="text-sm">
            Expiry Date:{" "}
            <span className="bg-green-200 px-2 rounded">31/12/2025</span>
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col space-y-2 w-3/5">
            <p className="text-md text-red-600">
              Name:{" "}
              <input
                type="text"
                className=" outline-none w-full font-bold text-black "
              />
            </p>
            <p className="text-md text-red-600">
              Matric No:{" "}
              <input
                type="text"
                className="outline-none w-full font-bold text-black"
              />
            </p>
            <p className="text-md  text-red-600">
              Faculty:{" "}
              <input
                type="text"
                className=" outline-none w-full font-bold text-black"
              />
            </p>
            <p className="text-md text-red-600">
              Department:{" "}
              <input
                type="text"
                className="outline-none w-full font-bold text-black "
              />
            </p>
          </div>
          <div className="w-24 h-28 border mt-10">
            <img
              src={passport}
              alt="Student Photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Back Side of the ID Card */}
    <div className="w-1/3 h-96 mt-32 border p-4 font-sans bg-white shadow-md flex flex-col justify-between rounded-3xl">
      <div>
        <p className="text-sm mb-4">
          This identity card is not transferable. It must be produced at any
          time if requested by any office of the University or authorized
          person(s).
        </p>
        <p className="text-sm mb-4">
          Loss of this card must be reported immediately to the Registrar,
          University of Ilorin, P.M.B. 1515, Ilorin, Nigeria.
        </p>
        <div className="mt-4 text-center">
          <p className="text-sm mb-2">Registrar's Signature</p>
          <div className="mx-auto w-32 my-2"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-24 h-24 border">
          <img src={Qr} alt="QR Code" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
));

const PrintIDCard = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input, {
      scale: 2, // Increase the scale for better quality
      useCORS: true, // Allow cross-origin images
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("id_card.pdf");
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center w-full p-4">
        <IDCard ref={componentRef} />
        <div className="flex justify-center mt-2 space-x-4">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Print ID Card
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintIDCard;
