import React from 'react';
import '../../App.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
import ReactHtmlParser from 'react-html-parser'; 

class ReturnNote extends React.Component {
    // need to get the deltaObj from the database
    deltaOps = [
        { insert: 'Hello ' },
        { insert: 'World!!!', attributes: { bold: true } },
        { insert: '\n' },
        { insert: 'The Two Towers' },
        { insert: '\n', attributes: { header: 1 } },
        { insert: 'Aragorn sped on up the hill.\n', attributes: { color: 'blue' }}
    ];
    /*
    deltaOps =  [
        { insert: 'Gandalf', attributes: { bold: true } },
        { insert: ' the ' },
        { insert: 'Grey', attributes: { color: '#cccccc' } }
    ];
    */

    // convert delta to html
    converter = new QuillDeltaToHtmlConverter(this.deltaOps);
    html = this.converter.convert(); 

    render() {
        return (<div> { ReactHtmlParser (this.html) } </div>);
    }
}
export default ReturnNote;