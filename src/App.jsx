import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import HomePage from "./pages/HomePage";
import YogaListPage from "./pages/YogaListPage";
import YogaDetailPage from "./pages/YogaDetailPage";
import AffirmationsPage from "./pages/AffirmationsPage";
import BreathingPage from "./pages/BreathingPage";

function RootLayout() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
      <Outlet />
      <NavBar />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "yoga", element: <YogaListPage /> },
      { path: "yoga/:poseId", element: <YogaDetailPage /> },
      { path: "affirmationen", element: <AffirmationsPage /> },
      { path: "atmen", element: <BreathingPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
