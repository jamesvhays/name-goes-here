import React, {Component} from 'react';

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
