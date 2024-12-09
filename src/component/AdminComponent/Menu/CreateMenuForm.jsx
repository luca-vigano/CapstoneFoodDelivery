import { AddPhotoAlternate, Instagram } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from "../Util/UploadToCloudinary";

const initialValue = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "mar-dom : 9-15 18-24",
  images: [],
};

function CreateMenuForm() {
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      console.log("data---", data);
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

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Restaurant
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
                  <AddPhotoAlternate className="text-white" />
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
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="CuisineType"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="streetAddres"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.addres}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              ></TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              ></TextField>
            </Grid2>
          </Grid2>
          <Button variant="contained" color="primary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateMenuForm;
