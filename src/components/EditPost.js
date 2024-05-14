import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const EditPost = () => {
  const [post, setPost] = useState({ title: "", body: "", author: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, post);
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
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
          Update Post
        </Button>
      </form>
    </Container>
  );
};

export default EditPost;
