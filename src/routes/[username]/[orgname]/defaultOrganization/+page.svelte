<script lang="ts">
  import { onMount } from "svelte";

  export let data: any;

  onMount(async () => {
    /**
     * set to default organization if
     * user is owner or employee of org
     */
    try {
      const response = await fetch(`https://api.subvind.com/users/defaultOrganization/${data.username}/${data.orgname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        let res = await response.json();

        console.log('res', res)
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error featching defaultOrganization:', error);
      alert('An error occurred during defaultOrganization.');
    }

    window.location.href = `/${data.username}/${data.orgname}`
  })
</script>