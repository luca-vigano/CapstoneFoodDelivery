import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../State/Menu/Action";

export default function MenuTable() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        token: localStorage.getItem("token"),
      })
    );
  }, []);

  const handleChangeAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, token })).then(() =>
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant.id,
          token: localStorage.getItem("token"),
        })
      )
    );
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, token }));
  };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
              aria-label="settings"
            >
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Disponibile</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.ingredients.map((ingredient) => (
                      <Chip label={ingredient.name} />
                    ))}
                  </TableCell>
                  <TableCell align="right">€ {item.price}</TableCell>
                  <TableCell align="right">
                    {item.available ? (
                      <Button onClick={() => handleChangeAvailability(item.id)}>
                        Yes
                      </Button>
                    ) : (
                      <Button onClick={() => handleChangeAvailability(item.id)}>
                        No
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteFood(item.id)}
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
    </Box>
  );
}
