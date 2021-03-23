import React, { useRef, useState } from "react";
import { ListGroup, Overlay } from "react-bootstrap";
import debounce from 'lodash.debounce';


function StockInput(props) {

  const [suggestions, setSuggestions] = useState([])
  const [show, setShow] = useState(false)
  const searchValue = useRef(null);

  const setSearchQuery = debounce(e => {
    if (e.target.value.length == 0) {
      setSuggestions([])
      return
    }
    if (e.target.value.length < 3) return;
    fetch(`https://stock-data-api.azurewebsites.net/papel/${e.target.value}`)
      .then(data => data.json())
      .then((d) => {
        //console.log(d)
        d.sort(function (a, b) {
          return a.shortname.localeCompare(b.shortname);
        });
        setShow(true)
        setSuggestions(d)
      })

  }, 200);

  const select = (v) => {
    props.onSelect(v)
    close()
  }

  const close = () => {
    setSuggestions([])
    searchValue.current.value = null
    setShow(false)
  }

  return (
    <div>
      <input type="text" onChange={setSearchQuery} on ref={searchValue} placeholder="Type to find more Stocks" className="form-control bg-light border-0 small" />
      <Overlay target={searchValue.current} show={show} placement="bottom-start" className="">
        <ListGroup>
          {
            suggestions.map((s) => (
              <ListGroup.Item key={s.symbol} onClick={() => select(s.symbol)}>
                {s.symbol + " - " + s.shortname}
              </ListGroup.Item>
            ))
          }
          <ListGroup.Item onClick={() => close()}><span>close</span></ListGroup.Item>

        </ListGroup>
      </Overlay>


    </div >
  )
}


export default StockInput;