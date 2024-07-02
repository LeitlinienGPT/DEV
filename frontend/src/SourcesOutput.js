import React, { useState, useEffect } from 'react';
import './SourcesOutput.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Skeleton from '@mui/joy/Skeleton';

const formatTitleAndExtractRegisterNumber = (source) => {
  const parts = source.split('_');
  let registerNumber = parts[0];
  if (registerNumber && registerNumber.length >= 6) {
    registerNumber = `${registerNumber.substring(0, 3)}-${registerNumber.substring(4, 7)}`;
  } else {
    registerNumber = 'Unbekannt';
  }
  const entwicklungsstufe = parts[1];
  const formattedTitle = parts.slice(2).join(' ');
  return { formattedTitle, registerNumber, entwicklungsstufe };
};

const SourcesOutput = ({ sourceDocuments, isLoading }) => {
  const [showContentStates, setShowContentStates] = useState(Array(sourceDocuments.length).fill(false));

  useEffect(() => {
    console.log('Source documents updated:', sourceDocuments);
  }, [sourceDocuments]);

  const renderValidityText = (validity) => {
    return <span>{validity}</span>;
  };

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
    if (sourceDocuments && sourceDocuments.length > 0) {
      const recentSourceDocuments = sourceDocuments.slice(-3);
      return recentSourceDocuments.map((doc, index) => {
        const { metadata } = doc;
        const { formattedTitle, registerNumber, entwicklungsstufe } = formatTitleAndExtractRegisterNumber(metadata?.Source || '');
        const { Gültigkeit, href: awmfRegisterUrl, Page, Fachgesellschaft } = metadata || {};
        const pages = Array.isArray(Page) ? Page.join(', ') : Page;

        return (
          <tr key={index}>
            <td className="table-cell">{renderValidityText(Gültigkeit)}</td>
            <td className="table-cell">{entwicklungsstufe}</td>
            <td className="table-cell">{awmfRegisterUrl ? (
              <Link href={awmfRegisterUrl} target="_blank" variant="outlined">
                {registerNumber}
              </Link>
            ) : (
              <span>{registerNumber}</span>
            )}</td>
            <td className="table-cell">{formattedTitle}</td>
            <td className="table-cell">{pages}</td>
            <td className="table-cell">{Fachgesellschaft && Fachgesellschaft.join(', ')}</td>
            <td className="table-cell">
              <Button onClick={() => toggleShowContent(index)} variant="outlined" size="small">
                Mehr Informationen
              </Button>
              {showContentStates[index] && (
                <div className="content-section">{doc.page_content}</div>
              )}
            </td>
          </tr>
        );
      });
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
            <Table sx={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Gültigkeit</th>
                  <th>Entwicklungsstufe</th>
                  <th>Registernummer</th>
                  <th>Titel</th>
                  <th>Seite (im PDF)</th>
                  <th>Fachgesellschaften</th>
                  <th>Inhalt</th>
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
                       Bitte stelle eine Frage, damit hier Quellen angezeigt werden.
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