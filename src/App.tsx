import AppHeader from './components/AppHeader';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';
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
} from './pages';
import ProfileLayout from './pages/ProfileLayout';
import ProtectedRouteElement from './components/ProtectedRouteElement';
import { useAppDispatch } from './services/hooks';
import { initAuth } from './services/thunk/auth';
import { useEffect } from 'react';

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };


  console.log(state?.backgroundLocation);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement isAccessDeniedAfterAuth element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfileLayout />} />}>
          <Route index element={<ProfilePage />} />
          <Route path="orders" element={<ProfileOrdersPage />} />
          <Route path="orders/:number" element={<ProfileOrderNumberPage />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number" element={<FeedNumberPage />} />

        <Route path="*" element={null} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
          <Route path="/feed/:number" element={<FeedNumberPageModal />} />
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
