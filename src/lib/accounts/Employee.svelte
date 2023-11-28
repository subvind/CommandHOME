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
      employeeStatus = account.employee.employeeStatus
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

  let employeeStatus = ''

	async function submit(event: any) {
    event.preventDefault()

    if (employeeStatus === '') return alert('Supplier status must be defined.')
    
    loading = true 

    try {
      const response = await fetch(`https://api.subvind.com/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          employee: {
            employeeStatus
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
          {:else}
            <div class="progress red lighten-2">
              <div class="indeterminate teal lighten-2"></div>
            </div>
          {/if}
        </div>
        <div class="col s12 m6">
          <p>Choose an employee status that makes sense. Notice that only employees with a status of working will be allowed to access their records with this organization.</p>
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