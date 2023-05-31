import './LoadingSpinner.css'

export default function LoadingSpinner() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
        <p className='loading-info'>Few Api calls are happening in background to get active symbols, tick history and data will load as soon as api calls are success</p>
      </div>
    );
  }