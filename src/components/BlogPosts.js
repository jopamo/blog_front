import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "20px 0" }}
        onClick={() => navigate("/create")}
      >
        Create Post
      </Button>
      {posts.length === 0 ? (
        <Typography variant="h5" style={{ marginTop: 20 }}>
          No blog posts
        </Typography>
      ) : (
        posts.map((post) => (
          <Card key={post._id} variant="outlined" style={{ marginBottom: 20 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography color="text.secondary">{post.author}</Typography>
              <Typography variant="body2">{post.body}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Container>
  );
};

export default BlogPosts;
