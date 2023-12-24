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
      clientStatus = account.client.clientStatus.toString()
      console.log('clientStatus', clientStatus)
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

  let clientStatus = ''

	async function submit(event: any) {
    event.preventDefault()

    if (clientStatus === '') return alert('Client status must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          client: {
            clientStatus
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
          {:else}
            <div class="progress red lighten-2">
              <div class="indeterminate teal lighten-2"></div>
            </div>
          {/if}
        </div>
        <div class="col s12 m6">
          <p>This client status represents the maximum level at which the client is willing to be billed at.</p>
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