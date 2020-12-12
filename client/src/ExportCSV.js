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
    { label: "Code", key: "code" },
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
                {name: "date", value: today, symbol: "🛌"},
                {name: "sleep", value: "9", symbol: "🛌"},
                {name: "money", value: "", symbol: "💵"},
                {name: "pc", value: "", symbol: "💻"},
                {name: "mobile", value: "", symbol: "📱"},
                {name: "food", value: "", symbol: "🥢"},
                {name: "read", value: "", symbol: "📚"},
                {name: "movie", value: "", symbol: "🎞️"},
                {name: "walk", value: "", symbol: "🦶"},
                {name: "code", value: "", symbol: "🚀"},
            ]
        }
    }

    renderInput = (input, i) => {
        return (
            <label key={i}>
                {input.name}
              <input
                type="text"
                name={input.name}
                value={input.value}
                onChange={this.handleChange.bind(this, i)}
                autoComplete="off"
              />
            </label>
        )
    }

    renderOutput = (item, i) => {
        return (
            <li key={i}>
                {item.date}
                {item.sleep ? "🛌" + item.sleep : ''}
                {item.money ? "💵" + item.money : ''}
                {item.walk ? "🦶" + item.walk : ''}
                {item.pc ? "💻" + item.pc : ''}
                {item.mobile ? "📱" + item.mobile : ''}
                {item.food ? "🥢" + item.food : ''}
                {item.read ? "📚" + item.read : ''}
                {item.movie ? "🎞️ " + item.movie : ''}
                {item.code ? "🚀 " + item.code : ''}
                <button type="button" onClick={() => this.handleRemove(i)}>x</button>
            </li>
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
            this.props.parentCallback(data);
            return { data, };
        })
    }

    handleSubmit = (event) => {
        const newData = {}
        this.state.inputs.map((input) => {
            return newData[input.name] = input.value
        })

        this.setState((prevState) => {
            const updatedData = prevState.data.concat(newData);
            this.props.parentCallback(updatedData)
            return {
                data: updatedData
            };
        })

        event.preventDefault()
    }

    render() {
        return(
            <div>
              <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map((item, i) => this.renderInput(item, i))}
                <button>save</button>
              </form>
              <CSVLink {...this.state.csvReport}
                asyncOnClick={true}
                onClick={this.downloadReport}
              >
                Export to CSV
              </CSVLink>
              {this.state.data.map((item, i) => (
                    <div key={i}>
                        {this.renderOutput(item, i)}
                    </div>
              ))}
            </div>
        );
    }
}
export default ExportCSV;
