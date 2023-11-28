<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/buckets/Settings.svelte';
  import Code from "$lib/Code.svelte";
  import CreateBucket from "$lib/organizations/CreateBucket.svelte";
  import Files from "$lib/buckets/Files.svelte";
  import Delete from "$lib/buckets/Delete.svelte";

  export let data: any;
  let user: any = null;
  let organization: any = null;
  let bucket: any = null;
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
     * fetch bucket
     */
    const responseBucket = await fetch(`https://api.subvind.com/buckets/name/${data.bucketId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseBucket.ok) {
      bucket = await responseBucket.json();
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

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      {#if organization && bucket}
        <ul id="nav-mobile" class="left">
          <li>
            <a href={`/${organization.owner.username}/${organization.orgname}`} class="black-text">{organization.displayName}</a>
          </li>
          <li>
            <a href="#" class="black-text">{bucket.name}</a>
          </li>
        </ul>
      {:else}
        <a href="#" class="brand-logo black-text">Loading...</a>
      {/if}
    </div>
    <div class="nav-content">
      {#if bucket}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              {bucket.name}
            </a>
          </li>
          <li class="tab"><a href="#files" on:click={() => section = 'files'}>files</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if bucket && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(bucket, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if bucket && organization && section === 'files'}
      <div id="files" class="col s12">
        <Files bucket={bucket} organization={organization} />
      </div>
    {/if}
  </div>

  {#if bucket && organization}
    <div class="controls">
      <Settings user={user} bucketId={bucket.id} />
    </div>
    <div class="controls">
      <CreateBucket organizationId={organization.id} />
    </div>
    <div class="controls">
      <Delete bucket={bucket} organization={organization} />
    </div>
  {/if}

  {#if !bucket}
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