import React from "react";
import { Box, Typography, IconButton, Link, Grid2 } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const CustomFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#367BC1",
        color: "white",
        py: 4,
        px: { xs: 2, sm: 4, lg: 8 },
      }}
    >
      <Grid2 container spacing={4}>
        {/* Sezione 1: Informazioni */}
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            ClickFood
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            ClickFood è il tuo partner per la consegna del cibo a domicilio.
            Siamo qui per soddisfare la tua fame con un clic.
          </Typography>
        </Grid2>

        {/* Sezione 2: Collegamenti Rapidi */}
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Collegamenti Rapidi
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="/menu" color="inherit" underline="hover">
              Menu
            </Link>
            <Link href="/about" color="inherit" underline="hover">
              Chi Siamo
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contattaci
            </Link>
          </Box>
        </Grid2>

        {/* Sezione 3: Seguici sui Social */}
        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Seguici sui Social
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid2>
      </Grid2>

      {/* Sezione Inferiore */}
      <Box
        sx={{
          mt: 4,
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} ClickFood. Tutti i diritti riservati.
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomFooter;
