<script lang="ts">
  import { onMount } from "svelte";

  export let userId: any = null;
  let instances: any = undefined;
  let user: any = undefined;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.sdcebryytpozdscqwm');
    instances = M.Modal.init(elems, {});

    const response = await fetch(`https://api.subvind.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      user = await response.json();
      username = user.username
      firstName = user.firstName
      lastName = user.lastName
      email = user.email
      twitter = user.twitter
      youtube = user.youtube

      setTimeout(() => {
        M.updateTextFields();
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })

  let username = ''
  let firstName = ''
  let lastName = ''
	let email = ''
  let twitter = ''
  let youtube = ''

	async function submit(event: any) {
    event.preventDefault()

    if (username === '') return alert('Username must be defined.')
    if (firstName === '') return alert('First name must be defined.')
    if (lastName === '') return alert('Last name must be defined.')
    if (email === '') return alert('Email must be defined.')
    
    loading = true

    try {
      const response = await fetch(`https://api.subvind.com/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          twitter,
          youtube
        }),
      });

      if (response.ok) {
        user = await response.json();
        window.location.reload()
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>EDIT USER</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal sdcebryytpozdscqwm">
    <div class="modal-content">
      <h4>Settings</h4>
      <br />
      <div class="row">
        <div class="input-field col s12">
          <input id="username" type="text" class="validate" bind:value={username}>
          <label for="username">Username</label>
        </div>
        {#if username}
          <div class="col s12">
            <span>Profile:</span><br />
            <a href={`https://erpnomy.subvind.com/${username}`} target="_blank">https://erpnomy.subvind.com/{username}</a>
            <br />
            <br />
          </div>
        {/if}
        <div class="input-field col s6">
          <input id="firstName" type="text" class="validate" bind:value={firstName}>
          <label for="firstName">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="lastName" type="text" class="validate" bind:value={lastName}>
          <label for="lastName">Last Name</label>
        </div>
        <div class="input-field col s6">
          <input id="twitter" type="text" class="validate" bind:value={twitter}>
          <label for="twitter">Twitter</label>
          <span class="helper-text">The Twitter url slug of the user.</span>
        </div>
        <div class="input-field col s6">
          <input id="youtube" type="text" class="validate" bind:value={youtube}>
          <label for="youtube">YouTube</label>
          <span class="helper-text">The YouTube url slug of the user.</span>
        </div>
        {#if twitter}
          <div class="col s12">
            <span>Twitter:</span><br />
            <a href={`https://twitter.com/${twitter}`} target="_blank">https://twitter.com/{twitter}</a>
            <br />
            <br />
          </div>
        {/if}
        {#if youtube}
          <div class="col s12">
            <span>YouTube:</span><br />
            <a href={`https://youtube.com/${youtube}`} target="_blank">https://youtube.com/{youtube}</a>
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