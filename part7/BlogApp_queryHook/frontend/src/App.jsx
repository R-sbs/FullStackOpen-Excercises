import "./App.css";
import { useUser } from "./hooks/useUser";
import Authpage from "./pages/authpage";
import HomePage from "./pages/homePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import SingleUserPage from "./pages/singleUserPage";
import SingleBlogPage from "./pages/SingleBlogPage";

function App() {
  const { user } = useUser();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav className="flex gap-4  mb-6">
          <Header />
        </nav>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate replace to="/auth" />}
          />
          <Route path="/auth" element={<Authpage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<SingleUserPage />} />
          <Route path="/blogs" element={<UsersPage />} />
          <Route path="/blogs/:id" element={<SingleBlogPage />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
