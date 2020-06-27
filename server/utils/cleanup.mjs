function noOperation() {}

function cleanup(logger, callback) {
  
  callback = callback || noOperation;
  logger = logger || console;

  // Hänge die callback Funktion an den process event emitter
  // für das cleanup Event
  process.on('cleanup', callback);

  // Cleanup vor einem regulärem exit
  process.on('exit', () => {
    process.emit('cleanup');
    logger.log('Received exit, shutting down');
    process.exit();
  });

  // Kein cleanup bei SIGINT event ...
  process.on('SIGINT', function handler () {
    // ... stattdessen logge ...
    logger.log('Received SIGINT, shutting down');
    // ... entferne diesen handler ...
    process.removeListener('SIGINT', handler);
    // ... und beende diesen Prozess mit einem SIGINT event
    process.kill(process.pid, 'SIGINT');
  });

  // Bei uncaught execptions kein cleanup aber ein Stacktrace
  process.on('uncaughtException', (err) => {
    logger.log(`Uncaught Exception: ${err.stack || err.toString()}`);
    process.exit(99);
  });
}

export default cleanup;
