import React from "react";
import axios from "axios";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  fontSize: 20,
}));

interface Product {
  uuid: number;
  name: string;
  price: string;
}

interface CartProps {
  cartItems: Product[];
  onCheckoutComplete: (totalCost: number, promotion: string) => void;
}

const ShoppingCart: React.FC<CartProps> = ({
  cartItems,
  onCheckoutComplete,
}) => {
  const handleCheckout = () => {
    const items = cartItems.map((item) => ({ uuid: item.uuid, quantity: 1 }));

    // Send checkout request to backend
    axios
      .post("/checkout", { items })
      .then((response) => {
        const { totalCost, promotion } = response.data;
        onCheckoutComplete(totalCost, promotion);
      })
      .catch((error) => console.error("Error during checkout:", error));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="right">${item.price}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        style={{ marginTop: "20px" }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default ShoppingCart;
