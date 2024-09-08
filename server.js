const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get("",async(req,res)=> {

  res.send("The API is ready to use");
  
})

app.post('/api/chat',async(req,res)=> {
    const userMessage = req.body.message;
    try{
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages:[{role: "user", content: userMessage}]
          },
          {
            headers:{
                'Authorization':`Bearer ${OPENAI_API_KEY}`,
                'Content-Type':'application/json'
            }
          }
        );
        res.json(response.data);
    }catch(error){
        console.error('Error:',error);
        res.status(500).send('Something went wrong');

    }
});




app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
