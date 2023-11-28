<script lang="ts">
  import { onMount } from "svelte";

  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = null;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.jdfbuywxzqopmwef');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })

  let name = ''

  function isValidS3BucketName(name: any) {
    const regex = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;

    return regex.test(name);
  }

	async function submit(event: any) {
    event.preventDefault()

    if (name === '') return alert('Bucket name must be defined.');
    if (!isValidS3BucketName(name)) return alert('Invalid bucket name. Please follow S3 naming standards.');

    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/buckets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          name,
          organization: {
            id: organizationId
          }
        }),
      });

      if (response.ok) {
        let bucket = await response.json();
        window.location.href = `/${organization.owner.username}/${organization.orgname}/buckets/${bucket.name}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating bucket:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>CREATE BUCKET</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal jdfbuywxzqopmwef">
    <div class="modal-content">
      <h4>Create Bucket</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" bind:value={name}>
          <label for="name">name</label>
          <span class="helper-text">Must be less than 30 characters in length. Can only contain lowercase letters, numbers, hyphens, and periods. Must start and end with a lowercase letter or number.</span>
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