<script lang="ts">
  import { onMount } from 'svelte';

  export let data
  let organization: any;

  onMount(async () => {
    /**
     * fetch org
     */
    const responseOrg = await fetch(`https://api.subvind.com/organizations/orgname/${data.orgname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }
  })
</script>

<nav class="nav-extended grey darken-4">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Customers</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </div>
</nav>

<div class="container">
  {#if organization}
    <!-- <Products organization={organization} /> -->
    <br />
    <br />
    <br />
    <h5>Coming soon...</h5>
    <p>This section of the application is still under construction.</p>
  {/if}
</div>

<style>
</style>