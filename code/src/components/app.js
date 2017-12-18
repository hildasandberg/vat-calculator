import React from "react"
import { exVatToIncVat, incVatToExtVat, calculateVat } from "../calculations"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vatRate: 25,
      incVat: 0,
      exVat: 0,
      sumVat: 0
    }
  }

  setVat = (event) => {
    console.log("Byter moms", event.target.value)
    this.setState({
      vatRate: parseInt(event.target.value, 10),
      incVat: exVatToIncVat(event.target.value, parseInt(this.state.exVat, 10)),
      // sumVat: this.state.incVat - this.state.exVat
      // sumVat: calculateVat(parseInt(this.state.incVat, 10), parseInt(this.state.excVat, 10))
    })
  }

  handleChangeExVat = (event) => {
    this.setState({
      incVat: exVatToIncVat(this.state.vatRate, parseInt(event.target.value, 10)),
      exVat: parseInt(event.target.value, 10)
    })
  }

  handleChangeIncVat = (event) => {
    this.setState({
      exVat: incVatToExtVat(this.state.vatRate, parseInt(event.target.value, 10)),
      incVat: parseInt(event.target.value, 10)
    })
  }

  render() {
    return (
      <div className="App">
        <p>Example calculating ex vat for 1000kr inc vat @ 25%: {incVatToExtVat(25, 1000)}</p>
        <p>Example calculating inc vat for 600kr ex vat @ 6%: {exVatToIncVat(6, 600)}</p>
        <form>
          <label>
            <input type="radio" value="25" name="radioVat" onChange={this.setVat} />
            25%
          </label>
          <label>
            <input type="radio" value="12" name="radioVat" onChange={this.setVat} />
            12%
          </label>
          <label>
            <input type="radio" value="6" name="radioVat" onChange={this.setVat} />
            6%
          </label>

          <p>
            <label>
              Inklusive moms
              <input name="incVat" type="number" value={parseInt(this.state.incVat, 10)} onChange={this.handleChangeIncVat} />
            </label>
          </p>
          <p>
            <label>
              Exlusive moms
              <input name="exVat" type="number" value={parseInt(this.state.exVat, 10)} onChange={this.handleChangeExVat} />
            </label>
          </p>
          <p>
            <label>
              Momssumma
              <input name="sumVat" type="number" value={this.state.incVat - this.state.exVat} />
            </label>
          </p>
        </form>
      </div>
    )
  }

}

export default App
