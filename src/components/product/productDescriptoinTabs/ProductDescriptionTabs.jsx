import { Tab, Nav, Row, Col } from 'react-bootstrap'
import styles from './ProductDescriptionTabs.module.scss'

export default function ProductDescriptionTabs(product) {
  console.log(product)
  return (
    <div className={styles.productDescriptionTabs}>
      <Tab.Container
        defaultActiveKey="description"
        className={styles.tabContainer}
      >
        <Row>
          {/* Ліва колонка з меню */}
          <Col sm={3} className="rounded-start">
            <Nav variant="tabs" className={`${styles.nav} flex-column`}>
              <Nav.Item className="text-black">
                <Nav.Link eventKey="description">Опис</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="composition">Склад</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="allergens">Алергени</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="energy">Енергетична цінність</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="storage">
                  Термін та умови зберігання
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* Права колонка з контентом */}
          <Col sm={9} className="bg-white p-4 rounded">
            <Tab.Content>
              <Tab.Pane eventKey="description">
                <p>
                  Сир Брi — один з найдавніших французьких сирів. Сир покритий
                  цвіллю, що нагадує за кольором білий оксамит, під яким
                  знаходиться ніжна текуча маса вершкового кольору, має
                  виражений солодко-солоний вершковий смак і гіркуватий присмак.
                  Виймати сир з холодильника краще заздалегідь, оскільки
                  справжній смак десертного сиру розкривається при кімнатній
                  температурі.
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="composition">
                <p>Склад: молоко, закваска, сіль, ферменти.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="allergens">
                <p>Алергени: молочні продукти.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="energy">
                <p>Енергетична цінність: 334 ккал / 100 г.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="storage">
                <p>Зберігати при температурі від +2°C до +6°C.</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
