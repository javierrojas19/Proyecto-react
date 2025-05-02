import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginViews from "./views/LoginViews";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/auth/login" element={<LoginViews />}></Route>
          <Route path="/auth/register" element={<RegisterView/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
