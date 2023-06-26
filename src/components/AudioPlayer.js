import React, { useState, useEffect } from 'react';
// import { createFFmpeg } from '@ffmpeg/ffmpeg';
// // import {} from 'webvtt';
// import { parse } from 'webvtt-parser';
import axios from 'axios'
// import file from "./files/aman.srt"
import srtParser2 from "srt-parser-2";


// import './AudioPlayer.css'; // Add custom CSS for styling

const AudioPlayer=( {captions, currentTime} ) => {
  // const audioPath = 'aman.mp3';
  // const srtPath = ;
  console.log(currentTime)
  console.log(captions)
  // const audio = new Audio(audioPath);
  // var srt_array = parser.fromSrt();
  // console.log(srt_array);

  
  // const [currentCaption, setCurrentCaption] = useState();
  // const [curTime, setCurTime] = useState();

  // useEffect(() => {
    const currentCaption =
   captions.filter((caption) => caption.startSeconds <= currentTime && caption.endSeconds > currentTime)
  // }, []);


  return (
    <div className="audio-player">
      {
        currentCaption &&
        currentCaption.map( (caption, index) => 
          <div className="caption">"this is caption" {caption.text}</div>
         )
        
      }
      {/* <div className="controls">
        Add audio controls (play, pause, etc.)
      </div>
      <div className="captions">
        
          <div
            onClick={() =>
              playAudioWithCaption()
            }
          >
            Play
          </div>

      </div> */}
    </div>
  );
};

export default AudioPlayer;