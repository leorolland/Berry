import React from 'react'

export const NavigationContext = React.createContext({
    currentPage: "explore", // "explore" | "threads" | "profile"
    changeCurrentPage: () => { },
    scrolls: {
        explore: 0,
        messages: 0,
        profile: 0
    },
})
