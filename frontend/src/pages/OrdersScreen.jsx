import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../actions/orderActions";

export const OrdersScreen = () => {
  // const orderList = useSelector((state) => state.orderList);
  // const { loading, orders, error } = orderList;

  // const orderDelete = useSelector((state) => state.orderDelete);
  // const {
  //   loading: loadingDelete,
  //   success: successDelete,
  //   error: errorDelete,
  // } = orderDelete;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(listOrders());
  //   return () => {
  //     //
  //   };
  // }, [successDelete]);

  // const deleteHandler = (order) => {
  //   dispatch(deleteOrder(order._id));
  // };
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    // Clean up the order list on component unmount
    return () => {
      // You can dispatch an action to reset the order list in Redux here
    };
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <div>Order list is empty</div>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.user.name}</td>
                  <td>{order.isPaid.toString()}</td>
                  <td>{order.paidAt}</td>
                  <td>{order.isDelivered.toString()}</td>
                  <td>{order.deliveredAt}</td>
                  <td>
                    <Link
                      to={"/order/" + order._id}
                      className="button secondary"
                    >
                      Details
                    </Link>{" "}
                    <button
                      type="button"
                      onClick={() => deleteHandler(order)}
                      className="button secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
