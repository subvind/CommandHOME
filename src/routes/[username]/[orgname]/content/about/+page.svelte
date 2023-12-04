<script lang="ts">
  import { onMount } from 'svelte';

  import 'bytemd/dist/index.css'
  import { Editor, Viewer } from 'bytemd'
  import gfm from '@bytemd/plugin-gfm'

  let original: any = '';
  let value: any = '';
  const plugins = [
    gfm(),
    // Add more plugins here
  ]

  function handleChange(e: any) {
    value = e.detail.value
  }

  export let data
  let organization: any;
  let loading: boolean = false;

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

      original = organization.about
      value = organization.about

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
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organization.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          about: value,
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
      <a href="#" class="brand-logo white-text">About</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </div>
</nav>

<div class="container">
  <br />
  <br />
  <h4 style="margin: 0;">markdown:</h4>
  <br />
  <Editor {value} {plugins} on:change={handleChange} />
  <!-- <Viewer {value} {plugins} /> -->
  <br />
  <form on:submit={(e) => submit(e)}>
    <a href="#" class="waves-effect btn grey" on:click={() => { value = original }}>Reset</a>
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

  :global(.bytemd) {
    height: calc(100vh - 200px);
  }
</style>