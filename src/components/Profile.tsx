import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userProfile = useSelector((store) => (store as any).user);

  return (
    <div>
      {userProfile &&<EditProfile profile={userProfile} />}
    </div>
  );
};

export default Profile;
