import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import AdminPage from './pages/AdminPage';
import Layout from './components/Layout';
import { TemplateProvider } from './contexts/TemplateContext';

function App() {
  return (
    <TemplateProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/:templateId" element={<EditorPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Layout>
    </TemplateProvider>
  );
}

export default App;
