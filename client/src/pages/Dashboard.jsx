import React, { useState } from 'react';

const Dashboard = () => {
  // Replace this mock data with actual data retrieval logic
  const currentUser = {
    username: 'SampleUser',
    ecoActions: [
      {
        action: 'Recycled plastic bottles',
        greenCoinsEarned: 10,
      },
      {
        action: 'Used energy-efficient bulbs',
        greenCoinsEarned: 5,
      },
      // More eco-actions...
    ],
    totalGreenCoins: 15, // Calculate the total from eco-actions
  };

  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonation = () => {
    // Implement Stripe donation handling here
    if (donationAmount > 0) {
      // Call a function to initiate the Stripe donation process
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
