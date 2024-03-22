import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SavedEventsPage } from "./components/saved-events/SavedEventsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "saved",
    element: <SavedEventsPage />,
  },
]);

export function App1() {
  return <RouterProvider router={router} />;
}
