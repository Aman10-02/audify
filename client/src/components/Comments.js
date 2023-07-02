import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Upload/Upload.css'

const Comments = ({ currentTime, updateComments, comments, seekToTimestamp }) => {
    // const [comments, setComments] = useState();
    const [adding, setAdding] = useState(false);
    const [timestamp, setTimeStamp] =  useState();
    const [text, setText] =  useState();
    // const text = document.getElementById('commentInput').value;
    const handleSubmit = (e) => {
        e.preventDefault()
        if (timestamp && text) {
            const newComment = { timestamp : timestamp, text: text };
            // setComments([...comments, newComment]);

            // Optionally, you can call the `updateComments` function to pass the comments to a parent component or perform other actions.
            updateComments( comments ? [...comments, newComment] : [newComment]);
        } else {
            Swal.fire('Error', 'Please enter a timestamp and comment text.', 'error');
        }
        setAdding(false)
    }
    const handleComment = () => {
        const audio = document.getElementById("toChange");
        audio.pause();
        setAdding(true);

    }
    const handleCommentClick = (timestamp) => {
        seekToTimestamp(timestamp);
      };
    const sortedcmnts = comments && Object.values(comments).sort((a, b) => {
        return a.timestamp.localeCompare(b.timestamp);
      });
    

    return (
        <>
            <div>
                { sortedcmnts && sortedcmnts.map((comment, index) => (
                    <div key={index} className="comment"  >
                        <span style={{color:'blue', textDecoration:'underline',cursor: 'pointer' }} onClick={() => handleCommentClick(comment.timestamp)} >{comment.timestamp}</span>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
            {
                adding &&
                <form onSubmit={handleSubmit}>
                    <input type="time" id="timestampInput" step={1} onChange={ (e) => {setTimeStamp(e.target.value)} } />
                    <textarea id="commentInput" onChange={ (e) => {setText(e.target.value)} } />
                    <input type="submit" />
                </form>
            }
            <button className='' onClick={handleComment} > Add Comment </button>
        </>
    );
};

export default Comments;



//   const [isEditing, setIsEditing] = useState(false);

//   // Filter comments based on current time
//   const currentcomment = editedcomments.find(
//     (comment) =>
//       comment.startTime / 1000 <= currentTime && comment.endTime / 1000 > currentTime
//   );

//   // Function to handle comment text change
//   const handlecommentChange = (e) => {
//     const updatedcommentText = e.target.value;
//     setEditedcomments((prevcomments) =>
//       prevcomments.map((comment) =>
//         comment === currentcomment ? { ...comment, text: updatedcommentText } : comment
//       )
//     );
//   };
//   const handleEdit = async () => {
//     if(isEditing){ //save btn clicked
//         await Swal.fire({
//         title: 'Save Changes',
//         text: 'Are you sure you want to change the comment?',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'Save',
//         cancelButtonText: 'Cancel',
//         showLoaderOnConfirm: true,
//         preConfirm: async() => {
//           try {
//             const cancleBtn = Swal.getCancelButton()
//             cancleBtn.style.display = "none"
//             await updatecomments(editedcomments);
//           } catch (error) {
//             Swal.fire('Error', 'An error occurred while saving the changes.', 'error');
//           }
//         }
//       });
//     };
//     setIsEditing(!isEditing)
//   };
