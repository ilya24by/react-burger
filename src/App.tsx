import AppHeader from './components/AppHeader';
import { Route, BrowserRouter, Routes, useLocation, Location } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientDetailsModal,
  IngredientDetails,
  FeedPage,
  FeedNumberPage,
  ProfileOrdersPage,
  ProfileOrderNumberPage,
  FeedNumberPageModal,
  ProfileOrderNumberPageModal,
} from './pages';
import ProfileLayout from './pages/ProfileLayout';
import ProtectedRouteElement from './components/ProtectedRouteElement';
import { useAppDispatch } from './services/hooks';
import { initAuth } from './services/thunk/auth';
import { useEffect } from 'react';
import { getBackgroundLocationForModalRoute } from './utils/routing';

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const isModalRoute = location.pathname.match(/^\/(ingredients|feed|profile\/orders)\/\w+$/);

  const backgroundLocation = state?.backgroundLocation || (isModalRoute ? getBackgroundLocationForModalRoute(location.pathname) : null);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfileLayout />} />}>
          <Route index element={<ProfilePage />} />
          <Route path="orders" element={<ProfileOrdersPage />} />
        </Route>
        <Route path="/profile/orders/:number" element={<ProtectedRouteElement element={<ProfileOrderNumberPage />} />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number" element={<FeedNumberPage />} />

        <Route path="*" element={null} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
          <Route path="/feed/:number" element={<FeedNumberPageModal />} />
          <Route path="/profile/orders/:number" element={<ProtectedRouteElement element={<ProfileOrderNumberPageModal />} />} />
        </Routes>
      )}
    </>
  );
}



function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
