<script lang="ts">
  import { onMount } from "svelte";

  export let user: any;
  export let accountId: any = null;
  let instances: any = undefined;
  let account: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.sflsdbhjsdcbhjcdsbh');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      account = await response.json();
      accountname = account.accountname
      firstName = account.firstName
      lastName = account.lastName
      // email = account.email
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      M.updateTextFields();
    })
  })

  let accountname = ''
  let firstName = ''
  let lastName = ''
	// let email = ''
  let password = ''
  let passwordRepeat = ''

	async function submit(event: any) {
    event.preventDefault()

    if (accountname === '') return alert('Account name must be defined.');
    if (firstName === '') return alert('First name must be defined.')
    if (lastName === '') return alert('Last name must be defined.')
    // if (email === '') return alert('Email must be defined.')
    if (passwordRepeat !== password) return alert('Passwords must match.')
    
    loading = true 

    try {
      let auth: any = {}
      if (password) {
        auth.password = password
      }
      const response = await fetch(`https://api.subvind.com/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          accountname,
          firstName,
          lastName,
          // email,
          ...auth
        })
      });

      if (response.ok) {
        account = await response.json();
        window.location.reload()
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error registering account:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>EDIT ACCOUNT</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sflsdbhjsdcbhjcdsbh">
    <div class="modal-content">
      <h4>Settings</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="username" type="text" class="validate" bind:value={accountname}>
          <label for="username">Accountname</label>
        </div>
        <div class="input-field col s6">
          <input id="firstName" type="text" class="validate" bind:value={firstName}>
          <label for="firstName">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="lastName" type="text" class="validate" bind:value={lastName}>
          <label for="lastName">Last Name</label>
        </div>
        <!-- <div class="input-field col s12">
          <input id="email" type="email" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div> -->
        <br />
        <div class="input-field col s12">Leave these fields empty to make no changes to the account's password.</div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" bind:value={password}>
          <label for="password">Password</label>
        </div>
        <div class="input-field col s12">
          <input id="passwordRepeat" type="password" class="validate" bind:value={passwordRepeat}>
          <label for="passwordRepeat">Password Confirm</label>
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