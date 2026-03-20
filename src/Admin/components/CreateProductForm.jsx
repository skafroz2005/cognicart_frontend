import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
    images: [],
    brand: "",
    title: "",
    color: "",
    tags: "",
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createProduct(productData)); // change here
//     console.log("Submitted product data: ", productData);
//   };

const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Convert the comma-separated string into an images array
    const imageArray = typeof productData.images === 'string' 
        ? productData.images.split(',').map(url => url.trim()).filter(url => url !== "") 
        : productData.images;

    // 2. NEW: Convert the comma-separated string into a tags array
    const tagsArray = typeof productData.tags === 'string'
        ? productData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
        : productData.tags;

    // 3. Create a copy of the data with BOTH new arrays
    const finalProductData = {
        ...productData,
        images: imageArray,
        tags: tagsArray // Add the tags array to the payload!
    };

    dispatch(createProduct(finalProductData));
    console.log("Submitted product data: ", finalProductData);
  };
  


  return (
    <div className="p-10">
      <Typography variant="h3" sx={{ textAlign: "center", mb: 5 }}>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit} className="min-h-screen">
        <div className="mui-grid-container-div mui-spacing-3">
          <div className="mui-grid-item-div mui-col-xs-12">
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </div>
          {/* ADD THIS NEW INPUT */}
          <div className="mui-grid-item-div mui-col-xs-12">
            <TextField
              fullWidth
              label="Gallery Image URLs (Separate multiple URLs with commas)"
              name="images"
              multiline
              rows={2}
              value={productData.images}
              onChange={handleChange}
            />
          </div>
          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </div>

          <div className="mui-grid-item-div mui-col-xs-12">
            <TextField
              fullWidth
              label="Search Tags (Hidden keywords, separated by commas)"
              name="tags"
              value={productData.tags}
              onChange={handleChange}
              placeholder="e.g., pants, trousers, bottomwear, formal"
            />
          </div>

          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              type="number"
              value={productData.discountedPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-4">
            <TextField
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              type="number"
              value={productData.discountPercent}
              onChange={handleChange}
            />
          </div>

          {/* Category Selectors */}
          <div className="mui-grid-item-div mui-col-xs-6 mui-col-sm-4">
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mui-grid-item-div mui-col-xs-6 mui-col-sm-4">
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mui-grid-item-div mui-col-xs-6 mui-col-sm-4">
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
                <MenuItem value="shirt">Shirts</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mui-grid-item-div mui-col-xs-12">
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={productData.description}
              onChange={handleChange}
            />
          </div>

          {/* Sizes Input */}
          {productData.size.map((size, index) => (
            <div className="mui-grid-item-div mui-col-xs-12" key={index}>
              <div className="mui-grid-container-div mui-spacing-3">
              <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
                <TextField
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </div>
              <div className="mui-grid-item-div mui-col-xs-12 mui-col-sm-6">
                <TextField
                  label="Quantity"
                  name="size_quantity"
                  type="number"
                  onChange={(event) => handleSizeChange(event, index)}
                  required
                  fullWidth
                />
              </div>
              </div>
            </div>
          ))}

          <div className="mui-grid-item-div mui-col-xs-12">
            <Button
              variant="contained"
              sx={{ p: 1.8, bgcolor: "#9155fd" }}
              size="large"
              type="submit"
              fullWidth
            >
              Add New Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
