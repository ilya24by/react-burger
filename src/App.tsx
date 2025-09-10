import AppHeader from './components/AppHeader';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage } from './pages';
import ProtectedRouteElement from './components/ProtectedRouteElement';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={null} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
