import { Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import History from "..//history";
import LoginPage from "../pages/LoginPage";
import { selectorUserInfo } from "./GlobalState";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ProtectedRoute = (props) => {
  const [userrole, setUserRole] = useRecoilState(selectorUserInfo("userrole"));

  const isAuthenticated = () => {
    if (!userrole) {
      History.push("");
      return <LoginPage />;
    } else {
      return <Route exact path={props.path} component={props.component} />;
    }
  };
  return <div>{isAuthenticated()}</div>;
};

export default ProtectedRoute;
