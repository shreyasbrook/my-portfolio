import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import Drawer from './components/Drawer';
import ViewResume from './components/ViewResume';
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [desktopDrawerOpen, setDesktopDrawerOpen] = React.useState(true);
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

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  // Removed setMobileOpen for mobile drawer

  const handleDesktopDrawerClose = () => {
    setDesktopDrawerOpen(false);
  } 

  const handleDesktopDrawerOpen = () => {
    setDesktopDrawerOpen(true);
  }

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
      <div
        style={{
          width: '100vw',
          minHeight: '100vh',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Main Content */}
        <main
          style={{
            flex: 1,
            width: '100vw',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.8s cubic-bezier(0.77,0,0.175,1)',
          }}
        >
          {/* Mobile Header with Hamburger and profile image */}
          {isMobile && (
            <Box sx={{ width: '100%', bgcolor: '#222', color: '#fff', display: 'flex', alignItems: 'center', px: 2, height: 48, position: 'fixed', top: 0, right: 0, zIndex: 1400 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <img src="/IMG1.jpeg" alt="Logo" style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 12 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Shreyas B Bhat</Typography>
                  <Typography variant="body2" sx={{ color: '#ccc', fontSize: 13 }}>Frontend Developer</Typography>
                </Box>
              </Box>
              <IconButton aria-label="open drawer" edge="end" onClick={handleMobileDrawerToggle} sx={{ color: '#fff', ml: 2 }}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          {/* Mobile Drawer Overlay */}
          {isMobile && mobileDrawerOpen && (
            <Box sx={{ position: 'fixed', top: 0, right: 0, width: '100vw', height: '100vh', bgcolor: 'background.paper', zIndex: 2000, boxShadow: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0 }}>
              {/* X icon to close drawer */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', px: 2, py: 2 }}>
                <IconButton aria-label="close drawer" onClick={handleMobileDrawerToggle} sx={{ color: '#fff' }}>
                  <span style={{ fontSize: 28, fontWeight: 'bold', lineHeight: 1, color: '#fff' }}>×</span>
                </IconButton>
              </Box>
              {/* Navigation Links Only */}
              <Box sx={{ flex: 1, py: 2 }}>
                {[
                  { id: 'home', label: 'Home', icon: <HomeIcon sx={{ mr: 1, color: activeSection === 'home' ? 'primary.main' : '#fff' }} /> },
                  { id: 'about', label: 'About', icon: <InfoIcon sx={{ mr: 1, color: activeSection === 'about' ? 'primary.main' : '#fff' }} /> },
                  { id: 'projects', label: 'Projects', icon: <WorkIcon sx={{ mr: 1, color: activeSection === 'projects' ? 'primary.main' : '#fff' }} /> },
                  { id: 'contact', label: 'Contact', icon: <ContactSupportIcon sx={{ mr: 1, color: activeSection === 'contact' ? 'primary.main' : '#fff' }} /> },
                ].map((item, idx, arr) => (
                  <React.Fragment key={item.id}>
                    <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', mt: idx === 0 ? 3 : 0 }}>
                      {item.icon}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: activeSection === item.id ? 700 : 500, fontSize: 22, color: activeSection === item.id ? '#9c27b0' : '#fff', cursor: 'pointer', display: 'inline-block', transition: 'color 0.3s, font-weight 0.3s' }}
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                    {idx < arr.length - 1 && (
                      <Box sx={{ width: '100%', px: 2 }}>
                        <hr style={{ border: 'none', borderBottom: '1px solid #333', margin: 0 }} />
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
              {/* Footer */}
              <Box sx={{ px: 2, py: 2, borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  © 2025 Shreyas B Bhat
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="inherit" component="a" href="https://github.com/shreyasbrook" target="_blank" rel="noopener noreferrer" aria-label="github">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton size="small" color="inherit" component="a" href="https://www.linkedin.com/in/Shreyas-b-bhat-1391a1371" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton size="small" color="inherit" component="a" href="mailto:shreyasbb20@gmail.com" aria-label="email">
                    <MailOutlineIcon />
                  </IconButton>
                  <IconButton size="small" color="inherit" component="a" href="https://instagram.com/shreyas_b_bhat" target="_blank" rel="noopener noreferrer" aria-label="instagram">
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
          {/* Desktop Drawer */}
          {!isMobile && desktopDrawerOpen && (
            <Drawer
              onSelect={scrollToSection}
              activeSection={activeSection}
              width={320}
              mobileOpen={false}
              onClose={handleDesktopDrawerClose}
              isMobile={false}
              profile={{ name: 'Shreyas B Bhat', role: 'Frontend Developer', avatarUrl: '/IMG1.jpeg' }}
            />
          )}
          {/* Show open button if Drawer is closed (desktop only) */}
          {!isMobile && !desktopDrawerOpen && (
            <IconButton
              aria-label="Open drawer"
              onClick={handleDesktopDrawerOpen}
              sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1500, bgcolor: '#222', color: '#fff', boxShadow: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Home Section */}
          <Box sx={{ pt: 0, width: '100%', m: 0 }}>
            {/* Always show main content, mobile Drawer removed */}
            <>
              <div data-section="home">
                <Home />
              </div>
              <div data-section="about">
                <About
                  name="Shreyas B Bhat"
                  role="Frontend Developer"
                  email={<a href="mailto:shreyasbb20@gmail.com" style={{ color: '#9c27b0', textDecoration: 'underline' }}>shreyasbb20@gmail.com</a>}
                  onContact={() => scrollToSection('contact')}
                  onDownloadResume={() => window.open('/Shreyasbbhat Resume.pdf', '_blank')}
                    resumeLink={null}
                />
              </div>
              <div data-section="projects">
                <Projects />
                <ProjectSDM />
              </div>
              <div data-section="contact">
                <Contact
                  onPhone={() => (window.location.href = 'tel:+91 9980420944')}
                  onEmail={() => (window.location.href = 'mailto:shreyasbb20@gmail.com')}
                  onLinkedIn={() => window.open('https://www.linkedin.com/in/Shreyas-b-bhat-1391a1371', '_blank', 'noopener,noreferrer')}
                />
              </div>
            </>
          </Box>
        </main>
      </div>
      {/* PDF Section at the very bottom */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <a href="/int/6.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', background: '#9c27b0', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>6.pdf</button>
          </a>
          <a href="/int/7.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', background: '#9c27b0', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>7.pdf</button>
          </a>
          <a href="/int/ime.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', background: '#9c27b0', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>ime.pdf</button>
          </a>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
// Add a section at the very bottom of the page for opening PDFs

// ...existing code...

// Insert after the main content, before closing ThemeProvider

// In the return statement, just before </ThemeProvider>:

      {/* PDF Section at the very bottom */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <a href="/int/6.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', background: '#9c27b0', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>6.pdf</button>
          </a>
          <a href="/int/7.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', background: '#9c27b0', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>7.pdf</button>
          </a>
          <a href="/int/ime.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', background: '#9c27b0', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>ime.pdf</button>
          </a>
        </Box>
      </Box>