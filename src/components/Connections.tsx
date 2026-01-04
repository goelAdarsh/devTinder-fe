import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../store/connectionsSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => (store as any).connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(setConnections(response?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-bold">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 m-10">
      <h1 className="text-2xl font-bold">Connections</h1>
      <ul className="list bg-base-800 rounded-box shadow-md">
        {connections.map((connection: any) => (
          <li className="list-row" key={connection._id}>
            <div>
              <img className="size-10 rounded-box" src={connection.photoUrl} />
            </div>
            <div>
              <div>{connection.firstName + " " + connection.lastName}</div>
              <div className="text-xs font-semibold opacity-60">
                {connection.about}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
