import Body from "./components/Body";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./components/Checkout";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "", element: <Body /> },
        { path: "/checkout", element: <Checkout /> },
        // { path: "/addproduct", element: <Addproduct /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
