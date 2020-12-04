import React from 'react'

//Set the global context of environment. If true, it's dev, if false it's production
const IsDevContext = React.createContext(true)

export const IsDevProvider = IsDevContext.Provider
export const IsDevConsumer = IsDevContext.Consumer

export default IsDevContext