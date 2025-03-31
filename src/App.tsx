import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./themes/default"

function App() {
 

  return (
    <ThemeProvider theme={defaultTheme}>
     <button>Cicar </button>
    </ThemeProvider>
  )
}

export default App