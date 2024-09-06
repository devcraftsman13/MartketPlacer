import React, { useState } from "react";
import {
  Container,
  Typography,
  Stack,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";

interface Product {
  uuid: number;
  name: string;
  price: string;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [checkoutResult, setCheckoutResult] = useState<{
    totalCost: number;
    promotion: string;
  } | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const handleCheckoutComplete = (totalCost: number, promotion: string) => {
    setCheckoutResult({ totalCost, promotion });
  };

  return (
    <Container style={{ margin: "20px auto" }}>
      <Stack spacing={5}>
        <Typography variant="h2" gutterBottom align="center">
          Marketplacer
        </Typography>
        <ProductList onAddToCart={handleAddToCart} />
        <Stack spacing={5} direction={"row"}>
          <ShoppingCart
            cartItems={cartItems}
            onCheckoutComplete={handleCheckoutComplete}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h4">Checkout Complete</Typography>
                  <Typography variant="body1">
                    Total: ${checkoutResult?.totalCost.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    Discount Applied: {checkoutResult?.promotion}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default App;
