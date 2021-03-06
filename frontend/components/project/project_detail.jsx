import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Modal from 'react-modal';

import { Link } from 'react-router-dom';
import { render } from 'react-dom';

import LoadingIcon from '../util/loading_icon';
import CommentFormContainer from '../comment/comment_form_container';
import CommentShowContainer from '../comment/comment_show_container';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    this.props.fetchComments();
    this.props.fetchProject(this.props.match.params.projectId);
    window.scrollTo(0,0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchProject(nextProps.match.params.projectId);
    }
  }

  projectButton() {
    const currentUserId = this.props.currentUser.id;
    const creatorId = this.props.project.creator.id;
    const project = this.props.project;

    if ( currentUserId !== creatorId ) {
      return (
        <div></div>
      );
    }
    else {
      return (
        <div className='project-button'>
          <Link to={`/projects/${project.id}/edit`}>
            <button className="prj-btn">Edit Your Project</button>
          </Link>
          <button
            onClick={this.openModal}
            className="prj-btn">
              Delete Project
          </button>
        </div>
      );
    }
  }

  showComment() {
    return (
      <CommentShowContainer projectId={this.props.project.id} />
    );
  }

  scrollToTop() {
    window.scrollTo(0,0);
  }


  render() {
    const { project, loading } = this.props;

    if (!project) {
      return (
        <LoadingIcon loading={loading}/>
      );
    }
    else {
      return (
        <div className="project-detail">
          <img
            src={project.img_url}
            className="project-detail-img" />
          <h1>{project.title}</h1>
          <div className="detail-label"><u>Category:</u> {project.category}</div>
          <div className="detail-label"><u>Created by:</u> {project.creator.name}</div>

          <div className="project-description">
            {ReactHtmlParser(project.description)}
          </div>
          {this.projectButton()}

          <CommentFormContainer
            projectId={this.props.projectId}/>
          {this.showComment()}

          <div className='modal-deletion'>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <h2>Confirm Deletion?</h2>
              <div>
                <button
                  className='upload-btn'
                   onClick={() => this.props.deleteProject(project.id)
                  .then(() => this.props.history.push('/'))}>
                  Delete
                </button>
                <button
                  className='upload-btn' onClick={this.closeModal}>Cancel</button>
              </div>
            </Modal>
          </div>
          <i className="fa fa-arrow-circle-o-up fa-2x"
            onClick={this.scrollToTop}></i>
        </div>
      );
    }
  }
}

export default ProjectDetail;

// displayModal() {
//   var img = document.getElementsByTagName('img');
//   var modal = document.getElementsByClassName('modal');
//   var modalImg = document.getElementById('img01');
//   console.log(img);
//   console.log(modal);
//   console.log(modalImg);
//   img.onClick = () => {
//     modal.style.display = "block";
//     modalImg.src = this.src;
//   };
//
//   return (
//     <div id="myModal" className="modal">
//       <span className="close">×</span>
//       <img className="modal-content" id="img01"/>
//     </div>
//   );
// }

// <div dangerouslySetInnerHTML={{ __html: project.description }} />
