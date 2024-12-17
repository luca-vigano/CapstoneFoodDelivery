import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from "../Util/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../State/Menu/Action";
import { getIngredientsOfRestaurant } from "../../State/Ingredients/Action";
import { useNavigate } from "react-router-dom";

const initialValue = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  ingredients: [],
  images: [],
};

function CreateMenuForm() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant.id;
      dispatch(createMenuItem({ menu: values, token }));
      console.log("data---", values);
      formik.resetForm();
      navigate("/admin/restaurants/menu");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurant({ token, id: restaurant.usersRestaurant.id })
    );
  }, []);

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Menu Item
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid2 container spacing={2}>
            <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
              <input
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className="relative" htmlFor="fileInput">
                <span
                  className="w-24 h-24 cursor-pointer flex items-center justify-center 
              p-3 border rounded-md border-gray-600"
                >
                  <AddPhotoAlternate
                    className="text-white"
                    sx={{ color: "#D8BD8A" }}
                  />
                </span>
                {uploadImage && (
                  <div
                    className="absolute left-0 right-0 top-0 
                bottom-0 w-24 h-24 flex justify-center items-center"
                  >
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative" key={index}>
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                color="#D8BD8A"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                  name="category"
                  sx={{
                    "& .MuiSelect-icon": {
                      color: "#D8BD8A",
                    },
                  }}
                >
                  {restaurant.categories?.map((item) => (
                    <MenuItem value={item}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="ingredients"
                  sx={{
                    "& .MuiSelect-icon": {
                      color: "#D8BD8A",
                    },
                  }}
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  // MenuProps={MenuProps}
                >
                  {ingredients.ingredients?.map((item, index) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Is Vegetarian
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="vegetarian"
                  value={formik.values.vegetarian}
                  label="is vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                  sx={{
                    "& .MuiSelect-icon": {
                      color: "#D8BD8A",
                    },
                  }}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
          <Button variant="contained" sx={{ color: "#D8BD8A" }} type="submit">
            Create Menu Item
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateMenuForm;
