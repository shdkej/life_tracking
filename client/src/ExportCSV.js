import React, { Component } from 'react';
import { CSVLink } from "react-csv";

const headers = [
    { label: "Date", key: "date" },
    { label: "Sleep", key: "sleep" },
    { label: "Money", key: "money" },
];

class ExportCSV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvReport: {
                data: [],
                headers: [],
                filename: 'daily_tracking.csv'
            },
            sleep: '',
            money: '',
            data: [],
        }
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

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
            }, () => {
        });
    }

    handleSubmit = (event) => {
        const newData = {
            date: Date.now(),
            sleep: this.state.sleep,
            money: this.state.money,
        }

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
                <label>
                  Sleep
                  <input
                    type="text"
                    name="sleep"
                    value={this.state.sleep}
                    onChange={this.handleChange}
                  />
                </label>
                <br/>
                <label>
                  Money
                  <input
                    type="text"
                    name="money"
                    value={this.state.money}
                    onChange={this.handleChange}
                  />
                </label>
                <button>submit</button>
              </form>
                  <CSVLink {...this.state.csvReport}
                            asyncOnClick={true}
                            onClick={this.downloadReport}
                  >
                    Export to CSV
                  </CSVLink>
                {this.state.data.map((item, i) => (
                    <li key={i}>{item.sleep}, {item.money}</li>
                ))}
            </div>
        );
    }
}
export default ExportCSV;
