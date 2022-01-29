import React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MoreVert } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HideImageIcon from "@mui/icons-material/HideImage";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ReportIcon from "@mui/icons-material/Report";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../config";

function PostMenu({ user, post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUnfollowClick = async () => {
    try {
      await axiosInstance.put("/users/" + user._id + "/unfollow", {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = () => {
    try {
      axiosInstance.delete("/posts/" + post._id, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Post settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <BookmarkBorderIcon />
          </ListItemIcon>
          Save Post
        </MenuItem>
        {post.userId === currentUser._id && (
          <MenuItem onClick={handleDeletePost}>
            <ListItemIcon>
              <HideImageIcon />
            </ListItemIcon>
            Delete Post
          </MenuItem>
        )}

        <Divider />
        {user.username !== currentUser.username && (
          <MenuItem onClick={handleUnfollowClick}>
            <ListItemIcon>
              <PersonRemoveIcon fontSize="small" />
            </ListItemIcon>
            Unfollow {user.username}
          </MenuItem>
        )}

        <MenuItem>
          <a
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
            href={`mailto:info.sociapedia@gmail.com?subject=Report The Post &body=Hi,I found this post violet the rule. Post ID : ${post._id} and User Id : ${user._id}`}
          >
            <ListItemIcon>
              <ReportIcon fontSize="small" />
            </ListItemIcon>
            Report Post
          </a>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default PostMenu;
