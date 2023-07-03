import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../AudioPlayer";
import ReactAudioPlayer from "react-audio-player";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";

import "../Upload/Upload.css";
import Comments from "../Comments";

import "./View.css";

function View() {
  let { state } = useLocation();
  const [currentTime, setCurrentTime] = useState();
  const [captions, setCaptions] = useState();
  const [comments, setComments] = useState([]);
  const [aud, setAud] = useState();
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser.uid;
  const docref = doc(db, "Files", user);
  const updateCaptions = async (captions) => {
    await updateDoc(docref, {
      [state.fileName]: {
        ...aud,
        captions: captions,
        updatedOn: Date(),
      },
    });
    setCaptions(captions);
  };
  const updateComments = async (comments) => {
    await updateDoc(docref, {
      [state.fileName]: {
        ...aud,
        comments: comments,
        updatedOn: Date(),
      },
    });
    setComments(comments);
  };
  const seekToTimestamp = (timestamp) => {
    const audio = document.getElementById("toChange");
    audio.currentTime = convertTimestampToSeconds(timestamp);
    audio.play();
  };

  const convertTimestampToSeconds = (timestamp) => {
    // Implement the conversion logic based on the timestamp format you're using
    // Example: "00:01:30" => 90 seconds
    const [hours, minutes, seconds] = timestamp.split(":");
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };
  useEffect(() => {
    const fetchData = async () => {
      const dataref = await getDoc(docref);
      const auds = dataref.data();
      console.log(auds[state.fileName]);
      setAud(auds[state.fileName]);
      setCaptions(auds[state.fileName].captions);
      setComments(auds[state.fileName].comments);
    };
    fetchData();
    // Update the current time based on the video player's time
    const handleTimeUpdate = (event) => {
      setCurrentTime(Math.floor(event.target.currentTime));
    };

    const audioElement = document.getElementById("toChange");
    console.log(audioElement);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      // Clean up the event listener
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);
  return (
    <div className="view-page-con">
      <div className="react-audio-player">
        <ReactAudioPlayer
          id="toChange"
          className="react-audio"
          src={state.url}
          controls
        />
      </div>
      <div className="use">
        <div className="capt">
          {captions && (
            <AudioPlayer
              captions={captions}
              currentTime={currentTime}
              updateCaptions={updateCaptions}
            />
          )}
        </div>
        <div className="cont">
          <div className="cmnts">
            <Comments
              updateComments={updateComments}
              currentTime={currentTime}
              comments={comments}
              seekToTimestamp={seekToTimestamp}
              showAddCommentButton={false}
            />
          </div>
          <button className="add-comments-button" onClick={updateComments}>
            Add Comments
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;
