<script lang="ts">
  import { onMount } from "svelte";

  import CreateOrganization from "./CreateOrganization.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let user: any;
  let sort: boolean = true;
  let url: string = `https://api.subvind.com/organizations/userRelated/${user.id}`;
  let limit: number = 25;
  let columns = [
    {
      id: 'id',
      name: 'Reference',
      width: '150px',
      sort: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('div', {
          style: 'width: 70px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
        }, row.cells[0].data);
      }
    },
    {
      id: 'displayName',
      width: '200px',
      name: 'Name'
    },
    {
      id: 'store',
      name: 'Store',
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `https://${row.cells[2].data}.erpnomy.subvind.com`,
          target: "_blank",
          className: '',
        }, `${row.cells[2].data}.erpnomy.subvind.com`);
      }
    },
    {
      id: 'createdAt',
      name: 'Created At',
      width: '200px',
    },
    { 
      id: 'view',
      name: '',
      width: '150px',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `/${user.username}/${row.cells[2].data}/defaultOrganization`,
          target: "_self",
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'DEFAULT');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.displayName,
      value.orgname,
      value.createdAt
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if user}
    <CreateOrganization userId={user.id} />
  {/if}
</div>

<style>
  .table {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>