import axios from "axios";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { addUserProfile } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      dispatch(addUserProfile(response.data));
    } catch (error) {
      if (error instanceof AxiosError && error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
