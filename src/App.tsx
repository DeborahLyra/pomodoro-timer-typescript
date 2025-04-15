import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Router } from "./Router"
import { CyclesContexProvider } from "./context/CyclesContext"

function App() {


  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContexProvider >
        <Router />
      </CyclesContexProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App