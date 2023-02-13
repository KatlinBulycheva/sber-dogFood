import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import footerStyles from "./Footer.module.css";

export function Footer() {
  return (
    <footer>
      <Logo />
      <ul className={footerStyles.list}>
        <Link to="/"><li>Каталог</li></Link>
        <Link to="/"><li>Акции</li></Link>
        <Link to="/"><li>Новости</li></Link>
        <Link to="/"><li>Отзывы</li></Link>
      </ul>
      <ul className={footerStyles.list}>
        <Link to="/"><li>Оплата и доставка</li></Link>
        <Link to="/"><li>Часто спрашивают</li></Link>
        <Link to="/"><li>Обратная связь</li></Link>
        <Link to="/"><li>Контакты</li></Link>
      </ul>
      <div className={footerStyles.contacts}>
        <h3>Мы на связи</h3>
        <p>8 (999) 00-00-00</p>
        <p>dogfood.ru@gmail.ru</p>
        <p className={footerStyles.messenger}>
          <Link to="/"><i className="fa-brands fa-square-instagram" /></Link>
          <Link to="/"><i className="fa-brands fa-vk" /></Link>
          <Link to="/"><i className="fa-brands fa-square-whatsapp" /></Link>
        </p>
      </div>
    </footer>
  );
}
