# Getting Started

To get started with the project, follow these steps:

### Clone project

```bash
git clone https://github.com/Gmnaqib/trashlinker-backend.git
```

Get into project folder
```bash
cd trashlinker-backend/
```

Install depedency
```bash
npm install
```

Create Database with this name
```bash
trash_linker
```

Create .env file
```bash
cp .env.example .env
```

Setting your database in .env file
```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```
OR
```bash
DATABASE_URL="mysql://root:@localhost:3306/trash_linker"
```

Create database table
```bash
npx prisma migrate dev
```

Create folder in root project
```bash
public/image
```
## Run the development server

Run project
```bash
npm run dev
```
