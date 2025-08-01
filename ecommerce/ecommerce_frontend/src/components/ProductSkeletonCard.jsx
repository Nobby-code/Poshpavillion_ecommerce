import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeletonCard = () => {
  return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }}>
    <Skeleton height={200} />
    <div className="card-body">
      <h5 className="card-title">
        <Skeleton width={`80%`} />
      </h5>
      <p className="card-text">
        <Skeleton count={2} />
      </p>
      <Skeleton width={100} height={30} />
    </div>
  </div>
  )
}

export default ProductSkeletonCard