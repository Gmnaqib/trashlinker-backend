# Getting Started

To get started with the project, follow these steps:

## 1. Run the development server

Choose one of the following commands to start the server:

### Create Databases - trash_linker

### Add file .env
```bash
DATABASE_URL="mysql://root:@localhost:3306/trash_linker"
JWT_SECRET=your_secret_key
```

### Using npm:
```bash
Npm install
Npx prisma migrate dev
Npm run dev
```
