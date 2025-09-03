import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Drawer from './components/Drawer';
import About from './components/about';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectSDM from './components/ProjectSDM';
import Contact from './components/Contact';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Custom theme colors (dark, light-black surfaces)
  const appTheme = React.useMemo(() => createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#9c27b0' },
      secondary: { main: '#ff9800' },
      background: { default: '#121212', paper: '#1e1e1e' },
      text: { primary: '#ffffff', secondary: 'rgba(255,255,255,0.7)' }
    },
    typography: {
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
  }), []);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(`[data-section="${sections[i]}"]`);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
  <div className="App" style={{ backgroundColor: appTheme.palette.background.default, minHeight: '100vh', width: '100vw', boxSizing: 'border-box', overflowX: 'hidden' }}>
    {/* Top App Bar for mobile */}
    {isMobile && (
      <Box sx={{ width: '100%', bgcolor: '#222', color: '#fff', display: 'flex', alignItems: 'center', px: 2, height: 48, position: 'fixed', top: 0, right: 0, zIndex: 1400 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <img src="/IMG1.jpeg" alt="Logo" style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 12 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Shreyas B Bhat</Typography>
            <Typography variant="body2" sx={{ color: '#ccc', fontSize: 13 }}>Frontend Developer</Typography>
          </Box>
        </Box>
        <IconButton aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ color: '#fff', ml: 2 }}>
          <MenuIcon />
        </IconButton>
      </Box>
    )}
    {/* Drawer dropdown for mobile */}
    {isMobile && mobileOpen && (
      <Box sx={{ position: 'fixed', top: 48, right: 0, width: '70vw', height: 'calc(100vh - 48px)', bgcolor: '#222', color: '#fff', zIndex: 1399, boxShadow: 3, overflowY: 'auto', m: 0, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, transition: 'right 0.3s' }}>
        <List>
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <ListItem key={section} disablePadding>
              <ListItemButton onClick={() => { scrollToSection(section); setMobileOpen(false); }} sx={{ color: activeSection === section ? '#fff' : '#ccc', fontWeight: activeSection === section ? 700 : 500 }}>
                <ListItemText primary={section.charAt(0).toUpperCase() + section.slice(1)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    )}
    {/* Main content: only show when drawer is closed on mobile */}
  <Box sx={{ pt: 0, width: '100%', m: 0 }}>
      {(!isMobile || !mobileOpen) && (
        <>
          <div data-section="home">
            <Home />
          </div>
          <div data-section="about">
            <About
              name="Shreyas B Bhat"
              role="Frontend Developer"
              onContact={() => scrollToSection('contact')}
              onDownloadResume={() => console.log('Download resume clicked')}
            />
          </div>
          <div data-section="projects">
            <Projects />
            <ProjectSDM />
          </div>
          <div data-section="contact">
            <Contact
              onPhone={() => (window.location.href = 'tel:+91 9880339147')}
              onEmail={() => (window.location.href = 'mailto:shreyasbb20@gmail.com')}
              onLinkedIn={() => window.open('https://www.linkedin.com/in/Shreyas B Bhat-p-2247aa374', '_blank', 'noopener,noreferrer')}
            />
          </div>
        </>
      )}
    </Box>
  </div>
    </ThemeProvider>
  );
}

export default App;