import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedProfileCard from "./FeedProfileCard";
import { addFeed } from "../store/feedSlice";
import { BASE_URL } from "../utils/constants";
import type { FeedProfile } from "../types/feedProfile";

export default function Feed() {
  const dispatch = useDispatch();
  const feedProfiles = useSelector((store) => store.feed);
  console.log(feedProfiles);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center items-center py-20">
      {feedProfiles &&
        feedProfiles.length &&
        feedProfiles.map((feedProfile: FeedProfile) => (
          <FeedProfileCard profile={feedProfile} />
        ))}
    </div>
  );
}
