# Awesome Express API 🗿

A robust, production-ready RESTful API built with **Node.js**, **Express**, and **MySQL**, following the **Layered Architecture** pattern (Controller-Service-Repository).

---

## ✨ Features

* **Layered Architecture** – Separation of concerns (Controller → Service → Repository) for better maintainability
* **Global Error Handling** – Centralized error management using a custom `asyncHandler`
* **Full CRUD Operations** – Complete Create, Read, Update, and Delete functionality for products
* **Database Versioning** – SQL schema included for easy environment replication
* **Graceful Shutdown** – Properly closes database connections on server termination
* **Hot Reload** – Development mode with Node.js watch flag for instant updates

---

## 🏗️ Project Structure
```text
awesome-express/
├── src/
│   ├── controllers/    # Request/Response handling & logic flow
│   ├── db/             # Database scripts (schema.sql)
│   ├── lib/            # Shared libraries (database connection, migrations)
│   ├── repositories/   # Raw Database queries (SQL)
│   ├── routes/         # API Endpoint definitions
│   ├── services/       # Business logic & validation rules
│   ├── utils/          # Global helpers (async-handler)
│   └── server.js       # Entry point & Global Middleware
├── .env.example        # Template for environment variables
├── .gitignore          # Files ignored by Git
├── package.json        # Dependencies and scripts
└── README.md           # Documentation (you are here!)
```

---

## 📦 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/awesome-express.git
   cd awesome-express
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env
```
   Then edit `.env` with your database credentials:
```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=awesome_express_db
   PORT=3000
```

4. **Run database migrations**
```bash
   npm run migration
```

5. **Start the development server**
```bash
   npm run dev
```

---

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start development server with hot reload (Node.js watch mode) |
| **start** | `npm start` | Start production server |
| **migration** | `npm run migration` | Run database migrations/schema setup |
| **test** | `npm test` | Run test suite (currently not configured) |

### Script Details
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "node --watch src/server.js",
  "migration": "node src/lib/migrate.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/:id` | Retrieve a single product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE` | `/api/products/:id` | Delete a product |

### Example Request

**Create a Product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Awesome Widget",
    "description": "A really cool product",
    "price": 29.99,
    "stock": 100
  }'
```

---

## 🏛️ Architecture

This project follows a **3-layer architecture**:
```
Controller Layer (HTTP) → Service Layer (Business Logic) → Repository Layer (Database)
```

- **Controllers** – Handle HTTP requests/responses
- **Services** – Contain business logic and validation
- **Repositories** – Execute database queries

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ using **Express.js**
- Database powered by **MySQL**
- Inspired by clean architecture principles

---

**Happy Coding! 🚀**