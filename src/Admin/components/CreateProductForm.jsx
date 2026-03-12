import { useState } from "react";
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
// import { createProduct } from "../../../State/Product/Action";
import { createProduct } from "../../State/Product/Action";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });

  const dispatch = useDispatch();

//   const jwt = localStorage.getItem("jwt");
//   if (jwt) {
//     // Set the JWT token in the default headers for all API requests
//     api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
//   }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));  // change here
    console.log("Submitted product data: ", productData);
  };

  return (
    <div className="p-10">
      <Typography variant="h3" sx={{ textAlign: "center", mb: 5 }}>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit} className="min-h-screen">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Image URL" name="imageUrl" value={productData.imageUrl} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Brand" name="brand" value={productData.brand} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Title" name="title" value={productData.title} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Color" name="color" value={productData.color} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Quantity" name="quantity" type="number" value={productData.quantity} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Price" name="price" type="number" value={productData.price} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Discounted Price" name="discountedPrice" type="number" value={productData.discountedPrice} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Discount Percent" name="discountPercent" type="number" value={productData.discountPercent} onChange={handleChange} />
          </Grid>

          {/* Category Selectors */}
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select name="topLevelCategory" value={productData.topLevelCategory} onChange={handleChange} label="Top Level Category">
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select name="secondLevelCategory" value={productData.secondLevelCategory} onChange={handleChange} label="Second Level Category">
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select name="thirdLevelCategory" value={productData.thirdLevelCategory} onChange={handleChange} label="Third Level Category">
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
                <MenuItem value="shirt">Shirts</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Description" name="description" multiline rows={3} value={productData.description} onChange={handleChange} />
          </Grid>

          {/* Sizes Input */}
          {productData.size.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField label="Size Name" name="name" value={size.name} onChange={(event) => handleSizeChange(event, index)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Quantity" name="size_quantity" type="number" onChange={(event) => handleSizeChange(event, index)} required fullWidth />
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button variant="contained" sx={{ p: 1.8, bgcolor: "#9155fd" }} size="large" type="submit" fullWidth>
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;