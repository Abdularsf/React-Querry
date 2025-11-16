import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { FetchOld } from "./pages/FetchOld";
import { FetchRQ } from "./pages/FetchRQ";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;