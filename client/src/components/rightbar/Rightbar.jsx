import Online from "../online/Online";
import { Users } from "../../dummydata";
import "./rightbar.scss";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log(user);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + `gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Ray Lil Black</b> and <b>3 other friends</b> have a birthday
            today!
          </span>
        </div>

        <img src={PF + `ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey"> City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={PF + `person/1.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">PMO Pakistan</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/2.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">PMO Pakistan</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/3.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">PMO Pakistan</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/4.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">PMO Pakistan</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + `person/5.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">PMO Pakistan</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
