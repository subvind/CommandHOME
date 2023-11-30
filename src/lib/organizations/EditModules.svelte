<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.dshcbsdcjhbscbddcks');
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
      isHomeModule = organization.isHomeModule
      isErpModule = organization.isErpModule
      isTubeModule = organization.isTubeModule
      isDeskModule = organization.isDeskModule
      homeHostname = organization.homeHostname
      erpHostname = organization.erpHostname
      tubeHostname = organization.tubeHostname
      deskHostname = organization.deskHostname

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

  })

  let orgname = ''
  let isHomeModule: boolean = true;
  let isErpModule: boolean = true;
  let isTubeModule: boolean = true;
  let isDeskModule: boolean = true;
	let homeHostname = ''
	let erpHostname = ''
	let tubeHostname = ''
	let deskHostname = ''

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
          isHomeModule,
          isErpModule,
          isTubeModule,
          isDeskModule,
          homeHostname,
          erpHostname,
          tubeHostname,
          deskHostname,
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
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>EDIT micro SaaS Modules</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal dshcbsdcjhbscbddcks">
    <div class="modal-content">
      <h4>Edit µSaaS Modules</h4>
      <br />
      <div class="row">
        <div class="col s12">
          <label>
            <input type="checkbox" bind:checked={isHomeModule}>
            <span>Enable HOME</span>
          </label>
          <br />
          <a href={`https://${orgname}.homenomy.subvind.com`} target="_blank">https://{orgname}.homenomy.subvind.com</a>
          <br />
          <label>
            <input type="checkbox" bind:checked={isErpModule}>
            <span>Enable ERP</span>
          </label>
          <br />
          <a href={`https://${orgname}.erpnomy.subvind.com`} target="_blank">https://{orgname}.erpnomy.subvind.com</a>
          <br />
          <label>
            <input type="checkbox" bind:checked={isTubeModule}>
            <span>Enable TUBE</span>
          </label>
          <br />
          <a href={`https://${orgname}.tubenomy.subvind.com`} target="_blank">https://{orgname}.tubenomy.subvind.com</a>
          <br />
          <label>
            <input type="checkbox" bind:checked={isDeskModule}>
            <span>Enable DESK</span>
          </label>
          <br />
          <a href={`https://${orgname}.desknomy.subvind.com`} target="_blank">https://{orgname}.desknomy.subvind.com</a>
        </div>
        <div class="col s12">
          <p>
            *NOTICE: The following hostnames require additional configuration in order to work. We have settings that need to be manually changed on our end that we have yet to automate. So go ahead and open up a support ticket with us and we'll get you squared away.
          </p>
        </div>
        {#if isHomeModule}
          <div class="input-field col s12">
            <input id="homeHostname" type="text" class="validate" bind:value={homeHostname}>
            <label for="homeHostname">HOME Hostname*</label>
            <span class="helper-text">Should be a valid browser domain name. May include sub domain.</span>
          </div>
        {/if}
        {#if isErpModule}
          <div class="input-field col s12">
            <input id="erpHostname" type="text" class="validate" bind:value={erpHostname}>
            <label for="erpHostname">ERP Hostname*</label>
            <span class="helper-text">Should be a valid browser domain name. May include sub domain.</span>
          </div>
        {/if}
        {#if isTubeModule}
          <div class="input-field col s12">
            <input id="tubeHostname" type="text" class="validate" bind:value={tubeHostname}>
            <label for="tubeHostname">TUBE Hostname*</label>
            <span class="helper-text">Should be a valid browser domain name. May include sub domain.</span>
          </div>
        {/if}
        {#if isDeskModule}
          <div class="input-field col s12">
            <input id="deskHostname" type="text" class="validate" bind:value={deskHostname}>
            <label for="deskHostname">DESK Hostname*</label>
            <span class="helper-text">Should be a valid browser domain name. May include sub domain.</span>
          </div>
        {/if}
        <div class="col s12">
          <span>Bolt-ons:</span><br />
          {#if isHomeModule}
            <a href={`https://${homeHostname}`} target="_blank">https://{homeHostname}</a> --> HOME
            <br />
          {/if}
          {#if isErpModule}
            <a href={`https://${erpHostname}`} target="_blank">https://{erpHostname}</a> --> ERP
            <br />
          {/if}
          {#if isTubeModule}
            <a href={`https://${tubeHostname}`} target="_blank">https://{tubeHostname}</a> --> TUBE
            <br />
          {/if}
          {#if isDeskModule}
            <a href={`https://${deskHostname}`} target="_blank">https://{deskHostname}</a> --> DESK
            <br />
          {/if}
          <br />
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