<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/accounts/Settings.svelte';
  import Code from "$lib/Code.svelte";
  import CreateAccount from "$lib/organizations/CreateAccount.svelte";
  import Delete from "$lib/accounts/Delete.svelte";
  import Member from "$lib/accounts/Member.svelte";
  import Supplier from "$lib/accounts/Supplier.svelte";
  import Employee from "$lib/accounts/Employee.svelte";
  import Customer from "$lib/accounts/Customer.svelte";
  import Subscriber from "$lib/accounts/Subscriber.svelte";
  import Client from "$lib/accounts/Client.svelte";

  export let data: any;
  let user: any = null;
  let organization: any = null;
  let account: any = null;
  let section: any = '';

  onMount(async () => {
    // It retrieves the hash value from the URL and assigns it to the variable.
    function getHashValue() {
      return window.location.hash.substring(1); // Removes the "#" character
    }
    section = getHashValue() || 'profile';
    
    /**
     * fetch user
     */
    const responseUser = await fetch(`https://api.subvind.com/users/username/${data.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseUser.ok) {
      user = await responseUser.json();
    } else {
      const errorData = await responseUser.json();
      alert(errorData.error);
    }

    /**
     * fetch org
     */
    const responseOrg = await fetch(`https://api.subvind.com/organizations/orgname/${data.orgname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();

    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }

    /**
     * fetch account
     */
    const responseBucket = await fetch(`https://api.subvind.com/accounts/accountname/${data.accountId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseBucket.ok) {
      account = await responseBucket.json();
    } else {
      const errorData = await responseBucket.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      let elms = document.querySelectorAll('.tabs')
      var instance = M.Tabs.init(elms, {});
    }, 0)

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
  })
</script>

<nav class="nav-extended green darken-3">
  <div class="container">
    <div class="nav-wrapper">
      {#if organization && account}
        <ul id="nav-mobile" class="left">
          <li>
            <a href={`/${organization.owner.username}/${organization.orgname}`} class="black-text">organization: {organization.displayName}</a>
          </li>
          <li>
            <a href="#" class="black-text">account: {account.accountname}</a>
          </li>
        </ul>
      {:else}
        <a href="#" class="brand-logo black-text">Loading...</a>
      {/if}
    </div>
    <div class="nav-content">
      {#if account}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              main
            </a>
          </li>
          <li class="tab"><a href="#member" on:click={() => section = 'member'}>member</a></li>
          <li class="tab"><a href="#supplier" on:click={() => section = 'supplier'}>supplier</a></li>
          <li class="tab"><a href="#employee" on:click={() => section = 'employee'}>employee</a></li>
          <li class="tab"><a href="#customer" on:click={() => section = 'customer'}>customer</a></li>
          <li class="tab"><a href="#subscriber" on:click={() => section = 'subscriber'}>subscriber</a></li>
          <li class="tab"><a href="#client" on:click={() => section = 'client'}>client</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if account && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(account, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if account && organization && section === 'member'}
      <div id="member" class="col s12">
        <Member accountId={account.id} />
      </div>
    {/if}
    {#if account && organization && section === 'supplier'}
      <div id="supplier" class="col s12">
        <Supplier accountId={account.id} />
      </div>
    {/if}
    {#if account && organization && section === 'employee'}
      <div id="employee" class="col s12">
        <Employee accountId={account.id} />
      </div>
    {/if}
    {#if account && organization && section === 'customer'}
      <div id="customer" class="col s12">
        <Customer accountId={account.id} />
      </div>
    {/if}
    {#if account && organization && section === 'subscriber'}
      <div id="subscriber" class="col s12">
        <Subscriber accountId={account.id} />
      </div>
    {/if}
    {#if account && organization && section === 'client'}
      <div id="client" class="col s12">
        <Client accountId={account.id} />
      </div>
    {/if}
  </div>

  {#if account && organization}
    <div class="controls">
      <Settings user={user} accountId={account.id} />
    </div>
    <div class="controls">
      <CreateAccount organizationId={organization.id} />
    </div>
    <div class="controls">
      <Delete account={account} organization={organization} />
    </div>
  {/if}

  {#if !account}
    <br />
    <br />
    <br />
    <!-- show loading indicator -->
    <div class="progress red lighten-2">
      <div class="indeterminate teal lighten-2"></div>
    </div>
  {/if}
</div>

<style>
  .main {
    margin-top: 0;
    background: #aaa;
  }

  .controls {
    margin: 0 0.5em 0.5em 0;
  }
</style>