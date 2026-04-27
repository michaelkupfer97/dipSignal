"use client";

export function AdGateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="ad-title">
      <div className="modal">
        <h2 id="ad-title">Ad placeholder</h2>
        <p className="muted">
          Close this message to view today&apos;s S&amp;P 500 buy the dip indicator result.
        </p>
        <div className="ad-box">
          {/* Insert Google AdSense script or ad unit markup here after approval. */}
          Future Google AdSense placement
        </div>
        <button className="button" type="button" onClick={onClose}>
          Show results
        </button>
      </div>
    </div>
  );
}
