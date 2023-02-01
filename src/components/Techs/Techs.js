function Techs() {
  return (
    <section className="techs">
      <h3 className="about__main-heading">Технологии</h3>
      <h2 className="techs__main-heading">7 технологий</h2>
      <p className="techs__brief">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <table className="techs__table">
        <tbody>
          <tr className="techs__table-row">
            <td className="techs__table-data">HTML</td>
            <td className="techs__table-data">CSS</td>
            <td className="techs__table-data">JS</td>
            <td className="techs__table-data">React</td>
            <td className="techs__table-data">Git</td>
            <td className="techs__table-data">Express.js</td>
            <td className="techs__table-data">mongoDB</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Techs;
