import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function Contact({ onPhone, onEmail, onLinkedIn }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    if (!formData.email.includes('@')) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      // Using a simple and reliable email service
      const emailData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to: 'shreyasbb20@gmail.com'
      };
      
      // Send to a working email service
      const response = await fetch('https://formspree.io/f/xayzqkqp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! I\'ll get back to you soon.',
          severity: 'success'
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later or contact me directly at shreyasbb20@gmail.com',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box component="section" sx={{ py: { xs: 3, md: 4 }, position: 'relative' }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a237e', mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Contact me for any queries or you can write us, we will get back to you in 48 hours.
            </Typography>
          </Box>
          {/* Horizontal Flex Layout for Contact Info and Form */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, minHeight: '70vh' }}>
            {/* Left Column - Contact Information */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', boxShadow: 2, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#42a5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LocationOnIcon sx={{ color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                          Location:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                          Udaya Layout Bengalore, Karnataka,560060
                        </Typography>
                      </Box>
                    </Box>
                    {/* Email */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#42a5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <EmailIcon sx={{ color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                          Email:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                          <Button 
                            variant="text" 
                            sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
                            onClick={() => window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox', '_blank')}
                          >
                            Shreyasbb20@gmail.com
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                    {/* Phone */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#42a5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PhoneIcon sx={{ color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                          Call:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                          +91 9980420944
                        </Typography>
                      </Box>
                    </Box>
                    {/* WhatsApp */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#42a5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WhatsAppIcon sx={{ color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
                          WhatsApp:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                          <Button 
                            variant="text" 
                            sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
                            onClick={() => window.open('https://wa.me/9980420944', '_blank')}     
                          >
                            click here
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                    {/* Embedded Google Maps */}
                    <Box sx={{ flex: 1, borderRadius: 1, overflow: 'hidden', border: '1px solid #6212cb', minHeight: 250, mt: 2 }}>
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map - Bangalore, Karnataka"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfcce25ec27c4!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
            {/* Right Column - Contact Form and last part */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Card sx={{ height: '100%', boxShadow: 2, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={2.5} sx={{ flex: 1, justifyContent: 'space-between' }}>
                      <Box>
                        <TextField
                          fullWidth
                          label="Your Name"
                          variant="outlined"
                          size="medium"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          sx={{ mb: 1.5 }}
                        />
                        <TextField
                          fullWidth
                          label="Your Email"
                          variant="outlined"
                          size="medium"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          sx={{ mb: 1.5 }}
                        />
                        <TextField
                          fullWidth
                          label="Subject"
                          variant="outlined"
                          size="medium"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          sx={{ mb: 1.5 }}
                        />
                        <TextField
                          fullWidth
                          label="Message"
                          variant="outlined"
                          size="medium"
                          multiline
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          sx={{ mb: 1.5 }}
                        />
                      </Box>
                      <Button 
                        type="submit"
                        variant="contained" 
                        size="large"
                        disabled={loading}
                        sx={{ bgcolor: '#42a5f5', '&:hover': { bgcolor: '#1976d2' } }}
                      >
                        {loading ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={20} color="inherit" />
                            Sending...
                          </Box>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </Stack>
                  </form>
                  {/* Last part beside form (removed scroll to top from here) */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Snackbar
                      open={snackbar.open}
                      autoHideDuration={6000}
                      onClose={handleCloseSnackbar}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                      <Alert 
                        onClose={handleCloseSnackbar} 
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                      >
                        {snackbar.message}
                      </Alert>
                    </Snackbar>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
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
    </>
  );
}
