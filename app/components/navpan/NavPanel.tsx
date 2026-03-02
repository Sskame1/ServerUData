import "./NavPanel.css"

export function NavPanel () {
    return (
        <div className="container_NP">
            <div className="title_selected" style={{ color: 'red' }}>Test_Rias</div>
            <div className="navPan">
                <li className="itemPanel"><a href="/">Gallery</a></li>
                <li className="itemPanel"><a href="/">Gallery</a></li>
                <li className="itemPanel"><a href="/">Gallery</a></li>
            </div>
        </div>
    )
}