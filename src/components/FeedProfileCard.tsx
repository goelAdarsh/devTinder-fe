import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const FeedProfileCard = ({ profile, onActionSuccess }: any) => {
  const [profileActionStatus, setProfileActionStatus] = useState(null);

  const handleProfileAction = async (receiverId: string, status: string) => {
    try {
      await axios.post(
        `${BASE_URL}/requests`,
        {
          receiverId,
          status,
        },
        {
          withCredentials: true,
        }
      );
      setProfileActionStatus((status as any).toLowerCase());
    } catch (error) {
    } finally {
      setTimeout(() => {
        setProfileActionStatus(null);
        onActionSuccess();
      }, 1000);
    }
  };

  return (
    <>
      {profileActionStatus && (
        <div className="toast toast-top toast-end">
          <div className={`alert alert-success`}>
            {profileActionStatus === "interested"
              ? "Sent connection request"
              : "Profile ignored"}{" "}
            successfully.
          </div>
        </div>
      )}
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={profile.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {profile.firstName + " " + profile.lastName}
          </h2>
          <p>{profile.about}</p>
          <div className="card-actions flex justify-center pt-4">
            <button
              className="btn btn-primary"
              onClick={() => handleProfileAction(profile._id, "IGNORED")}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleProfileAction(profile._id, "INTERESTED")}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedProfileCard;
