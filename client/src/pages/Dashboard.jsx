import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import AuthService from '../utils/auth'; 
const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState({
        username: AuthService.getUsername(),  
        ecoActions: [],
        totalGreenCoins: 0
    });
    const [donationAmount, setDonationAmount] = useState(0);

  
    const handleDonation = () => {
        if (donationAmount > 0) {
            
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <h3>Welcome, {currentUser.username}!</h3>
            <div className="eco-actions">
                <h4>Your Eco-Actions:</h4>
                <ul>
                    {currentUser.ecoActions.map((action, index) => (
                        <li key={index}>
                            {action.action} - {action.greenCoinsEarned} Green Coins
                        </li>
                    ))}
                </ul>
                <p>Total Green Coins Earned: {currentUser.totalGreenCoins}</p>
            </div>
            <div className="donation-section">
                <h4>Make a Donation:</h4>
                <input
                    type="number"
                    placeholder="Donation Amount (in Green Coins)"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button onClick={handleDonation}>Donate</button>
            </div>
        </div>
    );
};

export default Dashboard;