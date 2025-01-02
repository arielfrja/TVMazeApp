import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import SearchPage from './pages/searchPage.tsx';
import ShowPage from './pages/showPage.tsx';
import FavoritesPage from './pages/favoritesPage.tsx';
import ShowsIndex from './pages/Index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<ShowsIndex />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:q" element={<SearchPage />} />
          <Route path="show/:id" element={<ShowPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
