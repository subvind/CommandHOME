<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';
  import UploadFile from './UploadFile.svelte';

  export let data: any;
  export let organization: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let value: any = organization.orgPhoto?.filename || '';
  let loading = true;

  /**
   * update organization with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);

    let file
    if (e.detail.value === '') {
      file = null
    } else {
      file = e.detail.value
    }

    try {
      const response = await fetch(`https://api.subvind.com/organizations/${organization.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          orgPhoto: file
        }),
      });

      if (response.ok) {
        let merge = {
          ...organization,
          ...await response.json(),
        }
        organization = merge
        alert('The file for this organization was saved.')
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('An error occurred during submission.');
    }
  }

  /**
   * get the latest organizations by search
   */
  async function handleInput () {
    let search = ''
    if (filterText) {
      search = `&search=${filterText}`
    }
    const response = await fetch(`https://api.subvind.com/files/orgRelated/${organization.id}?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let files = await response.json();

      console.log('files', files)
      items = []; // clear list before repopulating it
      files.data.forEach((file: any) => {
        items.push({
          value: file.id,
          label: file.filename
        })
      })
      console.log('items', items)
      loading = false
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  }

  onMount(() => {
    handleInput()
  })
</script>


<div class="detail">
  <div class="row">
    <div class="col s12 m6">
      <br />
      {#if loading === false}
        <div>Select an orgPhoto: {filterText}</div>
        <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
      {:else}
        <div class="progress red lighten-2">
          <div class="indeterminate teal lighten-2"></div>
        </div>
      {/if}
      {#if organization.orgPhoto}
        <br />
        <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${organization.orgPhoto.bucket.name}/${organization.orgPhoto.filename}`} alt="">
      {/if}
    </div>
    <div class="col s12 m6">
      <p>Use a photo that best describes the organization overall. This photo will be show in the header next to the organization's display name on the frontned.</p>
      <UploadFile organizationId={organization.id} />
    </div>
  </div>
</div>

<style>
  .detail {
    margin: 0 1em;
    padding-bottom: 1em;
  }

  img {
    max-width: 100%;
  }
</style>