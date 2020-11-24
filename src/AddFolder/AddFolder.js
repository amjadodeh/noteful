import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import config from '../config';
import './AddFolder.css';

class AddFolder extends React.Component {
  state = {
    folderName: {
      value: '',
      touched: false,
    },
  };

  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      name: this.state.folderName.value,
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  updateState = (name, val) => {
    this.setState({ [name]: { value: val, touched: true } });
  };

  validateState() {
    const name = this.state.folderName.value.trim();
    if (name.length === 0) {
      return 'Name must uh... exist!';
    }
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div
            className='field'
            onChange={(e) =>
              this.updateState(e.target.getAttribute('name'), e.target.value)
            }
          >
            <label htmlFor='name-input'>Name</label>
            <input type='text' id='name-input' name='folderName' required />
            {this.state.folderName.touched && (
              <ValidationError message={this.validateState()} />
            )}
          </div>
          <div className='buttons'>
            <button type='submit'>Post folder</button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

export default AddFolder;
