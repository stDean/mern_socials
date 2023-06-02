import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import { SET_POST } from "redux/auth.slice";
import FlexBetween from "helpers/FlexBetween.helper";
import WidgetWrapper from "helpers/WidgetWrapper.helper";

export const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { token, user: { _id } } = useSelector(({ auth }) => auth);
  const [isComments, setIsComments] = useState(false);
  // const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => { }

  return (
    <WidgetWrapper m="2rem 0"></WidgetWrapper>
  )
}
