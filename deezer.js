const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

const app = express();

app.use(cors()); 

app.get('/randomSong', async (req, res) => {
  try {
    // Deezer API endpoint for a random playlist (adjust as needed)
    const deezerApiUrl = 'https://api.deezer.com/playlist/3155776842/tracks'; // Replace with your playlist ID or endpoint

    const response = await axios.get(deezerApiUrl);
          
    // Extracting the list of tracks
    const tracks = response.data.data;

    // Get a random track from the list
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomTrack = tracks[randomIndex];

    // Sending the random track as JSON response
    res.json(randomTrack);
  } catch (error) {
    console.error('Error fetching the random track:', error);
    res.status(500).send('Error fetching the random track');
  }
});

const PORT = 4000; // Set your desired port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
