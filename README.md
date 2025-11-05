# Cinematographer Portfolio Website

A full-stack web application showcasing a cinematographer's portfolio, built with React (frontend) and Node.js/Express (backend).

## Features

- **Frontend**: React application with modern UI design
- **Backend**: Node.js/Express API with security middleware
- **Portfolio Display**: Dynamic project showcase
- **Responsive Design**: Mobile-friendly layout
- **API Integration**: RESTful endpoints for portfolio data

## Project Structure

```
cinematographer-portfolio/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/          # Node.js backend
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cinematographer-portfolio
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   - Copy `server/.env` and update as needed

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```

3. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `GET /` - Welcome message
- `GET /api/portfolio` - Get portfolio projects

## Technologies Used

### Frontend
- React 19
- CSS3 with modern layouts (Grid, Flexbox)
- Responsive design

### Backend
- Node.js
- Express.js
- CORS
- Helmet (security)
- Morgan (logging)
- dotenv (environment variables)

## Development

### Available Scripts

#### Client
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

#### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Deployment

1. Build the React app: `cd client && npm run build`
2. Set environment variables for production
3. Start the server: `cd server && npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
