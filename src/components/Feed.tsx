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

  if (!feedProfiles) return null;

  if (feedProfiles.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <h1 className="text-2xl font-bold">No Profiles Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-20">
      {feedProfiles && feedProfiles.length && (
        <FeedProfileCard
          profile={feedProfiles[0]}
          onActionSuccess={fetchFeed}
          key={feedProfiles[0]._id}
        />
      )}
    </div>
  );
}
