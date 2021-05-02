import React from 'react'

export const NavigationContext = React.createContext({
    currentPage: "explore", // "explore" | "threads" | "profile"
    changeCurrentPage: () => { },
})
