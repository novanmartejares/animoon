"use client"
import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';

const CommentBoxWithEmoji = () => {
  const [comment, setComment] = useState('');

  const handleOnEnter = (text) => {
    console.log("Comment submitted:", text);
    setComment('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Comment Box with Emoji (Dark Theme)</h1>
      
      <div style={styles.inputContainer}>
        <InputEmoji
          value={comment}
          onChange={setComment}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type your comment and add emojis..."
          fontSize={16}
          borderRadius={8}
          inputStyle={styles.input}  // Apply input style here
        />
      </div>
      
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleOnEnter(comment)}>
          Submit Comment
        </button>
      </div>
      
      <p style={styles.commentText}>Your Comment: {comment}</p>
    </div>
  );
};

// Dark theme styles
const styles = {
  container: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '0 auto',
    marginTop: '100px',
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '10px',
    backgroundColor: '#333',
    borderRadius: '8px',
    padding: '10px',
  },
  input: {
    color: '#fff',  // Change input text color
    backgroundColor: '#333',  // Change input background
    border: '1px solid #444', // Add border for input if needed
    "::placeholder": {
      color: '#aaa',  // Change placeholder text color
    },
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  commentText: {
    color: '#ccc',
    textAlign: 'center',
  },
};

// Custom CSS for placeholder text color (this works alongside the inline styles)
const customCSS = `
  .input-emoji__input::placeholder {
    color: #aaa; /* Customize placeholder color */
  }
`;

export default CommentBoxWithEmoji;
