const mysql = require('mysql2/promise');
const faker = require('@faker-js/faker');

// Fungsi untuk membuat koneksi ke database
async function connectToDatabase() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username Anda
    password: '', // Ganti dengan password Anda
    database: 'trash_linker', // Ganti dengan nama database Anda
  });
}

// Fungsi untuk mengisi data dummy
async function seedDatabase() {
  const connection = await connectToDatabase();

  try {
    const dummyData = [];
    for (let i = 0; i < 10; i++) {
      dummyData.push([
        faker.name.fullName(), // Nama pengguna acak
        faker.internet.email(), // Email acak
        faker.internet.password(), // Password acak
        faker.address.streetAddress(), // Alamat acak
        faker.helpers.arrayElement(['Admin', 'User', 'Moderator']), // Role acak
      ]);
    }

    const sql = `INSERT INTO users (username, email, password, address, role) VALUES ?`;
    await connection.query(sql, [dummyData]);

    console.log('Data dummy berhasil dimasukkan ke database!');
  } catch (err) {
    console.error('Error saat mengisi data:', err);
  } finally {
    await connection.end();
  }
}

// Jalankan seeder
seedDatabase();
