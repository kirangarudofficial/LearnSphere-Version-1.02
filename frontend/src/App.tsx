import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { DashboardSkeleton } from './components/common/SkeletonLoader';


// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const CoursePlayerPage = lazy(() => import('./pages/CoursePlayerPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MyLearningPage = lazy(() => import('./pages/MyLearningPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const CourseLivePage = lazy(() => import('./pages/CourseLivePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const CheckoutPage = lazy(() => import('./components/checkout/CheckoutPage'));
const InstructorDashboard = lazy(() => import('./components/instructor/InstructorDashboard'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Phase 3: New Pages
const ForumPage = lazy(() => import('./pages/ForumPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'));
const CodePlaygroundPage = lazy(() => import('./pages/CodePlaygroundPage'));
const SurveysPage = lazy(() => import('./pages/SurveysPage'));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'));
const AuditLogsPage = lazy(() => import('./pages/AuditLogsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const MarketingPage = lazy(() => import('./pages/MarketingPage'));
const WebhooksPage = lazy(() => import('./pages/WebhooksPage'));
const FeatureFlagsPage = lazy(() => import('./pages/FeatureFlagsPage'));
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'));
const OrganizationsPage = lazy(() => import('./pages/OrganizationsPage'));
const AffiliatePage = lazy(() => import('./pages/AffiliatePage'));
const BillingPage = lazy(() => import('./pages/BillingPage'));
const PaymentsPage = lazy(() => import('./pages/PaymentsPage'));
const CouponsPage = lazy(() => import('./pages/CouponsPage'));
const ExportCenterPage = lazy(() => import('./pages/ExportCenterPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const RecommendationCenterPage = lazy(() => import('./pages/RecommendationCenterPage'));
const ModerationPage = lazy(() => import('./pages/ModerationPage'));
const UserManagementPage = lazy(() => import('./pages/UserManagementPage'));
const SupportAdminPage = lazy(() => import('./pages/SupportAdminPage'));
const ServiceHealthPage = lazy(() => import('./pages/ServiceHealthPage'));
const SystemStatusPage = lazy(() => import('./pages/SystemStatusPage'));
const FeatureRolloutPage = lazy(() => import('./pages/FeatureRolloutPage'));
const AuditDashboardPage = lazy(() => import('./pages/AuditDashboardPage'));



// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 p-8 animate-fade-in">
    <DashboardSkeleton />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Router>
              <div className="min-h-screen">
                <Suspense fallback={<PageLoader />}>

                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/courses/:id" element={<CourseDetailPage />} />
                    <Route path="/courses/:id/learn" element={<CoursePlayerPage />} />
                    <Route path="/courses/live/:sessionId" element={<CourseLivePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/my-learning" element={<MyLearningPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/certificates" element={<CertificatesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/instructor" element={<InstructorDashboard />} />
                    <Route path="/courses/:courseId/forum" element={<ForumPage />} />
                    <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                    <Route path="/coding-lab" element={<CodePlaygroundPage />} />
                    <Route path="/surveys" element={<SurveysPage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/admin/audit" element={<AuditLogsPage />} />
                    <Route path="/admin/reports" element={<ReportsPage />} />
                    <Route path="/admin/marketing" element={<MarketingPage />} />
                    <Route path="/admin/webhooks" element={<WebhooksPage />} />
                    <Route path="/admin/flags" element={<FeatureFlagsPage />} />
                    <Route path="/settings/integrations" element={<IntegrationsPage />} />
                    <Route path="/organizations" element={<OrganizationsPage />} />
                    <Route path="/affiliate" element={<AffiliatePage />} />
                    <Route path="/billing" element={<BillingPage />} />
                    <Route path="/payments" element={<PaymentsPage />} />
                    <Route path="/admin/coupons" element={<CouponsPage />} />
                    <Route path="/admin/export" element={<ExportCenterPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />
                    <Route path="/recommendations" element={<RecommendationCenterPage />} />
                    <Route path="/admin/moderation" element={<ModerationPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />
                    <Route path="/admin/support" element={<SupportAdminPage />} />
                    <Route path="/admin/health" element={<ServiceHealthPage />} />
                    <Route path="/admin/system" element={<SystemStatusPage />} />
                    <Route path="/admin/features" element={<FeatureRolloutPage />} />
                    <Route path="/admin/audit-dashboard" element={<AuditDashboardPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    <Route
                      path="/checkout"
                      element={
                        <CheckoutPage
                          onBack={() => window.history.back()}
                          onComplete={() => window.location.href = '/dashboard'}
                        />
                      }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </div>
            </Router>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
