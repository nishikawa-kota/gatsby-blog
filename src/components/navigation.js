import React from "react"
import {Link} from "gatsby"
import ThemeChanger from "../components/themeChanger"

export default (props) => (
  <nav className="navigation"> 
    <Link to="/contact">お問い合わせ</Link>
    <ThemeChanger/>
  </nav>
  
)