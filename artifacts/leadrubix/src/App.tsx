import { Switch, Route, Router as WouterRouter } from "wouter";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/useTheme";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Features from "@/pages/features";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Refund from "@/pages/refund";
import Cookies from "@/pages/cookies";
import Solutions from "@/pages/solutions";
import Industries from "@/pages/industries";
import IndustryDetail from "@/pages/industry-detail";
import Integrations from "@/pages/integrations";
import Security from "@/pages/security";
import Faq from "@/pages/faq";
import Demo from "@/pages/demo";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import Compare from "@/pages/compare";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import StatusPage from "@/pages/status";
import Changelog from "@/pages/changelog";
import VsPage from "@/pages/vs";
import ApiDocs from "@/pages/api-docs";
import ResponseTimeCalculator from "@/pages/response-time-calculator";
import Glossary from "@/pages/glossary";
import GlossaryDetail from "@/pages/glossary-detail";
import DataRequest from "@/pages/data-request";

import { AuthProvider } from "@/admin/contexts/AuthContext";
import RequireAuth from "@/admin/components/RequireAuth";

// Admin routes are lazy-loaded so public visitors don't pay the bundle cost.
const AdminLogin = lazy(() => import("@/admin/pages/Login"));
const AdminChangePassword = lazy(() => import("@/admin/pages/ChangePassword"));
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AdminLeads = lazy(() => import("@/admin/pages/Leads"));
const AdminLeadDetail = lazy(() => import("@/admin/pages/LeadDetail"));
const AdminContent = lazy(() => import("@/admin/pages/Content"));
const AdminContentEdit = lazy(() => import("@/admin/pages/ContentEdit"));
const AdminContentHistory = lazy(() => import("@/admin/pages/ContentHistory"));
const AdminPosts = lazy(() => import("@/admin/pages/Posts"));
const AdminPostEdit = lazy(() => import("@/admin/pages/PostEdit"));
const AdminUsers = lazy(() => import("@/admin/pages/Users"));
const AdminAudit = lazy(() => import("@/admin/pages/Audit"));
const AdminSources = lazy(() => import("@/admin/pages/Sources"));
const AdminSecurity = lazy(() => import("@/admin/pages/Security"));

const queryClient = new QueryClient();

function AdminFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground" data-testid="admin-loading">
      Loading admin…
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin/login">
        <Suspense fallback={<AdminFallback />}>
          <AdminLogin />
        </Suspense>
      </Route>
      <Route path="/admin/change-password">
        <RequireAuth bare>
          <Suspense fallback={<AdminFallback />}>
            <AdminChangePassword />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminDashboard />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/dashboard">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminDashboard />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/analytics">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminDashboard />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/leads">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminLeads />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/leads/:id">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminLeadDetail />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/content">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminContent />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/content/:key/history">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminContentHistory />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/content/:key">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminContentEdit />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/posts">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminPosts />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/posts/:id">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminPostEdit />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/users">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminUsers />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/audit">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminAudit />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/sources">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminSources />
          </Suspense>
        </RequireAuth>
      </Route>
      <Route path="/admin/security">
        <RequireAuth>
          <Suspense fallback={<AdminFallback />}>
            <AdminSecurity />
          </Suspense>
        </RequireAuth>
      </Route>

      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/industries" component={Industries} />
      <Route path="/industries/:slug" component={IndustryDetail} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/security" component={Security} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/compare" component={Compare} />
      <Route path="/vs/:slug" component={VsPage} />
      <Route path="/docs/api" component={ApiDocs} />
      <Route path="/tools/response-time-calculator" component={ResponseTimeCalculator} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/:slug" component={CaseStudyDetail} />
      <Route path="/demo" component={Demo} />
      <Route path="/faq" component={Faq} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund" component={Refund} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/glossary" component={Glossary} />
      <Route path="/glossary/:slug" component={GlossaryDetail} />
      <Route path="/privacy/data-request" component={DataRequest} />
      <Route path="/status" component={StatusPage} />
      <Route path="/changelog" component={Changelog} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
