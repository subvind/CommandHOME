<script lang="ts">
  import { onMount } from 'svelte';
  
  import Accounts from '$lib/accounts/Accounts.svelte';
  
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

<nav class="nav-extended green darken-3">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Employees</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </div>
</nav>

<br />

<div class="container">
  {#if organization}
    <Accounts organization={organization} type="employee" />
  {/if}
</div>

<style>
</style>