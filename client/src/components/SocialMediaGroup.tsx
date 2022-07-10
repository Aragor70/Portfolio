

const SocialMediaGroup = () => {

    return (
        <ul className="pop-up" style={{ opacity: '1' }}>
            <li>
                <div className="icon-box" onClick={() => window.open("https://www.linkedin.com/in/mikolaj-prus", "_blank")}><i className="fab fa-linkedin fa-2x"></i></div>
            </li>
            <li>
                <div className="icon-box" onClick={() => window.open("https://github.com/Aragor70", "_blank")}><i className="fab fa-github-square fa-2x"></i></div>
            </li>
        </ul>
    );
}
export default SocialMediaGroup;