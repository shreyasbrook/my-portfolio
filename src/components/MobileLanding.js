import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import CopyrightIcon from '@mui/icons-material/Copyright';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Drawer from './Drawer';

export default function MobileLanding() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Portfolio
          </Typography>
          <Button color="inherit" startIcon={<HomeIcon />} href="#home">
            Home
          </Button>
          <Button color="inherit" startIcon={<InfoIcon />} href="#about">
            About
          </Button>
          <Button color="inherit" startIcon={<WorkIcon />} href="#projects">
            Projects
          </Button>
          <Button color="inherit" startIcon={<CopyrightIcon />} href="#contact">
            Contact
          </Button>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          onSelect={scrollToSection}
          activeSection={'home'}
          width={300}
          mobileOpen={true}
          onClose={() => {}}
          isMobile={true}
          profile={{ name: 'Shreyas B Bhat', role: 'Frontend Developer', avatarUrl: '/IMG1.jpeg' }}
        />
      )}

      <Box sx={{ 
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#f5f5f5',
        pt: 2,
        pb: 4
      }}>
        <Container maxWidth="sm">
          {/* Scroll to Top Button - fixed at bottom right, only visible after scrolling */}
          {showScrollTop && (
            <Fab
              color="primary"
              size="medium"
              onClick={scrollToTop}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1300,
                bgcolor: '#42a5f5',
                boxShadow: 4
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          )}
          {/* Social Links */}
          <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Connect With Me
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Button
                  component="a"
                  href="https://github.com/ShreyasBBhat"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{ borderColor: '#333', color: '#333', '&:hover': { borderColor: '#000', bgcolor: 'rgba(0,0,0,0.04)' } }}
                >
                  GitHub
                </Button>
                <Button
                  component="a"
                  href="https://www.linkedin.com/in/ShreyasBBhat-p-2247aa374"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  sx={{ borderColor: '#0077b5', color: '#0077b5', '&:hover': { borderColor: '#005885', bgcolor: 'rgba(0,119,181,0.04)' } }}
                >
                  LinkedIn
                </Button>
                <Button
                  component="a"
                  href="mailto:shreyasbb20@gmail.com"
                  variant="outlined"
                  startIcon={<MailOutlineIcon />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    '&:hover': { borderColor: '#b71c1c', bgcolor: 'rgba(211,47,47,0.04)' }
                  }}
                >
                  Email
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* WhatsApp Quick Contact */}
          <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: '#25D366', color: 'white' }}>
            <CardContent sx={{ py: 3, textAlign: 'center' }}>
              <WhatsAppIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Chat on WhatsApp
              </Typography>
              <Button
                component="a"
                href="https://wa.me/9980420944"
                target="_blank"
                variant="contained"
                size="large"
                sx={{ bgcolor: 'white', color: '#25D366', ':hover': { bgcolor: '#f5f5f5' } }}
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
