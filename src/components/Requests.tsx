import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../store/requestsSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(setRequests(response?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);

  if (!requests) return null;
  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-bold">No Requests Found</h1>
      </div>
    );
  }

  return (
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
              <button className="btn btn-primary">Decline</button>
              <button className="btn btn-secondary">Accept</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
