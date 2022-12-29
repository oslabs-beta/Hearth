import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import App from './App'
import Main from './components/Main'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const darkTheme = React.useMemo(
    () => 
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#121212'
          },
          secondary: {
            main: "rgba(255, 255, 255, 0.12)"
          },
          text: {
            primary: "#fff"
          }
        },
      }),
    [mode],
  );
  // function MyApp() {
  //   const theme = useTheme();
  //   const colorMode = React.useContext(ColorModeContext);
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         width: '100%',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         bgcolor: 'background.default',
  //         color: 'text.primary',
  //         borderRadius: 1,
  //         p: 3,
  //       }}
  //     >
  //       {theme.palette.mode} mode
  //       <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
  //         {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
  //       </IconButton>
  //     </Box>
  //   );
  // }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={darkTheme}>
        <Main />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}