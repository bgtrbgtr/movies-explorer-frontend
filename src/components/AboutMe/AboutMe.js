import photoPath from "../../images/photo.jpeg";
import { Link } from "..";

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about__main-heading">Студент</h3>
      <div className="about-me__article-box">
        <article className="about-me__article">
          <h2 className="about-me__article-heading">Александр</h2>
          <p className="about-me__article-subheading">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about__article-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку (преимущественно -
            блэк метал), а ещё увлекаюсь бегом. Недавно начал кодить. С 2015
            года работал в компании «СКБ Контур». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <Link
            className="about-me__link-github"
            href="https://github.com/bgtrbgtr"
            linkText="Github"
          />
        </article>
        <img className="about-me__photo" alt="Фотография" src={photoPath} />
      </div>
    </section>
  );
}

export default AboutMe;
