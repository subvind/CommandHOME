<script lang="ts">
  import { onMount } from "svelte";

  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = null;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.rthhyrthtfjuyjuyfr');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      M.updateTextFields();

      var elems1 = document.querySelectorAll('.datepicker1');
      var elems2 = document.querySelectorAll('.datepicker2');
      var instances = M.Datepicker.init(elems1, {
        format: 'yyyy-mm-dd',
        onSelect: function (date: any) {
          startAt = date;
        },
      });
      var instances = M.Datepicker.init(elems2, {
        format: 'yyyy-mm-dd',
        onSelect: function (date: any) {
          finishAt = date;
        },
      });
    }, 0)
  })

  let title = ''
  let startAt = ''
  let finishAt = ''
  let url = ''

	async function submit(event: any) {
    event.preventDefault()

    if (title === '') return alert('Showcase title must be defined.');
    if (startAt === '') return alert('Showcase Start At must be defined.');
    if (finishAt === '') return alert('Showcase Finish At must be defined.');

    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/showcases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          title,
          startAt,
          finishAt,
          url,
          organization: {
            id: organizationId
          }
        }),
      });

      if (response.ok) {
        let showcase = await response.json();
        window.location.href = `/${organization.owner.username}/${organization.orgname}/showcases/${showcase.id}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating showcase:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>CREATE SHOWCASE</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal rthhyrthtfjuyjuyfr">
    <div class="modal-content">
      <h4>Create Showcase</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" class="validate" bind:value={title}>
          <label for="title">title</label>
        </div>
        <div class="input-field col m6">
          <input id="startAt" type="text" class="datepicker1" bind:value={startAt}>
          <label for="startAt">Start At</label>
        </div>
        <div class="input-field col m6">
          <input id="finishAt" type="text" class="datepicker2" bind:value={finishAt}>
          <label for="finishAt">Finish At</label>
        </div>
        <div class="input-field col s12">
          <input id="url" type="text" class="validate" bind:value={url}>
          <label for="url">URL</label>
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
    width: 750px;
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