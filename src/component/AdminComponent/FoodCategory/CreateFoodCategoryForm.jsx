import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../State/Restaurant/Action";

const CreateFoodCategoryForm = ({ handleClose }) => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurantId: {
        id: 103,
      },
    };
    dispatch(
      createCategoryAction({
        reqData: data,
        token: localStorage.getItem("token"),
      })
    )
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.log("Error creating ingredient category:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className=" text-center text-xl pb-10">Create Food Category</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Food Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
            InputLabelProps={{
              style: { color: "#D8BD8A" }, // Colore della label
            }}
            sx={{
              backgroundColor: "##53272F", // Colore di sfondo
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#D8BD8A", // Colore del bordo al passaggio del mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D8BD8A", // Colore del bordo quando il campo è attivo
                },
              },
            }}
          ></TextField>
          <Button variant="contained" type="submit" sx={{ color: "#D8BD8A" }}>
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
