<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let fileId: any = null;
  let instances: any = undefined;
  let file: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.dfjzhwbfsjhfesfsfsfefry');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/files/${fileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      file = await response.json();
      filename = file.filename
      width = file.width
      height = file.height
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      M.updateTextFields();
    }, 0)
  })

  let filename = ''
  let width = ''
  let height = ''

	async function submit(event: any) {
    event.preventDefault()

    if (filename === '') return alert('Filename must be defined.')
    if (width === '') return alert('Width must be defined.')
    if (height === '') return alert('Height be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/files/${fileId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          filename,
          width,
          height,
        }),
      });

      if (response.ok) {
        file = await response.json();
        window.location.reload()
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering file:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>EDIT FILE</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal dfjzhwbfsjhfesfsfsfefry">
    <div class="modal-content">
      <h4>Settings</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="filename" type="text" class="validate" bind:value={filename}>
          <label for="filename">Filename</label>
        </div>
        <div class="input-field col m6">
          <input id="width" type="text" class="validate" bind:value={width}>
          <label for="width">Width</label>
        </div>
        <div class="input-field col m6">
          <input id="height" type="text" class="validate" bind:value={height}>
          <label for="height">Height</label>
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
    min-height: 500px;
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