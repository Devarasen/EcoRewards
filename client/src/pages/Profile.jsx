import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import AuthService from '../utils/auth'; 
import { useQuery } from '@apollo/client';
import { GET_SINGLE_USER_POST } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/mutations';
import moment from 'moment'; 

const userIdAuth = AuthService.getUserId();

const Profile = () => {
    const { userIdParams } = useParams();

    const [currentUser, setCurrentUser] = useState({
        username: AuthService.getUsername(),
        totalGreenCoins: 0,
    });

    const [deletePost] = useMutation(DELETE_POST);

    const handleDeletePost = async (postId) => {
        try {
            await deletePost({
                variables: { postId },
                update: (cache) => {
                    cache.modify({
                        fields: {
                            getUserPosts(existingPosts = [], { readField }) {
                                return existingPosts.filter(postRef => postId !== readField('_id', postRef));
                            },
                        },
                    });
                }
            });
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [activeUserId, setActiveUserId] = useState(null);

    useEffect(() => {
        if (!userIdParams || userIdParams === 'me' || userIdParams === userIdAuth) {
            setIsOwnProfile(true);
            setActiveUserId(userIdAuth);
        } else {
            setIsOwnProfile(false);
            setActiveUserId(userIdParams);
        }
    }, [userIdParams, userIdAuth]);

    const { loading, error, data } = useQuery(GET_SINGLE_USER_POST, {
        variables: { userId: activeUserId },
        skip: !activeUserId  // Skip the query if activeUserId is not set
    });

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'No timestamp available';
        const formattedDate = moment(Number(timestamp)).format('DD/MM/YY, h:mm a');
        return formattedDate === 'Invalid date' ? 'No timestamp available' : formattedDate;
    };

    const sortedPosts = data && data.getUserPosts
        ? [...data.getUserPosts].sort((a, b) => b.timestamp - a.timestamp)
        : [];

    const [donationAmount, setDonationAmount] = useState(0);
  
    const handleDonation = () => {
        if (donationAmount > 0) {
            // Handle donation logic here...
        }
    };

    const profileUsername = data && data.getUserPosts && data.getUserPosts[0] 
                         ? data.getUserPosts[0].author.username 
                         : ''
    ;

    useEffect(() => {
        document.title = isOwnProfile ? `${profileUsername}'s Profile` : `${profileUsername}'s Profile`;
    }, [profileUsername]);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="dashboard">
            <div className="eco-actions">
                <h3>{isOwnProfile ? `Welcome, ${profileUsername}!` : `EcoProfile : ${profileUsername}`}</h3>
                <h4>Recent Posts: </h4>
                <ul className="profile-posts-all">
                {sortedPosts.map(post => (
                        <li key={post._id} className="profile-post">
                            <div className='profile-post-head'>
                                <p>{post.author.username} ,</p>
                                <p> {formatTimestamp(post.timestamp)}</p>
                            </div>
                            <div>
                                <p>{post.content}</p>  
                            </div>
                            <button onClick={() => handleDeletePost(post._id)}>Delete</button>                                                     
                        </li>
                    ))}          
                </ul>                
            </div>

            <div className='aside-section'>
                <div className="coin-section">
                    <p>Total Green Coins Earned: {currentUser.totalGreenCoins}</p>
                    <h4>Make a Donation:</h4>
                    <div className='donation-input'>
                        <input
                            type="number"
                            placeholder="Donation Amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                        />
                        <div className="tooltip-container">
                            <button onClick={handleDonation}> 💰 </button>
                            <span className="tooltip">Donate</span>
                        </div>
                    </div>
                </div>
                <div className='profile-section'>
                    <p>Set your Name:</p>
                    <input placeholder="Set new name"></input>
                    <button> Confirm </button>
                    <p>Set your Bio:</p>
                    <textarea rows="2" placeholder="Set new bio"></textarea>
                    <button> Confirm </button>
                    <p>Set your Avatar:</p>
                    <button> Choose Avatar </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
