import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import ProductDetails from './pages/ProductDetails';
import ShippingPage from './pages/ShippingPage';
import AddOrderPage from './pages/AddOrderPage';
import PaymentPage from './pages/PaymentPage';
import OrderPage from './pages/OrderPage';
import ProductListPage from './pages/ProductListPage';
import UsersListPage from './pages/UsersListPage';
import OrdersListPage from './pages/OrdersListPage';
import EditUserPage from './pages/EditUserPage';
import EditProductPage from './pages/EditProductPage';
import AddProductPage from './pages/AddProductPage';
import CategoryListPage from './pages/CategoryListPage';
import EditCategoryPage from './pages/EditCategoryPage';
import AddCategoryPage from './pages/AddCategoryPage';
function App() {
  return (
    <div>
      <Header />
      <div className='container'>
        <Switch>
          <Route path='/search/:keyword' component={HomePage} exact />
          <Route path='/page/:pageNumber' component={HomePage} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomePage}
            exact
          />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <ProtectedRoute path='/addorder' component={AddOrderPage} />
          <ProtectedRoute path='/shipping' component={ShippingPage} />
          <ProtectedRoute path='/payment' component={PaymentPage} />
          <ProtectedRoute path='/order/:id' component={OrderPage} />
          <Route path='/product/:id' component={ProductDetails} />
          <ProtectedRoute path='/admin/product/:id/edit' component={EditProductPage} />
          <ProtectedRoute
            path='/admin/productlist'
            component={ProductListPage}
            exact
          />
          <ProtectedRoute
            path='/admin/productlist/addProduct'
            component={AddProductPage}
            exact
          />
          <ProtectedRoute
            path='/admin/productlist/:pageNumber'
            component={ProductListPage}
            exact
          />
          <ProtectedRoute path='/admin/user/:id/edit' component={EditUserPage} />

          <ProtectedRoute
            path='/admin/userlist'
            component={UsersListPage}
            exact
          />
          <ProtectedRoute
            path='/admin/orderlist'
            component={OrdersListPage}
            exact
          />
          <ProtectedRoute
            path='/admin/categorylist'
            component={CategoryListPage}
            exact
          />
          <ProtectedRoute
            path='/admin/categorylist/addCategory'
            component={AddCategoryPage}
            exact
          />
          <ProtectedRoute path='/admin/category/:id/edit' component={EditCategoryPage} />
          <Route exact path='/cart' component={CartPage} />
          <ProtectedRoute exact path='/profile' component={ProfilePage} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
