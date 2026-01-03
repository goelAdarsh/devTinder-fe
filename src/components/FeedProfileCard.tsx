

const FeedProfileCard = ({ profile }) => {

  return (
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedProfileCard;
