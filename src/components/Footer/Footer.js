import { Link } from "..";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__links">
        <p className="footer__year">© 2022</p>
        <Link
          className="footer__link"
          linkText="Яндекс.Практикум"
          href="https://practicum.yandex.ru/"
        />
        <Link
          className="footer__link"
          linkText="Github"
          href="https://github.com/bgtrbgtr"
        />
      </div>
    </footer>
  );
}

export default Footer;
