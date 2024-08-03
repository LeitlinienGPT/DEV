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

// Helper function to format title and extract register number
const formatTitleAndExtractRegisterNumber = (source) => {
  const parts = source.split('_');
  const entwicklungsstufe = parts[1];
  const formattedTitle = parts.slice(2).join(' ');
  return { formattedTitle, entwicklungsstufe };
};

// CollapsibleRow component
const CollapsibleRow = ({ row, index, isEven }) => {
  const { metadata } = row;
  const { formattedTitle, entwicklungsstufe } = formatTitleAndExtractRegisterNumber(metadata?.Source || '');
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
          <Typography level="title-md" sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Quellen
          </Typography>
          <Sheet>
            <Table>
              <thead>
                <tr>
                  <th style={{ backgroundColor: theme.palette.background.level1, fontWeight: 'bold' }}>Titel</th>
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