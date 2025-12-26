import { Server } from 'http';
import app from './app.js';
import config from './app/config/index.js';

async function main() {
    const server: Server = app.listen(config.PORT, () => {
        console.log(`Server is running at http://localhost:${config.PORT}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.info('Server closed');
            });
        }
        process.exit(1);
    };

    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
        exitHandler();
    });

    process.on('unhandledRejection', (error) => {
        console.error('Unhandled Rejection:', error);
        exitHandler();
    });
}

main();
