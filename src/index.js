const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001
app.use(express.json());

app.use('/api', require('./routes/index.js'))
// app.use('/v1/api', require('./routes/index.js'))

app.listen(PORT,()=>{
    console.log(`Server listen on Port ${PORT}` )
})

require('./database/db.js')