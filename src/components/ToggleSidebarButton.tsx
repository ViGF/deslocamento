import { Box, IconButton, Theme, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useSideBarContext } from "@/contexts/SidebarContext";

interface ToggleSidebarButton {
  theme: Theme
}

export function ToggleSidebarButton({ theme }: ToggleSidebarButton) {
  const { toggleSidebarOpen } = useSideBarContext()

  return (
    <Box display='flex' alignItems='center' flexDirection='row' gap='1px'>
      <IconButton onClick={() => toggleSidebarOpen()}>
        <MenuIcon
          fontSize="large"
          sx={{
            color: theme.palette.getContrastText(theme.palette.primary.main)
          }}
        />
      </IconButton>
      <Typography component='span' color='white'>Menu</Typography>
    </Box>
  )
}