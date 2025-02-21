import React from 'react';
import PropTypes from 'prop-types';

const SkeletonLoader = ({ type = 'card' }) => {
  const cardSkeleton = (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 rounded-lg h-40"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 h-4 rounded"></div>
        <div className="bg-gray-200 h-4 rounded w-5/6"></div>
        <div className="bg-gray-200 h-4 rounded w-2/3"></div>
      </div>
    </div>
  );

  const mediaSkeleton = (
    <div className="animate-pulse space-y-6">
      <div className="bg-gray-200 h-8 w-48 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-200 h-6 w-32 rounded"></div>
          <div className="bg-gray-200 h-48 rounded-lg"></div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-200 h-6 w-32 rounded"></div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 rounded"></div>
            <div className="bg-gray-200 h-4 rounded"></div>
            <div className="bg-gray-200 h-4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {type === 'card' ? cardSkeleton : mediaSkeleton}
    </div>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['card', 'media'])
};

export default SkeletonLoader;
