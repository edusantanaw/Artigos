const checkExists = (value, msg)=>{
    if(value.length === 0) throw msg
}

module.exports = checkExists