import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../State/Ingredients/Action";

const CreateIngredientForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.id,
    };
    console.log(data);
    dispatch(createIngredient({ data, token }))
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
          Create Ingredient
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
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
          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#D8BD8A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D8BD8A", // Colore del bordo quando è in focus
                },
              },
              "& .MuiSelect-icon": {
                color: "#D8BD8A", // Colore dell'icona
              },
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                color: "#D8BD8A", // Colore della label
                "&.Mui-focused": {
                  color: "#D8BD8A", // Colore della label quando il campo è in focus
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D8BD8A", // Colore del bordo quando il campo è in focus
                },
              }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.ingredientCategoryId}
              label="Category"
              onChange={handleInputChange}
              name="categoryId"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#D8BD8A", // Colore della label
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D8BD8A", // Colore del bordo dell'input
                  },
                  "&:hover fieldset": {
                    borderColor: "#D8BD8A", // Colore del bordo al passaggio del mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D8BD8A", // Colore del bordo quando il campo è in focus
                  },
                },
              }}
            >
              {ingredients.category.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" sx={{ color: "#D8BD8A" }}>
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
