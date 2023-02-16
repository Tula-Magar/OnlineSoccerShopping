import Home  from "./components/Home";
import Create from "./components/Product/Create";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/Create",
    element: <Create />
  }
];

export default AppRoutes;
