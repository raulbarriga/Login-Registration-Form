// react-router v6 recreating of deprecated withRouter hook: https://reactrouter.com/docs/en/v6/getting-started/faq
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component router={{ location, navigate, params }} {...props} />;
  };

  return Wrapper;
};
