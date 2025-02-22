import React from 'react';

const URLDetails = ({ url }) => {
    if (!url) {
        return <div>No URL provided</div>;
    }

    const { protocol, hostname, pathname } = new URL(url);

    return (
        <div>
            <h2>URL Details</h2>
            <p><strong>Protocol:</strong> {protocol}</p>
            <p><strong>Hostname:</strong> {hostname}</p>
            <p><strong>Pathname:</strong> {pathname}</p>
        </div>
    );
};

export default URLDetails;