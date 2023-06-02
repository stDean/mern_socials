import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SET_POSTS } from "redux/auth.slice";
import { PostWidget } from "./Post.widget";

const PostsWidget = ({ userId, isProfile = false }) => {

  const dispatch = useDispatch();
  const { posts, token } = useSelector(({ auth }) => auth);

  const getPosts = async () => {
    const response = await fetch("/api/v1/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const { posts } = await response.json();
    dispatch(SET_POSTS({ posts }));
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `/api/v1/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { posts } = await response.json();
    dispatch(SET_POSTS({ posts }));
  };



  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {
        posts.map(({
          _id, userId, firstName, lastName, description,
          location, picturePath, userPicturePath, likes, comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ))
      }
    </>
  )
}

export default PostsWidget