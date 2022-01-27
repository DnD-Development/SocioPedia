import "./share.scss";
import { useState, useRef, useContext } from "react";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Picker from "emoji-picker-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [emojiDropDown, setEmojiDropDown] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    desc.current.value += emojiObject.emoji;
    setChosenEmoji(emojiObject);
    console.log(emojiObject);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file && !desc.current.value) return;

    var newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      try {
        const fileName = Date.now() + file.name;
        const storageRef = ref(storage, `/images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Uploaded a file!");
          },
          (err) => {
            console.log(err);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              newPost.img = url;
              console.log(newPost);
            });
            try {
              await axios.post("/posts", newPost);
              window.location.reload();
            } catch (err) {}
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post("/posts", newPost);
        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + `person/noAvatar.png`
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What's in your mind " + user.username + " ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div
              className="shareOption"
              onClick={() => setEmojiDropDown(!emojiDropDown)}
            >
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
              {emojiDropDown && (
                <div className="emojiContainer">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
