# Tourism Management System
A RESTful API system for managing tourist attractions, visitors, and reviews. This system helps track tourist attractions, manage visitor information, and handle reviews while maintaining proper validation and business rules.

## Features

### 1. Attraction Management
- Create new tourist attractions with name, location, and entry fee
- View all attractions
- Get details of a specific attraction
- Update attraction details
- Delete attractions
- View top-rated attractions (top 5)
- Automatic rating calculation based on visitor reviews

### 2. Visitor Management
- Register new visitors with name and email
- View all registered visitors
- Get specific visitor details
- Update visitor information
- Track visited attractions for each visitor
- View visitor activity statistics

### 3. Review System
- Post reviews for attractions
- Score-based rating system (1-5 stars)
- Optional comments with reviews
- Automatic attraction rating updates
- Prevention of duplicate reviews

### 4. Validation & Business Rules
- Entry fee validation (non-negative values)
- Email format validation
- Unique email enforcement
- Review score validation (1-5 range)
- Visitor must visit attraction before reviewing
- Single review per visitor per attraction

## API Endpoints

### Attractions
```
POST   /api/attractions          - Create new attraction
GET    /api/attractions          - Get all attractions
GET    /api/attractions/:id      - Get specific attraction
PUT    /api/attractions/:id      - Update attraction
DELETE /api/attractions/:id      - Delete attraction
GET    /api/attractions/top-rated - Get top 5 rated attractions
```

### Visitors
```
POST   /api/visitors             - Register new visitor
GET    /api/visitors             - Get all visitors
GET    /api/visitors/:id         - Get specific visitor
PUT    /api/visitors/:id         - Update visitor
POST   /api/visitors/:id/visit   - Add visited attraction
GET    /api/visitors/activity    - Get visitor activity statistics
```

### Reviews
```
POST   /api/reviews             - Create new review
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tourism-management-system.git
```

2. Install dependencies
```bash
cd tourism-management-system
npm install
```

3. Create .env file
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

## Project Structure
```
tourismmanagementsystem/
│
├── config/
│   └── db.js                 # Database configuration
│
├── models/
│   ├── Attraction.js         # Attraction model
│   ├── Visitor.js            # Visitor model
│   └── Review.js            # Review model
│
├── routes/
│   ├── attractionRoutes.js   # Attraction routes
│   ├── visitorRoutes.js      # Visitor routes
│   └── reviewRoutes.js       # Review routes
│
├── controllers/
│   ├── attractionController.js
│   ├── visitorController.js
│   └── reviewController.js
│
├── middleware/
│   └── validation.js         # Input validation
│
├── utils/
│   └── errorHandler.js       # Error handling utilities
│
├── package.json
└── server.js
```

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (for future authentication implementation)

## Error Handling
- Custom error handling middleware
- Proper error responses
- Development vs Production error details
- Validation error handling
- Unhandled route handling
- Promise rejection handling

## Validation Rules
1. Attractions:
   - Name and location are required
   - Entry fee must be non-negative
   - Rating automatically calculated (0-5)

2. Visitors:
   - Name is required
   - Email must be unique and valid format
   - Visited attractions tracked

3. Reviews:
   - Score must be between 1-5
   - Visitor must visit attraction before review
   - One review per visitor per attraction
   - Optional comments

## Future Enhancements
- User authentication
- Image upload for attractions
- Advanced search and filtering
- Review moderation
- Analytics dashboard
- Email notifications
- Mobile app integration

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Author
Yasir Imran

## Acknowledgments
- Express.js documentation
- Mongoose documentation
- MongoDB documentation
```

This README.md provides:
- Clear feature descriptions
- Installation instructions
- API endpoint documentation
- Project structure explanation
- Technology stack details
- Validation rules
- Future enhancement possibilities
- Contributing guidelines

It serves as both documentation and a quick-start guide for developers who want to use or contribute to the system.