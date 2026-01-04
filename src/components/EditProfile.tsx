import axios from "axios";
import { useState } from "react";
import FeedProfileCard from "./FeedProfileCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUserProfile } from "../store/userSlice";

const EditProfile = ({ profile }: any) => {
  const dispatch = useDispatch();

  const [userProfileData, setUserProfileData] = useState({
    age: profile.age || "",
    about: profile.about || "",
    photoUrl: profile.photoUrl || "",
  });
  const [isUserProfileSaved, setIsUserProfileSaved] = useState(false);

  console.log(profile);

  const handleSaveProfile = async () => {
    try {
      await axios.patch(`${BASE_URL}/profile/edit`, userProfileData, {
        withCredentials: true,
      });
      dispatch(addUserProfile({ ...profile, ...userProfileData }));
      setIsUserProfileSaved(true);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsUserProfileSaved(false);
      }, 3000);
    }
  };

  return (
    <div className="flex gap-4">
      {isUserProfileSaved && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body flex flex-col gap-5">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="flex flex-col gap-4">
              <label className="input validator">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={profile.firstName}
                  disabled
                />
              </label>
              <label className="input validator">
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={profile.lastName}
                  disabled
                />
              </label>
              <label className="input validator">
                <input
                  type="text"
                  placeholder="About"
                  required
                  value={userProfileData.about}
                  onChange={(e) =>
                    setUserProfileData({
                      ...userProfileData,
                      about: e.target.value,
                    })
                  }
                />
              </label>
              <label className="input validator">
                <input
                  type="text"
                  placeholder="Photo Url"
                  required
                  value={userProfileData.photoUrl}
                  onChange={(e) =>
                    setUserProfileData({
                      ...userProfileData,
                      photoUrl: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeedProfileCard
        profile={{ ...profile, ...userProfileData }}
        onActionSuccess={() => {}}
      />
    </div>
  );
};

export default EditProfile;
