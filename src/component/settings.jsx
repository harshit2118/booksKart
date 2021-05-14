import React,{Component} from 'react';
class Settings extends Component{
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let options={...this.props.filterOptions};
        input.type==="checkbox"?
            options[input.name]=input.checked
        :options[input.name]=input.value;
        this.props.onOptionsChange(options);
    };
    getCheckBox=(name,value,label)=>{
        return <div className="form-group">
                <span className="m-2">
                    <input
                className="p-5"     id={name}
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={value}
                    onChange={this.handleChange}
                    />
                    <label className="ml-2" htmlFor={name}>{label}</label>
                </span>
            </div>
    }
    getText(name,value,label){
        return <div className="form-group">
            <label className="text-success" htmlFor={name}>{label}</label><br/>
            <input 
            type="text"
            value={value} 
            name={name}
            id={name} 
            onChange={this.handleChange}/>
        </div>
    }
    render(){
        console.log(this.props.filterOptions);
        let {langCheck,filterCheck,printCheck,orderCheck,mainResults}=this.props.filterOptions;
        return(
            <div className="p-5">
                <h5 className="text-danger">Select Options for Filtering on Left Page</h5>
                {
                    this.getCheckBox("printCheck",printCheck,"printType--(Restrict to books or magazines.)")
                }
                {
                    this.getCheckBox("langCheck",langCheck,"languages--(Restrict the volumes returned to those that are tagged with a specified language.)")
                }
                {
                    this.getCheckBox("filterCheck",filterCheck,"filter--(Filter search resultsby volume type and availability.)")
                }
                {
                    this.getCheckBox("orderCheck",orderCheck,"orderBy--(Order of the volume search results.)")
                }
                {
                    this.getText("mainResults",mainResults,"Number of entries on a page")
                }
            </div>
        )
    }
}
export default Settings;