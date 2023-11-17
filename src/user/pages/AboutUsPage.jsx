import { chef } from '../assets';
import style from './AboutusPage.module.css';
import { location, call } from '../assets';
import GetMap from './MAP';

export const AboutUsPage = () => {
  return (
    <>
      <div className={style.about}>
        <img
          src={chef}
          alt=""
        />
        <h2>Our chef</h2>
        <h2>Jane Cooper</h2>
        <p>
          One notable example of a chef whose work history is impressive is John
          Anderson. John began his culinary career at a young age, when his
          passion for food and experimenting with flavors was just starting to
          take shape.Even during his school years, John showed an interest in
          gastronomy, spending a lot of time in the kitchen with his mother and
          grandmother, who passed on their love for the culinary arts. His
          talent was quickly noticed, and he was accepted as an intern at a
          prestigious restaurant in town.During his internship, John proved
          himself to be an energetic and creative chef. He absorbed knowledge,
          worked on perfecting his skills, and always sought new gastronomic
          heights. His passion for cooking and diligence in his work helped him
          advance quickly, eventually landing him the position of sous
          chef.Gradually.
        </p>
      </div>
      <div className={style.contact}>
        <h2>Байланыс</h2>
        <div className={style.icons_lya}>
          <div>
            <img
              src={location}
              alt=""
            />
            <p>Nukus</p>
          </div>
          <div>
            <img
              src={call}
              alt=""
            />
            <p>+99890 123 45 67</p>
          </div>
        </div>
        <h2>Локациямыз</h2>
        <GetMap />
      </div>
    </>
  );
};
