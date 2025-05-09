import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import {
  fetchFeeds,
  fetchIngredients,
  fetchUser,
  fetchUserOrders
} from '@slices';

const modalRoutes = [
  {
    path: '/ingredients/:id',
    title: 'Детали ингредиента',
    backPath: '/',
    element: <IngredientDetails />,
    protected: false
  },
  {
    path: '/feed/:number',
    title: 'Информация о заказе',
    backPath: '/feed',
    element: <OrderInfo />,
    protected: false
  },
  {
    path: '/profile/orders/:number',
    title: 'Информация о заказе',
    backPath: '/profile/orders',
    element: <OrderInfo />,
    protected: true
  }
];

const protectedRoutes = [
  { path: '/profile', element: <Profile /> },
  { path: '/profile/orders', element: <ProfileOrders /> }
];

const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> }
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    const initApp = async () => {
      await Promise.all([
        dispatch(fetchIngredients()),
        dispatch(fetchFeeds()),
        dispatch(fetchUser())
      ]);
      dispatch(fetchUserOrders());
    };
    initApp();
  }, [dispatch]);

  const renderModalRoute = (
    path: string,
    title: string,
    backPath: string,
    children: React.ReactNode
  ) => (
    <Route
      path={path}
      element={
        <Modal title={title} onClose={() => navigate(backPath)}>
          {children}
        </Modal>
      }
    />
  );

  const renderProtectedModalRoute = (
    path: string,
    title: string,
    backPath: string,
    children: React.ReactNode
  ) => (
    <Route
      path={path}
      element={
        <ProtectedRoute>
          <Modal title={title} onClose={() => navigate(backPath)}>
            {children}
          </Modal>
        </ProtectedRoute>
      }
    />
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed' element={<Feed />} />

        {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute onlyUnAuth>{route.element}</ProtectedRoute>
            }
          />
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}

        {modalRoutes.map((route) =>
          route.protected
            ? renderProtectedModalRoute(
                route.path,
                route.title,
                route.backPath,
                route.element
              )
            : renderModalRoute(
                route.path,
                route.title,
                route.backPath,
                route.element
              )
        )}
      </Routes>

      {backgroundLocation && (
        <Routes>
          {modalRoutes.map((route) =>
            route.protected
              ? renderProtectedModalRoute(
                  route.path,
                  route.title,
                  route.backPath,
                  route.element
                )
              : renderModalRoute(
                  route.path,
                  route.title,
                  route.backPath,
                  route.element
                )
          )}
        </Routes>
      )}
    </div>
  );
};

export default App;
