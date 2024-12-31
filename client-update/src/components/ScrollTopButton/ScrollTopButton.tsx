import React, { useContext, useEffect, useRef } from "react";
import { ScrollContext } from "../../context/ScrollContext";
import { handleScrollToTop } from '../../utils/autoHandlers';


const ScrollTopButton = () => {

    const scrollButton = useRef<any>(null)

    const { scrollPosition } = useContext<any>(ScrollContext)
    
    useEffect(() => {
        
        (() => {
            const position = window.pageYOffset;
      
            if (position > 150 && scrollButton.current) {
              scrollButton.current.style.opacity = '1';
            } else if (position <= 150 && scrollButton.current) {
              scrollButton.current.style.opacity = '0';
            }
        })()
  
    }, [scrollPosition, scrollButton]);

    return (
        <ul className="scroll-up" ref={scrollButton}>
            <li>
                <div className="icon-box" onClick={() => handleScrollToTop(window)}><i className="fas fa-angle-double-up fa-3x"></i></div>
            </li>
        </ul>
    );
}
export default ScrollTopButton;