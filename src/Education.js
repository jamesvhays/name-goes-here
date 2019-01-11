import React, {Component} from 'react';

class EducationCard extends Component {
    render() {
        return (
            <div className="card">
              <div className="card-content">
                <p className="title">
                  {this.props.degree}
                </p>
                <p className="subtitle">
                  {this.props.school}
                </p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  {this.props.graduated}
                </p>
                <p className="card-footer-item">
                  {this.props.location}
                </p>
              </footer>
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
