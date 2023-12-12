<script lang="ts">
  import { onMount } from "svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://api.subvind.com/analytics/orgRelated/${organization.id}`;
  let limit: number = 25;
  let columns = [
    {
      id: 'id',
      name: 'Reference',
      width: '150px',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('div', {
          style: 'width: 70px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
        }, row.cells[0].data);
      }
    },
    {
      id: 'method',
      name: 'Method',
      width: '100px',
    },
    {
      id: 'url',
      name: 'Url',
      width: '500px',
    },
    {
      id: 'eventAt',
      name: 'Event At',
      width: '200px'
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.method,
      value.url,
      value.eventAt,
    ]
  }

</script>

<br />
<br />

<div class="container">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
</div>

<style>
  
</style>