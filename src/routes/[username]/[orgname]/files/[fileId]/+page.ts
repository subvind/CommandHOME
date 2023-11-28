import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.fileId) {
    return {
      username: params.username,
      orgname: params.orgname,
      fileId: params.fileId,
    };
  }

  throw error(404, 'Not found');
}
