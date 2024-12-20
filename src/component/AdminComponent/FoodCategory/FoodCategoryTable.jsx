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
import { Delete } from "@mui/icons-material";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getRestaurantsCategory,
} from "../../State/Restaurant/Action";

const orders = [1, 1, 1, 1, 1];

export default function FoodCategoryTable() {
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

  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("token");
  // console.log("restaurant details", restaurant);

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategoryAction({ categoryId: id, token })).then(
      dispatch(
        getRestaurantsCategory({
          token,
          restaurantId: restaurant.usersRestaurant?.id,
        })
      )
    );
  };

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        token,
        restaurantId: restaurant.usersRestaurant?.id,
      })
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
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
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
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCategory(item.id)}
                    >
                      <Delete />
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
          <CreateFoodCategoryForm handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
