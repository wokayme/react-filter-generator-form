import React, { Component } from 'react';
import './FilterBuilder.css';
import FilterBuilderGroup from './FilterBuilderGroup.js'

class FilterBuilder extends Component {


    constructor(props) {
        super()
        this.state = {
            jsonStory: {},
            jsonRendered: ""
        }
        this.jsontolocad = props.json_load || {}
        this.fieldsToFilter = props.fieldsToFilter || []
        if(props.extraFields)
            this.operationFor = Object.assign( props.extraFields, this.operationForDefault)
        else
            this.operationFor = this.operationForDefault
    }



    organizationNumber = 1
    getOrganizationNumber= () =>{
        this.organizationNumber += 1
        return this.organizationNumber
    }



    operationForDefault = {
        "text": {
            "equal" : {
                "inputs": [
                    'value'
                ]
            },
            "not equal" : {
                "inputs": [
                    'value'
                ]
            },
            "in" : {
                "inputs": [
                    'value'
                ]
            },
            "not in" : {
                "inputs": [
                    'value'
                ]
            },
            "begins with" : {
                "inputs": [
                    'value'
                ]
            },
            "not begins with" : {
                "inputs": [
                    'value'
                ]
            },
            "not contains" : {
                "inputs": [
                    'value'
                ]
            },
            "ends with" : {
                "inputs": [
                    'value'
                ]
            },
            "not ends with" : {
                "inputs": [
                    'value'
                ]
            },
            "is empty" : {
                "inputs": [
                ]
            },
            "is not empty" : {
                "inputs": [
                ]
            },
            "is null" : {
                "inputs": [
                ]
            },
            "is not null" : {
                "inputs": [
                ]
            },
        },
        "date": {
            "before": {
                "inputs": [
                    'date'
                ]
            },
            "after": {
                "inputs": [
                    'date'
                ]
            },
            "between": {
                "inputs": [
                    'from date',
                    'to date'
                ]
            }
        },
        "number": {
            "less": {
                "inputs": [
                    'number'
                ]
            },
            "less or equalr": {
                "inputs": [
                    'number'
                ]
            },
            "more": {
                "inputs": [
                    'number'
                ]
            },
            "more or equalr": {
                "inputs": [
                    'number'
                ]
            },
            "between": {
                "inputs": [
                    'min number',
                    'max number'
                ]
            },
            "equal": {
                "inputs": [
                    'number'
                ]
            },
            "not equal": {
                "inputs": [
                    'number'
                ]
            },
        }
    }

    getFieldJson = (jsonValue) => {
        if(jsonValue){
            this.setState({
                ...this.state,
                jsonStory: jsonValue
            },()=>{
                if(this.props.makeActionWhenJsonChange)
                    this.props.makeActionWhenJsonChange(jsonValue)
            })
        }else{
            this.renderSavedJson()
            if(this.props.makeActionWhenJsonChange)
                this.props.makeActionWhenJsonChange(jsonValue)
        }
    }

    getJson = ()=>{
        return this.state.jsonStory;
    }


    render() {
        return (
            <div className="FilterBuilder">
                <FilterBuilderGroup jsonLoad={this.jsontolocad} operationFor={this.operationFor} organizationNumber={1} getOrganizationNumber={this.getOrganizationNumber} getFieldJson={this.getFieldJson} firstGroup={true} fields={this.fieldsToFilter} />
            </div>
    );
    }
}

export default FilterBuilder;
