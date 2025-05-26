import { RouteObject } from 'react-router-dom';
import {HomePage} from '../view/HomePage'; // Ensure this path is correct
import LoginPage from '../view/LoginPage'; // Ensure this path is correct
import RegisterPage from '../view/RegisterPage'; // Ensure this path is correct

export const useRouterConfig = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: <LoginPage />, // LoginPage for /login path
    },
    {
      path: '/home',
      element: <HomePage />, // HomePage for the root path
    },
    {
      path: '/register',
      element: <RegisterPage />, // RegisterPage for /register path
    },
  ];
};
