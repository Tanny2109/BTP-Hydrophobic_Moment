import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './components/App';
import Logic from './components/Logic';
import Inputs from './components/Inputs';
import Check from './components/Check';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path: "/logic",
    element: <Logic />
  },
  {
    path: "/inputs",
    element: <Inputs />
  },
  {
    path: '/check',
    element: <Check />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);

