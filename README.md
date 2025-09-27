# NIYANTRANA

**NIYANTRANA** is an intelligent train management system that combines predictive maintenance with real-time monitoring capabilities. The system uses machine learning models to predict maintenance needs and optimize train operations.

## Features

- **Predictive Maintenance**: Advanced ML models for predicting train maintenance requirements
- **Real-time Monitoring**: Live tracking of train performance and status
- **Train Classification**: Automated train categorization and service assignment
- **Performance Analytics**: Comprehensive dashboard for operational insights
- **Alert System**: Proactive notifications for maintenance and operational issues
- **Data-driven Insights**: Deep learning models for cleaning and maintenance scheduling

## Architecture

The project consists of two main components:

- **Frontend**: React-based web application with modern UI components
- **Backend**: Python Flask server with ML models and MongoDB integration

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (for data storage)
- **Git**

## Quick Start

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python server.py
   ```

The backend API will be available at `http://localhost:5000`

## Machine Learning Models

The system includes several pre-trained models:

- **Bidirectional GRU Cleaning Model**: Predicts optimal cleaning schedules
- **Bidirectional GRU Maintenance Model**: Forecasts maintenance requirements
- **Feature Scalers**: Normalize input data for consistent predictions

## Data Management

The system processes various types of training data:
- Deep Cleaning Training Data
- Predictive Maintenance Training Data
- Train Input Prototypes

## Development

### Frontend Technologies
- React + Vite
- Modern UI components library
- Responsive design with CSS modules

### Backend Technologies
- Python Flask
- TensorFlow/Keras for ML models
- MongoDB for data persistence
- Scikit-learn for data preprocessing

## Project Structure

```
NIYANTRANA/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Dependencies
├── backend/           # Python backend server
│   ├── *.py          # Python modules
│   ├── *.h5          # ML models
│   ├── *.pkl         # Scalers and preprocessors
│   └── *.csv         # Training data
└── README.md         # Project documentation
```

## Configuration

Make sure to configure your MongoDB connection and update any necessary environment variables before running the backend server.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of an intelligent transportation system initiative.

## Support

For questions and support, please open an issue in the repository.