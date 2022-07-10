export const handleScrollToTop = (scrollTo: any) => {
    
    if(scrollTo.current) {
        scrollTo.current.scrollIntoView({ behavior:'smooth', block:'start', inline:'nearest'})
    } else if (scrollTo) {
        scrollTo.scrollTo(0, 0)
    } else {
        console.log('Error: Not able to scroll.')
    }
    
}