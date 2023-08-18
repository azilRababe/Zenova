import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

// icons
import { BiMenuAltLeft } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { FaStore } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { TbNewSection } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";

export const ProfileScreen = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    Navigate("/signin");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }));
  };
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  const handleToggle = (e) => {
    const drawer = document.querySelector("#default-sidebar");
    drawer.classList.toggle("translate-x-0");
    // click esc key to close the menu
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        drawer.classList.remove("translate-x-0");
      }
    });
  };
  return (
    <>
      <div className="mb-10">
        <button
          onClick={handleToggle}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 "
        >
          <span class="sr-only">Open sidebar</span>

          <BiMenuAltLeft className="w-6 h-6" />
        </button>

        <aside
          id="default-sidebar"
          class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
            <ul class="space-y-2 font-medium">
              <li>
                <a
                  href="/profile"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <MdSpaceDashboard className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <FaHome className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                  <span class="flex-1 ml-3 whitespace-nowrap">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <RiInboxArchiveFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                  <span class="flex-1 ml-3 whitespace-nowrap">Orders</span>
                  <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <FaStore className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                  <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <IoIosPeople className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                  <span class="flex-1 ml-3 whitespace-nowrap">Customers</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <AiFillSetting className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                  <span class="flex-1 ml-3 whitespace-nowrap">Setting</span>
                </a>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  href="/"
                  class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <IoLogOut className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                  <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div class="p-4 sm:ml-64 bg-dark h-screen">
          <div class="p-4 ">
            <div class="grid grid-cols-1 mb-4">
              <div class="flex items-center justify-center h-24  font-extrabold ">
                <h3 class="text-2xl text-gray-400 ">
                  Hey {userInfo.name}! Welcome to your dashboard
                </h3>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center h-48 mb-4 rounded bg-gray-50">
              <p class="text-2xl text-gray-400 ">Orders</p>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {loadingOrders ? (
                  <div className=" text-red-400 font-bold">Loading...</div>
                ) : errorOrders ? (
                  <div className=" text-red-400 font-bold">
                    {"No Orders Found ..."}
                  </div>
                ) : (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase">
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          DATE
                        </th>
                        <th scope="col" className="px-6 py-3">
                          TOTAL
                        </th>
                        <th scope="col" className="px-6 py-3">
                          PAID
                        </th>
                        <th scope="col" className="px-6 py-3" s>
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b border-gray-200"
                          scope="row"
                        >
                          <td className="px-6 py-4">{order._id}</td>
                          <td className="px-6 py-4">{order.createdAt}</td>
                          <td className="px-6 py-4">{order.totalPrice}</td>
                          <td className="px-6 py-4">{order.isPaid}</td>
                          <td className="px-6 py-4">
                            <Link to={"/order/" + order._id}>DETAILS</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col items-center justify-center rounded bg-gray-50 h-28">
                <p class="text-2xl text-gray-400 ">Customers</p>
                <small className="text-red-400 text-center font-bold">
                  Ops! You have no customers yet
                </small>
              </div>
              <div class="flex flex-col items-center justify-center rounded bg-gray-50 h-28">
                <p class="text-2xl text-gray-400 ">Activities</p>
                <small className="text-red-400 text-center font-bold">
                  no activities found
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="profile">
    //   <div className="profile-info">
    //     <div className="form">
    //       <form onSubmit={submitHandler}>
    //         <ul className="form-container">
    //           <li>
    //             <h2>User Profile</h2>
    //           </li>
    //           <li>
    //             {loading && <div>Loading...</div>}
    //             {error && <div>{error}</div>}
    //             {success && <div>Profile Saved Successfully.</div>}
    //           </li>
    //           <li>
    //             <label htmlFor="name">Name</label>
    //             <input
    //               value={name}
    //               type="name"
    //               name="name"
    //               id="name"
    //               onChange={(e) => setName(e.target.value)}
    //             ></input>
    //           </li>
    //           <li>
    //             <label htmlFor="email">Email</label>
    //             <input
    //               value={email}
    //               type="email"
    //               name="email"
    //               id="email"
    //               onChange={(e) => setEmail(e.target.value)}
    //             ></input>
    //           </li>
    //           <li>
    //             <label htmlFor="password">Password</label>
    //             <input
    //               value={password}
    //               type="password"
    //               id="password"
    //               name="password"
    //               onChange={(e) => setPassword(e.target.value)}
    //             ></input>
    //           </li>

    //           <li>
    //             <button type="submit" className="button primary">
    //               Update
    //             </button>
    //           </li>
    //           <li>
    //             <button
    //               type="button"
    //               onClick={handleLogout}
    //               className="button secondary full-width"
    //             >
    //               Logout
    //             </button>
    //           </li>
    //         </ul>
    //       </form>
    //     </div>
    //   </div>

    // </div>
  );
};
