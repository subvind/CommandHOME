<script lang="ts">
  import { onMount } from "svelte";

  export let decodedToken: any
  export let person: any;

  let username = ''
  let orgname = ''
  onMount(() => {
    if (decodedToken.type === 'user') {
      // user
      username = person.username
      orgname = person.defaultOrganization.orgname
    } else {
      // account
      username = person.organization.owner.username
      orgname = decodedToken.orgname
    }
  })
</script>

<ul id="nav-mobile" class="left hide-on-med-and-down">
  <li>
    <a href={`/${username}/${orgname}/content`}><span class="blue">content</span></a>
  </li>
  <li>
    <a href={`/${username}/${orgname}/activity`}><span class="red">activity</span></a>
  </li>
  <li>
    <a href={`/${username}/${orgname}/members`}><span class="green">members</span></a>
  </li>
</ul>

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
    color: #AE81FF;
    background-color: transparent !important;
  }
</style>