import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Menu from "./components/nav/Menu";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/user/DashboardPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import SecretPage from "./pages/SecretPage";

function PageNotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      404 | Page Not Found
    </div>
  );
}

function App() {
  const routes = createRoutesFromElements(
    <Route path='/' element={<Menu />}>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path='secret' element={<SecretPage />} />
      </Route>
      <Route path='*' element={<PageNotFound />} replace />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
