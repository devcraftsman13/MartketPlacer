import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

interface Product {
  uuid: number;
  name: string;
  price: string;
}

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the product list from the backend
    axios
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Stack
        spacing={3}
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        useFlexGap
        sx={{ flexWrap: "wrap" }}
      >
        {products.map((product) => (
          <Card
            key={product.uuid}
            style={{ maxWidth: 300, minWidth: 300 }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAddToCart(product)}
                fullWidth
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default ProductList;
