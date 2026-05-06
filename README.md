# QuickFix - Instant Task Solving Platform

⚡ **Get your tasks solved in 1-3 minutes!**

A modern, full-stack web application for instant task solving services. Users can submit tech problems, research queries, or writing tasks and get solutions quickly via WhatsApp.

## 🌟 Features

### Core Features
- **Task Submission**: 3 service categories (Tech Help ₹149, Research ₹99, Writing ₹129)
- **Real-time Status Tracking**: Watch your tasks progress from pending → solving → done
- **Earnings Dashboard**: Track earnings, completed tasks, and ratings
- **Review System**: Star ratings and customer testimonials
- **UPI Payments**: Seamless payment integration with deep linking
- **WhatsApp Integration**: Direct messaging with task solver
- **Social Sharing**: Share via WhatsApp, copy link, or native share

### Technology Stack

**Backend:**
- Node.js + Express.js
- RESTful API architecture
- CORS enabled for cross-origin requests

**Frontend:**
- Vanilla HTML5, CSS3, JavaScript
- Dark mode UI with neon accents
- Responsive mobile-first design
- Modal system for payments and sharing
- Tab-based navigation

**Services:**
- UPI Payment Gateway
- WhatsApp Business API (ready for integration)

## 📦 Installation

### Prerequisites
- Node.js 14+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/nakulgohel112-sudo/Gohel.git
cd Gohel
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
PORT=5000
NODE_ENV=development
UPI_ID=your_upi_id
```

5. Start the server:
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Server will run on `http://localhost:5000`

## 🚀 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task status
- `DELETE /api/tasks/:id` - Delete task

### Users
- `POST /api/users/register` - Register new user
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id/earnings` - Update earnings

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/:id` - Get specific review

### Payments
- `POST /api/payments/create-upi` - Create UPI payment
- `PATCH /api/payments/:id/verify` - Verify payment
- `GET /api/payments/:id` - Get payment status

## 📋 Project Structure

```
Gohel/
├── public/
│   └── index.html          # Frontend UI
├── routes/
│   ├── tasks.js           # Task management API
│   ├── users.js           # User management API
│   ├── reviews.js         # Review system API
│   └── payments.js        # Payment processing API
├── server.js              # Express server setup
├── package.json           # Dependencies
├── .env                   # Configuration
└── README.md              # Documentation
```

## 🔧 Configuration

### Environment Variables
```env
PORT              # Server port (default: 5000)
NODE_ENV          # Environment (development/production)
WHATSAPP_API_KEY  # WhatsApp Business API key
UPI_ID            # Merchant UPI ID
MONGODB_URI       # MongoDB connection string
```

## 🎨 UI Features

### Design System
- **Colors**: Dark theme with neon accents
  - Primary: `#00e5a0` (Teal)
  - Secondary: `#ff6b35` (Orange)
  - Tertiary: `#4d9fff` (Blue)
  - WhatsApp: `#25D366`

- **Typography**: 
  - Headings: Syne (bold, geometric)
  - Body: DM Sans (clean, readable)

- **Animations**:
  - Fade-up on load
  - Slide-in for cards
  - Pulse effect for status dots
  - Pop-in for floating button

## 🔐 Security Considerations

1. **Authentication**: Add JWT tokens for user sessions
2. **Validation**: Implement input validation on all endpoints
3. **Payment Security**: Use Razorpay/official UPI provider
4. **Rate Limiting**: Add rate limiter to prevent abuse
5. **HTTPS**: Deploy with SSL/TLS in production

## 📱 Mobile Support

- Fully responsive design
- Touch-optimized buttons and interactions
- Mobile-first approach
- Works on iOS and Android

## 🚢 Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
git push heroku main
```

### Railway
```bash
railway link
railway up
```

### Vercel (Frontend only)
```bash
vercel deploy
```

## 🛣️ Roadmap

- [ ] User authentication (JWT)
- [ ] MongoDB integration
- [ ] Real payment gateway (Razorpay)
- [ ] WhatsApp Business API integration
- [ ] Email notifications
- [ ] Task history and analytics
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Nakul Gohel**
- WhatsApp: +91 93280 01410
- Email: nakulgohel112@gmail.com
- GitHub: [@nakulgohel112-sudo](https://github.com/nakulgohel112-sudo)

## 🙏 Acknowledgments

- Inspired by modern gig economy platforms
- Built with attention to user experience
- Optimized for mobile-first approach

## 📞 Support

For questions or support, reach out via:
- WhatsApp: +91 93280 01410
- Create an issue on GitHub

---

**Built with ❤️ for instant problem-solving**
