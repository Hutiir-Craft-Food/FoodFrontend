import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Tab, Nav, Row, Col } from 'react-bootstrap'
import styles from './ProductDescriptionTabs.module.scss'

export default function ProductDescriptionTabs({ product }) {
  const [tabs, setTabs] = useState({})
  const [activeKey, setActiveKey] = useState('description')

  useEffect(() => {
    if (product?.tabs) {
      setTabs(product.tabs)
    }
  }, [product])

  const { description, composition, allergens, energy, storage } = tabs

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

          <Col sm={9} className={styles.tabContainer}>
            <img src="/public/images/Logo.png" className={styles.logo} />
            <img
              src="/public/images/Logo_sign_green.png"
              className={styles.logoSecond}
            />
            <div className={styles.tabContent}>
              <Tab.Content>
                <Tab.Pane eventKey="description">
                  <p>{description} </p>
                </Tab.Pane>
                <Tab.Pane eventKey="composition">
                  <p>{composition}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="allergens">
                  <p>{allergens}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="energy">
                  <p>{energy}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="storage">
                  <p>{storage}</p>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
