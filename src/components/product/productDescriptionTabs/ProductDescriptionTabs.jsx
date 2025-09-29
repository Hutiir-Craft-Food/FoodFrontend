import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import styles from './ProductDescriptionTabs.module.scss'

export default function ProductDescriptionTabs({ product }) {
  const [activeKey, setActiveKey] = useState('description')

  return (
    <div className={styles.productDescriptionTabs}>
      <Tab.Container
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
        className={styles.tabContainer}
      >
        <Row>
          <Col sm={3} className="rounded-start">
            <Nav variant="tabs" className={`${styles.nav} flex-column`}>
              <Nav.Item className="text-black">
                <Nav.Link
                  eventKey="description"
                  className={clsx({
                    [styles.activeLink]: activeKey === 'description',
                  })}
                >
                  Опис
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="composition"
                  className={clsx({
                    [styles.activeLink]: activeKey === 'composition',
                  })}
                >
                  Склад
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="allergens"
                  className={clsx({
                    [styles.activeLink]: activeKey === 'allergens',
                  })}
                >
                  Алергени
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="energy"
                  className={clsx({
                    [styles.activeLink]: activeKey === 'energy',
                  })}
                >
                  Енергетична цінність
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="storage"
                  className={clsx({
                    [styles.activeLink]: activeKey === 'storage',
                  })}
                >
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
