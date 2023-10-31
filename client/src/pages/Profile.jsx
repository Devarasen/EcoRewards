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

    const [activeUserId, setActiveUserId] = useState(null);

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
                    cache.modify({
                        fields: {
                            getAllPosts(existingPosts = [], { readField }) {
                                return existingPosts.filter(postRef => postId !== readField('_id', postRef));
                            },
                        },
                    });
                }
            });
            refetch();
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        if (!userIdParams || userIdParams === 'me' || userIdParams === userIdAuth) {
            setIsOwnProfile(true);
            setActiveUserId(userIdAuth);
        } else {
            setIsOwnProfile(false);
            setActiveUserId(userIdParams);
        }
    }, [userIdParams, userIdAuth]);

    const { loading, error, data, refetch } = useQuery(GET_SINGLE_USER_POST, {
        refetchQueries: [{ query: GET_SINGLE_USER_POST }],
        variables: { userId: activeUserId },
        skip: !activeUserId  // Skip the query if activeUserId is not set
    });

    useEffect(() => {
        if (activeUserId) {
            refetch();
        }
    }, [activeUserId]);
    

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'No timestamp available';
        const formattedDate = moment(Number(timestamp)).format('DD/MM/YY h:mm a');
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

    const [profileUsername, setProfileUsername] = useState('');

    useEffect(() => {
        if (data && data.getUserPosts && data.getUserPosts.length > 0) {
            setProfileUsername(data.getUserPosts[0].author.username);
        } else if (isOwnProfile) {
            // For own profile, if no posts are available, use the current user's username
            setProfileUsername(currentUser.username);
        }
    }, [data, isOwnProfile]);

    useEffect(() => {
        document.title = isOwnProfile ? `${profileUsername}'s Profile` : `${profileUsername}'s Profile`;
    }, [profileUsername]);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="dashboard">
            <div className="eco-actions">
                <h2>{isOwnProfile ? `Welcome, ${profileUsername}!` : `${profileUsername}'s Profile`}</h2>
                <h4>Recent Posts: </h4>
                <ul className="profile-posts-all">
                {sortedPosts.map(post => (
                        <li key={post._id} className="profile-post">
                            <div className='profile-post-head'>
                                <p>{post.author.username} , </p> &nbsp;&nbsp;
                                <p> {formatTimestamp(post.timestamp)}</p>
                            </div>
                            <div>
                                <p>{post.content}</p>  
                            </div>
                            {isOwnProfile ? <button onClick={() => handleDeletePost(post._id)}>Delete</button> : null}                                                      
                        </li>
                    ))}          
                </ul>                
            </div>

            
            <div className='aside-section'>
                <div className="coin-section">
                    {isOwnProfile && (
                    <p>Total Green Coins Earned: {currentUser.totalGreenCoins}</p>
                    )}
                    <h4>Fund Eco-Cause:</h4>
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

                {isOwnProfile && (
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
                )}
            </div>
            
        </div>
    );
};

export default Profile;
