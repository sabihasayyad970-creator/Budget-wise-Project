import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Dashboard from "./page/Dashboard";
import Profile from "./page/Profile";
import AddExpense from "./page/AddExpense";
import AddIncome from "./page/AddIncome";

import Budget from "./page/Budget";
import SavingsGoal from "./page/SavingsGoal";
import Reports from "./page/Reports";
import AIAdvisor from "./page/AIAdvisor";


function App() {

  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/expense" element={<AddExpense />} />

        <Route path="/income" element={<AddIncome />} />

        {/* NEW ROUTES */}

        <Route path="/budget" element={<Budget />} />

        <Route path="/savings" element={<SavingsGoal />} />
         
         <Route path="/reports" element={<Reports />} />
         
         <Route path="/advisor" element={<AIAdvisor />} />

      </Routes>

    </Router>
  );

}

export default App;