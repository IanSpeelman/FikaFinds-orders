import express from "express";
import orderRoutes from "./Routes/orderRoutes"
import bodyParser from "body-parser";

const app = express()


app.use(bodyParser.json())
app.use('/orders', orderRoutes)


app.listen(3002, () => console.log('listening on port 3002'))
