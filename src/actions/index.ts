import { deleteUserAddress } from './address/delete-user-address';
import { getUserAddress } from './address/get-user-address';
import { setUserAddress } from './address/set-user-address';

import { getCategories } from './category/get-categories';
import { createCategory } from './category/new-category';

import { createUpdateProduct } from './products/create-update-product';
import { getPaginatedProductsWithImages } from './products/product-pagination';
import { getProductBySlug } from './products/get-product-by-slug';
import { getProductSizesAvaibles } from './products/get-product-sizes-avaibles';
import { getProductAdm } from './products/get-products-adm';
import { deleteProductImage } from './products/delete-product-image';

import { getCountries } from './country/get-countries';

import { setTransactionId } from './payments/set-transaction-id';
import { paypalCheckPayment } from './payments/paypal-check-payment';
import { createPreference } from './payments/mercadopago-payment';

import { placeOrder } from './order/place-order';
import { getOrderById } from './order/get-order-by-id';
import { getOrdersByUser } from './order/get-orders-by-user';
import { getPaginatedOrders } from './order/order-pagination';
import { getPaginatedAllOrders } from './order/get-paginated-orders';
import { updateStock } from './order/update-stock';

import { login } from './auth/login';
import { registerUser } from './auth/register';
import { verifyToken } from './auth/verifyToken';
import { logOut } from './auth/logOut';
import { verifyEmail } from './auth/verifyEmail';

import { getPaginatedAllUsers } from './user/get-paginated-users';
import { changeUserRole } from './user/change-user-role';
import { changeUserPassword } from './user/change-user-password';

import { generateReport } from './pdf/generateReport';
import { getFactura } from './pdf/getFactura';

import { addCompanyData } from './company/add-data-company';
import { getCompanyData } from './company/get-data-company';

export {
  deleteUserAddress,
  getUserAddress,
  setUserAddress,
  getCategories,
  createCategory,
  createUpdateProduct,
  getPaginatedProductsWithImages,
  getProductBySlug,
  getProductSizesAvaibles,
  getProductAdm,
  deleteProductImage,
  getCountries,
  setTransactionId,
  paypalCheckPayment,
  createPreference,
  placeOrder,
  getOrderById,
  getOrdersByUser,
  getPaginatedOrders,
  getPaginatedAllOrders,
  updateStock,
  login,
  registerUser,
  verifyToken,
  verifyEmail,
  logOut,
  getPaginatedAllUsers,
  changeUserRole,
  changeUserPassword,
  generateReport,
  getFactura,
  addCompanyData,
  getCompanyData
};