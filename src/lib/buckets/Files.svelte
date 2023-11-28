<script lang="ts">
  import { onMount } from "svelte";

  import UploadFile from "../organizations/UploadFile.svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let bucket: any;
  export let organization: any;
  let sort: boolean = true;
  let url: string = `https://api.subvind.com/files/bucketRelated/${bucket.id}`;
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
      id: 'photo',
      name: 'Photo',
      width: '150px',
      formatter: (cell: any, row: any) => {
        return gridjs.h('img', {
          src: `https://s3.us-east-2.amazonaws.com/${bucket.organization.orgname}.${row.cells[3].data}/${row.cells[2].data}`,
          alt: "",
          style: 'max-height: 100px; max-width: 100px;',
        }, 'VIEW');
      }
    },
    {
      id: 'filename',
      name: 'Filename',
      width: '300px',
    },
    {
      id: 'bucket',
      name: 'Bucket',
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
          href: `/${organization.owner.username}/${organization.orgname}/files/${row.cells[2].data}`,
          target: "_self",
          className: 'btn btn-small yellow black-text lighten-2 right',
        }, 'VIEW');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.filename,
      value.filename,
      value.bucket.name,
      value.createdAt
    ]
  }
</script>

<div class="table">
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if bucket}
    <UploadFile organizationId={organization.id} />
  {/if}
</div>

<style>
  .table {
    margin: 0 1em;
    padding-bottom: 1em;
  }
</style>