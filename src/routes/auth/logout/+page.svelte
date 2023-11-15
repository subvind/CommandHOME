<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    localStorage.setItem('access_token', '')
    window.location.href = '/'
  })
</script>
