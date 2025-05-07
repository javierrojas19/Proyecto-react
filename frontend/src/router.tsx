import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginViews from "./views/LoginViews";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/app.Layout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginViews />}></Route>
          <Route path="/auth/register" element={<RegisterView />}></Route>
        </Route>

        <Route path='/admin' element={<AppLayout/>}>
            <Route index={true} element={<LinkTreeView/>}/>
            <Route path='profile' element= {<ProfileView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
