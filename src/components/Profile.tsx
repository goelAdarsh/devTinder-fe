import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userProfile = useSelector((store) => store.user);

  return (
    <div>
      {userProfile &&<EditProfile profile={userProfile} />}
    </div>
  );
};

export default Profile;
