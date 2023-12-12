import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname) {
    return {
      username: params.username,
      orgname: params.orgname,
    };
  }

  throw error(404, 'Not found');
}
