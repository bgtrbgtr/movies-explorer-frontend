import { AboutProject, Promo, Techs, AboutMe, Portfolio } from "..";

function Main() {
  return (
    <main className="page__main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
