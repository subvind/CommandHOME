<script lang="ts">
  
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let username;
  let orgname;

  onMount(() => {
    username = $page.params.username;
    orgname = $page.params.orgname;
  });
</script>

<br />
<div class="container">
  <h5>Accounts</h5>
  <p>dashboard goes here...</p>
</div>


<style>
</style>