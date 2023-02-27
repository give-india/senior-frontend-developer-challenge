import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Dashboard from "./Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  
]);

export default router;
