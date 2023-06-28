'use client'

import {
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Drawer,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToggleSidebarButton } from "./ToggleSidebarButton";
import { useSideBarContext } from "@/contexts/SidebarContext";

interface ListItemLinkProps {
  label: string
  href: string
}

const ListItemLink = ({ label, href }: ListItemLinkProps) => {
  const pathname = usePathname()

  return (
    <ListItemButton
      selected={pathname == href}
    >
      <Link href={href} style={{ all: 'unset', width: '100%' }}>
        <ListItemText primary={label} />
      </Link>
    </ListItemButton>
  )
}

export function Header() {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const nowDate = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    weekday: 'long',
  }).split(',')

  const { toggleSidebarOpen, isSidebarOpen } = useSideBarContext()

  return (
    <>
      {smDown ? (
          <Drawer
            variant={smDown ? "temporary" : "permanent"}
            open={isSidebarOpen}
            onClose={toggleSidebarOpen}
            onClick={toggleSidebarOpen}
            onMouseLeave={toggleSidebarOpen}
          >
            <Box
              width={theme.spacing(28)}
              height='100%'
              display='flex'
              flexDirection='column'
              color={theme.palette.getContrastText(theme.palette.primary.dark)}
              bgcolor={theme.palette.primary.dark}
            >
              <Box
                textAlign='center'
                py={8}
                bgcolor={theme.palette.primary.main}
                borderRadius="0 0 14px 14px"
              >
                <Typography fontSize={28} fontWeight={500} component='h1'>
                  {nowDate[1]}
                </Typography>
                <Typography fontWeight={600} component='p'>
                  {nowDate[0].toString().charAt(0).toUpperCase() + nowDate[0].toString().slice(1)}
                </Typography>
              </Box>
              <Box flex={1}>
                <List component="nav">
                  <ListItemLink href="/" label="Clientes" />
                  <ListItemLink href="/drivers" label="Condutores" />
                  <ListItemLink href="/displacements" label="Deslocamentos" />
                  <ListItemLink href="/vehicles" label="Veículos" />
                </List>
              </Box>
            </Box>
          </Drawer >
      ) : null
      }
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        pr={4}
        pl={2}
        sx={{ backgroundColor: theme.palette.primary.dark }}
        color='white'
      >
        {smDown ? (
          <ToggleSidebarButton theme={theme} />
        ) : (
          <>
            <Box bgcolor='primary.main' px={2} py={1} borderRadius={1}>
              <Typography fontWeight={600} component='p'>
                {nowDate[1]}, {' '}
                {nowDate[0].toString().charAt(0).toUpperCase() + nowDate[0].toString().slice(1)}
              </Typography>
            </Box>
            <List component="nav">
              <Box display='flex' justifyContent='center' flexDirection='row'>
                <ListItemLink href="/" label="Clientes" />
                <ListItemLink href="/drivers" label="Condutores" />
                <ListItemLink href="/displacements" label="Deslocamentos" />
                <ListItemLink href="/vehicles" label="Veículos" />
              </Box>
            </List>
          </>
        )}
      </Box>
    </>
  )
}

