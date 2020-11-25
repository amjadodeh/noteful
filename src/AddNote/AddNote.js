import React from 'react';
import PropTypes from 'prop-types';

import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import config from '../config';
import './AddNote.css';

class AddNote extends React.Component {
  state = {
    name: {
      value: '',
      touched: false,
    },
    content: {
      value: '',
      touched: false,
    },
    folderId: {
      value: null,
      touched: false,
    },
  };

  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.folderId.value !== null &&
      this.state.folderId.value !== '...'
    ) {
      const newNote = {
        name: this.state.name.value,
        content: this.state.content.value,
        folderId: this.state.folderId.value,
        modified: new Date(),
      };
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res.json();
        })
        .then((note) => {
          this.context.addNote(note);
          this.props.history.push(`/`);
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  updateState = (name, val) => {
    this.setState({ [name]: { value: val, touched: true } });
  };

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name must uh... exist!';
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return 'Please type your note content';
    }
  }

  validateFolderId() {
    const folderId = this.state.folderId.value.trim();
    if (folderId === null || folderId === '...') {
      return 'Please select a folder';
    }
  }

  render() {
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div
            className='field'
            onChange={(e) =>
              this.updateState(e.target.getAttribute('name'), e.target.value)
            }
          >
            <label htmlFor='name-input'>Name</label>
            <input type='text' id='name-input' name='name' required />
            {this.state.name.touched && (
              <ValidationError message={this.validateName()} />
            )}
          </div>
          <div
            className='field'
            onChange={(e) =>
              this.updateState(e.target.getAttribute('name'), e.target.value)
            }
          >
            <label htmlFor='content-input'>Content</label>
            <textarea id='content-input' name='content' required />
            {this.state.content.touched && (
              <ValidationError message={this.validateContent()} />
            )}
          </div>
          <div
            className='field'
            onChange={(e) =>
              this.updateState(e.target.getAttribute('name'), e.target.value)
            }
          >
            <label htmlFor='folder-select'>Folder</label>
            <select id='folder-select' name='folderId' required>
              <option value={null}>...</option>
              {this.context.folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            {this.state.folderId.touched && (
              <ValidationError message={this.validateFolderId()} />
            )}
          </div>
          <div className='buttons'>
            <button type='submit'>Post note</button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddNote;
