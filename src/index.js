import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css'
import App from './App';
import AppLayout from './AppLayout';

import GridPage from './grid-display/GridPage';
import AllGrids from './AllGrids';
import CreateNewGrid from './CreateNewGrid';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route ipath="/" element={<AppLayout />}>
          <Route index element={<App />} />
          <Route path="grids" element={<AllGrids />} />
          <Route path="grids/create_new" element={<CreateNewGrid />} />
          <Route path="grids/:gridId" element={<GridPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >
);

