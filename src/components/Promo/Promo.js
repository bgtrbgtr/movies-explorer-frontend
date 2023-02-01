import svgPath from "../../images/spiral.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="promo__image" alt="Spiral line ornament" src={svgPath} />
    </section>
  );
}

export default Promo;
