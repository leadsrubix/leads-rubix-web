import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import Compare from "@/pages/compare";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

import { AuthProvider } from "@/admin/contexts/AuthContext";
import RequireAuth from "@/admin/components/RequireAuth";
import AdminLogin from "@/admin/pages/Login";
import AdminChangePassword from "@/admin/pages/ChangePassword";
import AdminDashboard from "@/admin/pages/Dashboard";
import AdminLeads from "@/admin/pages/Leads";
import AdminLeadDetail from "@/admin/pages/LeadDetail";
import AdminContent from "@/admin/pages/Content";
import AdminContentEdit from "@/admin/pages/ContentEdit";
import AdminContentHistory from "@/admin/pages/ContentHistory";
import AdminPosts from "@/admin/pages/Posts";
import AdminPostEdit from "@/admin/pages/PostEdit";
import AdminUsers from "@/admin/pages/Users";
import AdminAudit from "@/admin/pages/Audit";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/change-password">
        <RequireAuth bare>
          <AdminChangePassword />
        </RequireAuth>
      </Route>
      <Route path="/admin">
        <RequireAuth>
          <AdminDashboard />
        </RequireAuth>
      </Route>
      <Route path="/admin/dashboard">
        <RequireAuth>
          <AdminDashboard />
        </RequireAuth>
      </Route>
      <Route path="/admin/analytics">
        <RequireAuth>
          <AdminDashboard />
        </RequireAuth>
      </Route>
      <Route path="/admin/leads">
        <RequireAuth>
          <AdminLeads />
        </RequireAuth>
      </Route>
      <Route path="/admin/leads/:id">
        <RequireAuth>
          <AdminLeadDetail />
        </RequireAuth>
      </Route>
      <Route path="/admin/content">
        <RequireAuth>
          <AdminContent />
        </RequireAuth>
      </Route>
      <Route path="/admin/content/:key/history">
        <RequireAuth>
          <AdminContentHistory />
        </RequireAuth>
      </Route>
      <Route path="/admin/content/:key">
        <RequireAuth>
          <AdminContentEdit />
        </RequireAuth>
      </Route>
      <Route path="/admin/posts">
        <RequireAuth>
          <AdminPosts />
        </RequireAuth>
      </Route>
      <Route path="/admin/posts/:id">
        <RequireAuth>
          <AdminPostEdit />
        </RequireAuth>
      </Route>
      <Route path="/admin/users">
        <RequireAuth>
          <AdminUsers />
        </RequireAuth>
      </Route>
      <Route path="/admin/audit">
        <RequireAuth>
          <AdminAudit />
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
      <Route path="/case-studies" component={CaseStudies} />
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
