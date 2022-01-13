import Online from "../online/Online";
import { Users } from "../../dummydata";
import "./rightbar.scss";

function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src="./assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Ray Lil Black</b> and <b>3 other friends</b> have a birthday
            today!
          </span>
        </div>

        <img src="./assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="righbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rightbar;
