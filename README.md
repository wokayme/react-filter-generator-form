# React filter generator
This plugin is filter generator. You can create own fields and build logic by graphic creator.
Live Preview: http://filtergenerator.wokay.me/

![alt text](https://api.wokay.me/uploads/1531606708.gif)


# Quick start
##### 1. Install Plugin
`npm install react-filter-generator-form`
##### 2. Import component to script
`import FilterBuilder from 'react-filter-generator-form'`
##### 3. Define fields to filter builder
```
 fieldsToFilter = [
     {
         label: "Name",
         name: "name",
         type: 'text'
     },
     {
         label: "Surname",
         name: "surname",
         type: 'text'
     },
     {
         label: "Id number",
         name: "id_number",
         type: 'number'
     }
 ]
```
##### 4. Display/render component(filter generator) with added fields
```
          <FilterBuilder 
            fieldsToFilter={this.fieldsToFilter} />
```

# Component 'FilterBuilder options'
`fieldsToFilter` - Here you can pass all fields and their types for generator. Example of use upper.

`jsonLoad` - You can pass previous generated json to recreate filter in creator

`extraFields` - Here you can define your own type of filter field or add operator for existing field. Example of value this option:
```
 extraFields = {
 //update existing type of field:
     "text": {
                "new operator" : {
                     "inputs": [
                         'value of new operator'
                     ]
                 },
             },
 //define new type of field
     someNewType:{
         "operator 1" : {
             "inputs": [
                 'subfield'
             ]
         },
         "operator 2" : {
             "inputs": [
                 'another sub field'
             ]
         },
     },
 }
```
# Methods
**Get Json Callback**
`jsonCallback` - Function which get data from existing form generator filter as argument. _IMPORTANT YOU NEED TO USE REFS TO CONNECT TO FORM, EXAMPLE OF USE UNDER_
`makeActionWhenJsonChange` - Function which is autorun where you add/edit or delete sth in generator, function get in argument actuall json form

# Examples
### Example of use methods
```

 getJsonCallback(json){
        console.log("get actuall filter")
        console.log(this.refs.queryBuilder.getJson());
 }
 makeActionWhenJsonChange = (json) => {
        console.log("get changed filter")
 }
 
            <FilterBuilder
                ref="queryBuilder"
                makeActionWhenJsonChange={this.makeActionWhenJsonChange}
                jsonCallback={this.getJsonCallback}
                fieldsToFilter={this.fieldsToFilter} />
            <button onClick={()=>console.log(this.getJsonCallback())}>Show fields in console</button>

```
### Example of use existing filter to recreate
```

```
### Example of use custom fields
```
jsonToLoad = {
     "typeOfObject": "group",
     "condition": "AND",
     "organizationNumber": 1,
     "rules": [
         {
             "typeOfObject": "field",
             "operator": "between",
             "type": "date",
             "name": "birth_date",
             "organizationNumber": 2,
             "date": "",
             "from date": "12.09.2017",
             "to date": "11.09.2017"
         },
         {
             "typeOfObject": "group",
             "condition": "AND",
             "organizationNumber": 3,
             "rules": [
                 {
                     "typeOfObject": "field",
                     "operator": "equal",
                     "type": "text",
                     "name": "surname",
                     "organizationNumber": 4,
                     "value": "some surname"
                 },
                 {
                     "typeOfObject": "group",
                     "condition": "OR",
                     "organizationNumber": 15,
                     "rules": [
                         {
                             "typeOfObject": "field",
                             "operator": "less",
                             "type": "number",
                             "name": "id_number",
                             "organizationNumber": 16,
                             "number": "1"
                         },
                         {
                             "typeOfObject": "field",
                             "operator": "less",
                             "type": "number",
                             "name": "id_number",
                             "organizationNumber": 17,
                             "number": "2"
                         }
                     ]
                 }
             ]
         }
     ]
 }
    // jsonToLoad = {}
 fieldsToFilter = [
     {
         label: "Name",
         name: "name",
         type: 'text'
     },
     {
         label: "Another",
         name: "another",
         type: 'someNewType'
     },
 ]

 extraFields = {
     someNewType:{
         "another" : {
             "inputs": [
                 'value'
             ]
         },
         "some" : {
             "inputs": [
                 'value'
             ]
         },
     }
 }
 
 <FilterBuilder 
      json_load={this.jsonToLoad}
      extraFields={this.extraFields}
      fieldsToFilter={this.fieldsToFilter} />
             
```


# License
GNU 3.0

# Author

### Krzysztof Łokaj "Wokay"
- Blog https://wokay.me/
- Twitter https://twitter.com/_Wokay
- Linkedin https://www.linkedin.com/in/wokay/

### Inspired by
jQuery-QueryBuilder - https://github.com/mistic100/jQuery-QueryBuilder

P.S. I found to late(after i finish write whole code) because there wasn't any connection on main website.
User pavanpodila did it before me: https://www.npmjs.com/package/react-querybuilder using that jquery plugin. Check out his solution. Good job mate!