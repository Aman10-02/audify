import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AudioPlayer from '../AudioPlayer';
import ReactAudioPlayer from 'react-audio-player';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import { getAuth } from 'firebase/auth';
<<<<<<< HEAD

import '../Upload/Upload.css'


=======
import './View.css';
>>>>>>> d91874336f034e9963a056e91b6f26947ad5014c

function View() {
    let { state } = useLocation();
    const [currentTime, setCurrentTime] = useState();
    const [captions, setCaptions] = useState();
    const [aud, setAud] = useState();
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const docref = doc(db, "Files", user);
    const updateCaptions = async (captions) => {
        await updateDoc(docref, {
                [state.fileName] : {
                    ...aud,
                    captions : captions,
                    updatedOn: Date()
                }
        })
        setCaptions(captions);
    };
    useEffect(() => {
        const fetchData = async () => {
            const dataref = await getDoc(docref);
            const auds = dataref.data()
            console.log(auds[state.fileName])
            setAud(auds[state.fileName])
            setCaptions(auds[state.fileName].captions)
        };
        fetchData();
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
<<<<<<< HEAD
        <>
            <div className='react-audio-player'>
               <ReactAudioPlayer id='toChange' className='react-audio' src={state.url} controls />
            </div>
            <div>{currentTime}</div>
=======
        <div className='caption-contain'>
            
>>>>>>> d91874336f034e9963a056e91b6f26947ad5014c
            {captions &&
                      <AudioPlayer captions={captions} currentTime={currentTime} updateCaptions={updateCaptions} />}
            {/* <div className="caption">"this is caption" {console.log(currentCaption)}</div> */}
<<<<<<< HEAD
            
        </>
=======
            <ReactAudioPlayer id='toChange' src={state.url} controls />
        </div>
>>>>>>> d91874336f034e9963a056e91b6f26947ad5014c
    )
}

export default View