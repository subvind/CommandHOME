<script lang="ts">
  import { onMount } from "svelte";

  import { AuthRegister } from "subvind-components"

	let organization: any;

  onMount(async () => {
    let backendHostname = window.location.hostname
    if (backendHostname === 'localhost') {
      backendHostname = 'homenomy.subvind.com'
    }
    const response = await fetch(`https://api.subvind.com/organizations/backendHostname/${backendHostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      organization = await response.json();
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  })
</script>

<br />
<br />
<AuthRegister organization={organization} />