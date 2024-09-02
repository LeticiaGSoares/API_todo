const formatZodError = (error) => {
    const formatedError = {}

    error.errors.forEach(err => {
        const path = err.path[0]
        if(!erroFormatado[path]){
            erroFormatado[path] = []
        }

        formatedError[path].push(err.message)
    })

    return formatedError
}

export default formatZodError
