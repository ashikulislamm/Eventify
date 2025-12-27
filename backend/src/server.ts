import app from './app';
import config, { testConnection } from './app/config';

// Start server and test database connection
const startServer = async () => {
  try {
    // Test database connection (non-blocking)
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.log("⚠️  Server starting without database connection (development mode)");
    }
    
    // Start the server
    app.listen(config.port, () => {
      console.log(`🚀 Server listening on http://localhost:${config.port}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
