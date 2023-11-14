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
//import UpdateProduct from './product/pages/UpdateProduct';
import AddProduct from './product/pages/AddProduct';


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
            <Route path="/categories" exact>
                <Categories />
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