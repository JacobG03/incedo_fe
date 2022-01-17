import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./App/Home/index";
import Login from "./App/Login/index";
import Register from "./App/Register/index";
import Verify from "./App/Verify/index";
import GlobalStyle from './theme/globalStyle';
import { getTheme } from "./redux/calls/theme_calls";
import { getMe } from "./redux/calls/me_calls";
import { IState, IMe, ITheme } from "./types";
import ResetPass from "./App/ResetPass";


function App() {
  const dispatch = useDispatch()
  const me = useSelector<IState, IMe>(state => state.me)
  const theme = useSelector<IState, ITheme>(state => state.theme)

  useEffect(() => {
    getMe(dispatch)
    getTheme(dispatch)
  }, [dispatch])

  if (me.finished === false || !theme.theme) {
    return null
  }

  return (
    <ThemeProvider theme={theme.theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<RequireVerified><Home /></RequireVerified>}>
          <Route path="notes" element={<h1>Notes</h1>} />
          <Route path="days" element={<h1>Days</h1>} />
        </Route>
        <Route path="login" element={<ExcludeAuth><Login /></ExcludeAuth>} />
        <Route path="register" element={<ExcludeAuth><Register /></ExcludeAuth>} />
        <Route path="verify" element={<RequireAuth><Verify /></RequireAuth>} />
        <Route path='reset_password/:uri' element={<ExcludeAuth><ResetPass /></ExcludeAuth>} />
      </Routes>
    </ThemeProvider>
  );
}


const RequireAuth = ({ children }: { children: any }) => {
  const me = useSelector<IState, IMe>(state => state.me)
  let location = useLocation();

  if (!me?.meInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  else if (me.meInfo?.is_verified) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}


const RequireVerified = ({ children }: { children: any }) => {
  const me = useSelector<IState, IMe>(state => state.me)
  let location = useLocation();

  if (!me.meInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  else if (!me.meInfo.is_verified) {
    return <Navigate to="/verify" state={{ from: location }} replace />;
  }

  return children;
}


function ExcludeAuth({ children }: { children: any }) {
  const me = useSelector<IState, IMe>(state => state.me)
  if (me?.meInfo) {
    if (!me.meInfo.is_verified) {
      return <Navigate to='/verify' replace />
    }
    return <Navigate to='/' />
  }

  return children
}

export default App;