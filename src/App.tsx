import UserForm from "./components/UserForm";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import LanguagePage from "./pages/LanguagePage";
import ExpenseTracker from "./pages/ExpenseTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/expense_tracker" element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;