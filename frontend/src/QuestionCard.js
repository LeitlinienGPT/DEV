import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

// Styled component for grid items
const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',

  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const questions = [
  "Wann wird die bariatrische OP empfohlen?",
  "Wie untersuche ich eine Wespenstichallergie?",
  "Was sind die ersten Tests um AIDS zu diagnostizieren?",
  "Ist eine Anamnese auch genannt als Test in den Dokumenten?",
  "Wie gehe ich vor bei einer unklaren Hyponatriämie?",
  "Wie muss ich jemanden nach einer atrialen Occluder-Implantation antikoagulieren/Plättchen hemmen?",
  "Muss ich jemanden nach einer atrialen Occluder-Implantation antikoagulieren/Plättchen hemmen?",
  "Wie ist der laborchemische Algorithmus zum Ausschluss eines akuten Herzinfarkts?",
  "Wie behandle ich eine TTP?",
  "Was muss ich beachten, wenn ich Tolvaptan ansetze?",
  "Wann ist die Indikation für ein CRT-System gegeben?",
  "Welche Antikörper muss ich bei dem Verdacht auf eine IgA-Nephropathie bestimmen?",
  "Beim Mammakarzinom, wann wird eine adjuvante Strahlentherapie der Lymphabflusswege empfohlen?",
];

export default function QuestionCard({ onQuestionClick }) {  // Accept the onQuestionClick prop
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true); // State to toggle question visibility

  useEffect(() => {
    // Randomly select 4 questions to display
    const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
    setRandomQuestions(shuffledQuestions.slice(0, 4));
  }, []);

  const handleQuestionClick = (question) => {
    setShowQuestions(false);  // Hide all cards when a question is clicked
    onQuestionClick(question);  // Call the parent handler
  };

  return (
    <Box className="question-card" sx={{ paddingBottom: 2 }}>
      {showQuestions && (  // Conditionally render the grid of questions
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ width: '98%' }}
          justifyContent="center"  // Center the question cards
          alignItems="stretch"
        >
          {randomQuestions.map((question, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Item>
                <Card variant="soft" onClick={() => handleQuestionClick(question)}>  {/* Handle click event */}
                  <CardContent>
                    <Typography>{question}</Typography>
                  </CardContent>
                </Card>
              </Item>
              
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}