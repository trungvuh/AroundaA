import React from 'react';
import ReactQuill from 'react-quill';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class ProjectCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      img_url: "",
      creator_id: this.props.currentUser.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
    this.handleQuillInput = this.handleQuillInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillUnmount() {
    this.props.receiveProjectErrors([]);
  }

  handleQuillInput(value) {
    this.setState({ description: value });
  }

  handleInput(type) {
    return (event) => {
      this.setState({ [type]: event.target.value });
    };
  }

  navigateHome() {
    this.props.history.push(`/`);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProject(this.state)
      .then((project) => this.props.history.push(`/projects/${project.id}`));
  }

  handleUpload(event) {
    event.preventDefault();
    cloudinary.openUploadWidget(window.cloudinary_options, function(error, results){
     if(!error){
       this.setState({
         img_url: results[0].url
       });
     }
   }.bind(this));
  }

  renderErrors() {
    return (
      <ul>
        {
          this.props.errors.map((error) => (
            <li key={error}>{error}</li>))
        }
      </ul>
    );
  }


  render () {
    // console.log(this.props.currentUser);
    return (
      <div>
        <h1>Create a New Project</h1>
          {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>

          <label>Title:
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleInput('title')}
              />
          </label>

          <label>Category:
            <input
              type="text"
              value={this.state.category}
              onChange={this.handleInput('category')}
              />
          </label>

          <button onClick={this.handleUpload}>Upload Project Picture
          </button>
          <br/>

          <label>Description
            <ReactQuill
              onChange={this.handleQuillInput}
              value={this.state.description}
              className='quill'/>
          </label>

          <input type="submit" value="Create Project" />
          <button onClick={this.navigateHome}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default ProjectCreate;
