import { useState } from 'react';
import '../styles/CommunityBoard.css';


const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    if (newPost.trim() !== '') {
      // Add the new post to the posts array with user information.
      const user = getCurrentUser(); // Implement this function to get the current user.
      const updatedPosts = [
        ...posts,
        {
          user,
          content: newPost,
          timestamp: new Date().toISOString(),
        },
      ];
      setPosts(updatedPosts);
      setNewPost('');
    }
  };

  const getCurrentUser = () => {
    // Implement the logic to retrieve the current user's information.
    // This could involve authentication and user profiles in your application.
    return {
      username: 'SampleUser',
      avatar: 'avatar.jpg',
    };
  };

  return (
    <div className="community-board">
      <h2>Community Board</h2>
      <div className="post-form">
        <textarea
          rows="4"
          placeholder="Share your eco-action..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
      
        />
        <button onClick={handlePostSubmit}>Post</button>
      </div>
      <div className="posts">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-user">
              <img src={post.user.avatar} alt="User Avatar" />
              <span>{post.user.username}</span>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoard;
