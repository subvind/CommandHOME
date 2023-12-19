<script lang="ts">
  import Header from "$lib/accounts/Header.svelte"

  import { page } from '$app/stores';

  // You can access the slug parameter from $page.params
  let username = $page.params.username;
  let orgname = $page.params.orgname;
</script>

<Header username={username} orgname={orgname} />

<slot></slot>

<style>
  :global(body) {
    background: #eee;
  }
</style>