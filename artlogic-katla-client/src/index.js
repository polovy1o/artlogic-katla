import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Main from './components/Main';
import ProductCategoryList, { ProductCategoryListLoader } from './components/ProductCategoryList';
import ProductCategoryProductList, { ProductCategoryProductListLoader } from './components/ProductCategoryProductList';
import ProductCategoryForm, { ProductCategoryFormLoader } from './components/ProductCategoryForm';
import ProductList, { ProductListLoader } from './components/ProductList';
import ProductForm, { ProductFormLoader } from './components/ProductForm';
import HiveList, { HiveListAction, HiveListLoader } from './components/HiveList';
import HiveForm, { HiveFormLoader } from './components/HiveForm';
import HiveSectionForm, { HiveSectionFormLoader } from './components/HiveSectionForm';
import HiveSectionList, { HiveSectionListAction, HiveSectionListLoader } from './components/HiveSectionList';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: '/categories',
                element: <ProductCategoryList />,
                loader: ProductCategoryListLoader
            },
            {
                path: '/category/:categoryId/products',
                element: <ProductCategoryProductList />,
                loader: ProductCategoryProductListLoader
            },
            { 
                path: '/category', 
                element: <ProductCategoryForm/>,
                loader: ProductCategoryFormLoader
            },
            { 
                path: '/category/:categoryId', 
                element: <ProductCategoryForm/>,
                loader: ProductCategoryFormLoader
            },
            { 
                path: '/products', 
                element: <ProductList/>,
                loader: ProductListLoader 
            },
            { 
                path: '/product/:productId', 
                element: <ProductForm/>,
                loader: ProductFormLoader
            },
            { 
                path: '/product', 
                element: <ProductForm/>,
                loader: ProductFormLoader
            },
            { 
                path: '/category/:categoryId/product/:productId', 
                element: <ProductForm/>,
                loader: ProductFormLoader
            },
            { 
                path: '/hives', 
                element: <HiveList/>,
                loader: HiveListLoader,
                action: HiveListAction
            },
            { 
                path: '/hive', 
                element: <HiveForm/>,
                loader: HiveFormLoader
            },
            { 
                path: '/hive/:hiveId', 
                element: <HiveForm/>,
                loader: HiveFormLoader
            },
            { 
                path: '/hive/:hiveId/sections', 
                element: <HiveSectionList/>,
                loader: HiveSectionListLoader,
                action: HiveSectionListAction
            },
            { 
                path: '/section/:sectionId', 
                element: <HiveSectionForm/>,
                loader: HiveSectionFormLoader
            },
            {
                path: '/hive/:hiveId/section',
                element: <HiveSectionForm/>,
                loader: HiveSectionFormLoader
            }
        ]
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);