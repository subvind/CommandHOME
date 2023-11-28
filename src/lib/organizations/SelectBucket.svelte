<script lang="ts">
  import { onMount } from 'svelte';

  import Select from 'svelte-select';

  export let organization: any;
  export let value: any;
  
  let items: any = [
    { value: '', label: '' }
  ];
  let filterText: any;
  let loading = true;

  /**
   * update file with latest parent id
   */
  async function handleChange(e: any) {
    console.log(e.detail);
    // e.detail.value
  }

  /**
   * get the latest buckets by search
   */
  async function handleInput () {
    let search = ''
    if (filterText) {
      search = `&search=${filterText}`
    }
    const response = await fetch(`https://api.subvind.com/buckets/orgRelated/${organization.id}?limit=100&page=1${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      let buckets = await response.json();

      console.log('buckets', buckets)
      items = []; // clear list before repopulating it
      buckets.data.forEach((bucket: any) => {
        items.push({
          value: bucket.id,
          label: bucket.name
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

{#if loading === false}
  <div>Select a bucket: {filterText}</div>
  <Select bind:value {items} bind:filterText on:input={handleInput} on:change={handleChange} />
{:else}
  <div class="progress red lighten-2">
    <div class="indeterminate teal lighten-2"></div>
  </div>
{/if}
