<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.sfdlfhsdfshldkjlsdkjhsl');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
      orgname = organization.orgname
      ebayUser = organization.ebayUser
      etsyShop = organization.etsyShop
      youtubeChannel = organization.youtubeChannel
      twitterUser = organization.twitterUser
      githubUser = organization.githubUser

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

  })

  let orgname = ''
  let ebayUser = ''
  let etsyShop = ''
  let youtubeChannel = ''
  let twitterUser = ''
  let githubUser = ''

	async function submit(event: any) {
    event.preventDefault()

    // if (orgname === '') return alert('Username must be defined.')
    // if (displayName === '') return alert('First name must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          ebayUser,
          etsyShop,
          youtubeChannel,
          twitterUser,
          githubUser
        }),
      });

      if (response.ok) {
        organization = await response.json();
        window.location.href = `/${user.username}/${organization.orgname}`
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

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>EDIT Social Links</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sfdlfhsdfshldkjlsdkjhsl">
    <div class="modal-content">
      <h4>Edit Social Links</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="ebayUser" type="text" class="validate" bind:value={ebayUser}>
          <label for="ebayUser">eBay User</label>
          <span class="helper-text">https://www.ebay.com/usr/{ebayUser}</span>
        </div>
        <div class="input-field col s12">
          <input id="etsyShop" type="text" class="validate" bind:value={etsyShop}>
          <label for="etsyShop">Etsy Shop</label>
          <span class="helper-text">https://www.etsy.com/shop/{etsyShop}</span>
        </div>
        <div class="input-field col s12">
          <input id="youtubeChannel" type="text" class="validate" bind:value={youtubeChannel}>
          <label for="youtubeChannel">YouTube Channel</label>
          <span class="helper-text">https://youtube.com/{youtubeChannel}</span>
        </div>
        <div class="input-field col s12">
          <input id="twitterUser" type="text" class="validate" bind:value={twitterUser}>
          <label for="twitterUser">Twitter User</label>
          <span class="helper-text">https://twitter.com/{twitterUser}</span>
        </div>
        <div class="input-field col s12">
          <input id="githubUser" type="text" class="validate" bind:value={githubUser}>
          <label for="githubUser">GitHub User</label>
          <span class="helper-text">https://github.com/{githubUser}</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="waves-effect waves-black btn-flat" on:click={(e) => { e.preventDefault(); instances[0].close(); }}>Cancel</button>
      {#if loading}
        <button class="waves-effect btn disabled">Loading</button>
      {:else}
        <button type='submit' class="waves-effect btn yellow black-text lighten-2">Submit</button>
      {/if}
    </div>
  </div>
</form>

<style>
  .modal {
    color: #333;
    width: 500px;
  }

  .row {
    margin-bottom: 0;
  }

  :global(nav) .modal .input-field {
    margin: 1em 0;
    height: 100%;
  }

  :global(nav) .modal .input-field input {
    border-bottom: 1px solid;
  }
</style>