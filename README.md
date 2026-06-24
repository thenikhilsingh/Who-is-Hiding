# Who-is-Hiding

A full-stack web game where players search for hidden characters across multiple levels. Test your observation skills and compete on the leaderboard!

## 🎮 Game Overview

**Who-is-Hiding** is an interactive game where players are presented with images containing multiple characters. Your mission is to find and identify the hidden characters within each level. The game tracks your performance and displays top scores on a global leaderboard.

### Features

- 🎯 **Multiple Levels** - Progress through different difficulty levels
- 👥 **Character Finding** - Locate hidden characters in images
- 🏆 **Leaderboard** - Compete with other players and track high scores
- ⚡ **Fast & Responsive** - Built with modern technologies for smooth gameplay
- 📱 **User-Friendly Interface** - Intuitive design with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB with Mongoose v9.7.2
- **Additional:** CORS, dotenv for environment variables

### Frontend

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4.3
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **UI Enhancements:** Lucide React (icons), React Toastify (notifications)
- **Linting:** ESLint

## 📋 Project Structure

```
Who-is-Hiding/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection config
│   ├── controllers/
│   │   ├── gameController.js  # Game logic
│   │   └── indexController.js # Health checks
│   ├── models/
│   │   ├── character.js       # Character schema
│   │   ├── gameSession.js     # Game session tracking
│   │   ├── leaderboard.js     # Leaderboard data
│   │   └── level.js           # Level information
│   ├── routers/
│   │   ├── gameRouter.js      # Game routes
│   │   └── indexRouter.js     # Health check routes
│   ├── server.js              # Express app entry point
│   └── package.json           # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx        # Landing page
    │   │   ├── Game.jsx        # Main game page
    │   │   ├── Leaderboards.jsx # Leaderboard view
    │   │   ├── Leaderboard.jsx  # Individual leaderboard
    │   │   └── CharacterBrief.jsx # Character preview
    │   ├── hooks/
    │   │   └── useAxios.js    # Custom axios hook
    │   ├── assets/             # Game images and assets
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # React entry point
    │   ├── index.css           # Global styles
    │   └── public/             # Static game level images
    │       ├── level1/
    │       ├── level2/
    │       └── level3/
    ├── vite.config.js          # Vite configuration
    ├── eslint.config.js        # ESLint configuration
    ├── vercel.json             # Vercel deployment config
    └── package.json            # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ and npm/yarn
- **MongoDB** (local or cloud instance like MongoDB Atlas)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Who-is-Hiding.git
cd Who-is-Hiding
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file with required variables
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "CLIENT_URL=http://localhost:5173" >> .env

# Start the server
npm start
```

The backend server will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 Available Scripts

### Backend

```bash
npm start   # Start the Express server
```

### Frontend

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## 🔌 API Endpoints

### Health Check

- `GET /api/health` - Server health status

### Game Endpoints

- `GET /api/game/levels` - Get all available levels
- `GET /api/game/levels/:levelId/characters` - Get characters for a specific level
- `POST /api/game/sessions` - Create a new game session
- `GET /api/game/leaderboard` - Get global leaderboard

## 🎮 How to Play

1. **Start Game** - Select a level from the home page
2. **Find Characters** - Locate and click on hidden characters in the image
3. **Complete Level** - Find all characters to complete the level
4. **View Leaderboard** - Check your score and compare with other players

## 🗄️ Database Models

### Character

- `_id` - Unique identifier
- `name` - Character name
- `x, y` - Position coordinates in the image
- `levelId` - Reference to level

### Level

- `_id` - Unique identifier
- `title` - Level name
- `image` - Image URL
- `difficulty` - Difficulty level

### GameSession

- `_id` - Unique identifier
- `userId` - Player identifier
- `levelId` - Level being played
- `startTime` - Session start time
- `endTime` - Session completion time
- `score` - Points earned

### Leaderboard

- `_id` - Unique identifier
- `userId` - Player identifier
- `totalScore` - Cumulative score
- `level` - Player level/rank

## 🚢 Deployment

### Frontend (Vercel)

The frontend is configured for Vercel deployment with `vercel.json`. Connect your GitHub repository to Vercel for automatic deployments.

### Backend (Any Node.js Host)

Deploy to platforms like:

- Heroku
- Railway
- Render
- AWS EC2

Set environment variables on your hosting platform:

- `MONGO_URI` - MongoDB connection string
- `CLIENT_URL` - Frontend URL
- `PORT` - Server port

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- User authentication and accounts
- Timed challenges
- Difficulty ratings
- Achievements and badges
- Multiplayer mode
- Mobile app version

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify `MONGO_URI` is correct in `.env`
- Check MongoDB is running (if local)
- Ensure IP whitelist includes your connection (if MongoDB Atlas)

### Frontend Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

### CORS Errors

- Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

## 📧 Contact

For questions or suggestions, feel free to open an issue or contact the project maintainer.

---

**Happy Gaming! 🎮**
