function AboutProject() {
  return (
    <section className="about">
      <h3 className="about__main-heading">О проекте</h3>
      <div className="about__article-columns">
        <article className="about__article">
          <h4 className="about__article-heading">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about__article-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className="about__article">
          <h4 className="about__article-heading">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="about__article-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="about__chart">
        <p className="about__chart-section">1 неделя</p>
        <p className="about__chart-section">4 недели</p>
        <p className="about__chart-caption">Back-end</p>
        <p className="about__chart-caption">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
