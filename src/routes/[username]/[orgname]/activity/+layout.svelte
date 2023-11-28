<script lang="ts">
  import { page } from '$app/stores';

  // You can access the slug parameter from $page.params
  let username = $page.params.username;
  let orgname = $page.params.orgname;
</script>

<slot></slot>

<style>
  :global(body) {
    background: #eee;
  }
</style>