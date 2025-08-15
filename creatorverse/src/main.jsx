import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Dashboard from './pages/Dashboard.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path= "/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path= "add-creator" element={<AddCreator />} />
        <Route path= "edit-creator/:id" element={<EditCreator />} />
        <Route path= "show-creators" element={<ShowCreators />} />
        <Route path= "view-creator/:id" element={<ViewCreator />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
