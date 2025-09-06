import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
import Drawer from '@mui/material/Drawer';

function DrawerComponent({ isMobile, open, onClose, onSelect, profile = {}, activeSection }) {
  const theme = useTheme();
  const firstItemRef = useRef(null);

  const links = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'about', label: 'About', icon: <InfoIcon /> },
    { id: 'projects', label: 'Projects', icon: <WorkIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactSupportIcon /> }
  ];
  const socials = [
    { id: 'github', icon: <GitHubIcon />, href: 'https://github.com/shreyasbrook' },
    { id: 'linkedin', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/shreyas-b-bhat-1391a1371' },
    { id: 'email', icon: <MailOutlineIcon />, href: 'mailto:shreyasbb20@gmail.com' }
  ];

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

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "left"}
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          bgcolor: "#222",
          boxShadow: isMobile ? "none" : "2px 0 8px rgba(0,0,0,0.2)",
          width: isMobile ? "100vw" : 320,
          marginLeft: 0,
          // Remove extra space in desktop view
          ...(isMobile ? {} : { minWidth: 0, maxWidth: 320, padding: 0 }),
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "#222",
          color: "#fff",
          boxShadow: isMobile ? "none" : "2px 0 8px rgba(0,0,0,0.2)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          position: isMobile ? "fixed" : "relative",
          left: 0,
          top: 0,
          zIndex: 1300,
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2, bgcolor: '#222', color: 'text.primary', borderBottom: '1px solid #333' }}>
          <Avatar
            src={'/IMG1.jpeg'}
            alt={profile.name || ''}
            sx={{ width: 48, height: 48, bgcolor: 'transparent', fontWeight: 600, backgroundSize: 'cover', backgroundPosition: 'center', border: `2px solid #444`, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', mr: 2 }}
          >
            {(!profile.avatarUrl && profile.name) ? profile.name.slice(0, 1) : null}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: '#fff', fontSize: 18 }}>
              {profile.name}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: '#ccc', fontSize: 14 }}>
              {profile.role}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={onClose}
              aria-label="Close drawer"
              sx={{ color: '#fff' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Navigation links */}
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
        {/* Footer / Socials: Only show on desktop */}
        {!isMobile && (
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
        )}
      </Box>
    </Drawer>
  );
}

export default DrawerComponent;
// ...existing code up to first export default DrawerComponent;