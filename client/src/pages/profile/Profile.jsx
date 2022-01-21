import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.scss";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setUser] = useState({});
  const username = useParams().username;
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  profileUser.coverPicture
                    ? PF + profileUser.coverPicture
                    : PF + `person/noCover.png`
                }
                alt={PF + `person/noCover.png`}
                className="profileCoverImg"
              />
              <img
                src={
                  profileUser.profliePicture
                    ? PF + profileUser.profliePicture
                    : PF + `person/noAvatar.png`
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser.username}</h4>
              {profileUser.username === user.username && (
                <Button
                  variant="outlined"
                  color="error"
                  // className="profileLogoutButton"
                  onClick={handleLogout}
                  style = {{marginTop: "15px"}}
                >
                  <LogoutIcon />
                  Logout
                </Button>
              )}
              <span className="profileInfoDesc">{profileUser.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={profileUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
