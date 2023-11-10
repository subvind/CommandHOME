<script lang="ts">
  import { onMount } from 'svelte';
  import jwt_decode from 'jwt-decode';

  import Sidebar from "./Sidebar.svelte"

  let decodedToken: any = null;
  let user: any;
  let organization: any;
  let account: any;

  function verifyUser (user: any) {
    if (user.authStatus === 'Pending') {
    // Check if you're already on the verification page to avoid infinite redirects
    if (window.location.pathname !== '/email-verification') {
      // Redirect to the verification page
      window.location.href = '/email-verification';
    }
    // If already on the verification page, do nothing
    }
  }

  async function load() {
    if (decodedToken.type === 'user') {
      const response = await fetch(`https://api.subvind.com/users/username/${decodedToken.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        user = await response.json();
        verifyUser(user)
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    }

    if (decodedToken.type === 'account') {
      /**
       * type === 'account'
       **/ 
      const response2 = await fetch(`https://api.subvind.com/organizations/orgname/${decodedToken.orgname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response2.ok) {
        organization = await response2.json();
      } else {
        const errorData = await response2.json();
        alert(errorData.error);
      }

      const response3 = await fetch(`https://api.subvind.com/accounts/accountname/${decodedToken.accountname}/${organization.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response3.ok) {
        account = await response3.json();
      } else {
        const errorData = await response3.json();
        alert(errorData.error);
      }
    }
  }

  onMount(async () => {
    let accessToken: any = localStorage.getItem('access_token');

    // Decode the JWT
    decodedToken = jwt_decode(accessToken);

    await load()
  })
</script>

<nav class="black">
  <div class="nav-wrapper">
    {#if user}
      {#if user.authStatus === 'Pending'}
        <!-- show nothing -->
      {:else}
        {#if user.defaultOrganization}
          <Sidebar decodedToken={decodedToken} person={user} />
        {:else}
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li><a href={`/${decodedToken.username}#organizations`}>select organization</a></li>
          </ul>
        {/if}
      {/if}
    {/if}

    {#if account}
      <Sidebar decodedToken={decodedToken} person={account} />
    {/if}
    
    {#if !decodedToken}
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="https://subvind.com">powered by subvind</a></li>
      </ul>
    {/if}

    <a href="/" class="brand-logo center"><span class="yellow">nomy</span>.<span class="red">TUBE</span></a>

    {#if user}
      {#if user.authStatus === 'Pending'}
        <!-- show nothing -->
      {:else}
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="/users"><span class="yellow">users</span></a></li>
          <li><a href={`/${decodedToken.username}`}>{decodedToken.fullName}</a></li>
          <li><a href="/organizations"><span class="yellow">organizations</span></a></li>
          {#if user.defaultOrganization}
            <li><a href={`/${decodedToken.username}/${user.defaultOrganization.orgname}`}>{user.defaultOrganization.displayName}</a></li>
          {/if}
        </ul>
      {/if}
    {/if}

    {#if account}
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href={`/${decodedToken.ownername}/${decodedToken.orgname}#employees`}><span class="yellow">accounts</span></a></li>
        <li><a href={`/${decodedToken.ownername}/${decodedToken.orgname}/accounts/${decodedToken.accountname}`}>{decodedToken.fullName}</a></li>
        <li><a href="/organizations"><span class="yellow">organizations</span></a></li>
        {#if account.organization}
          <li><a href={`/${decodedToken.ownername}/${decodedToken.orgname}`}>{account.organization.displayName}</a></li>
        {/if}
      </ul>
    {/if}

    {#if !decodedToken}
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/auth/login">login</a></li>
        <li><a href="/auth/register">register</a></li>
      </ul>
    {/if}
  </div>
</nav>

<style>
  .yellow {
    color: yellow;
    background-color: transparent !important;
  }
  .green {
    color: green;
    background-color: transparent !important;
  }
  .blue {
    color: #039be5;
    background-color: transparent !important;
  }
  .red {
    color: red;
    background-color: transparent !important;
  }
  .purple {
    color: purple;
    background-color: transparent !important;
  }
</style>