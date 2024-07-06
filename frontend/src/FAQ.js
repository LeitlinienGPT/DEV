import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/joy/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/joy';

const FAQ = () => {
  return (
    <Box sx={{ p: 2, mt: '64px' }}> {/* Added margin-top to account for the fixed header */}
      <Typography level="h1" sx={{ mb: 2 }}>Häufig gestellte Fragen (FAQs)</Typography>
      <AccordionGroup
        transition={{
          initial: "0.3s ease-out",
          expanded: "0.2s ease",
        }}
        sx={{
          [`& .${accordionClasses.root}`]: {
            marginTop: '0.5rem',
            transition: '0.2s ease',
            '& button:not([aria-expanded="true"])': {
              transition: '0.2s ease',
              paddingBottom: '0.625rem',
            },
            '& button:hover': {
              background: 'transparent',
            },
          },
          [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
            bgcolor: 'background.level1',
            borderRadius: 'md',
            borderBottom: '1px solid',
            borderColor: 'background.level2',
          },
          '& [aria-expanded="true"]': {
            boxShadow: (theme) => `inset 0 -1px 0 ${theme.vars.palette.divider}`,
          },
        }}
      >
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Was ist LeitlinienGPT?</AccordionSummary>
          <AccordionDetails>
            LeitlinienGPT ist ein KI-gestütztes Tool, das medizinische Fachkräfte unterstützt, indem es einfachen Zugang zu medizinischen Leitlinien und Informationen bietet. Aktuell ist es eine Demo-Version. Sobald die Version gut funktioniert und wir ausreichend Feedback erhalten haben, möchten wir eine bezahlte Version für Ärzte zur Verfügung stellen.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Warum ist LeitlinienGPT besser als ChatGPT?</AccordionSummary>
          <AccordionDetails>
            LeitlinienGPT bietet qualitativ hochwertigere Antworten speziell im medizinischen Bereich, da es das RAG-System verwendet, um durch über 85.000 Seiten deutscher medizinischer Leitlinien zu suchen. Wir haben unsere Chunking-Algorithmen optimiert, um den gesamten Text effizient zu durchsuchen. Zudem versuchen wir, Halluzinationen unseres Sprachmodells zu reduzieren und die Antworten so nah wie möglich an den Quellen zu halten.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Wie funktioniert LeitlinienGPT?</AccordionSummary>
          <AccordionDetails>
            LeitlinienGPT verwendet fortschrittliche Verarbeitung natürlicher Sprache, um Benutzeranfragen zu medizinischen Leitlinien zu verstehen und zu beantworten. Es ruft Informationen aus einer kuratierten Datenbank von Leitlinien ab und liefert relevante Antworten.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Woher stammen die Quellen?</AccordionSummary>
          <AccordionDetails>
            Die Quellen basieren derzeit alle auf der AWMF-Datenbank (Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften). Alle Leitlinien der AWMF sind aktuell integriert und decken eine breite Palette medizinischer Fachrichtungen ab. Weitere Informationen finden Sie unter <a href="https://www.awmf.org/">AWMF</a>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Ist die Nutzung der App sicher?</AccordionSummary>
          <AccordionDetails>
            Die Nutzung der App ist sehr sicher. Ihre Daten werden nicht gespeichert und alle eingegebenen Informationen werden sofort gelöscht. Die Kommunikation ist vollständig verschlüsselt, um höchste Datensicherheit zu gewährleisten. Datenschutz hat für uns oberste Priorität, und wir greifen nicht auf die von Ihnen eingegebenen Daten zu. Sie können daher sicher sein, dass Ihre Informationen vertraulich behandelt werden.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Welche Funktionen werden in Zukunft implementiert?</AccordionSummary>
          <AccordionDetails>
            In Zukunft werden wir mehr Funktionen hinzufügen, damit Sie spezifischere Informationen über Patienten leichter integrieren können und alle gewünschten Informationen integrieren können. Wir planen auch den Zugang zu europäischen Leitlinien.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Ist LeitlinienGPT kostenlos?</AccordionSummary>
          <AccordionDetails>
            Ja, LeitlinienGPT ist aktuell in der Testphase und kostenlos.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Kann LeitlinienGPT für jede medizinische Fachrichtung verwendet werden?</AccordionSummary>
          <AccordionDetails>
            LeitlinienGPT durchsucht alle Fachgesellschaften der AWMF.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary indicator={<AddIcon />}>Wie kann ich Feedback zu LeitlinienGPT geben?</AccordionSummary>
          <AccordionDetails>
            Sie können Feedback geben, indem Sie uns eine E-Mail an leitliniengpt@gmail.com senden. Wir schätzen Ihr Feedback und bemühen uns, das Tool basierend auf den Rückmeldungen der Benutzer zu verbessern. Wenn Sie Anregungen zur Gestaltung der App, zu den Inhalten oder zur Funktionalität haben, können Sie uns jederzeit eine E-Mail senden. Wir werden Änderungen so schnell wie möglich umsetzen.
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export default FAQ;