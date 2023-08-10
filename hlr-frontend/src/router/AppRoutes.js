import React, { Fragment } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import MainSectionPage from '../pages/User/MainSectionPage';
import PropertyDetailsPage from '../pages/PropertyDetailsPage';
import SellerListPage from '../pages/SellerListPage';
import FavouriteListPage from '../pages/FavouriteListPage';
import CreatePropertyPage from '../pages/CreatePropertyPage';
import BuyPage from '../pages/BuyPage';
import Sell from '../components/Admin/Sell';
import Rent from '../components/Admin/Rent';
import Visit from '../components/Admin/Visit';

const AppRoutes = () => {
    return (
        <Fragment>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/user-main-section" element={<MainSectionPage />} />
                <Route exact path="/create-property" element={<CreatePropertyPage />} />
                <Route exact path="/property-details" element={<PropertyDetailsPage />} />
                <Route exact path="/seller-list" element={<SellerListPage />} />
                <Route exact path="/user-buy" element={<BuyPage />} />
                <Route exact path="/favourite-list" element={<FavouriteListPage />} />
                <Route exact path="/admin/sell-list" element={<Sell />} />
                <Route exact path="/admin/rent-list" element={<Rent />} />
                <Route exact path="/admin/visit-list" element={<Visit />} />
            </Routes>
        </Fragment>
    );
};

export default AppRoutes;