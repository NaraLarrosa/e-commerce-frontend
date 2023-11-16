import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import Products from './product/pages/Products';
import Categories from './category/pages/Categories';
import AddProduct from './product/pages/AddProduct';
import AddCategory from './category/pages/AddCategory';
import UpdateProduct from './product/pages/UpdateProduct';
import UpdateCategory from './category/pages/UpdateCategory';
import AddPO from './po/pages/AddPO';

const App = () => { 
let routes;

    routes = (
        <Switch>
            <Route path="/" exact>
                <Products />
            </Route>
            <Route path="/product" exact>
                <AddProduct />
            </Route>
            <Route path="/product/:pid">
                <UpdateProduct />
            </Route>
            <Route path="/categories" exact>
                <Categories />
            </Route>
            <Route path="/category" exact>
                <AddCategory />
            </Route>
            <Route path="/category/:cid">
                <UpdateCategory />
            </Route>
            <Route path="/po/:poid">
                <AddPO />
            </Route>
            <Redirect to="/" />
        </Switch>
    );

    return (
        <Router>
            <MainNavigation />
            <main>{routes}</main>
        </Router>
    );
}

export default App;