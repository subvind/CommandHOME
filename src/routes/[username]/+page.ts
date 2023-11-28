
import { error } from '@sveltejs/kit';
  
export function load({ params }: any) {
  if (params.username) {
    return {
      username: params.username
    };
  }
  
  throw error(404, 'Not found');
}