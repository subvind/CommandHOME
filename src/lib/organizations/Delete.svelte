<script lang="ts">
	import { onMount } from "svelte";

  export let organization: any;
  let instances: any = undefined;
	let loading: boolean = false;
  let confirm: string = '';
	
	async function submit(event: any) {
    event.preventDefault()
    
    if (confirm !== `delete ${organization.orgname}`) return alert('Confirm must be valid.')

    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organization.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // 200 success
				alert('Organization deleted successfully.')
        window.location.href = `/organizations`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error deleting organization:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }

	onMount(async () => {
    var elems = document.querySelectorAll('.sdjfalfsdhfalsfdhbsldhj');
    instances = M.Modal.init(elems, {});
	})
</script>


<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>DELETE ORGANIZATION</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdjfalfsdhfalsfdhbsldhj">
    <div class="modal-content">
      <h4>Delete</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="confirm" type="text" class="validate" bind:value={confirm}>
          <label for="confirm">Confirm</label>
          <span class="helper-text">Type the phrase "delete {organization.orgname}" to remove this organization.</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      {#if loading}
        <button style="" class="waves-effect btn disabled">Loading</button>
      {:else}
        <button style="" class="waves-effect yellow black-text lighten-2 btn" on:click={submit}>delete organization</button>
      {/if}
    </div>
  </div>
</form>

<style>
  .modal {
    color: #333;
    width: 500px;
  }
</style>