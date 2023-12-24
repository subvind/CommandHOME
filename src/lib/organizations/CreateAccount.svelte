<script lang="ts">
  import { onMount } from "svelte";

  export let organizationId: any = null;
  let instances: any = undefined;
  let instances2: any = undefined;
  let organization: any = null;
  let loading: boolean = false;

  onMount(async () => {
    var elems = document.querySelectorAll('.esfjhbsefbshfsjdhf');
    instances = M.Modal.init(elems, {});

    var elems2 = document.querySelectorAll('select');
    instances2 = M.FormSelect.init(elems2, {});

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

  let accountname = ''
  let firstName = ''
  let lastName = ''
	let email = ''
  let password = ''
  let passwordRepeat = ''
  let memberStatus = ''
  let customerStatus = ''
  let employeeStatus = ''
  let supplierStatus = ''
  let subscriberStatus = ''
  let clientStatus = ''

	async function submit(event: any) {
    event.preventDefault()

    if (accountname === '') return alert('Account name must be defined.');
    if (firstName === '') return alert('First name must be defined.')
    if (lastName === '') return alert('Last name must be defined.')
    if (email === '') return alert('Email must be defined.')
    if (password === '') return alert('Password must be defined.')
    if (passwordRepeat === '') return alert('Confirm Password must be defined.')
    if (passwordRepeat !== password) return alert('Passwords must match.')
    if (memberStatus === '') return alert('Member status must be defined.')
    if (customerStatus === '') return alert('Customer status must be defined.')
    if (employeeStatus === '') return alert('Employee status must be defined.')
    if (supplierStatus === '') return alert('Supplier status must be defined.')
    if (subscriberStatus === '') return alert('Subscriber status must be defined.')
    if (clientStatus === '') return alert('Client status must be defined.')

    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          accountname,
          firstName,
          lastName,
          email,
          password,
          member: {
            memberStatus
          },
          customer: {
            customerStatus
          },
          employee: {
            employeeStatus
          },
          supplier: {
            supplierStatus
          },
          subscriber: {
            subscriberStatus
          },
          client: {
            clientStatus
          },
          organization: {
            id: organizationId
          }
        }),
      });

      if (response.ok) {
        let account = await response.json();
        window.location.href = `/${organization.owner.username}/${organization.orgname}/accounts/${account.accountname}`
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An error occurred during submission.');
    }

    loading = false
  }
</script>

<!-- Modal Trigger -->
<button class="btn yellow lighten-2 black-text" on:click={() => { instances[0].open() }}>CREATE ACCOUNT</button>

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="modal esfjhbsefbshfsjdhf">
    <div class="modal-content">
      <h4>Create Account</h4>
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
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" bind:value={email}>
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" bind:value={password}>
          <label for="password">Password</label>
        </div>
        <div class="input-field col s12">
          <input id="passwordRepeat" type="password" class="validate" bind:value={passwordRepeat}>
          <label for="passwordRepeat">Password Confirm</label>
        </div>
        <div class="input-field col s12">
          <select bind:value={memberStatus}>
            <option value="" disabled selected>Choose one...</option>
            <option value="Free">FREE: this account is not paying anything</option>
            <option value="Plus">PLUS: this account is paying for ads to be removed</option>
            <option value="Premium">PREMIUM: this account is paying for plus and bonuses</option>
          </select>
          <label>Member Status</label>
        </div>
        <div class="input-field col s12">
          <select bind:value={customerStatus}>
            <option value="" disabled selected>Choose one...</option>
            <option value="Void">VOID: we don't know</option>
            <option value="New">NEW: this account wants to be a customer</option>
            <option value="Established">ESTABLISHED: this customer has done business at least once</option>
            <option value="Recurring">RECURRING: this customer has had recurring business</option>
            <option value="Suspended">SUSPENDED: this customer has been absent for a while</option>
            <option value="Banned">BANNED: this customer has done something wrong</option>
          </select>
          <label>Customer Status</label>
        </div>
        <div class="input-field col s12">
          <select bind:value={employeeStatus}>
            <option value="" disabled selected>Choose one...</option>
            <option value="Void">VOID: we don't know</option>
            <option value="Hiring">HIRING: this account wants to be an employee</option>
            <option value="Rejected">REJECTED: this new hire will not be working here</option>
            <option value="Working">WORKING: this employee is working here</option>
            <option value="Suspended">SUSPENDED: not fired or quit</option>
            <option value="Fired">FIRED: this employee does not work here anymore</option>
            <option value="Quit">QUIT: this employee will not work here anymore</option>
            <option value="">BANNED: this employee has done something wrong</option>
          </select>
          <label>Employee Status</label>
        </div>
        <div class="input-field col s12">
          <select bind:value={supplierStatus}>
            <option value="" disabled selected>Choose one...</option>
            <option value="Void">VOID: we don't know</option>
            <option value="Waiting">WAITING: this account waiting to be connected or rejected</option>
            <option value="Pending">PENDING: this supplier pending to be connected or rejected</option>
            <option value="Connected">CONNECTED: this account is connected to this supplier</option>
            <option value="Rejected">REJECTED: this account and supplier have rejected one another</option>
            <option value="Banned">BANNED: this supplier has done something wrong</option>
          </select>
          <label>Supplier Status</label>
        </div>
        <div class="input-field col s12">
          <select bind:value={subscriberStatus}>
            <option value="" disabled selected>Choose one...</option>
            <option value="Void">VOID: we don't know</option>
            <option value="Unsubscribed">UNSUBSCRIBED</option>
            <option value="Subscribed">SUBSCRIBED</option>
            <option value="Subscribed with notifications">SUBSCRIBED_WITH_NOTIFICATIONS</option>
          </select>
          <label>Subscriber Status</label>
        </div>
        <div class="input-field col s12">
          <select bind:value={clientStatus}>
            <option value="" disabled selected>Choose one...</option>
            <option value="0">LEVEL_0: free</option>
            <option value="1">LEVEL_1: paid</option>
            <option value="2">LEVEL_2: paid</option>
            <option value="3">LEVEL_3: paid</option>
            <option value="4">LEVEL_4: paid</option>
            <option value="5">LEVEL_5: paid</option>
            <option value="6">LEVEL_6: paid</option>
            <option value="7">LEVEL_7: paid</option>
            <option value="8">LEVEL_8: paid</option>
            <option value="9">LEVEL_9: paid</option>
            <option value="10">LEVEL_10: paid</option>
            <option value="11">LEVEL_11: paid</option>
            <option value="12">LEVEL_12: paid</option>
            <option value="13">LEVEL_13: paid</option>
            <option value="14">LEVEL_14: paid</option>
            <option value="15">LEVEL_15: paid</option>
            <option value="16">LEVEL_16: paid</option>
            <option value="17">LEVEL_17: paid</option>
            <option value="18">LEVEL_18: paid</option>
            <option value="19">LEVEL_19: paid</option>
            <option value="20">LEVEL_20: paid</option>
            <option value="21">LEVEL_21: paid</option>
            <option value="22">LEVEL_22: paid</option>
            <option value="23">LEVEL_23: paid</option>
            <option value="24">LEVEL_24: paid</option>
            <option value="25">LEVEL_25: paid</option>
          </select>
          <label>Client Status</label>
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