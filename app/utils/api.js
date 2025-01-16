
import { API_BASE_URL } from './config'; // Adjust the path accordingly

export const fetchBlockSettings = async () => {
    const response = await fetch(`${API_BASE_URL}/block/settings`);
    const data = await response.json();
    return data.body; // Returning only the 'body' of the response
  };
  
  export const submitBlockData = async (selectedBlocks) => {
    const response = await fetch(`${API_BASE_URL}/block`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        block_data: {
          blocks: selectedBlocks,
        },
      }),
    });
  
    const data = await response.json();
    return data;
  };
  