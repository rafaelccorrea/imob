import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardFactory } from './components/dashboard/DashboardFactory';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import PresentationsPage from './pages/PresentationsPage';
import TeamsPage from './pages/TeamsPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { LeadsPage } from './pages/LeadsPage';
import { DealsPage } from './pages/DealsPage';
import { FinancialPage } from './pages/FinancialPage';
import { HRPage } from './pages/HRPage';
import { VisitsPage } from './pages/VisitsPage';
import { VisitsManagementPage } from './pages/VisitsManagementPage';
import { CommissionCalculatorPage } from './pages/CommissionCalculatorPage';
import { GoalsGamificationPage } from './pages/GoalsGamificationPage';
import { ReportsPage } from './pages/ReportsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { KeysPage } from './pages/KeysPage';
import { ClientsPage } from './pages/ClientsPage';
import { ContactsPage } from './pages/ContactsPage';
import { UsersPage } from './pages/UsersPage';
import { UserPermissionsPage } from './pages/UserPermissionsPage';
import { SettingsPage } from './pages/SettingsPage';
// Novas páginas RH
import { EmployeesPage } from './pages/EmployeesPage';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { PerformancePage } from './pages/PerformancePage';
import { TrainingPage } from './pages/TrainingPage';
import { PayrollPage } from './pages/PayrollPage';
import { TimeTrackingPage } from './pages/TimeTrackingPage';
// Novas páginas Financeiro
import { AccountsPayablePage } from './pages/AccountsPayablePage';
import { AccountsReceivablePage } from './pages/AccountsReceivablePage';
import { BudgetPage } from './pages/BudgetPage';
import { FinancialReportsPage } from './pages/FinancialReportsPage';
import { AssetsPage } from './pages/AssetsPage';
import { InvestmentsPage } from './pages/InvestmentsPage';
import { TaxesPage } from './pages/TaxesPage';
import { Layout } from './components/layout';
import { useAuthStore } from './stores';
import { ThemeProvider } from './components/providers/ThemeProvider';

// QueryClient removed for now
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

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
            
            <Route path="/manager-dashboard" element={
              <AuthProtectedRoute>
                <Layout>
                  <ManagerDashboardPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/presentations" element={
              <AuthProtectedRoute>
                <Layout>
                  <PresentationsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/teams" element={
              <AuthProtectedRoute>
                <Layout>
                  <TeamsPage />
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
            
            <Route path="/visits" element={
              <AuthProtectedRoute>
                <Layout>
                  <VisitsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/visits-management" element={
              <AuthProtectedRoute>
                <Layout>
                  <VisitsManagementPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/commission-calculator" element={
              <AuthProtectedRoute>
                <Layout>
                  <CommissionCalculatorPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/goals-gamification" element={
              <AuthProtectedRoute>
                <Layout>
                  <GoalsGamificationPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <AuthProtectedRoute>
                <Layout>
                  <ReportsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/documents" element={
              <AuthProtectedRoute>
                <Layout>
                  <DocumentsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/keys" element={
              <AuthProtectedRoute>
                <Layout>
                  <KeysPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/clients" element={
              <AuthProtectedRoute>
                <Layout>
                  <ClientsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/contacts" element={
              <AuthProtectedRoute>
                <Layout>
                  <ContactsPage />
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
            
            {/* Novas rotas RH */}
            <Route path="/employees" element={
              <AuthProtectedRoute>
                <Layout>
                  <EmployeesPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/recruitment" element={
              <AuthProtectedRoute>
                <Layout>
                  <RecruitmentPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/performance" element={
              <AuthProtectedRoute>
                <Layout>
                  <PerformancePage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/training" element={
              <AuthProtectedRoute>
                <Layout>
                  <TrainingPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/payroll" element={
              <AuthProtectedRoute>
                <Layout>
                  <PayrollPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/time-tracking" element={
              <AuthProtectedRoute>
                <Layout>
                  <TimeTrackingPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            {/* Novas rotas Financeiro */}
            <Route path="/accounts-payable" element={
              <AuthProtectedRoute>
                <Layout>
                  <AccountsPayablePage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/accounts-receivable" element={
              <AuthProtectedRoute>
                <Layout>
                  <AccountsReceivablePage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/budget" element={
              <AuthProtectedRoute>
                <Layout>
                  <BudgetPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/financial-reports" element={
              <AuthProtectedRoute>
                <Layout>
                  <FinancialReportsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/assets" element={
              <AuthProtectedRoute>
                <Layout>
                  <AssetsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/investments" element={
              <AuthProtectedRoute>
                <Layout>
                  <InvestmentsPage />
                </Layout>
              </AuthProtectedRoute>
            } />
            
            <Route path="/taxes" element={
              <AuthProtectedRoute>
                <Layout>
                  <TaxesPage />
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
  );
}

export default App;
