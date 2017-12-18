import React from "react"
import { exVatToIncVat, incVatToExtVat } from "../calculations"

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
      vatRate: parseInt(event.target.value),
      incVat: exVatToIncVat(event.target.value, parseInt(this.state.exVat)),
    })
  }

  handleChangeExVat = (event) => {
    this.setState({
      incVat: exVatToIncVat(this.state.vatRate, parseInt(event.target.value)),
      exVat: parseInt(event.target.value)
    })
  }

  handleChangeIncVat = (event) => {
    this.setState({
      exVat: incVatToExtVat(this.state.vatRate, parseInt(event.target.value)),
      incVat: parseInt(event.target.value)
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

          <label>
            Exlusive moms
            <input name="exVat" type="number" value={parseInt(this.state.exVat)} onChange={this.handleChangeExVat} />
          </label>
          <label>
            Inklusive moms
            <input name="incVat" type="number" value={parseInt(this.state.incVat)} onChange={this.handleChangeIncVat} />
          </label>
          {/* <input name="sumVat" type="number" value={this.state.sumVat} onChange={this.calculateVat} /> */}

        </form>
      </div>
    )
  }

}

export default App
