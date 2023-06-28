import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[900]
    },
    action: {
      selectedOpacity: 0.5,
      hover: blue[800]
    }
  },
  typography: {
    fontFamily: plusJakartaSans.style.fontFamily,
  }
})