import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Chat from "./pages/Chat";
  import ProtectedRoute from "./components/ProtectedRoute";
  
  export default function App() {
    const token = localStorage.getItem("token");
  
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/chat" replace /> : <Login />
            }
          />
  
          <Route
            path="/register"
            element={<Register />}
          />
  
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }