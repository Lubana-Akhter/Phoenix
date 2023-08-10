import React from 'react';
import SellerList from '../components/SellerList';
import { Container } from '@mui/material';
import LayoutNew from '../components/LayoutNew';


const SellerListPage = () => {
    return (
        <Container>
            <LayoutNew />
            <SellerList />
        </Container>
    );
};

export default SellerListPage;