const moment = require("moment")
const Handlebars = require("handlebars")

const selectOption = (category,option) => {
    // if(category===option.category){
    //     return <option value="{{option.id}}">{{option.category}}</option>
    // }else{
    //     return <option value="{{option.id}}" selected="selected">{{option.category}}</option>
    // }
    const selectedProperty = category == option.category ? 'selected="selected"' : '';
    return new Handlebars.SafeString('<option value="' + option.id + '"' +  selectedProperty + '>' + option.category + "</option>");
}

const formatDate = (date, format) => {
    return moment(date).format(format);
}


module.exports = { selectOption, formatDate }