import { Link, useLocation } from "react-router-dom";

function NotFound({ routes }) {
  let location = useLocation().pathname;
  location = location.slice(0, location.lastIndexOf("/"));

  return (
    <div className="not-found">
      <h2 className="not-found__heading">404</h2>
      <p className="not-found__caption">Страница не найдена</p>
      <Link to={location} className="not-found__link">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
