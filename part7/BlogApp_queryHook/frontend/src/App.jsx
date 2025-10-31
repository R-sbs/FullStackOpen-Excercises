import "./App.css";
import { useUser } from "./hooks/useUser";
import Authpage from "./pages/authpage";
import HomePage from "./pages/homePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { user } = useUser();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate replace to="/auth" />}
          />
          <Route path="/auth" element={<Authpage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
