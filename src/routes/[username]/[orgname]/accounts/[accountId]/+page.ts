import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.accountId) {
    return {
      username: params.username,
      orgname: params.orgname,
      accountId: params.accountId,
    };
  }

  throw error(404, 'Not found');
}
