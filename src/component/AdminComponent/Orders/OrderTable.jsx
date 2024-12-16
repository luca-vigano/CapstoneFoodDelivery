import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  TableContainer,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../State/Restaurant Order/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

export default function OrderTable() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  const [anchorElMap, setAnchorElMap] = React.useState({});

  const handleClick = (event, orderId) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId) => {
    setAnchorElMap((prev) => ({ ...prev, [orderId]: null }));
  };

  const openMenu = (orderId) => Boolean(anchorElMap[orderId]);

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        token,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, [dispatch, token, restaurant.usersRestaurant]);

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, token }));
    handleClose(orderId);
  };

  console.log("item+++", restaurantOrder.orders);
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem, index) => (
                        <Avatar key={index} src={orderItem.food?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">€ {item.totalAmmount}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, index) => (
                      <p key={index}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem, index) => (
                      <div key={index}>
                        {orderItem.ingredients.map((ingredient, idx) => (
                          <Chip key={idx} label={ingredient} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id={`update-button-${item.id}`}
                      aria-controls={
                        openMenu(item.id) ? `menu-${item.id}` : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openMenu(item.id) ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Update
                    </Button>
                    <Menu
                      id={`menu-${item.id}`}
                      anchorEl={anchorElMap[item.id]}
                      open={openMenu(item.id)}
                      onClose={() => handleClose(item.id)}
                      MenuListProps={{
                        "aria-labelledby": `update-button-${item.id}`,
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() =>
                            handleUpdateOrder(item.id, status.value)
                          }
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
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
