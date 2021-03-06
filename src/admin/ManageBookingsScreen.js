import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

const ManageBookingsScreen = () => {
  const spinner = useLoading();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [singleBooking, setSingleBooking] = useState({});
  const [allBookings, setAllBookings] = useState([]);
  const history = useHistory();
  const { admin } = useAuth();
  useEffect(() => {
    fetch("https://salty-harbor-29929.herokuapp.com/booking")
      .then((res) => res.json())
      .then((data) => setAllBookings(data));
  }, []);

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  //single booking
  useEffect(() => {
    allBookings.map((item) => setSingleBooking(item));
  }, [allBookings]);

  //delete bookings
  const handleDelete = (id) => {
    swal({
      title: "Are You Sure?",
      text: "Are You Sure To Delete This Booking ?",
      icon: "Warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://salty-harbor-29929.herokuapp.com/booking/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              swal("Poof! Booking Has Deleted", {
                icon: "success",
              });
              const restBookings = allBookings.filter(({ _id }) => _id !== id);
              setAllBookings(restBookings);
            }
          });
      } else {
        swal("Booking Has Not Been Deleted Yet!");
      }
    });
  };

  //approve system
  const handleApprove = (id) => {
    // update status
    const prevBooking = { ...singleBooking };
    const prevData = prevBooking.data;
    prevData.status = "Approved";
    axios
      .put(`https://salty-harbor-29929.herokuapp.com/booking/${id}`, {
        newData: prevData,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("Approved", {
            icon: "success",
          }).then(() => {
            window.location.reload();
            setSingleBooking((prevBooking.data.status = "Approved"));
            setDisabled(true);
          });
        }
      });
  };

  return (
    <div className="flex flex-col my-8">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          {loading ? (
            spinner
          ) : (
            <div className="rounded-lg">
              {allBookings.length > 0 ? (
                <>
                  <table className="max-w-screen-xl mx-auto">
                    <thead className="hidden lg:block bg-gray-800 font-primary">
                      <tr className="grid grid-cols-1 lg:grid-cols-6 place-items-center">
                        <th
                          scope="col"
                          className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                        >
                          Model
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                        >
                          Customer Name
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                        >
                          E-mail
                        </th>
                        <th
                          scope="col"
                          className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                        >
                          Status
                        </th>
                        {admin && (
                          <div>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider">
                                Action
                              </span>
                            </th>
                          </div>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {allBookings.map(({ _id, bookings, data }) => (
                        <tr
                          className="bg-white border-b font-primary text-sm grid grid-cols-1 lg:grid-cols-6 place-items-center"
                          key={_id}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              className="w-48 lg:w-24 rounded-lg"
                              src={bookings.image}
                              alt={bookings.title}
                            />
                          </td>
                          <td className="text-sm text-gray-500 px-6 py-4 break-all">
                            {bookings.title}
                          </td>
                          <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                            {data.name}
                          </td>
                          <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                            {data.email}
                          </td>
                          <td className="text-sm px-6 py-4 whitespace-nowrap">
                            <span
                              className={`${
                                data.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-green-600"
                              } text-white px-4 py-1 rounded-full font-primary`}
                            >
                              {data.status}
                            </span>
                          </td>
                          {admin && (
                            <div>
                              <td className="px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center justify-center">
                                <div className="flex items-center justify-center space-x-3">
                                  <AiOutlineDelete
                                    onClick={() => handleDelete(_id)}
                                    className="cursor-pointer text-2xl text-red-600"
                                  />
                                  <button
                                    disabled={disabled}
                                    className="bg-blue-600 px-4 py-2 text-white font-primary rounded-lg text-sm ring-blue-300 focus:ring-4 transition duration-300"
                                    onClick={() => handleApprove(_id)}
                                  >
                                    {data.status === "Approved"
                                      ? "Approved"
                                      : "Approve"}
                                  </button>
                                </div>
                              </td>
                            </div>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <div className="h-96 space-y-6 flex items-center justify-center flex-col">
                    <img src="../../assets/box.png" alt="no order" />
                    <button
                      className="btn-primary px-6"
                      onClick={() => history.push("/")}
                    >
                      Book Now
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookingsScreen;
