import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { userId } = useParams();
  
  // Initialize userData as null
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // This is just a mock fetch function; replace with your actual API call
    async function fetchUserData() {
      try {
        // Replace with your API endpoint
        const response = await fetch(`https://yourapi.com/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    
    fetchUserData();
  }, [userId]);  // useEffect will run every time userId changes

  // You can also add a loading state if needed

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img src={userData?.profile?.image} alt="User Avatar" className="profile-avatar" />
        <h2>{userData?.username}</h2>
        <p>{userData?.profile?.bio}</p>
      </div>

      <div className="profile-main-content">
        <h3>Green Coins: {userData?.greenCoins}</h3>

        <div className="donation-section">
          <h4>Make a Donation</h4>
          {/* Add your donation form here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
