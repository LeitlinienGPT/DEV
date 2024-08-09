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
const formatTitleAndExtractRegisterNumber = (source) => {
  const parts = source.split('_');
  const entwicklungsstufe = parts[1];
  const titlePart = parts.slice(2).join(' ');
  
  const dateIndex = titlePart.indexOf('20');
  const formattedTitle = dateIndex !== -1 ? titlePart.slice(0, dateIndex).trim().replace(/-/g, ' ') : titlePart.replace(/-/g, ' ');
  const date = dateIndex !== -1 ? titlePart.slice(dateIndex).trim() : '';
  
  return { formattedTitle, entwicklungsstufe, date };
};

// CollapsibleRow component
const CollapsibleRow = ({ row, index, isEven }) => {
  const { metadata } = row;
  const { formattedTitle, entwicklungsstufe, date } = formatTitleAndExtractRegisterNumber(metadata?.Source || '');
  const { href: awmfRegisterUrl, Page, Fachgesellschaft } = metadata || {};
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
    <tr style={rowStyle}>
      <td className="table-cell">{formattedTitle}</td>
      <td className="table-cell">{date}</td> {/* New column for date */}
      <td className="table-cell">{Fachgesellschaft && Fachgesellschaft.join(', ')}</td>
      <td className="table-cell">{entwicklungsstufe}</td>
      <td className="table-cell">
        {awmfRegisterUrl ? (
          <Link href={`${awmfRegisterUrl}#page=${Page}`} target="_blank" variant="outlined">
            {pages}
          </Link>
        ) : (
          <span>{pages}</span>
        )}
      </td>
    </tr>
  );
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
      return latestSourceDocuments.map((doc, index) => (
        <CollapsibleRow
          key={index}
          row={doc}
          index={index}
          isEven={index % 2 === 0}
        />
      ));
    }
    return null;
  };

  return (
    <div className="sources-output">
      <Card className="sources-card">
        <CardContent>
          <Sheet>
            <Table>
              <thead>
                <tr>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Titel</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Datum der Veröffentlichung</th> {/* New column header */}
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Fachgesellschaften</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Entwicklungsstufe</th>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Seite (im PDF)</th>
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