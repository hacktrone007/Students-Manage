const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const app = express();
const PORT = 3000;
app.use(express.json());
 app.use((req, res,next) => {
    console.log('[${new Date().toISOString()}] ${req.method} ${req.url}');
    next();
});
app.use('/students', studentRoutes)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})