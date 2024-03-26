const server = require('./server');

const port = 3000;
const app = server.listen(port, (err) => {
  if (err) {
    console.error('Failed to start the server.');
    process.exit(1);
  } else {
    console.log(`Server runs at port ${port}`);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception.');

  // Shutdown the server gracefully
  app.close(() => process.exit(1));

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => process.abort(), 1000).unref();
  process.exit(1);
});
