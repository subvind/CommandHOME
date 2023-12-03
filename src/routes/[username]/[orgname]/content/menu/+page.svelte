<script lang="ts">
  import { onMount } from 'svelte';
  
  import Code from '$lib/Code.svelte';

  export let data
  let organization: any;
  let original: string = '';
  let menu: string = '';
  let example: string = '';
  let loading: boolean = false;
  let preview: any = [];

  $: try {
    preview = JSON.parse(menu) || [];
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

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

      original = JSON.stringify(organization.menu, null, 2);
      menu = JSON.stringify(organization.menu, null, 2);
      example = JSON.stringify([
        {
          "icon": "home",
          "name": "Homepage",
          "url": "/"
        },
        {
          "icon": "local_phone",
          "name": "Contact Center",
          "url": "/contact-center"
        }
      ], null, 2);

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }
  })

	async function submit(event: any) {
    event.preventDefault()

    if (menu === '') return alert('Menu must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organization.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          menu: preview,
        }),
      });

      if (response.ok) {
        organization = await response.json();
        window.location.reload()
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering organization:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<nav class="nav-extended grey darken-4">
  <div class="container">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo white-text">Menu</a>
    </div>
  </div>
</nav>
<div class="container">
  <br />
  <br />
  <a href="https://materializecss.com/icons.html" target="_blank" class="btn blue darken-2 right">Material Design Icons</a>
  <h4 style="margin: 0;">json:</h4>
  <br />
    <Code bind:text={menu} lang="json" />
    <br />
    <br />
    <a href="#" class="btn blue darken-2 right" on:click={() => { menu = example }}>Load Example</a>
    <h4 style="margin: 0;">preview:</h4>
    <br />
    <div class="card">
      <table>
        <thead>
          <tr>
            <th style="padding: 1em;">Icon</th>
            <th>Name</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {#each preview as item}
            <tr>
              <td style="padding: 1em 1em 0.5em;"><i class="material-icons">{item.icon}</i></td>
              <td>{item.name}</td>
              <td>{item.url}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  <form on:submit={(e) => submit(e)}>
    <a href="#" class="waves-effect btn grey" on:click={() => { menu = original }}>Reset</a>
    {#if loading}
      <button class="waves-effect btn disabled">Loading</button>
    {:else}
      <button type='submit' class="waves-effect btn blue darken-2">Submit</button>
    {/if}
  </form>
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