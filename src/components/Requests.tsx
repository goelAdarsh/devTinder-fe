import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../store/requestsSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [requestActionStatus, setRequestActionStatus] = useState<string | null>(
    null
  );

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(setRequests(response?.data?.data));
    } catch (error) {}
  };

  const handleRequestAction = async (requestId, status) => {
    try {
      await axios.patch(
        `${BASE_URL}/requests/${requestId}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );
      setRequestActionStatus(status.toLowerCase());
    } catch (error) {
      setRequestActionStatus("Please try again later");
    } finally {
      setTimeout(() => {
        setRequestActionStatus(null);
        fetchRequests();
      }, 2000);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-bold">No Requests Found</h1>
      </div>
    );
  }

  return (
    <>
      {requestActionStatus && (
        <div className="toast toast-top toast-end">
          <div className={`alert alert-success`}>
            Request{" "}
            {requestActionStatus === "accepted" ? "accepted" : "rejected"}{" "}
            successfully.
          </div>
        </div>
      )}
      <div className="flex flex-col gap-10 m-10">
        <h1 className="text-2xl font-bold">Requests</h1>
        <ul className="list bg-base-800 rounded-box shadow-md">
          {requests.map((request) => (
            <li className="list-row" key={request._id}>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={request.senderId.photoUrl}
                />
              </div>
              <div>
                <div>
                  {request.senderId.firstName + " " + request.senderId.lastName}
                </div>
                <div className="text-xs font-semibold opacity-60">
                  {request.senderId.about}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequestAction(request._id, "REJECTED")}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRequestAction(request._id, "ACCEPTED")}
                >
                  Accept
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Requests;
