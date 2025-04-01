import { Scroll, Sun, Timer } from "@phosphor-icons/react";
import { HeaderContainer } from "./style";
import { NavLink } from "react-router-dom";


export function Header() {
  return (
    <HeaderContainer>
      <Sun size={24}/>
      <nav>
        <NavLink to="/"><Timer size={24}/></NavLink>
        <NavLink to="/history"><Scroll size={24}/></NavLink>
      </nav>
    </HeaderContainer>
  )
}
