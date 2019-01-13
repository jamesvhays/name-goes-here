import React, {Component} from 'react';

class EducationCard extends Component {
    render() {
        return (
            <div className="card">
              <div className="card-content">
                <p className="title"> {this.props.degree} </p>
                <p className="subtitle"> {this.props.school} </p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item"> {this.props.graduated} </p>
                <p className="card-footer-item"> {this.props.location} </p>
              </footer>
            </div>
        );
    }
}

class EducationRow extends Component {
    render() {
        return (
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div className="content">
                    <p className="title is-3"> {this.props.degree} </p>
                    <p className="subtitle is-5"> {this.props.school} </p>
                  </div>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div className="content has-text-right">
                    <p className="title"> {this.props.graduated} </p>
                    <p className="subtitle"> {this.props.location} </p>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

class EducationForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.canSubmit = false;
    }
    defaultState() {
        return {
            degree: '',
            school: '',
            graduated: '',
            location: ''
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.canSubmit = this.isValidForm();
    }
    handleSubmit() {
        this.props.submissionHandler(this.state);
        this.setState(this.defaultState());
    }
    isValidForm() {
        return Object.values(this.state).every(x => x.length > 1);
    }
    render() {
        return (
            <div className="card">
              <div className="card-content">
                <div className="field">
                  <label className="label">Degree</label>
                  <div className="control">
                    <input className="input"
                           type="text"
                           name="degree"
                           value={this.state.degree}
                           onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">School</label>
                  <div className="control">
                    <input className="input"
                           type="text"
                           name="school"
                           value={this.state.school}
                           onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Year Graduated</label>
                  <div className="control">
                    <input className="input"
                           type="text"
                           name="graduated"
                           value={this.state.graduated}
                           onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Location</label>
                  <div className="control">
                    <input className="input"
                           type="text"
                           name="location"
                           value={this.state.location}
                           onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <EducationCard {...this.state}/>
              <button className="button is-primary is-large"
                      disabled={!this.canSubmit}
                      onClick={this.handleSubmit}>
                Add Education
              </button>
            </div>
        );
    }
}

class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            education: [],
        };
        this.addEducation = this.addEducation.bind(this);
    }

    addEducation(education) {
        const joined = this.state.education.concat(education);
        this.setState({education: joined});
    }

    render() {
        return (
            <div className="panel">
              <p className="panel-heading">
                Education
              </p>
              <div className="panel-block">
                {this.state.education.map((x, index) => <EducationCard key={index} {...x}/>)}
              </div>
            <EducationForm submissionHandler={this.addEducation}/>
            </div>
        );
    }
}

export default Education;
