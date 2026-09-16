import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Branch } from '../../lib/supabase';

interface BranchSEOProps {
  branch: Branch;
  title: string;
  description: string;
  path?: string;
}

const BranchSEO: React.FC<BranchSEOProps> = ({ branch, title, description, path }) => {
  const fullTitle = `${title} | ${branch.branch_name}`;
  const url = `https://ecg-usa.org${path ? path : `/maine`}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default BranchSEO;
