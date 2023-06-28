import React, { useState } from 'react';

import './Upload/Upload.css'

const AudioPlayer = ({ captions, currentTime, updateCaptions }) => {
  
  const [editedCaptions, setEditedCaptions] = useState(captions); // State to hold the edited captions
  const [isEditing, setIsEditing] = useState(false);

  // Filter captions based on current time
  const currentCaption = editedCaptions.find(
    (caption) =>
      caption.startTime / 1000 <= currentTime && caption.endTime / 1000 > currentTime
  );

  // Function to handle caption text change
  const handleCaptionChange = (e) => {
    const updatedCaptionText = e.target.value;
    setEditedCaptions((prevCaptions) =>
      prevCaptions.map((caption) =>
        caption === currentCaption ? { ...caption, text: updatedCaptionText } : caption
      )
    );
  };
  const handleEdit = async () => {
    if(isEditing){ //save btn clicked
      const confirmSave = window.confirm('Are you sure you want to change the caption?');
      if (confirmSave) {
        await updateCaptions(editedCaptions);
      }
    }
    setIsEditing(!isEditing)
  };

  return (
    <div className="audio-player">
      {currentCaption && (
        <section>
           <div className="caption">
            <textarea className="caption-textarea" value={currentCaption.text} disabled = {!isEditing} onChange={handleCaptionChange} />
           </div>
          {<button className='audio-player-button' onClick={handleEdit} > {isEditing ? "save" : "edit"} </button>}
        </section>
      )}
    </div>
  );
};

export default AudioPlayer;





// import React, { useState, useEffect } from 'react';
// // import { createFFmpeg } from '@ffmpeg/ffmpeg';
// // // import {} from 'webvtt';
// // import { parse } from 'webvtt-parser';
// import axios from 'axios'
// // import file from "./files/aman.srt"
// import srtParser2 from "srt-parser-2";


// // import './AudioPlayer.css'; // Add custom CSS for styling

// const AudioPlayer=( {captions, currentTime} ) => {
//   // const audioPath = 'aman.mp3';
//   // const srtPath = ;
//   console.log(currentTime)
//   console.log(captions)
//   // const audio = new Audio(audioPath);
//   // var srt_array = parser.fromSrt();
//   // console.log(srt_array);

  
//   // const [currentCaption, setCurrentCaption] = useState();
//   // const [curTime, setCurTime] = useState();

//   // useEffect(() => {
//     const currentCaption =
//    captions.filter((caption) => caption.startTime/1000 <= currentTime && caption.endTime/1000 > currentTime)
//   // }, []);


//   return (
//     <div className="audio-player">
//       {
//         currentCaption &&
//         currentCaption.map( (caption, index) => 
//           <div className="caption">"this is caption" {caption.text}</div>
//          )
        
//       }
//       {/* <div className="controls">
//         Add audio controls (play, pause, etc.)
//       </div>
//       <div className="captions">
        
//           <div
//             onClick={() =>
//               playAudioWithCaption()
//             }
//           >
//             Play
//           </div>

//       </div> */}
//     </div>
//   );
// };

// export default AudioPlayer;