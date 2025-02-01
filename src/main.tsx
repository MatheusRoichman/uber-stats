import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import './index.css'
import { Home } from './view/pages/home';
import { RootLayout } from './view/layout';
import { CostReport } from './view/pages/cost-report';
import { RideHistory } from './view/pages/ride-history';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />} >
          <Route path="/" element={<Home />} />

          <Route path="/cost-report" element={<CostReport />} />

          <Route path="/ride-history" element={<RideHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
