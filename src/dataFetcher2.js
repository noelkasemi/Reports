import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher2 = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://graph.facebook.com/v19.0/120213323602500066/insights',
          {
            params: {
              access_token: 'EAALUZCHCXPvcBO5HT4J2sZChVvxlM6pwH8X3UifCmZCQHjcQAR9Bu1kU8a9W9Iy26ZB5slJV2BaShjZAX3fQ3WeJeWB1w3hmZBkcatoodx30ZA28DV7E8CdBa1OElWyG3HhG4a0XCwtGZBtfitsuoxn69ZC8i37qZBDoXd7XOchd2fUk0FCamL29TSE2EOmc6wGVZAe2F5lexYZD',
              fields: 'spend,actions,action_values,cost_per_action_type,date_start,date_stop,reach,impressions,ctr,campaign_name',
              time_range: JSON.stringify({ since: '2024-08-05', until: '2024-08-05' }),
            },
          }
        );

        if (response.data.data && response.data.data.length > 0) {
          onDataFetched(response.data.data[0]);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onDataFetched]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default DataFetcher2;
