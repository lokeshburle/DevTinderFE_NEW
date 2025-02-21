import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed); 

  console.log("Current feed:", feed);

  const getFeed = async () => {
    if (feed.length > 0) return; 

    try {
      const result = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(result.data.data)); 
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); 

  return (
    <>
    {feed && 
    <div className="flex justify-center my-10">
      
        <UserCard user={feed[0]} />
    </div>}
    </>
  );
};

export default Feed;
