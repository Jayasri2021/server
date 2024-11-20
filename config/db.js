// JayasriCode

const Pool = require('pg-pool');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const connectDB = async () => {
    try {
        // Contact table (unchanged)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contact (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                phone VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message VARCHAR(255) NOT NULL
            );
        `);

        // Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                course VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Updated courses table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS courses (
                course_id SERIAL PRIMARY KEY,
                course_name VARCHAR(255) NOT NULL,
                user_id  INT,
                enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Database tables created successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB, pool };

// // HarishCODE
// var Pool = require('pg-pool')

// var coursesPool = new Pool({
//     connectionString: process.env.COURSES_DATABASE_URL 

// })

// var contactPool = new Pool({
//     connectionString: process.env.CONTACT_DATABASE_URL 
    
// })
// const connectDB = async () => {
//     try {
//         await coursesPool.query(`
//             CREATE TABLE IF NOT EXISTS courses (
//              id SERIAL PRIMARY KEY, 
//               name VARCHAR(255)  NOT NULL ,
//               course VARCHAR(255) NOT NULL ,
//               email VARCHAR(255) NOT NULL
//             );
//           `);

//           await contactPool.query(`
//             CREATE TABLE IF NOT EXISTS contact (
//              id SERIAL PRIMARY KEY,
//               name VARCHAR(255) ,
//               phone VARCHAR(255) NOT NULL ,
//               email VARCHAR(255) NOT NULL,
//               message VARCHAR(255) NOT NULL
//             );
//           `);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;