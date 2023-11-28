import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.bucketId) {
    return {
      username: params.username,
      orgname: params.orgname,
      bucketId: params.bucketId,
    };
  }

  throw error(404, 'Not found');
}
