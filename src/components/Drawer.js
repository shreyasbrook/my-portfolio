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
  { id: 'github', icon: <GitHubIcon />, href: 'https://github.com/shreyasbrook' },
  { id: 'linkedin', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/shreyas-b-bhat-1391a1371' },
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
      left: isMobile ? 0 : 0,
      zIndex: 1200,
      overflow: 'hidden',
      boxShadow: isMobile ? 3 : 0,
      opacity: mobileOpen ? 1 : 0,
      transform: mobileOpen ? 'translateX(0)' : (isMobile ? 'translateX(-50vw)' : 'translateX(-100%)'),
      pointerEvents: mobileOpen ? 'auto' : 'none',
      transition: 'opacity 0.8s cubic-bezier(0.77,0,0.175,1), transform 0.8s cubic-bezier(0.77,0,0.175,1)',
    }} aria-label="Primary navigation" aria-expanded={mobileOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header: only render for mobile, desktop header is below */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 2,
              bgcolor: '#222',
              color: 'text.primary',
              borderBottom: '1px solid #333',
            }}
          >
            {/* Left: Avatar */}
            <Avatar
              src={'/IMG1.jpeg'}
              alt={profile.name}
              sx={{ width: 48, height: 48, bgcolor: 'transparent', fontWeight: 600, backgroundSize: 'cover', backgroundPosition: 'center', border: `2px solid ${theme.palette.divider}`, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', mr: 2 }}
            >
              {(!profile.avatarUrl && profile.name) ? profile.name.slice(0, 1) : null}
            </Avatar>
            {/* Center: Name and Role stacked */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: '#fff', fontSize: 18 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: '#ccc', fontSize: 14 }}>
                {profile.role}
              </Typography>
            </Box>
            {/* Right: Social icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  sx={{ color: '#fff' }}
                >
                  {s.icon}
                </IconButton>
              ))}
              <IconButton
                onClick={onClose}
                aria-label="Close drawer"
                sx={{ color: '#fff', ml: 1 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        )}
        {/* Navigation links below header for mobile */}
        {isMobile && (
          <Box component="nav" role="navigation" aria-label="Sections" sx={{ width: '100%', bgcolor: '#222' }}>
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
                      <ListItemIcon sx={{ color: activeSection === item.id ? '#fff' : 'text.secondary' }}>
                        {item.icon}
                      </ListItemIcon>
                    ) : null}
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ sx: { color: activeSection === item.id ? '#fff' : 'text.primary', fontWeight: activeSection === item.id ? 700 : 500 } }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {/* Desktop navigation and socials remain in their places */}
        {!isMobile && <>
          {/* Desktop header: only avatar, name, role, and Close icon */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 2,
              bgcolor: '#222',
              color: 'text.primary',
              borderBottom: '1px solid #333',
            }}
          >
            {/* Left: Avatar */}
            <Avatar
              src={'/IMG1.jpeg'}
              alt={profile.name}
              sx={{ width: 48, height: 48, bgcolor: 'transparent', fontWeight: 600, backgroundSize: 'cover', backgroundPosition: 'center', border: `2px solid ${theme.palette.divider}`, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', mr: 2 }}
            >
              {(!profile.avatarUrl && profile.name) ? profile.name.slice(0, 1) : null}
            </Avatar>
            {/* Center: Name and Role stacked */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: '#fff', fontSize: 18 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: '#ccc', fontSize: 14 }}>
                {profile.role}
              </Typography>
            </Box>
            {/* Right: Only Close icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={onClose}
                aria-label="Close drawer"
                sx={{ color: '#fff', ml: 1 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Navigation links below header for desktop */}
          <Box component="nav" role="navigation" aria-label="Sections" sx={{ width: '100%', bgcolor: '#222', flex: 1, overflowY: 'auto' }}>
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
                      <ListItemIcon sx={{ color: activeSection === item.id ? '#fff' : 'text.secondary' }}>
                        {item.icon}
                      </ListItemIcon>
                    ) : null}
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ sx: { color: activeSection === item.id ? '#fff' : 'text.primary', fontWeight: activeSection === item.id ? 700 : 500 } }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
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
        </>}
      </Box>
    </Box>
  );
}