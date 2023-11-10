<script lang="ts">
  import { onMount } from "svelte";
  import jwt_decode from 'jwt-decode';

  let accessToken: any = undefined
  let decoded: any = undefined

  onMount(() => {
    accessToken = localStorage.getItem('access_token');
    decoded = jwt_decode(accessToken);

    M.updateTextFields();

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      alignment: 'right'
    });
  })
</script>

<svelte:head>
  <title>Library Management Software - nomy.TUBE</title> 
  <meta name="description" content="A dangerous place to get some flow-based devgramming done." />
</svelte:head>

<div class="banner">
  <br />
  <br />
  <br />
  <div class="container" style="max-width: 600px;">
    <div class="card">
      <div class="card-content">
        <strong>What is TUBE?</strong>
        <h1 style="margin: 0;">Library Management Software</h1>
        <br />
        <p>TUBE is a system that optomizes the flow of</p>
        <h4 style="margin: 0;">
          <span class="green">videos,</span>
          <span class="blue">playlists,</span>
          <span class="purple">and subscriptions</span>
        </h4>
        <p>in an organization.</p>
        <br />
        <p>Easily promote and sell your goods and services.</p>
        <br />
        <p>Notify subscribers, manage playlists, and showcase videos using your very own catalog in minutes. No code needed.</p>
        <br />
        {#if accessToken}
          <a href={`/${decoded.type === 'user' ? decoded.username : `${decoded.ownername}/${decoded.orgname}/accounts/${decoded.accountname}`}`} class="waves-effect yellow black-text lighten-2 btn username">{decoded.username || decoded.accountname}</a>
          <a href="/auth/logout" class="waves-effect black white-text btn">Logout</a>
        {:else}
          <a href="/auth/login" class="waves-effect black white-text btn">Login</a>
          <a href="/auth/register" class="waves-effect black white-text btn">Register</a>
        {/if}
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
</div>

<nav class="nav-extended yellow lighten-2">
  <div class="container">
    <div class="nav-wrapper">
      <img src="/anchor.png" alt="underwind.solutions" style="margin: 0.5em; height: 50px; float: left;">
      <a href="https://underwind.solutions" class="brand-logo black-text hide-on-med-and-down">underwind.solutions</a>
    </div>
    
    <!-- <a href="#" data-target='dropdown1' class="btn-floating btn-large waves-effect waves-light black dropdown-trigger right" style="margin-top: -1.9em;"><i class="material-icons">share</i></a> -->
    <!-- Dropdown Structure -->
    <!-- <ul id='dropdown1' class='dropdown-content'>
      <li><a href="https://twitter.com/BurandtTravis" target="_blank">Twitter</a></li>
      <li><a href="https://youtube.com/Traveco504" target="_blank">YouTube</a></li>
      <li><a href="https://github.com/subvind" target="_blank">GitHub</a></li>
    </ul> -->
  </div>
</nav>
<br />
<br />

<div class="container" style="overflow: hidden;">
  <h2 style="text-align: center;">Best Fair-Source LMS for Small and Medium Business</h2>
  <div class="row">
    <div class="col s12 m4">
      <h5 style="margin: 0 0 0.5em;">µSaaS pricing start from $19/month</h5>
      <ul class="collection">
        <li class="collection-item">Replace many apps like CRM, HR, Purchases, Orders, Payments, Invoices, Quotes, Inventory, Supply Chain, Expenses, Reports, Accounting all into one easy solution.</li>
        <li class="collection-item">Integrate with Ebay, Shopify, Magento, Etsy and add other products.</li>
        <li class="collection-item">Get fast customizations and support.</li>
      </ul>
      <a class="btn btn-large black" href="https://istrav.com/solutions">TRY FOR FREE</a>
      <br />
      <br />
    </div>
    <div class="col s12 m8">
      <div class="card" style="padding: 1em; overflow: hidden;">
        <div>For Example:</div>
        <div class="input-field" style="margin-top: 0;">
          <i class="material-icons prefix">public</i>
          <input id="example" class="validate" disabled type="text" value="https://videos.istrav.com">
          <!-- <label for="example">For Example:</label> -->
        </div>
        <div class="" style="height: 600px; overflow: hidden;">
          <iframe class="zoomedIframe" src="https://videos.istrav.com" frameborder="0" style="width: 200%; height: 2400px; padding: 0; margin: 0;"></iframe>
        </div>
      </div>
    </div>
  </div>
</div>
<br />
<br />


<style>
  .zoomedIframe {
    zoom: 0.5;
    -moz-transform: scale(0.5);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    transform-origin: 0 0;
    margin-bottom: -15em;
    padding-bottom: 0em;
  }
  .logo {
    margin: 1em 2em;
  }
  .dropdown-content {
    width: 200px !important;
  }
  .banner {
    background-color: #e5e5f7;
    opacity: 1;
    background-image:  linear-gradient(30deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(150deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(30deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(150deg, #9b9b9b 12%, transparent 12.5%, transparent 87%, #9b9b9b 87.5%, #9b9b9b), linear-gradient(60deg, #9b9b9b77 25%, transparent 25.5%, transparent 75%, #9b9b9b77 75%, #9b9b9b77), linear-gradient(60deg, #9b9b9b77 25%, transparent 25.5%, transparent 75%, #9b9b9b77 75%, #9b9b9b77);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  }
  .username {
    text-transform: none;
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
    color: purple;
    background-color: transparent !important;
  }
</style>