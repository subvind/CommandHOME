<script lang="ts">
  import { onMount } from "svelte";

  export let accountId: any = null;
  let instances2: any = undefined;
  let account: any = undefined;
  let loading: boolean = false;

  onMount(async () => {

    const response = await fetch(`https://api.subvind.com/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      account = await response.json();
      supplierStatus = account.supplier.supplierStatus
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      M.updateTextFields();

      var elems2 = document.querySelectorAll('select');
      instances2 = M.FormSelect.init(elems2, {});
    })
  })

  let supplierStatus = ''

	async function submit(event: any) {
    event.preventDefault()

    if (supplierStatus === '') return alert('Supplier status must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          supplier: {
            supplierStatus
          }
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

<!-- Modal Structure -->
<form on:submit={(e) => submit(e)}>
  <div class="card" style="margin-top: 0;">
    <div class="card-content">
      <div class="row">
        <div class="input-field col s12 m6">
          {#if account}
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
          {:else}
            <div class="progress red lighten-2">
              <div class="indeterminate teal lighten-2"></div>
            </div>
          {/if}
        </div>
        <div class="col s12 m6">
          <p>Choose a supplier status that makes sense. Notice that only suppliers with a status of connected will be allowed to access their records with this organization.</p>
        </div>
      </div>
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