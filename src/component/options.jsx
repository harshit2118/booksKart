import React,{Component} from 'react';
class Options extends Component{
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        console.log(input.name+":"+input.value);
        let options={...this.props.options};
        options[input.name]=input.value;
        this.props.onOptionsChange(options);
    };
    createDrpDwn=(arr,name,value,disabledText)=>{
        return <ul class="list-group">
                <li class="list-group-item"><b>Order</b></li>
                <li class="list-group-item">
                <select className="form-control" name={name} value={value} onChange={this.handleChange}>
                    <option selected value="">{disabledText}</option>
                    {
                        arr.map((x)=><option>{x}</option>)
                     }
                </select>
                </li>
            </ul> 
    }
    createRadios=(arr,values,name,label)=>{
        return <ul class="list-group">
                    <li class="list-group-item"><b>{label}</b></li>
                    {
                       arr.map((x)=>(
                            <li className="list-group-item form-check pl-5">
                                <input
                                className="form-check-input"
                                value={x.value}
                                id={x.value}
                                type="radio"
                                name={name}
                                checked={values==x.value}
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label" htmlFor={x.value}>{x.text}</label>
                            </li>
                ))
            }
            </ul>
    }
    render(){
        let {filter="",langRestrict="",printType="",orderBy=""}=this.props.options;
        let {languageArr,filterArr,printTypesArr,orderArr,filterOptions={}}=this.props;
        let {langCheck,filterCheck,printCheck,orderCheck}=filterOptions;
        return(
            <div className="container">
                <div className="row">
                    {langCheck?<div className="col-12">
                        {this.createRadios(languageArr,langRestrict,"langRestrict","Language")}
                    </div>:""}
                    <hr/>
                    {filterCheck?<div className="col-12">
                        {this.createRadios(filterArr,filter,"filter","Filter")}
                    </div>:""}
                    <hr/>
                    {printCheck?<div className="col-12">
                        {this.createRadios(printTypesArr,printType,"printType","Print Type")}
                    </div>:""}
                    <hr/>
                    {
                        orderCheck?<div className="col-12">
                        {this.createDrpDwn(orderArr,"orderBy",orderBy,"Order By")}
                    </div>:""}
                    <hr/>
                </div>
            </div>
        )
    }
}
export default Options;