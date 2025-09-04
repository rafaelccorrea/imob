import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { LeadsPage } from './pages/LeadsPage';
import { DealsPage } from './pages/DealsPage';
import { FinancialPage } from './pages/FinancialPage';
import { HRPage } from './pages/HRPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { Layout } from './components/layout';
import { useAuthStore } from './stores';
import { ThemeProvider } from './components/providers/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/properties" element={
              <ProtectedRoute>
                <Layout>
                  <PropertiesPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/leads" element={
              <ProtectedRoute>
                <Layout>
                  <LeadsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/deals" element={
              <ProtectedRoute>
                <Layout>
                  <DealsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financial" element={
              <ProtectedRoute>
                <Layout>
                  <FinancialPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/hr" element={
              <ProtectedRoute>
                <Layout>
                  <HRPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute>
                <Layout>
                  <UsersPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
