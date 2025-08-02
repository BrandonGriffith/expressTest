import path from 'path';
import { fileURLToPath } from 'url';

// This module exports the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = path.dirname(__filename);

export default __dirname;