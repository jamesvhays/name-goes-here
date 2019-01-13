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

class EducationField extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.onChange({key: this.props.name, value: event.target.value});
    }
    render() {
        return (
            <div className="field">
              <label className="label">{this.props.label}</label>
              <div className="control">
                <input className="input"
                       type="text"
                       value={this.props.value}
                       onChange={this.handleChange}/>
              </div>
            </div>
        );
    }
}

class EducationForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.canSubmit = false;
        this.fields = [
            { name: 'degree', label: 'Degree' },
            { name: 'school', label: 'School' },
            { name: 'graduated', label: 'Year Graduated' },
            { name: 'location', label: 'Location' },
        ];
        this.state = this.defaultState();
    }
    defaultState() {
        return this.fields.reduce((agg, {name}) => ({
            ...agg,
            [name]: '',
        }), {});
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
    updateField({ key, value }) {
        this.setState({[key]: value});
    }
    educationField(field) {
        return (
            <EducationField
              key={field.name}
              value={this.state[field.name]}
              onChange={this.updateField}
              {...field} />
        )
    }

    render() {
        return (
            <div className="card">
              <div className="card-content">
                {this.fields.map(this.educationField)}
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
            educationRenderer: EducationCard,
            education: [],
        };
        this.addEducation = this.addEducation.bind(this);
    }

    addEducation(education) {
        const joined = this.state.education.concat(education);
        this.setState({education: joined});
    }

    setEducationRenderer(renderer) {
        this.setState({educationRenderer: renderer});
    }

    rendererButtonClasses(renderer) {
        return this.state.educationRenderer === renderer ? 'is-active' : '';
    }

    render() {
        const EducationRenderer = this.state.educationRenderer;
        return (
            <div className="panel">
              <p className="panel-heading">
                Education
              </p>
              <div className="tabs is-centered">
                <ul>
                  <li className={this.rendererButtonClasses(EducationCard)}>
                    <a onClick={() => this.setEducationRenderer(EducationCard)}>Card</a>
                  </li>
                  <li className={this.rendererButtonClasses(EducationRow)}>
                    <a onClick={() => {this.setEducationRenderer(EducationRow)}}>Row</a>
                  </li>
                </ul>
              </div>
            <EducationForm submissionHandler={this.addEducation}/>
              <div className="card-content">
                {this.state.education.map((x, index) => <EducationRenderer key={index} {...x}/>)}
              </div>
            </div>
        );
    }
}

export default Education;
