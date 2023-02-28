import Home from "./components/Home";
import Create from "./components/Product/Create";
import CategoryCreate from "./components/ProductCategory/CategoryCreate";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/Create",
    element: <Create />,
  },
  {
    path: "/CategoryCreate",
    element: <CategoryCreate />,
  },
];

export default AppRoutes;
