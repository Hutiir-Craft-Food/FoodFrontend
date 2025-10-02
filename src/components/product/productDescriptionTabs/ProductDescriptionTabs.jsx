import { Tab, Nav, Row, Col } from 'react-bootstrap'
import styles from './ProductDescriptionTabs.module.scss'

export default function ProductDescriptionTabs({ product }) {
  return (
    <div className={styles.productDescriptionTabs}>
      <Tab.Container
        defaultActiveKey="description"
        className={styles.tabContainer}
      >
        <Row>
          <Col sm={3} className="rounded-start">
            <Nav variant="tabs" className={`${styles.nav} flex-column`}>
              <Nav.Item className="text-black">
                <Nav.Link eventKey="description" className={styles.navLinka}>
                  Опис
                </Nav.Link>
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

          {product && (
            <Col sm={9} className={styles.tabContainer}>
              <img src="/public/images/Logo.png" className={styles.logo} />
              <img
                src="/public/images/Logo_sign_green.png"
                className={styles.logoSecond}
              />
              <div className={styles.tabContent}>
                <Tab.Content>
                  <Tab.Pane eventKey="description">
                    <p>{product.description} </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="composition">
                    <p>{product.composition}</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="allergens">
                    <p>{product.allergens}</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="energy">
                    <p>{product.energy}</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="storage">
                    <p>{product.storage}</p>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Col>
          )}
        </Row>
      </Tab.Container>
    </div>
  )
}
