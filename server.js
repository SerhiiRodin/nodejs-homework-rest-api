const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// DB_HOST=mongodb+srv://Serhii:iFIiKHGhK5OzIP2q@cluster0.qvjk8qm.mongodb.net/db-contacts?retryWrites=true&w=majority
// PORT=3000

console.log(DB_HOST);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
