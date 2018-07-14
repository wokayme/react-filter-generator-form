import React, { Component } from 'react';
import './FilterBuilder.css';

class FilterBuilderField extends Component {

    operationFor

    constructor(props){
        super();

        this.operationFor = props.operationFor

        //get information about field if exist in init json
        var defaultValueType = props.jsonLoad.type || ""
        var defaultName = props.jsonLoad.name || ""


        //fill empty fields
        var inputValues = {}
        this.getDefaultInputsByType(defaultValueType).map((item)=>{
            inputValues[item]=""
        })

        this.state = {
            organizationNumber: props.organizationNumber,
            type: defaultValueType,
            name: defaultName,
            operator: props.operator,
            inputs: this.getDefaultInputsByType(defaultValueType),
            typePossibilieties: this.operationFor[defaultValueType],
            inputValues
        }

        //Run if get json from parent (existing data)
        if(props.jsonLoad){
            //Rewrite all params from loaded json
            Object.keys(props.jsonLoad).map(index=>{
                //Doesn't rewrite organization number, organization number will be added once again when it will be load from sketch
                if(index=='organizationNumber')
                    return;
                this.state[index]=props.jsonLoad[index]
            })
            //What's fields exist for some operator
            this.state.inputs = this.getInputsByTypeMode(props.jsonLoad.type, props.jsonLoad.operator)

            //Load value of existing fields
            this.state.inputs.map((item)=>{
                this.state.inputValues[item] = props.jsonLoad[item] || ""
            })
        }
        //Generate json for parent
        this.returnJsonField(props)
    }

    //get default inputs for default type
    getDefaultInputsByType = (type)=>{
        return this.operationFor[type][this.getDefaultCondition(type)]['inputs']
    }
    //get possibilitiies field for this type and operator
    getInputsByTypeMode = (type, name)=>{
        return this.operationFor[type][name]['inputs']
    }

    //return default condition for this type of data
    getDefaultCondition = (type) => {
        var operator
        Object.keys(this.operationFor[type]).map((item)=>{
            if (operator == undefined)
                operator = item
        })
        return operator
    }

    //change type of field
    typeChanged = (e)=>{
        var type = "";

        var name;
        this.props.fields.map(item=>{
            if(item.name==e.target.value){
                type = item.type
                name = item.name
            }
        })


        var inputValues = {}

        this.setState({
            ...this.state,
            type,
            name,
            operator: this.getDefaultCondition(type),
            inputs: this.getDefaultInputsByType(type),
            typePossibilieties: this.operationFor[type],
            inputValues: {}
        },()=>{this.returnJsonField()})

    }


    //change operation for before put type of filed
    operatorChanged = (e)=>{
        var inputValues = {}
        this.operationFor[this.state.type][e.target.value]['inputs'].map((item)=>{
            inputValues[item]=""
        })

        this.setState({
            ...this.state,
            operator: e.target.value,
            inputs: this.operationFor[this.state.type][e.target.value]['inputs'],
            inputValues
        },()=>{this.returnJsonField()})
    }
    //return json information about this field
    returnJsonField = (props=this.props)=>{
        var json = {
            typeOfObject: 'field',
            operator: this.state.operator,
            type: this.state.type,
            name: this.state.name,
            organizationNumber: this.state.organizationNumber
        };
        Object.keys(this.state.inputValues).map((key)=>{
            json[key] = this.state.inputValues[key]
        });
        if(this.state.typePossibilieties.length==this.state.inputValues.length){
            props.jsonGenerate(json)
        }
    }

    render() {
        return (
            <div className="FilterBuilder_field">
                <div className="header_actions">
                    {/*render name on which you can build query*/}
                    <select onChange={(e)=>this.typeChanged(e)} defaultValue={this.state.name}>
                        {this.props.fields.map((item=>(
                                <option value={item.name} key={item.name}>{item.label}</option>
                        )))}
                    </select>
                    {/*render types of data*/}
                    {(this.state.typePossibilieties)?(
                        <select onChange={(e)=>this.operatorChanged(e)} defaultValue={this.state.operator}>
                            {Object.keys(this.state.typePossibilieties).map(item=>(
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>

                    ):("")}
                    {/*render needed fields for type of data*/}
                    {(this.state.inputs.map((item)=>(
                        <input type="text" onChange={(e)=>{
                            this.setState({
                                ...this.state,
                                inputValues: {
                                    ...this.state.inputValues,
                                    [item]: e.target.value
                                }
                            }, ()=>{this.returnJsonField()})
                        }} value={this.state.inputValues[item] || ""} name={item} key={item} placeholder={item}/>
                    )))}
                    {/*delete*/}
                    <button onClick={()=>{this.props.deleteField(this.props.organizationNumber)}}>Delete field</button>
                </div>

            </div>
    );
    }
}

export default FilterBuilderField;