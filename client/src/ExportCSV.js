import React, { Component } from 'react';
import { CSVLink } from "react-csv";

const headers = [
    { label: "Date", key: "date" },
    { label: "Sleep", key: "sleep" },
    { label: "Money", key: "money" },
    { label: "PC", key: "pc" },
    { label: "Mobile", key: "mobile" },
    { label: "Food", key: "food" },
    { label: "Read", key: "read" },
    { label: "Movie", key: "movie" },
    { label: "Walk", key: "walk" },
];

class ExportCSV extends Component {
    constructor(props) {
        super(props);
        const today = new Date().toISOString().slice(0, 10);
        this.state = {
            csvReport: {
                data: [],
                headers: [],
                filename: 'daily_tracking.csv'
            },
            data: [],
            inputs: [
                {name: "date", value:today},
                {name: "sleep", value: "9"},
                {name: "money", value: ""},
                {name: "pc", value: ""},
                {name: "mobile", value: ""},
                {name: "food", value: ""},
                {name: "read", value: ""},
                {name: "movie", value: ""},
                {name: "walk", value: ""},
            ]
        }
    }

    renderInput = (input, i) => {
        return (
            <div>
            <label>
                {input.name}
              <input
                type="text"
                name={input.name}
                value={input.value}
                onChange={this.handleChange.bind(this, i)}
                autoComplete="off"
              />
            </label>
            </div>
        )
    }

    downloadReport = (event, done) => {
      const objectReport = {
          filename: 'daily_tracking.csv',
          headers: headers,
          data: this.state.data
      }
      this.setState({ csvReport: objectReport }, () => {
          done();
      });
    }

    handleChange = (i, event) => {
        const value = event.target.value;
        let inputs = this.state.inputs.slice();
        inputs.map((item, i) => {
            if (item.name === event.target.name) {
                item.value = value
                return this.setState({inputs});
            }
            return item
        })
    }

    handleRemove = (i) => {
        this.setState((state) => {
            const data = state.data.filter((item, j) => j !== i);
            return { data, };
        })
    }

    handleSubmit = (event) => {
        const newData = {}
        this.state.inputs.map((input) => {
            return newData[input.name] = input.value
        })

        this.setState((prevState) => {
            return {
                data: prevState.data.concat(newData)
            };
        })

        event.preventDefault()
    }

    render() {
        return(
            <div>
              <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map((item, i) => this.renderInput(item, i))}
                <br/>
                <button>submit</button>
              </form>
                  <CSVLink {...this.state.csvReport}
                            asyncOnClick={true}
                            onClick={this.downloadReport}
                  >
                    Export to CSV
                  </CSVLink>
                {this.state.data.map((item, i) => (
                    <li key={i}>
                        {item.date}
                        {item.sleep ? "🛌" + item.sleep : ''}
                        {item.money ? "💵" + item.money : ''}
                        {item.food ? "💵" + item.food : ''}
                        {item.walk ? "💵" + item.walk : ''}
                        {item.pc ? "💵" + item.pc : ''}
                        {item.mobile ? "💵" + item.mobile : ''}
                        {item.food ? "💵" + item.food : ''}
                        {item.read ? "💵" + item.read : ''}
                        {item.movie ? "💵" + item.movie : ''}
                        <button type="button" onClick={() => this.handleRemove(i)}>x</button>
                    </li>
                ))}
            </div>
        );
    }
}
export default ExportCSV;
