import React, { useState } from 'react';
import DataFetcher2 from './dataFetcher2';
import YesterdayDataFetcher2 from './YesterdatDataFetcher2';

const AdDataTable = ({ yesterdayDate }) => {
  const [data, setData] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  const handleYesterdayDataFetched = (fetchedData) => {
    setYesterdayData(fetchedData);
  };

  const countTotalProductsInCart = (data) => {
    const addToCartActions = data?.actions?.find(action => action.action_type === 'omni_add_to_cart');
    return addToCartActions ? addToCartActions.value : 0;
  };

  const getValue = (actionType, data) => {
    const action = data?.actions?.find((action) => action.action_type === actionType);
    return action ? action.value : 0;
  };

  const getActionValue = (actionType, data) => {
    const actionValue = data?.action_values?.find((action) => action.action_type === actionType);
    return actionValue ? actionValue.value : 0;
  };

  const calculateROAS = (data) => {
    const purchases = getActionValue('purchase', data);
    const adSpend = data?.spend || 0;
    return adSpend > 0 ? (purchases / adSpend).toFixed(2) : 'N/A';
  };

  const formatCTR = (ctr) => {
    return ctr ? Number(ctr).toFixed(2) : '0.00';
  };

  const todayROAS = calculateROAS(data);
  const yesterdayROAS = calculateROAS(yesterdayData);

  return (
    <div className="p-4">
      <DataFetcher2 onDataFetched={handleDataFetched} />
      <YesterdayDataFetcher2 onDataFetched={handleYesterdayDataFetched} />
      {data && yesterdayData ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-600 text-center">
            <tr>
            <th className="px-6 py-3 border-b border-gray-300">Date</th>
              <th className="px-6 py-3 border-b border-gray-300">Campaign Name</th>
              <th className="px-6 py-3 border-b border-gray-300">Ad Spend</th>
              <th className="px-6 py-3 border-b border-gray-300">Reach</th>
              <th className="px-6 py-3 border-b border-gray-300">Impressions</th>
              <th className="px-6 py-3 border-b border-gray-300">CTR</th>
              <th className="px-6 py-3 border-b border-gray-300">Purchase ROAS</th>
              <th className="px-6 py-3 border-b border-gray-300">Products Added to Cart</th>
              <th className="px-6 py-3 border-b border-gray-300">Add to Cart Conversion Value</th>
              <th className="px-6 py-3 border-b border-gray-300">Purchases</th>
              <th className="px-6 py-3 border-b border-gray-300">Purchases Conversion Value</th>
              <th className="px-6 py-3 border-b border-gray-300">Link Clicks</th>
              <th className="px-6 py-3 border-b border-gray-300">Registration Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td className="px-6 py-3 border-b border-gray-300 text-center">Total since created</td>
         
              <td className="px-6 py-3 border-b border-gray-300 text-center">{data.campaign_name}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">${data.spend}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{data.reach}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{data.impressions}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{formatCTR(data.ctr)}%</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{todayROAS}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{countTotalProductsInCart(data)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">${getActionValue('omni_add_to_cart', data)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{getValue('purchase', data)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">${getActionValue('purchase', data)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{getValue('link_click', data)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">0</td>
            </tr>
            <tr>
            <td className="px-6 py-3 border-b border-gray-300 text-center">Yesterday ({yesterdayDate})</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{yesterdayData.campaign_name}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">${yesterdayData.spend}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{yesterdayData.reach}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{yesterdayData.impressions}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{formatCTR(yesterdayData.ctr)}%</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{yesterdayROAS}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{countTotalProductsInCart(yesterdayData)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">${getActionValue('omni_add_to_cart', yesterdayData)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{getValue('purchase', yesterdayData)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">${getActionValue('purchase', yesterdayData)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">{getValue('link_click', yesterdayData)}</td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">0</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AdDataTable;
