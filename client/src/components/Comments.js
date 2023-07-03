import React from 'react';
import Swal from 'sweetalert2';
import './Upload/Upload.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Comments = ({ currentTime, updateComments, comments, seekToTimestamp }) => {
    const handleComment = () => {
        const audio = document.getElementById("toChange");
        audio.pause();
        Swal.fire({
            title: 'Add your comment',
            html: `
                <div style="display: flex; align-items:center; justify-content:center; " > 
                    <input type="time" id="timestampInput" step="1" style="margin-right:10px;" > </input>
                    <textarea id="commentInput" placeholder="Write your comment" style="resize: none; font-size:14px;" ></textarea>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: async () => {

                try {

                    const timestamp = document.getElementById('timestampInput').value;
                    const text = document.getElementById('commentInput').value;

                    if (timestamp && text !== "") {
                        const newComment = { timestamp: timestamp, text: text };
                        await updateComments(comments ? [...comments, newComment] : [newComment]);
                    } else {
                        Swal.showValidationMessage('Please enter a timestamp and comment text.');
                    }
                } catch (error) {
                    throw error;
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
            customClass: {
                confirmButton: 'custom-swal-confirm-button',
                cancelButton: 'custom-swal-cancel-button',
                choosefile: 'swal2-file-input',
            },
        }).then((result) => {
            console.log("after . then", result)
            if (result.isConfirmed) {
                Swal.fire("Sucessfully Done", "", 'success')
            }
        }).catch((error) => {
            Swal.fire("Failure adding comment", "", 'error')
        });
    }
    const handleCommentClick = (timestamp) => {
        seekToTimestamp(timestamp);
    };
    const deleteComment = (comment) => {
        const updatedComments = comments.filter((c) => c !== comment);
        updateComments(updatedComments);
    };
    const sortedcmnts = comments && Object.values(comments).sort((a, b) => {
        return a.timestamp.localeCompare(b.timestamp);
    });


    return (
        <>
            <div className="cmnts">
                {sortedcmnts && sortedcmnts.map((comment, index) => (
                    <div key={index} className="comment"  >
                        <div>
                            <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleCommentClick(comment.timestamp)} >{comment.timestamp}</span>
                            <p>{comment.text}</p>
                        </div>
                        <FontAwesomeIcon onClick={() => deleteComment(comment)} icon={faTrash} className='delete-btn' />
                    </div>
                ))}
            </div>
            <button className='add-comments-button' onClick={handleComment} > Add Comment </button>
        </>
    );
};

export default Comments;
