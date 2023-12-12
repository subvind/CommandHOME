<script lang="ts">
  import Analytics from "$lib/activity/Analytics.svelte";
  import { onMount } from "svelte";

  export let data
  let organization: any;

  onMount(async () => {

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

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }
  })

</script>

{#if organization}
  <Analytics organization={organization} />
{/if}