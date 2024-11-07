import express from "express";
import orderRoutes from "./Routes/orderRoutes"

const app = express()


app.use('/orders', orderRoutes)


app.listen(3002, () => console.log('listening on port 3002'))
