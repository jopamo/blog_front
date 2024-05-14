import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", body: "", author: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/posts", post);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={post.author}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Body"
          name="body"
          value={post.body}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </form>
    </Container>
  );
};

export default CreatePost;
