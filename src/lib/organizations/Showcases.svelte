<script lang="ts">
  import { onMount } from "svelte";

  import CreateShowcase from "./CreateShowcase.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://api.subvind.com/showcases/orgRelated/${organization.id}`;
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
      id: 'title',
      name: 'Title',
      width: '200px',
    },
    {
      id: 'startAt',
      name: 'Start At',
      width: '200px',
    },
    {
      id: 'finishAt',
      name: 'Finish At',
      width: '200px',
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
          href: `/${organization.owner.username}/${organization.orgname}/showcases/${row.cells[0].data}`,
          target: "_self",
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.title,
      value.startAt,
      value.finishAt,
      value.createdAt,
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if organization}
    <CreateShowcase organizationId={organization.id} />
  {/if}
</div>

<style>
  .table {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>