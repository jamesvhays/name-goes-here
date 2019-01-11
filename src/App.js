import React, {Component} from 'react';
import 'bulma';
import Education from "./Education";
import Experience from './Experience';

class App extends Component {
    render() {
        return (
            <div className="App container">
                <Education/>
                <Experience/>
            </div>
        );
    }
}

export default App;
