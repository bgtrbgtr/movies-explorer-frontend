import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    return navigate(-1);
  };

  return (
    <div className="not-found">
      <h2 className="not-found__heading">404</h2>
      <p className="not-found__caption">Страница не найдена</p>
      <Link onClick={goBack} className="not-found__link">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
