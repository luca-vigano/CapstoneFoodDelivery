import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  TableContainer,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIngredientCategory,
  getIngredientCategory,
  getIngredientsOfRestaurant,
} from "../../State/Ingredients/Action";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function IngredientCategoryTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, ingredients } = useSelector((store) => store);

  const handleDeleteIngredientCategory = (id) => {
    dispatch(deleteIngredientCategory({ id, token })).then(
      dispatch(
        getIngredientsOfRestaurant({ token, id: restaurant.usersRestaurant.id })
      )
    );
  };

  useEffect(() => {
    dispatch(
      getIngredientCategory({ id: restaurant.usersRestaurant.id, token })
    );
  }, []);
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon sx={{ color: "#D8BD8A" }} />
            </IconButton>
          }
          title={"Ingredient Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.category.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }, // Rimuove bordo per l'ultima riga
                    "& td, & th": {
                      borderBottom: "2px solid #53272F", // Colore della riga tra le righe
                      borderTop: "2px solid #53272F", // Colore della riga tra le righe
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" sx={{ color: "#D8BD8A" }}>
                      <DeleteIcon
                        onClick={() => handleDeleteIngredientCategory(item.id)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
