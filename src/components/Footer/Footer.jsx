import footerStyles from "./footer.module.css";

export function Footer() {
  return (
    <footer>
      <ul className={footerStyles.list}>
        <li>Каталог</li>
        <li>Акции</li>
        <li>Новости</li>
        <li>Отзывы</li>
      </ul>
      <ul className={footerStyles.list}>
        <li>Оплата и доставка</li>
        <li>Часто спрашивают</li>
        <li>Обратная связь</li>
        <li>Контакты</li>
      </ul>
      <div className={footerStyles.contacts}>
        <h3>Мы на связи</h3>
        <p>8 (999) 00-00-00</p>
        <p>dogfood.ru@gmail.ru</p>
        <p className={footerStyles.messenger}>
          <i className="fa-brands fa-square-instagram" />
          <i className="fa-brands fa-vk" />
          <i className="fa-brands fa-square-whatsapp" />
        </p>
      </div>
    </footer>
  );
}
