<script lang="ts">
  import { onMount } from "svelte";

  import CreateBucket from "./CreateBucket.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://api.subvind.com/buckets/orgRelated/${organization.id}`;
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
      id: 'name',
      name: 'Name'
    },
    {
      id: 'createdAt',
      name: 'Created At',
      width: '200px',
    },
    { 
      id: 'view',
      name: '',
      width: '100px',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `/${organization.owner.username}/${organization.orgname}/buckets/${row.cells[1].data}`,
          target: "_self",
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.name,
      value.createdAt
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if organization}
    <CreateBucket organizationId={organization.id} />
  {/if}
</div>

<style>
  .table {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>