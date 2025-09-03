
import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

export default function Drawer({
  onSelect,
  activeSection = 'home',
  width = 300,
  mobileOpen = false,
  onClose,
  isMobile = false,
  profile = {
    name: 'Shreyas B Bhat',
    role: 'Frontend Developer',
    avatarUrl: '',
  },
  links = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'about', label: 'About', icon: <InfoIcon /> },
    { id: 'projects', label: 'Projects', icon: <WorkIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactSupportIcon /> },
  ],
  socials = [
    { id: 'github', icon: <GitHubIcon />, href: 'https://github.com/ShreyasBBhat' },
    { id: 'linkedin', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/ShreyasBBhat-p-2247aa374' },
    { id: 'email', icon: <MailOutlineIcon />, href: 'mailto:shreyasbb20@gmail.com' },
  ],
}) {
  const theme = useTheme();
  const firstItemRef = useRef(null);

  const handleSelect = (id) => () => {
    onSelect && onSelect(id);
    window.history.pushState(null, null, `#${id}`);
    setTimeout(() => {
      const section = document.querySelector(`[data-section="${id}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    // Focus first item when drawer opens, or on desktop where it acts as a side nav
    if (mobileOpen || !isMobile) {
      setTimeout(() => {
        if (firstItemRef.current) {
          firstItemRef.current.focus();
        }
      }, 0);
    }
  }, [mobileOpen, isMobile]);

  return (
    <Box sx={{ 
      width: isMobile ? '50vw' : width,
      height: '100vh',
      borderRight: isMobile ? 0 : 1, 
      borderColor: 'divider', 
      bgcolor: 'background.paper',
      color: 'text.primary',
      position: 'fixed',
      top: 0,
      left: isMobile ? (mobileOpen ? 0 : '-50vw') : (mobileOpen ? 0 : '-100%'),
      zIndex: 1200,
      overflow: 'hidden',
      transition: 'left 0.3s ease-in-out',
      boxShadow: isMobile ? 3 : 0
    }} aria-label="Primary navigation" aria-expanded={mobileOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
  {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 2.5,
            bgcolor: 'transparent',
            color: 'text.primary',
          }}
        >
          <Avatar
            src={profile.avatarUrl || '/IMG_20250323_232827.jpg'}
            alt={profile.name}
            sx={{ 
              width: 56, 
              height: 56, 
              bgcolor: 'transparent', 
              fontWeight: 600,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: `2px solid ${theme.palette.divider}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            {(!profile.avatarUrl && profile.name) ? profile.name.slice(0, 1) : null}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
              {profile.name}
            </Typography>
            <Typography variant="body2" noWrap color="text.secondary">
              {profile.role}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            aria-label="Close drawer"
            sx={{ color: 'inherit' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Navigation */}
        <Box component="nav" role="navigation" aria-label="Sections" sx={{ flex: 1, overflowY: 'auto' }}>
          <List sx={{ py: 0 }}>
            {links.map((item, index) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  onClick={handleSelect(item.id)}
                  ref={index === 0 ? firstItemRef : undefined}
                  sx={{
                    bgcolor: activeSection === item.id ? 'primary.main' : 'transparent',
                    color: activeSection === item.id ? '#fff' : 'text.primary',
                    '&:hover': {
                      bgcolor: activeSection === item.id ? 'primary.dark' : 'action.hover',
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5
                  }}
                >
                  {item.icon ? (
                    <ListItemIcon sx={{ 
                      color: activeSection === item.id ? '#fff' : 'text.secondary' 
                    }}>
                      {item.icon}
                    </ListItemIcon>
                  ) : null}
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ 
                      sx: { 
                        color: activeSection === item.id ? '#fff' : 'text.primary', 
                        fontWeight: activeSection === item.id ? 700 : 500 
                      } 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* Footer / Socials */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} {profile.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socials.map((s) => (
              <IconButton
                key={s.id}
                size="small"
                color="inherit"
                component="a"
                href={s.href}
                target={s.href?.startsWith('http') ? '_blank' : undefined}
                rel={s.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.id}
              >
                {s.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}