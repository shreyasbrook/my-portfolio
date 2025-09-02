import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const [animatedText, setAnimatedText] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [isWelcomeAnimating, setIsWelcomeAnimating] = useState(true);
  const roles = ['I am Frontend Developer', 'I am Designer'];
  const fullText = "I am Shreyas B Bhat";
  const welcomeFullText = "Welcome";
  const textRef = useRef(null);
  
  // Role switcher effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prevRole) => (prevRole + 1) % roles.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);



  // Letter-by-letter animation effect for name
  useEffect(() => {
    if (!isAnimating) return;
    
    let currentIndex = 0;
    const animationSpeed = 100; // milliseconds per character
    
    const animateText = () => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(animateText, animationSpeed);
      } else {
        setIsAnimating(false);
      }
    };
    
    animateText();
  }, [isAnimating, fullText]);

  // Letter-by-letter animation effect for welcome
  useEffect(() => {
    if (!isWelcomeAnimating) return;
    
    let currentIndex = 0;
    const animationSpeed = 80; // slightly faster for welcome
    
    const animateWelcome = () => {
      if (currentIndex <= welcomeFullText.length) {
        setWelcomeText(welcomeFullText.slice(0, currentIndex));
        currentIndex++;
        setTimeout(animateWelcome, animationSpeed);
      } else {
        setIsWelcomeAnimating(false);
      }
    };
    
    animateWelcome();
  }, [isWelcomeAnimating, welcomeFullText]);

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 2, sm: 4, md: 6 }, 
        textAlign: 'center',
        minHeight: '100vh',
        height: '100vh',
        backgroundImage: `url("/IMG2.jpeg")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-image 2s ease-in-out',
        imageRendering: 'high-quality',
        imageRendering: '-webkit-optimize-contrast',
        imageRendering: 'crisp-edges',
        fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        '@media (min-resolution: 2dppx)': {
          backgroundSize: 'cover',
          imageRendering: 'high-quality',
        },
        '@media (min-resolution: 3dppx)': {
          backgroundSize: 'cover',
          imageRendering: 'high-quality',
        },
        '@keyframes fadeInOut': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.3,
          },
        },
        '@keyframes blink': {
          '0%, 50%': {
            opacity: 1,
          },
          '51%, 100%': {
            opacity: 0,
          },
        },
      }}
    >
      {/* Dark overlay for better text readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.3)',
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800, 
            mb: 2,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            minHeight: { xs: '2rem', sm: '2.5rem' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            letterSpacing: '0.1em',
            fontSize: { xs: '1.5rem', sm: '2.125rem' },
            fontStyle: 'italic',
            textTransform: 'uppercase'
          }}
        >
          <Box
            component="span"
            sx={{
              position: 'relative'
            }}
          >
            {welcomeText}
          </Box>
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            mt: 1,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            minHeight: { xs: '2.5rem', sm: '3.5rem' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            letterSpacing: '0.1em',
            fontSize: { xs: '1.75rem', sm: '3rem' },
            fontStyle: 'italic',
            textTransform: 'uppercase'
          }}
        >
          <Box
            component="span"
            sx={{
              position: 'relative'
            }}
          >
            {animatedText}
          </Box>
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            mt: 1,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            minHeight: { xs: '2.5rem', sm: '3.5rem' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: '1.5rem', sm: '2.5rem' }
          }}
        >
          <Box
            component="span"
            sx={{
              opacity: 1,
              transition: 'opacity 0.5s ease-in-out',
              animation: 'fadeInOut 2s ease-in-out infinite'
            }}
          >
            {roles[currentRole]}
          </Box>
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 1.5,
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            px: { xs: 1, sm: 0 }
          }}
        >
          I craft responsive, accessible, and performant web experiences with React and modern tooling.
        </Typography>
      </Container>
    </Box>
  );
}

