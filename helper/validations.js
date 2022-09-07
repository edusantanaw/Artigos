const existsOrError = (value, msg) => {
    if (!value) throw msg
    if (Array.isArray(value) && value.length === 0) throw msg
    if (typeof value === 'string' && !value.trim()) throw msg
}

const equalsOrError = (valueA, valueB, msg) => {
    if (valueA != valueB) throw msg
}

const validEmail = (email, msg) => {
    var re = /\S+@\S+\.\S+/;
    if (!(re.test(email))) throw msg
}

module.exports = { existsOrError, equalsOrError, validEmail }