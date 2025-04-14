# Decentra Solve

A comprehensive web application with separate frontend, backend, and Python services.

## 🌐 Deployment URLs

- **Frontend**: [https://advaya-maatrcare-front.onrender.com](https://advaya-maatrcare-front.onrender.com)
- **Backend (Node.js)**: [https://advaya-maatrcare-node.onrender.com](https://advaya-maatrcare-node.onrender.com)
- **Python Backend**: Currently not deployed (local development only)

## 📁 Project Structure

```
.
├── front/          # Frontend application
├── back/           # Node.js backend
└── data.json       # Application data
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.x (for local Python service)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm run build
   npm start
   ```

### Backend Setup (Node.js)

1. Navigate to the backend directory:
   ```bash
   cd back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Python Service (Local Development)

The Python service is currently configured for local development only. Follow the setup instructions in the service's directory for local development.

## 🔗 API Integration

- Frontend communicates with the Node.js backend at: `https://advaya-maatrcare-node.onrender.com`
- For local development, update the API endpoints in your environment configuration

## 🛠️ Technologies Used

- **Frontend**: React/Next.js
- **Backend**: Node.js, Express
- **Additional Services**: Python
- **Deployment**: Render

## 📝 Notes

- The Python service is currently not deployed due to complexity considerations
- Make sure to update environment variables when switching between local development and production
- For local development of the Python service, refer to the specific documentation in its directory

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
