import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AddBook from "./pages/AddBook";
import SearchBooks from "./pages/SearchBooks";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import FinePay from "./pages/FinePay";
import UserManagement from "./pages/UserManagement";
import AddMembership from "./pages/AddMembership";
import UpdateMembership from "./pages/UpdateMembership";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute role="admin">
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute role="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-membership"
          element={
            <ProtectedRoute role="admin">
              <AddMembership />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-membership"
          element={
            <ProtectedRoute role="admin">
              <UpdateMembership />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-books"
          element={
            <ProtectedRoute role="user">
              <SearchBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issue-book"
          element={
            <ProtectedRoute role="user">
              <IssueBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/return-book"
          element={
            <ProtectedRoute role="user">
              <ReturnBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fine-pay"
          element={
            <ProtectedRoute role="user">
              <FinePay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
