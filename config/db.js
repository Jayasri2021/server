var Pool = require('pg-pool')

var coursesPool = new Pool({
    connectionString: process.env.COURSES_DATABASE_URL 

})

var contactPool = new Pool({
    connectionString: process.env.CONTACT_DATABASE_URL 
    
})
const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGODB_URI);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        await coursesPool.query(`
            CREATE TABLE IF NOT EXISTS courses (
             id SERIAL PRIMARY KEY, 
              name VARCHAR(255)  NOT NULL ,
              course VARCHAR(255) NOT NULL ,
              email VARCHAR(255) NOT NULL
            );
          `);

          await contactPool.query(`
            CREATE TABLE IF NOT EXISTS contact (
             id SERIAL PRIMARY KEY,
              name VARCHAR(255) ,
              phone VARCHAR(255) NOT NULL ,
              email VARCHAR(255) NOT NULL,
              message VARCHAR(255) NOT NULL
            );
          `);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;