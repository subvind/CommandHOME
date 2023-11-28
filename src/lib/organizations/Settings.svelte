<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let organizationId: any = null;
  let instances: any = undefined;
  let organization: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdcebryytpozdscqwm');
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
      displayName = organization.displayName
      homepageLink = organization.homepageLink
      description = organization.description
      shortName = organization.shortName
      isErpModule = organization.isErpModule
      isTubeModule = organization.isTubeModule
      isDeskModule = organization.isDeskModule
      erpHostname = organization.erpHostname
      tubeHostname = organization.tubeHostname
      deskHostname = organization.deskHostname
      contactCenterEmail = organization.contactCenterEmail
      privacyPolicy = organization.privacyPolicy
      termsAndConditions = organization.termsAndConditions
      ebayUser = organization.ebayUser
      etsyShop = organization.etsyShop
      youtubeChannel = organization.youtubeChannel

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
  let shortName = ''
  let description = ''
  let isErpModule: boolean = true;
  let isTubeModule: boolean = true;
  let isDeskModule: boolean = true;
	let erpHostname = ''
	let tubeHostname = ''
	let deskHostname = ''
  let homepageLink = ''
  let contactCenterEmail = ''
  let privacyPolicy = ''
  let termsAndConditions = ''
  let ebayUser = ''
  let etsyShop = ''
  let youtubeChannel = ''

	async function submit(event: any) {
    event.preventDefault()

    if (orgname === '') return alert('Username must be defined.')
    if (displayName === '') return alert('First name must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organizationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          orgname,
          displayName,
          shortName,
          description,
          isErpModule,
          isTubeModule,
          isDeskModule,
          erpHostname,
          tubeHostname,
          deskHostname,
          homepageLink,
          contactCenterEmail,
          privacyPolicy,
          termsAndConditions,
          ebayUser,
          etsyShop,
          youtubeChannel
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
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>EDIT ORGANIZATION</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdcebryytpozdscqwm">
    <div class="modal-content">
      <h4>Settings</h4>
      <br />
      <div class="row">
        <div class="input-field col s6">
          <input id="orgname" type="text" class="validate" bind:value={orgname}>
          <label for="orgname">Orgname</label>
          <span class="helper-text">Use all lowercase here. No spaces. Keep it less than 30 letters. Must start and end with a lowercase letter or number.</span>
        </div>
        <div class="input-field col s6">
          <input id="shortName" type="text" class="validate" bind:value={shortName}>
          <label for="shortName">Short Name</label>
          <span class="helper-text">Shown when the navigation bar opens. Must be less than 200px.</span>
        </div>
        <div class="input-field col s12">
          <input id="displayName" type="text" class="validate" bind:value={displayName}>
          <label for="displayName">Display Name</label>
          <span class="helper-text">Anything is allowed here.</span>
        </div>
        <div class="input-field col s12">
          <input id="description" type="text" class="validate" bind:value={description}>
          <label for="description">Description</label>
          <span class="helper-text">Shown when the navigation bar opens directly under the title.</span>
        </div>
        <div class="input-field col s12">
          <input id="erpHostname" type="text" class="validate" bind:value={homepageLink}>
          <label for="erpHostname">Homepage Link</label>
          <span class="helper-text">Should be a valid browser domain url including https://.</span>
        </div>
        {#if orgname}
          <div class="col s12">
            <span>µSaaS Modules:</span><br />
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
            <a href={`https://${orgname}.tubenomy.com`} target="_blank">https://{orgname}.tubenomy.com</a>
            <br />
            <label>
              <input type="checkbox" bind:checked={isDeskModule}>
              <span>Enable DESK</span>
            </label>
            <br />
            <a href={`https://${orgname}.desknomy.com`} target="_blank">https://{orgname}.desknomy.com</a>
          </div>
        {/if}
        <div class="col s12">
          <p>
            *NOTICE: The following hostnames require additional configuration in order to work. We have settings that need to be manually changed on our end that we have yet to automate. So go ahead and open up a support ticket with us and we'll get you squared away.
          </p>
        </div>
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
        {#if erpHostname}
          <div class="col s12">
            <span>Bolt-ons:</span><br />
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
        {/if}
        <div class="input-field col s12">
          <input id="contactCenterEmail" type="text" class="validate" bind:value={contactCenterEmail}>
          <label for="contactCenterEmail">Contact Center Email</label>
          <span class="helper-text">An email that users should use in order to contact this organization.</span>
        </div>
        <div class="input-field col s12">
          <textarea id="privacyPolicy" class="materialize-textarea" bind:value={privacyPolicy}></textarea>
          <label for="privacyPolicy">Privacy Policy</label>
          <span class="helper-text">For instance, "Everyone needs to respect one another."</span>
        </div>
        <div class="input-field col s12">
          <textarea id="termsAndConditions" class="materialize-textarea" bind:value={termsAndConditions}></textarea>
          <label for="termsAndConditions">Terms & Conditions</label>
          <span class="helper-text">For instance, "Everyone needs to behave."</span>
        </div>
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