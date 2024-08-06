import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YesterdayDataFetcher2 = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Get today's date
      const today = new Date();
      
      // Calculate yesterday's date
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // Manually format the date as YYYY-MM-DD
      const formattedDate = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      try {
        const response = await axios.get(
          'https://graph.facebook.com/v19.0/120213323602500066/insights',
          {
            params: {
              access_token: 'EAALUZCHCXPvcBO5HT4J2sZChVvxlM6pwH8X3UifCmZCQHjcQAR9Bu1kU8a9W9Iy26ZB5slJV2BaShjZAX3fQ3WeJeWB1w3hmZBkcatoodx30ZA28DV7E8CdBa1OElWyG3HhG4a0XCwtGZBtfitsuoxn69ZC8i37qZBDoXd7XOchd2fUk0FCamL29TSE2EOmc6wGVZAe2F5lexYZD',
              fields: 'spend,actions,action_values,cost_per_action_type,date_start,date_stop,reach,impressions,ctr,campaign_name',
              time_range: JSON.stringify({ since: formattedDate, until: formattedDate }),
             
            },
          }
        );

        if (response.data.data && response.data.data.length > 0) {
          onDataFetched(response.data.data[0]);
        } else {
          console.error('No data found for yesterday');
        }
      } catch (error) {
        console.error('Error fetching yesterday\'s data:', error);
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

export default YesterdayDataFetcher2;
