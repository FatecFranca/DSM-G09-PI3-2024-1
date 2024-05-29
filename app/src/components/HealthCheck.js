import React, { useEffect, useState } from 'react';

const HealthCheck = () => {
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/healthcheck');
                if (response.ok) {
                    const data = await response.json();
                    setStatus(`Status: ${data.status}`);
                } else {
                    setStatus('Error fetching data from the server.');
                }
            } catch (error) {
                setStatus('Error fetching data from the server.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>{status}</p>
        </div>
    );
};

export default HealthCheck;
