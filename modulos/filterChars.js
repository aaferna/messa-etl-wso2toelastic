exports.filterChars = (data) => {
    prereturn = data.replace("\t", "")
    prereturn = prereturn.replace("\r", "")
    return prereturn.trim()
}

