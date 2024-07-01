import React, { useState, useEffect } from 'react';
import './ChatOutput.css';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Button from '@mui/joy/Button';
import Skeleton from '@mui/joy/Skeleton';

const formatTitleAndExtractRegisterNumber = (source) => {
  console.log('Source:', source);
  const parts = source.split('_');
  console.log('Source parts:', parts);

  // Extract Registernummer
  let registerNumber = parts[0];
  if (registerNumber && registerNumber.length >= 6) {
    registerNumber = `${registerNumber.substring(0, 3)}-${registerNumber.substring(4, 7)}`;
  } else {
    registerNumber = 'Unbekannt';
  }

  // Extract Entwicklungsstufe
  const entwicklungsstufe = parts[1];

  // Extract title (everything after the second underscore), preserving hyphens
  const formattedTitle = parts.slice(2).join(' ');

  return { formattedTitle, registerNumber, entwicklungsstufe };
};

const SourcesOutput = ({ sourceDocuments, isLoading }) => {
  const [showContentStates, setShowContentStates] = useState(Array(sourceDocuments.length).fill(false));

  useEffect(() => {
    console.log('Source documents updated:', sourceDocuments);
  }, [sourceDocuments]);

  // Print raw data for debugging
  console.log('Raw sourceDocuments:', sourceDocuments);
  console.log('Type of sourceDocuments:', typeof sourceDocuments);

  const renderValidityButton = (validity) => {
    return (
      <Button variant="soft" color={validity === 'Gültig' ? 'success' : 'danger'}>
        {validity}
      </Button>
    );
  };

  const toggleShowContent = (index) => {
    const updatedShowContentStates = [...showContentStates];
    updatedShowContentStates[index] = !updatedShowContentStates[index];
    setShowContentStates(updatedShowContentStates);
  };

  const renderSourceDocumentSkeleton = () => {
    return (
      <div style={{ marginBottom: '1rem' }}>
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
    );
  };

  const renderMetadataField = (label, value) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <Typography fontWeight="bold" component="span" style={{ marginRight: '0.5rem' }}>
        {label}:
      </Typography>
      {value}
    </div>
  );

  const renderSourceDocuments = () => {
    if (sourceDocuments && sourceDocuments.length > 0) {
      return sourceDocuments.map((doc, index) => {
        const { metadata } = doc;
        const { formattedTitle, registerNumber, entwicklungsstufe } = formatTitleAndExtractRegisterNumber(metadata?.Source || '');
        const { Gültigkeit, href: awmfRegisterUrl, Page, Fachgesellschaft } = metadata || {};

        const pages = Array.isArray(Page) ? Page.join(', ') : Page;

        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            {renderMetadataField('Gültigkeit', renderValidityButton(Gültigkeit))}
            {renderMetadataField('Entwicklungsstufe', entwicklungsstufe)}
            {renderMetadataField('Registernummer', awmfRegisterUrl ? (
              <Link href={awmfRegisterUrl} target="_blank" variant="outlined">
                {registerNumber}
              </Link>
            ) : (
              <span>{registerNumber}</span>
            ))}
            {renderMetadataField('Titel', formattedTitle)}
            {renderMetadataField('Seite (im PDF)', pages)}
            {Fachgesellschaft && renderMetadataField('Fachgesellschaften', Fachgesellschaft.join(', '))}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Typography fontWeight="bold" component="span" style={{ marginRight: '0.5rem' }}>
                Inhalt:
              </Typography>
              <Button onClick={() => toggleShowContent(index)} variant="outlined" size="small">
                Mehr Informationen
              </Button>
            </div>
            {showContentStates[index] && (
              <div style={{ marginTop: '0.5rem' }}>{doc.page_content}</div>
            )}
            <hr />
          </div>
        );
      });
    }
    return null;
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Card
        sx={{
          maxWidth: 1200,
          width: '95%',
          borderRadius: '16px',
          boxShadow: 3,
          bgcolor: 'primary.box',
        }}
      >
        <CardContent>
          <Typography level="title-md" sx={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Quellen
          </Typography>
          {isLoading ? (
            <>
              {renderSourceDocumentSkeleton()}
              {renderSourceDocumentSkeleton()}
            </>
          ) : sourceDocuments && sourceDocuments.length > 0 ? (
            <Typography variant="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
              {renderSourceDocuments()}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" component="div" sx={{ textAlign: 'justify' }}>
              Keine Quellen gefunden
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SourcesOutput;