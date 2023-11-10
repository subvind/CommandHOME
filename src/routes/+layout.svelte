<script lang="ts">
  import { onMount } from "svelte";
  
  import { HeaderDefault } from "subvind-components"
  import SubHeader from "$lib/SubHeader.svelte"
  import Footer from "$lib/Footer.svelte"

  let organization: any;
	let backendHostname: any = '';

  onMount(async () => {
    backendHostname = window.location.hostname
    if (backendHostname === 'localhost') {
      backendHostname = 'desknomy.subvind.com'
    }
    const response = await fetch(`https://api.subvind.com/organizations/backendHostname/${backendHostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })
</script>

{#if organization}
  <HeaderDefault organization={organization} />
{:else}
  <nav class="grey darken-3">
    <div class="nav-wrapper">
    </div>
  </nav>
{/if}
<SubHeader />

<slot />

<Footer />


<style>
  :global(body) {
    background: #eee;
  }
</style>