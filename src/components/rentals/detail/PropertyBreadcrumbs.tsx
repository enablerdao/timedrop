
import React from 'react';
import { Property } from '@/data/properties';

interface PropertyBreadcrumbsProps {
  property: Property | null;
}

const PropertyBreadcrumbs = ({ property }: PropertyBreadcrumbsProps) => {
  return (
    <div className="bg-white border-b border-timedrop-gray/50">
      <div className="page-container py-4">
        <nav className="flex text-sm text-timedrop-muted-gray">
          <a href="/" className="hover:text-timedrop-primary">ホーム</a>
          <span className="mx-2">/</span>
          <a href="/rentals" className="hover:text-timedrop-primary">民泊一覧</a>
          <span className="mx-2">/</span>
          <span className="text-timedrop-dark-gray line-clamp-1">{property?.name || '物件詳細'}</span>
        </nav>
      </div>
    </div>
  );
};

export default PropertyBreadcrumbs;
