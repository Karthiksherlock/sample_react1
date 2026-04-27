import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from "./components/userForm";
import LanguagePage from "./pages/LanguagePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/language" element={<LanguagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;