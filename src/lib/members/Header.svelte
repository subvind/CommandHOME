<script lang="ts">
  export let username: any
  export let orgname: any
</script>

<nav class="green darken-4">
  <div class="nav-wrapper">
    <ul class="left hide-on-med-and-down">
      <li><a href={`/${username}/${orgname}/members/members`}>Members</a></li>
      <li><a href={`/${username}/${orgname}/members/suppliers`}>Suppliers</a></li>
      <li><a href={`/${username}/${orgname}/members/employees`}>Employees</a></li>
      <li><a href={`/${username}/${orgname}/members/customers`}>Customers</a></li>
      <li><a href={`/${username}/${orgname}/members/subscribers`}>Subscribers</a></li>
      <li><a href={`/${username}/${orgname}/members/clients`}>Clients</a></li>
    </ul>
    
    <ul class="center hide-on-med-and-down" style="margin: 0 auto;">
      <!-- <li><a href={`/${username}/${orgname}/members/collections`}>Collections</a></li>
      <li><a href={`/${username}/${orgname}/members/facets`}>Facets</a></li> -->
    </ul>
    
    <ul class="right hide-on-med-and-down">
      <!-- <li><a href={`/${username}/${orgname}/members/organizations`}>Organizations</a></li> -->
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