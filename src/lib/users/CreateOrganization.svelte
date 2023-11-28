<script lang="ts">
  import { onMount } from "svelte";

  export let userId: any = null;
  let instances: any = undefined;
  let user: any = null;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.jdfbuywxzqopmwef');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      user = await response.json();

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })

  let orgname = ''
  let displayName = ''

	async function submit(event: any) {
    event.preventDefault()

    if (orgname === '') return alert('orgname must be defined.')
    if (displayName === '') return alert('First name must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          orgname,
          displayName,
          owner: userId
        }),
      });

      if (response.ok) {
        let org = await response.json();
        window.location.href = `/${user.username}/${org.orgname}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating organization:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>CREATE ORGANIZATION</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal jdfbuywxzqopmwef">
    <div class="modal-content">
      <h4>Create Organization</h4>
      <br />
      <div class="row">
        <div class="input-field col s6">
          <input id="orgname" type="text" class="validate" bind:value={orgname}>
          <label for="orgname">Orgname</label>
          <span class="helper-text">Use all lowercase here. No spaces. Keep it less than 30 letters. Must start and end with a lowercase letter or number.</span>
        </div>
        <div class="input-field col s6">
          <input id="displayName" type="text" class="validate" bind:value={displayName}>
          <label for="displayName">Display Name</label>
          <span class="helper-text">Anything is allowed here.</span>
        </div>
        {#if orgname}
          <div class="col s12">
            <span>Catalog:</span><br />
            <a href={`https://${orgname}.erpnomy.subvind.com`} target="_blank">https://{orgname}.erpnomy.subvind.com</a>
            <br />
            <br />
          </div>
        {/if}
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