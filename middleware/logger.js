const logger = (req, res, next) => {
    const methodColor = '\x1b[32m'; // Green
    const protocolColor = '\x1b[34m'; // Blue
    const hostColor = '\x1b[36m'; // Cyan
    const urlColor = '\x1b[33m'; // Yellow
    const resetColor = '\x1b[0m'; // Reset

    console.log(`${methodColor}${req.method} ${protocolColor}${req.protocol} ${hostColor}${req.get('host')} ${urlColor}${req.originalUrl} ${resetColor}`);
    next();
};

export default logger;