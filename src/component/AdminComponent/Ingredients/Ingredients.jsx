import { Grid2 } from "@mui/material";
import React from "react";
import IngredientsTable from "./IngredientsTable";
import IngredientCategoryTable from "./IngredientCategoryTable";

const Ingredients = () => {
  return (
    <div className="px-2">
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <IngredientsTable />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <IngredientCategoryTable />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Ingredients;
