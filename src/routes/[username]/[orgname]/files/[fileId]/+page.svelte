<script lang="ts">
  import { onMount } from "svelte";

  import Settings from '$lib/files/Settings.svelte'
  import Photo from "$lib/files/Photo.svelte";
  import Code from "$lib/Code.svelte";
  import UploadFile from "$lib/organizations/UploadFile.svelte";
  import Delete from "$lib/files/Delete.svelte";

  export let data: any;
  let user: any = null;
  let organization: any = null;
  let file: any = null;
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
     * fetch file
     */
    const responseFile = await fetch(`https://api.subvind.com/files/filename/${data.fileId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseFile.ok) {
      file = await responseFile.json();
    } else {
      const errorData = await responseFile.json();
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
      {#if organization && file}
        <ul id="nav-mobile" class="left">
          <li>
            <a href={`/${organization.owner.username}/${organization.orgname}`} class="black-text">{organization.displayName}</a>
          </li>
          <li>
            <a href="#" class="black-text">{file.filename}</a>
          </li>
        </ul>
      {:else}
        <a href="#" class="brand-logo black-text">Loading...</a>
      {/if}
    </div>
    <div class="nav-content">
      {#if file}
        <ul class="tabs tabs-transparent black lighten-2">
          <li class="tab">
            <a class="active" href="#profile" on:click={() => section = 'profile'}>
              {file.filename}
            </a>
          </li>
          <li class="tab"><a href="#photo" on:click={() => section = 'photo'}>photo</a></li>
        </ul>
      {/if}
    </div>
  </div>
</nav>

<div class="container">
  <div class="card main">
    {#if file && section === 'profile'}
      <div id="profile" class="col s12">
        <div class="card-content">
          <p>raw data:</p>
          <Code text={JSON.stringify(file, null, 2)} lang="json" />
        </div>
      </div>
    {/if}
    {#if file && organization && section === 'photo'}
      <div id="photo" class="col s12">
        <Photo file={file} organization={organization} />
      </div>
    {/if}
  </div>

  {#if file && organization}
    <div class="controls">
      <Settings user={user} fileId={file.id} />
    </div>
    <div class="controls">
      <UploadFile organizationId={organization.id} />
    </div>
    <div class="controls">
      <Delete file={file} organization={organization} />
    </div>
  {/if}

  {#if !file}
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