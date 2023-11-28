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
  <h5>Analytics, Notifications</h5>
  <p>This section of the application is still under construction.</p>
</div>


<style>
</style>