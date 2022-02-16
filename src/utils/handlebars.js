const moment = require("moment")

const selectOption = (selected, options) => {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
}

const formatDate = (date, format) => {
    console.log(date)
    console.log(format)
    return moment(date).format(format);
}


module.exports = { selectOption, formatDate }