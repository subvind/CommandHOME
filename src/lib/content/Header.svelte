<script lang="ts">
  export let username: any
  export let orgname: any
</script>

<nav class="blue darken-2">
  <div class="nav-wrapper">
    <ul class="left hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/content/menu`}>Menu</a></li>
      <li><a href={`/${username}/${orgname}/content/about`}>About</a></li>
      <li><a href={`/${username}/${orgname}/content/pages`}>Pages</a></li>
    </ul>
    
    <ul class="center hide-on-med-and-down" style="margin: 0 auto;">
      <li><a href={`/${username}/${orgname}/content/collections`}>Collections</a></li>
      <li><a href={`/${username}/${orgname}/content/facets`}>Facets</a></li>
    </ul>
    <!-- <a href="#" class="brand-logo center"></a> -->
    
    <ul class="right hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/content/organizations`}>Organizations</a></li>
    </ul>
  </div>
</nav>

<style>
  .brand-logo.left,
  .brand-logo.right {
    margin: 0 0.5em;
  }

  .center {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
</style>