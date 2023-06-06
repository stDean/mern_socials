import { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { SET_FRIENDS } from "redux/auth.slice";
import WidgetWrapper from "helpers/WidgetWrapper.helper";
import { Friends } from "components/Friends.component";

const FriendsListWidget = ({ userId }) => {

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { token, user: { friends } } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `/api/v1/user/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(SET_FRIENDS({ friends: data }));
    };

    return () => getFriends();
  }, [token, dispatch, userId])

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        {
          friends.map(friend => (
            <Friends
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        }
      </Box>
    </WidgetWrapper >
  )
}

export default FriendsListWidget