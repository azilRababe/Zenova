import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

import { Rating } from "../components/Rating";

// card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Pagination from "@mui/material/Pagination";

export const HomeScreen = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      {/* <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul> */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            my: 4,
          }}
        >
          {products.map((product) => (
            <Card
              key={product._id}
              sx={{
                width: 280,
                borderRadius: 8,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardActionArea href={"/product/" + product._id}>
                <CardMedia
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                  image={product.image}
                  title={product.name}
                />
              </CardActionArea>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {product.brand}
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating name="read-only" value={product.rating} readOnly />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      ml={1}
                    >
                      ({product.numReviews} reviews)
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};
