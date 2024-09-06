import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./controllers/productController";
import path from "path";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(productRoutes);

if(require.main === module)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;