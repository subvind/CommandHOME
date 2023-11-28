<script lang="ts">
  import { onMount } from 'svelte';

  export let data
  let organization: any;

  onMount(async () => {

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      alignment: 'right'
    });
    
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
      <a href="#" class="brand-logo white-text">About</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

    </div>
    <a href="#" data-target='dropdown1' class="btn-floating btn-large waves-effect waves-light black dropdown-trigger right" style="margin-top: -1.9em;"><i class="material-icons">more_vert</i></a>
    <!-- Dropdown Structure -->
    <ul id='dropdown1' class='dropdown-content'>
      <li><a href="#!">create new</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">JSON import</a></li>
      <li><a href="#!">JSON export</a></li>
      <li class="divider" tabindex="-1"></li>
      <li><a href="#!">documentation</a></li>
      <li><a href="#!">pricing</a></li>
    </ul>
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
  nav {
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 3px 5px 0 rgba(0,0,0,0.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 3px 5px 0 rgba(0,0,0,0.2);
  }

  .dropdown-content {
    width: 200px !important;
  }
</style>