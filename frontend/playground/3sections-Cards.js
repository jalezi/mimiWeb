const contact = {
  title: 'KONTAKT',
  textTitle: 'Plesni center Mimi',
  text: 'e-mail',
};

const title = 'Title';
const date = new Date().toLocaleDateString();
const textTitle = 'Text Title';
const text = `Velit duis deserunt incididunt eu magna velit sit ad commodo ex anim. Esse esse exercitation tempor nulla anim non irure minim tempor aliqua occaecat. Incididunt et amet sunt nulla magna ea excepteur eu deserunt tempor aute nostrud.`;

const threeSections = (
  <>
    <section id="home-news">
      <Card title={title} date={date} textTitle={textTitle} text={text} />
    </section>
    <section id="home-classes">
      <div>home Classes</div>
    </section>
    <section id="home-contact">
      <Card
        title={contact.title}
        textTitle={contact.textTitle}
        text={contact.text}>
        <a
          link="https://www.instagram.com/mimiplesnicenter/"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a
          link="https://www.facebook.com/mimiplesnicenter/"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fab fa-facebook-square"></i>
        </a>
        <a
          link="https://goo.gl/maps/gkyokTmnZ9d1sEQx8"
          target="_blank"
          rel="noopener noreferrer">
          <i className="fas fa-map-marker-alt"></i>
        </a>
      </Card>
    </section>
  </>
);
