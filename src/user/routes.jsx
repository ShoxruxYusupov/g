import Layout from './Layout';
import {
  AboutUsPage,
  CartPage,
  LoadingPage,
  MenuPage,
  ReviewPage
} from './pages';

import {
  AdminHomePage,
  AdminCatalogPage,
  AdminProductsPage,
  AdminReviewPage
} from '../admin/pages';

import AdminLayout from '../admin/AdminLayout';

export function UserRoutes() {
  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <MenuPage />
        },
        {
          path: 'about-us',
          element: <AboutUsPage />
        },
        {
          path: 'review',
          element: <ReviewPage />
        },
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'loading',
          element: <LoadingPage />
        }
      ]
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'admin-home',
          element: <AdminHomePage />
        },
        {
          path: 'admin-catalog',
          element: <AdminCatalogPage />
        },
        {
          path: 'admin-products',
          element: <AdminProductsPage />
        },
        {
          path: 'admin-review',
          element: <AdminReviewPage />
        }
      ]
    }
  ];
}
