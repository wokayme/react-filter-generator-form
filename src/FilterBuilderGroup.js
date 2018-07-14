import React, { Component } from 'react';
import './FilterBuilder.css';
import FilterBuilderField from './FilterBuilderField.js'

class FilterBuilderGroup extends Component {

    constructor(props){
        super();
        //set default information about group
        this.state = {
            organizationNumber: props.organizationNumber,
            operator: "AND",
            fields: []
        }
        //is previous exist form to recreate
        if(props.jsonLoad){
            //load from exist data
            if(props.jsonLoad.rules)
                this.state.fields=props.jsonLoad.rules.map((item)=>{
                    item['organizationNumber'] = props.getOrganizationNumber()
                    return item
                }) || []
            this.state.operator=props.jsonLoad.condition
        }

    }

    //change group condition ("or" or "and")
    changeGroupOperator(operator){
        this.setState({
            ...this.state,
            operator
        },()=>{this.jsonGenerate()})
    }
    //add field to actuall level
    addField(organizationNumber){
        console.log(this.getFirstName())
        this.setState({
            ...this.state,
            fields: [
                ...this.state.fields,
                {
                    type: this.getFirstOperation(),
                    name: this.getFirstName(),
                    operator: this.getFirstOperationOperator(),
                    organizationNumber
                }
            ]
        })
    }
    //add group to actuall level
    addGroup(organizationNumber){
        this.setState({
            ...this.state,
            fields: [
                ...this.state.fields,
                {
                    type: "group",
                    condition: "AND",
                    organizationNumber
                }
            ]
        })
    }
    //Remove Field or Group from actuall level
    deleteField= (organizationNumber)=>{
        this.setState({
            ...this.state,
            fields: this.state.fields.filter((item)=>{
                if(item.organizationNumber==organizationNumber)
                    return false
                return true
            })
        //    Reload json
        },()=>{this.jsonGenerate()})

    }

    //get first field name
    //(field name is name of avaiable option on which you can add condition)
    getFirstName = ()=>{
        var nameInput = ""
        this.props.fields.map((item)=>{
            if(nameInput=="")
                nameInput = item.name
        })
        return nameInput
    }

    //get first possiblity type of field. For example "text" or "number"
    getFirstOperation = ()=>{
        var nameType = ""
        this.props.fields.map((item)=>{
            if(nameType=="")
                nameType = item.type
        })
        return nameType
    }

    //Get first possibilite operation to first type of field for example get "equal" of "text" type
    getFirstOperationOperator = ()=>{
        var nameOfOperation = ""
        Object.keys(this.props.operationFor[this.getFirstOperation()]).map((item)=>{
            if(nameOfOperation=="")
                nameOfOperation = item
        })
        return nameOfOperation
    }


    //generate json information about level to return result of filter
    jsonGenerate = (rules)=>{

        var updateRule = false

        //program is looking for existing fields. If find it it will be updated
        if(this.state.fields)
            var newFields = this.state.fields.map((item)=>{
                if(rules&&rules.organizationNumber == item.organizationNumber){
                    item=rules
                    updateRule = true
                }
                return item
            })

        // There wasn't field which you search and new field or group need to be added
        if(!updateRule && rules){
            newFields.push(rules)
        }

        this.setState({
            ...this.state,
            fields: newFields
        })

            //return group with all fields or group on this level
            var json = {
                typeOfObject: "group",
                condition: this.state.operator,
                organizationNumber: this.state.organizationNumber,
                rules : newFields
            }
        // Check is it last position if yes return json to FilterBuiler in other case return json to parent group
        if(typeof this.props.getFieldJson=="function")
            return this.props.getFieldJson(json)
        else
            return this.props.jsonGenerate(json)
    }

    render(){
        return (
            <div className="FilterBuilder_group">
                <div className="header_actions">
                    <div className="btnOperator">
                        {/* Add Condition */}
                        <button onClick={()=>this.changeGroupOperator("AND")} className={(this.state.operator=="AND")? "btn_and active":"btn_and"}>AND</button>
                        <button onClick={()=>this.changeGroupOperator("OR")} className={(this.state.operator=="OR")? "btn_or active":"btn_or"}>OR</button>
                    </div>
                    {/* Actions buttons */}
                    <button onClick={()=>this.addField(this.props.getOrganizationNumber())}>
                        Add Field
                    </button>
                    <button onClick={()=>this.addGroup(this.props.getOrganizationNumber())}>
                        Add Group
                    </button>
                    {(this.props.firstGroup)?(""):(
                        <button onClick={()=>{this.props.deleteField(this.props.organizationNumber)}}>Delete Group</button>
                    )}
                </div>
                {/*Render groups and fields on one level*/}
                {(this.state.fields)?(
                    <div>
                        {this.state.fields.map((elem)=>{
                            if(elem.type == "group" || elem.typeOfObject == "group")
                                return <FilterBuilderGroup deleteField={this.deleteField}
                                        operationFor={this.props.operationFor}
                                        jsonGenerate={this.jsonGenerate}
                                        getOrganizationNumber={this.props.getOrganizationNumber}
                                        organizationNumber={elem.organizationNumber}
                                        key={elem.organizationNumber}
                                        fields={this.props.fields}
                                        fieldsToFilter={this.props.fieldsToFilter}
                                        jsonLoad={elem}/>
                            else
                                return <FilterBuilderField jsonGenerate={this.jsonGenerate}
                                        operationFor={this.props.operationFor}
                                        deleteField={this.deleteField}
                                        getOrganizationNumber={this.props.getOrganizationNumber}
                                        organizationNumber={elem.organizationNumber}
                                        key={elem.organizationNumber}
                                        fields={this.props.fields}
                                        jsonLoad={elem}  />
                        })}
                    </div>
                ):("")}
            </div>
    );
    }
}

export default FilterBuilderGroup;