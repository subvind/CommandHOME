<script lang="ts">
  import { onMount } from 'svelte';

  export let file: any;
  export let organization: any;
</script>


<div class="detail">
  {#if file}
    <br />
    <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${file.bucket.name}/${file.filename}`} alt="">
  {/if}
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }
  
  img {
    max-width: 100%;
  }
</style>