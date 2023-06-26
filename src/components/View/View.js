import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AudioPlayer from '../AudioPlayer';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import srtParser2 from 'srt-parser-2';

function View() {
    let { state } = useLocation();
    const [currentTime, setCurrentTime] = useState();
    useEffect(() => {

        // Update the current time based on the video player's time
        const handleTimeUpdate = (event) => {
            setCurrentTime(Math.floor(event.target.currentTime));
        };

        const audioElement = document.getElementById("toChange");
        console.log(audioElement)
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            // Clean up the event listener
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);
    return (
        <>
            <AudioPlayer captions={state.captions} currentTime={currentTime} />
            {/* <div className="caption">"this is caption" {console.log(currentCaption)}</div> */}
            <ReactAudioPlayer id='toChange' src={state.url} controls />
            <div>{currentTime}</div>
        </>
    )
}

export default View