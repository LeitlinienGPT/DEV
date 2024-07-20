import React, { useState, useEffect } from 'react';
import './SourcesOutput.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Skeleton from '@mui/joy/Skeleton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/system';

// Helper function to format title and extract register number
const formatTitleAndExtractRegisterNumber = (source) => {
  const parts = source.split('_');
  let registerNumber = parts[0];
  if (registerNumber && registerNumber.length >= 6) {
    registerNumber = `${registerNumber.substring(0, 3)}-${registerNumber.substring(3, 6)}`;
  } else {
    registerNumber = 'Unbekannt';
  }
  const entwicklungsstufe = parts[1];
  const formattedTitle = parts.slice(2).join(' ');
  return { formattedTitle, registerNumber, entwicklungsstufe };
};

// CollapsibleRow component
const CollapsibleRow = ({ row, index, isOpen, toggleOpen, isEven }) => {
  const { metadata, page_content: pageContent } = row;
  const { formattedTitle, registerNumber, entwicklungsstufe } = formatTitleAndExtractRegisterNumber(metadata?.Source || '');
  const { Gültigkeit, href: awmfRegisterUrl, Page, Fachgesellschaft } = metadata || {};
  const pages = Array.isArray(Page) ? Page.join(', ') : Page;
  const theme = useTheme();

  const rowStyle = {
    backgroundColor: isEven
      ? theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : '#f9f9f9'
      : theme.palette.background.paper,
  };

  return (
    <>
      <tr style={rowStyle}>
        <td className="table-cell">{Gültigkeit}</td>
        <td className="table-cell">{entwicklungsstufe}</td>
        <td className="table-cell">
          {awmfRegisterUrl ? (
            <Link href={awmfRegisterUrl} target="_blank" variant="outlined">
              {registerNumber}
            </Link>
          ) : (
            <span>{registerNumber}</span>
          )}
        </td>
        <td className="table-cell">{formattedTitle}</td>
        <td className="table-cell">{pages}</td>
        <td className="table-cell">{Fachgesellschaft && Fachgesellschaft.join(', ')}</td>
        <td className="table-cell">
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => toggleOpen(index)}
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={7} style={{ padding: 0 }}>
            <Sheet
              variant="soft"
              sx={{ p: 2, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                Mehr Informationen
              </Typography>
              <Typography variant="body2" className="sources-content">{pageContent}</Typography>
            </Sheet>
          </td>
        </tr>
      )}
    </>
  );
};

// SourcesOutput component
const SourcesOutput = ({ sourceDocuments, isLoading }) => {
  const [showContentStates, setShowContentStates] = useState(Array(sourceDocuments.length).fill(false));
  const theme = useTheme();

  useEffect(() => {
    console.log('Source documents updated:', sourceDocuments);
  }, [sourceDocuments]);

  const toggleShowContent = (index) => {
    const updatedShowContentStates = [...showContentStates];
    updatedShowContentStates[index] = !updatedShowContentStates[index];
    setShowContentStates(updatedShowContentStates);
  };

  const renderSourceDocumentsSkeleton = () => (
    <tr>
      <td colSpan={7}>
        <div className="source-skeleton">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height="2rem" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="rectangular" height="2rem" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="rectangular" height="2rem" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="rectangular" height="2rem" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="rectangular" height="2rem" />
          <hr />
        </div>
      </td>
    </tr>
  );

  const renderSourceDocuments = () => {
    // Show only the latest three source documents
    const latestSourceDocuments = sourceDocuments.slice(-3);

    if (latestSourceDocuments && latestSourceDocuments.length > 0) {
      return latestSourceDocuments.map((doc, index) => (
        <CollapsibleRow
          key={index}
          row={doc}
          index={index}
          isOpen={showContentStates[index]}
          toggleOpen={toggleShowContent}
          isEven={index % 2 === 0}
        />
      ));
    }
    return null;
  };

  return (
    <div className="sources-output">
      <Card className="sources-card" sx={{ width: '100%' }}>
        <CardContent>
          <Typography level="title-md" sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Quellen
          </Typography>
          <Sheet sx={{ width: '100%' }}>
            <Table sx={{ width: '100%', tableLayout: 'auto' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Gültigkeit</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Entwicklungsstufe</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Registernummer</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Titel</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Seite (im PDF)</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Fachgesellschaften</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Inhalt</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    {renderSourceDocumentsSkeleton()}
                    {renderSourceDocumentsSkeleton()}
                  </>
                ) : sourceDocuments && sourceDocuments.length > 0 ? (
                  renderSourceDocuments()
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <Typography variant="body2" color="text.secondary" className="sources-content">
                        Ihre Anfrage wird bearbeitet. Aktuell dauert die Suche nach passenden Quellen ca. 10 Sekunden. 
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
};

export default SourcesOutput;