import { useParams } from "react-router-dom";
import { useGetONEproductQuery } from "../../Redux/productsApi";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./details.css";
import React, { useRef, useState } from "react";
import { Badge, Button, IconButton, styled } from "@mui/material";
import DetailsThumb from "./DetailsThump";

import { useDispatch, useSelector } from "react-redux";

import {
  addProduct,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlic";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  }));
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.cart
  );
  let { id } = useParams();
  // data => only one product
  const { data, error, isLoading } = useGetONEproductQuery(id);

  const [index, setindex] = useState(0);
  const myRef = useRef(null);

  const handleTab = (index) => {
    // this.setState({index: index})
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const produtQuntity = (num) => {
    const myproject = selectedProducts.find((itemUser) => itemUser.id === num);
    return myproject ? myproject.Quantity : 0;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }
  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {/* <button className="cart">Add to cart</button> */}
            {selectedProductsID.includes(data.id) ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "33px",
                }}
              >
                <IconButton
                  color="primary"
                  sx={{ mr: "10px" }}
                  onClick={() => {
                    dispatch(decreaseQuantity(data));
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>

                <StyledBadge
                  badgeContent={produtQuntity(data.id)}
                  color="secondary"
                />

                <IconButton
                  color="primary"
                  sx={{ ml: "10px" }}
                  onClick={() => {
                    dispatch(increaseQuantity(data));
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            ) : (
              <Button
                sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(addProduct(data));
                }}
              >
                <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
