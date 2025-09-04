import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './pages/LoginPage';
import { DashboardFactory } from './components/dashboard/DashboardFactory';
import { PropertiesPage } from './pages/PropertiesPage';
import { LeadsPage } from './pages/LeadsPage';
import { DealsPage } from './pages/DealsPage';
import { FinancialPage } from './pages/FinancialPage';
import { HRPage } from './pages/HRPage';
import { UsersPage } from './pages/UsersPage';
import { UserPermissionsPage } from './pages/UserPermissionsPage';
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

const AuthProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
              <AuthProtectedRoute>
                <Layout>
                  <DashboardFactory />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <AuthProtectedRoute>
                <Layout>
                  <DashboardFactory />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/properties" element={
              <AuthProtectedRoute>
                <Layout>
                  <PropertiesPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/leads" element={
              <AuthProtectedRoute>
                <Layout>
                  <LeadsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/deals" element={
              <AuthProtectedRoute>
                <Layout>
                  <DealsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/financial" element={
              <AuthProtectedRoute>
                <Layout>
                  <FinancialPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/hr" element={
              <AuthProtectedRoute>
                <Layout>
                  <HRPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/users" element={
              <AuthProtectedRoute>
                <Layout>
                  <UsersPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/users/:userId/permissions" element={
              <AuthProtectedRoute>
                <Layout>
                  <UserPermissionsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <AuthProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
