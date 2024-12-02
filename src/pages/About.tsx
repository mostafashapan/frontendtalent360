import React from "react";
import { Container, Grid, Typography, Box, Paper, Chip } from "@mui/material"; // Import MUI components
 // Your custom styles (if any)

const AboutComponent: React.FC = () => {
  return (
    <div className="about-section home-section">
      {/* Placeholder for Particle component */}
      <Box sx={{ background: "#f0f0f0", height: "200px", mb: 4 }}>
        <Typography variant="h6" sx={{ textAlign: "center", paddingTop: "80px" }}>
                  Mostafa Shaban  
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        {/* About Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              Know Who <strong className="purple">I'M</strong>
            </Typography>
            {/* About Info Placeholder */}
            <Paper elevation={3} sx={{ padding: 3, background: "#fff" }}>
              <Typography variant="body1">
                Hello! I'm a passionate web developer with experience in frontend and backend technologies. 
                I love building creative and efficient solutions to real-world problems.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Skillset Section */}
        <Typography variant="h4" className="project-heading" gutterBottom>
          Professional <strong className="purple">Skillset</strong>
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Skillset Placeholder */}
          <Chip label="JavaScript" color="primary" />
          <Chip label="React" color="primary" />
          <Chip label="Node.js" color="primary" />
          <Chip label="TypeScript" color="primary" />
        </Box>

        {/* Tools Section */}
        <Typography variant="h4" className="project-heading" gutterBottom>
          <strong className="purple">Tools</strong> I use
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Tools Placeholder */}
          <Chip label="Git" color="secondary" />
          <Chip label="VS Code" color="secondary" />
          <Chip label="Docker" color="secondary" />
          <Chip label="Figma" color="secondary" />
        </Box>

        {/* GitHub Section Placeholder */}
        <Typography variant="h4" className="project-heading" gutterBottom>
          Check out my <strong className="purple">GitHub</strong>
        </Typography>
        <Paper elevation={3} sx={{ padding: 3, background: "#fff", textAlign: "center" }}>
          <Typography variant="body1">
            You can explore my repositories and contributions on GitHub. Feel free to check out my projects and contributions.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Typography variant="h6" sx={{ color: "blue", textDecoration: "underline" }}>
                Visit my GitHub Profile
              </Typography>
            </a>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div>
      <AboutComponent />
    </div>
  );
};

export default About;
