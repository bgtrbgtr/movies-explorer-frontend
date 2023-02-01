import { Link } from "..";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <nav>
        <ul className="portfolio__links">
          <li className="portfolio__link-box">
            <Link
              className="portfolio__link"
              href="https://bgtrbgtr.github.io/how-to-learn/"
              linkText="Статичный сайт"
            />
            <Link
              className="portfolio__arrow"
              href="https://bgtrbgtr.github.io/how-to-learn/"
              linkText="↗"
            />
          </li>
          <li className="portfolio__link-box">
            <Link
              className="portfolio__link"
              href="https://bgtrbgtr.github.io/russian-travel/"
              linkText="Адаптивный сайт"
            />
            <Link
              className="portfolio__arrow"
              href="https://bgtrbgtr.github.io/russian-travel/"
              linkText="↗"
            />
          </li>
          <li className="portfolio__link-box">
            <Link
              className="portfolio__link"
              href="https://lackluster-party.students.nomoredomains.club/"
              linkText="Одностраничное приложение"
            />
            <Link
              className="portfolio__arrow"
              href="https://lackluster-party.students.nomoredomains.club/"
              linkText="↗"
            />
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
