import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Impor dengan path yang sudah diperbaiki
import Connect from './connection/connect.js';
import userRoutes from './login/User/user.route.js';
import adminRoutes from './login/Admin/admin.route.js';
// PATH DIPERBAIKI
import campaignRoutes from './routes/campaign.routes.js'; 
import paymentRoutes from './routes/payment.routes.js';
import yayasanRoutes from './routes/yayasan.route.js';


// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.SERVER_PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://js.stripe.com"],
      "frame-src": ["'self'", "https://js.stripe.com"],
    },
  })
); 

// Sajikan file statis dari direktori root
app.use(express.static(__dirname));

// Rute API
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/yayasan', yayasanRoutes);

// Sajikan halaman frontend dari direktori root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/add-campaign.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-campaign.html'));
});

app.get('/campaign-detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'campaign-detail.html'));
});

// Fungsi untuk memulai server
const startServer = async () => {
    try {
        await Connect(); // Menunggu koneksi database berhasil
        app.listen(port, () => {
            console.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database, server is not starting.", error);
        process.exit(1); // Keluar dari proses jika koneksi gagal
    }
};

// Mulai server
startServer();