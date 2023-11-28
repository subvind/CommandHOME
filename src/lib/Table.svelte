<script lang="ts">
  import { onMount } from 'svelte';
  
  import * as gridjs from "gridjs";
  import "gridjs/dist/theme/mermaid.css";

  let loading: boolean = true;
  export let url: string = '/users';
  export let columns: any;
  export let limit: number = 10;
  export let sort: boolean;
  export let mapResultsFunc: any; 

  onMount(() => {
    let grid = new gridjs.Grid({
      columns: columns || ['Name', 'Email'],
      data: [],
      pagination: {
        limit: limit,
        server: {
          url: (prev, page, limit) => `${prev}?limit=${limit}&page=${page + 1}`
        }
      },
      search: {
        server: {
          url: (prev, keyword) => `${prev}?search=${keyword}&limit=${limit}&page=1#`
        }
      },
      sort: sort,
      server: {
        url: url, // Update this with your API endpoint
        then: res => res.data.map(mapResultsFunc), 
        total: res => res.total
      },
    })

    grid.render(document.getElementById(url));

    setTimeout(() => {
      loading = false
    }, 1000)
  });
</script>

<div id={`${url}`}></div>
{#if loading}
  <div class="progress red lighten-2">
    <div class="indeterminate teal lighten-2"></div>
  </div>
{/if}