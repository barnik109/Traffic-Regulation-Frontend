// PublicCheck.js
import React, { useState, useEffect } from "react";
import publicPic from '../assets/public.gif';

const PublicCheck = ({ contract, username }) => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [violations, setViolations] = useState([]);
  const [noOfSuspended, setNoOfSuspended] = useState(0);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const usertitle = localStorage.getItem("username");
    if (usertitle) {
      setUser(usertitle);
    } else if (username) {
      setUser(username);
    }
  }, [username]);

  const saveUserToLocalStorage = (username) => {
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    alert("You have been logged out successfully");
    navigate("/");
  };

  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const increaseSuspendedCounter = () => {
    setNoOfSuspended((prevCount) => prevCount + 1);
  };

  const checkViolations = async () => {
    try {
      const response = await fetch(
        `https://traffic-regulation-api.vercel.app/check-violations/${licenseNumber}`
      );
      const result = await response.json();

      if (result.success) {
        setViolations(result.violations);

        const totalDemeritPoints = result.violations.reduce(
          (total, violation) => total + violation.demeritPoints,
          0
        );

        if (totalDemeritPoints > 100) {
          let penalty = "";
          if (noOfSuspended === 1) {
            penalty = `License ${licenseNumber} suspended for 6 months`;
          } else if (noOfSuspended === 2) {
            penalty = `License ${licenseNumber} suspended for 12 months`;
          } else if (noOfSuspended === 3) {
            penalty = `License ${licenseNumber} suspended for 6 months and to be revoked`;
          } else if (noOfSuspended > 3) {
            penalty = `License ${licenseNumber} revoked`;
          }
          alert(`Your license is suspended due to exceeding 100 demerit points. ${penalty}`);
          increaseSuspendedCounter();
        } else {
          alert(`Total demerit points: ${totalDemeritPoints}`);
        }
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    }
  }, [user]);

  return (
    <div className="content">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-4">Welcome, {user}</span>
        </div>
        <div className="flex items-center">
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md mr-4">
            Logout
          </button>
        </div>
      </nav>
      <div className="bg-white flex flex-row items-center justify-center py-12">
        <div className="bg-gray-200 rounded-3xl shadow-lg w-full max-w-md p-6 mb-6 mr-8">
          <h2 className="text-2xl mb-4 text-center">Check Violation Details</h2>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Enter License Number:</label>
            <input
              type="text"
              value={licenseNumber}
              onChange={handleLicenseNumberChange}
              className="rounded-lg border border-solid border-gray-300 px-5 py-2 mb-5 w-full"
            />
            <button
              onClick={checkViolations}
              className="bg-blue-700 text-white rounded-lg px-5 py-2 hover:bg-blue-500 self-center"
            >
              Check Violations
            </button>
          </div>
        </div>
        <div className="bg-gray-200 rounded-3xl shadow-lg w-200 p-6 mb-6">
          <h2 className="text-lg mb-3 text-center">Violation Details</h2>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-400 px-4 py-2">Date</th>
                <th className="border border-gray-400 px-4 py-2">Type</th>
                <th className="border border-gray-400 px-4 py-2">Demerit Points</th>
              </tr>
            </thead>
            <tbody>
              {violations.map((violation, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2 text-center">{violation.violationDate}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{violation.violationType}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{violation.demeritPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="flex justify-center">
          <img src={publicPic} alt="Public Check" className="w-48 h-48" />
        </div> */}
      </div>
    </div>
  );
};

export default PublicCheck;
