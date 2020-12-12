import React, { Component } from 'react';
import { GoogleSpreadsheet } from "google-spreadsheet";

class GS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {name: "spreadsheet_id", value: ''},
                {name: "sheet_id", value: ''},
                {name: "client_email", value: ''},
                {name: "private_key", value: ''},
            ],
            authData: [],
            spreadsheet_id: localStorage.getItem("spreadsheet_id") || '',
            sheet_id: localStorage.getItem("sheet_id") || '',
            client_email: localStorage.getItem("client_email") || '',
            private_key: localStorage.getItem("private_key") || '',
        }
    }

    appendSpreadsheet = async (row) => {
      const doc = new GoogleSpreadsheet(this.state.spreadsheet_id);
      try {
        await doc.useServiceAccountAuth({
          client_email: this.state.client_email,
          private_key: this.state.private_key,
        });
        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsById[this.state.sheet_id];

        const result = await sheet.addRows(row);
        console.log(result);
      } catch (e) {
        console.error('Error: ', e);
      }
    };

    writeToSheet = () => {
        const newRow = this.props.parentToChild;
        this.appendSpreadsheet(newRow);
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
                autoComplete="on"
              />
            </label>
        )
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

    handleInitialAuthData = () => {
        this.setState({spreadsheet_id: ''})
        localStorage.setItem('spreadsheet_id', '');
        localStorage.setItem('sheet_id', '');
        localStorage.setItem('client_email', '');
        localStorage.setItem('private_key', '');
    }

    handleSubmit = (event) => {
        console.log(this.props.parentToChild);
        const newData = {}
        this.state.inputs.map((input) => {
            return newData[input.name] = input.value
        })

        this.setState((prevState) => {
            return {
                authData: newData,
                spreadsheet_id: newData.spreadsheet_id,
                sheet_id: newData.sheet_id,
                client_email: newData.client_email,
                private_key: newData.private_key,
            };
        })
        localStorage.setItem('spreadsheet_id', newData.spreadsheet_id);
        localStorage.setItem('sheet_id', newData.sheet_id);
        localStorage.setItem('client_email', newData.client_email);
        localStorage.setItem('private_key', newData.private_key);

        event.preventDefault()
    }

    render() {
        let form;
        const isLoggedIn = this.state.spreadsheet_id;
        if (isLoggedIn) {
          form = <button onClick={this.handleInitialAuthData}>
                  Google Info Initial
                </button>
        } else {
          form = <form onSubmit={this.handleSubmit}>
                  {this.state.inputs.map((item, i) => this.renderInput(item, i))}
                  <button>save</button>
                 </form>
        }
        return(
            <div>
              { form }
              <button onClick={this.writeToSheet}>
                Export to google sheet
              </button>
              <p>{this.state.spreadsheet_id}</p>
            </div>
        );
    }
}
export default GS;
