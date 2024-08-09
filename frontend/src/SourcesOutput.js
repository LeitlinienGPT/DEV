import React, { useEffect } from 'react';
import './SourcesOutput.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Skeleton from '@mui/joy/Skeleton';
import { useTheme } from '@mui/system';

// Helper function to format title, extract register number, and split date
const formatTitleAndExtractRegisterNumber = (source, page) => {
  const parts = source.split('_');

  // Check if the source has enough parts to extract a title
  const entwicklungsstufe = parts.length > 1 ? parts[1] : '';
  const titlePart = parts.length > 2 ? parts.slice(2).join(' ') : parts.join(' ');

  const dateIndex = titlePart.search(/\d{4}-\d{2}/);
  let formattedTitle = titlePart.replace(/-/g, ' ');

  let date = '';
  if (dateIndex !== -1) {
    const datePart = titlePart.slice(dateIndex, dateIndex + 7);
    const year = datePart.slice(0, 4);
    const month = datePart.slice(5, 7);

    const monthsInGerman = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];

    const monthName = monthsInGerman[parseInt(month, 10) - 1];
    date = `${monthName} ${year}`;
    
    formattedTitle = titlePart.slice(0, dateIndex).trim().replace(/-/g, ' ');
  }

  // Remove "-abgelaufen" if it exists in the title
  formattedTitle = formattedTitle.replace('-abgelaufen', '').trim();

  // Use a default title if the titlePart is empty
  if (!formattedTitle) {
    formattedTitle = 'Unbekannter Titel';
  }

  // Always include the page number in the title
  const formattedTitleWithPage = `${formattedTitle} (Seite: ${page || 'N/A'})`;

  return { formattedTitle: formattedTitleWithPage, entwicklungsstufe, date };
};

const SourcesOutput = ({ sourceDocuments, isLoading }) => {
  const theme = useTheme();

  const renderSourceDocumentsSkeleton = () => (
    <tr>
      <td>
        <Skeleton variant="text" width="90%" height={24} />
      </td>
      <td>
        <Skeleton variant="text" width="80%" height={24} />
      </td>
      <td>
        <Skeleton variant="text" width="60%" height={24} />
      </td>
      <td>
        <Skeleton variant="text" width="40%" height={24} />
      </td>
    </tr>
  );

  const renderSourceDocuments = () => {
    const latestSourceDocuments = sourceDocuments.slice(-3);
  
    if (latestSourceDocuments && latestSourceDocuments.length > 0) {
      return latestSourceDocuments.map((doc, index) => {
        const { metadata } = doc;
        const { Page, Fachgesellschaft, href: awmfRegisterUrl } = metadata || {};
        const { formattedTitle, entwicklungsstufe, date } = formatTitleAndExtractRegisterNumber(metadata?.Source || 'Unbekannter Titel', Page);
  
        const rowStyle = {
          backgroundColor: index % 2 === 0
            ? theme.palette.background.paper
            : theme.palette.background.default,
        };
  
        return (
          <tr key={index} style={rowStyle}>
            <td className="table-cell">
              {awmfRegisterUrl ? (
                <Link 
                  href={`${awmfRegisterUrl}#page=${Page}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  sx={{ 
                    color: theme.palette.primary.main, // Use theme's primary color for links
                    fontWeight: 'bold' 
                  }}
                >
                  {formattedTitle}
                </Link>
              ) : (
                <span>{formattedTitle}</span>
              )}
            </td>
            <td className="table-cell">{date}</td>
            <td className="table-cell">{Fachgesellschaft && Fachgesellschaft.join(', ')}</td>
            <td className="table-cell">{entwicklungsstufe}</td>
          </tr>
        );
      });
    }
    return null;
  };

  return (
    <div className="sources-output">
      <Card className="sources-card">
        <CardContent>
          <Sheet>
            <Table
              borderAxis="yBetween"
              color="neutral"
              size="md"
              stickyFooter={false}
              variant="plain"
            >
              <thead>
                <tr>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Titel</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Datum der Veröffentlichung</th> {/* New column header */}
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Fachgesellschaften</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Entwicklungsstufe</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    {renderSourceDocumentsSkeleton()}
                    {renderSourceDocumentsSkeleton()}
                    {renderSourceDocumentsSkeleton()}
                  </>
                ) : sourceDocuments && sourceDocuments.length > 0 ? (
                  renderSourceDocuments()
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <Typography variant="body2" color="text.secondary" className="sources-content">
                        Keine Quellen verfügbar.
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