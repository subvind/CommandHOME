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
    <a href={`/${username}/${orgname}/information`}><span class="blue">information</span></a>
  </li>
  <li>
    <a href={`/${username}/${orgname}/materials`}><span class="red">materials</span></a>
  </li>
  <li>
    <a href={`/${username}/${orgname}/cash`}><span class="green">cash</span></a>
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
</style>