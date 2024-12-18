import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../State/Ingredients/Action";

const CreateIngredientCategoryForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };
    console.log(formData);
    dispatch(createIngredientCategory({ data, token }))
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
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label=" ingredient category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
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
            Create Ingredient Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
