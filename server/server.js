const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cinematographer Portfolio API' });
});

// API Routes
app.get('/api/portfolio', (req, res) => {
  // Enhanced portfolio data with more cinematic projects
  res.json({
    projects: [
      {
        id: 1,
        title: 'Shadows of the Forgotten',
        description: 'A haunting documentary exploring abandoned film sets and the stories they hold. Winner of Best Cinematography at the Independent Film Festival.',
        year: 2023,
        category: 'Documentary'
      },
      {
        id: 2,
        title: 'Urban Symphony',
        description: 'A visually stunning short film capturing the rhythm of city life through innovative camera techniques and natural lighting.',
        year: 2022,
        category: 'Short Film'
      },
      {
        id: 3,
        title: 'Echoes of Time',
        description: 'A period drama showcasing masterful use of practical lighting and camera movement to transport audiences to the 1940s.',
        year: 2021,
        category: 'Feature Film'
      },
      {
        id: 4,
        title: 'Beyond the Lens',
        description: 'An experimental piece exploring the relationship between cinematographer and subject through intimate, raw footage.',
        year: 2020,
        category: 'Experimental'
      },
      {
        id: 5,
        title: 'Mountain Chronicles',
        description: 'A breathtaking adventure documentary featuring extreme sports and nature cinematography in the Himalayas.',
        year: 2019,
        category: 'Adventure'
      },
      {
        id: 6,
        title: 'Silent Stories',
        description: 'A collection of silent film restorations with modern cinematography techniques applied to classic narratives.',
        year: 2018,
        category: 'Restoration'
      }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
