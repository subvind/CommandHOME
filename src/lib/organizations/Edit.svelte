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
      contactCenterEmail = organization.contactCenterEmail
      privacyPolicy = organization.privacyPolicy
      termsAndConditions = organization.termsAndConditions

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
  let homepageLink = ''
  let contactCenterEmail = ''
  let privacyPolicy = ''
  let termsAndConditions = ''

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
          homepageLink,
          contactCenterEmail,
          privacyPolicy,
          termsAndConditions,
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
      <h4>Edit Organization</h4>
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