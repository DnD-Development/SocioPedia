import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.scss";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PF + `post/3.jpeg`}
                alt=""
                className="profileCoverImg"
              />
              <img src={PF + `post/7.jpeg`} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Dhruv gargg</h4>
              <span className="profileInfoDesc">
                Dont MEss with me !! bomb se uda dunga !
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
