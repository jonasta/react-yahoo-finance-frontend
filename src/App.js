import './App.css';
import AppCard from './AppCard';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useState } from 'react';
import { tagsDataService } from './DataService'
import { useCookies } from 'react-cookie';
import StockInput from './StockInput';


function Header() {
  const addStock = (p) => {
    tagsDataService.setData(p)
  }
  return (
    <header>
      <Navbar className="shadow">
        <h6 className="mr-auto">Stock history data</h6>
        <StockInput onSelect={addStock} className="mr-sm-2" />

      </Navbar>
    </header>
  )
}


function Body() {
  const [cookies, setCookie] = useCookies(['papeis']);
  let p = cookies.papeis || ['PETR4.SA', 'VALE3.SA']
  const [papeis, setPapeis] = useState(p);

  tagsDataService.getData().subscribe(newPapel => {
    //console.log(newPapel);
    if (!papeis.find(p => p.toLowerCase() === newPapel.toLowerCase())) {
      const lst = [...papeis, newPapel]
      setPapeis(lst)
      setCookie('papeis', lst)
    }
  });



  const removeStock = (p) => {
    //console.log(p);
    const lst = [...papeis].filter((papel) => papel !== p);
    setPapeis(lst)
    setCookie('papeis', lst)
  }


  return (
    <section className="cardsList">
      <Container fluid>
        <Row >
          {
            papeis.map((e) => (
              <Col className="cadsList-col" key={e} sm={12} md={6} lg={4}>
                <AppCard data={e} onRemove={() => removeStock(e)} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  )
}



function Footer() {
  return (
    <footer>
      <div className="fixed-bottom">
        <Navbar className="shadow">
          <span>made by @j0nasta</span>
        </Navbar>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="App" id="content-wrapper">
      <Header />
      <Body />
      <Footer />
    </div>

  );
}

export default App;
