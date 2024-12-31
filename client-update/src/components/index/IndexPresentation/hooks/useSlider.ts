import { useEffect, useState } from "react"

const useSlider = (arryLength: number) => {
    
    const [currentIndex, setCurrentIndex] = useState<number>(Math.floor(Math.random() * (arryLength || 5)))
    
    useEffect(() => {

        const timer = setInterval(() => {

            if (currentIndex >= arryLength - 1) {
                setCurrentIndex(0)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
        }, 3500)

        return () => {
            clearInterval(timer)
        }
    }, [currentIndex, arryLength])

    return { currentIndex}
}
export default useSlider;