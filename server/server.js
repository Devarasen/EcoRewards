const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001; // You can change the port as needed

// Add this development route
app.get("/", (req, res) => {
  res.send("Hello, this is the development server!");
});

if (process.env.NODE_ENV === "production") {
  // Serve static files from the "client/dist" directory
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Handle React routing, return all requests to the React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
