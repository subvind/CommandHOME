<script lang="ts">
  import { onMount } from 'svelte';

	export let organization: any;

	onMount(async () => {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

		var elems2 = document.querySelectorAll('.collapsible');
		var instances2 = M.Collapsible.init(elems2, {});

		setTimeout(() => {
			var elems3 = document.querySelectorAll('.dropdown-trigger1');
			var instances3 = M.Dropdown.init(elems3, {
				constrainWidth: false,
			});
		}, 0)
	})
</script>

<header>
	<nav class="grey darken-3">
		<div class="nav-wrapper">
			<ul id="slide-out" class="sidenav">
				<nav class="grey darken-3" style="max-height: 64px;">
					<div class="nav-wrapper">
						{#if organization}
							<a href="/" target="_self" class="brand-logo" style="width: 100%; text-align: center;">{organization.shortName || 'MEDIATUBE'}</a>
						{/if}
					</div>
				</nav>
				{#if organization}
					<div class="describe">
						{organization.description}
					</div>
				{/if}
				
				<li><div class="divider"></div></li>
				<li><a class="subheader">Menu</a></li>
				{#if organization.menu}
					{#each organization.menu as menu}
						<li><a href={menu.url} target="_self" class="waves-effect" ><i class="material-icons">{menu.icon}</i>{menu.name}</a></li>
					{/each}
				{:else}
					{#if organization.homepageLink}
						<li><a href={organization.homepageLink || '/'} target="_self" class="waves-effect" ><i class="material-icons">home</i>Homepage</a></li>
					{/if}
					{#if organization.isErpModule}
						{#if organization.erpHostname}
							<li><a href={`https://${organization.erpHostname}`} target="_self" class="waves-effect"><i class="material-icons">local_grocery_store</i>Store</a></li>
						{:else}
							<li><a href={`https://${organization.orgname}.erpnomy.com`} target="_self" class="waves-effect"><i class="material-icons">local_grocery_store</i>Store</a></li>
						{/if}
					{/if}
					{#if organization.isTubeModule}
						{#if organization.tubeHostname}
							<li><a href={`https://${organization.tubeHostname}`} target="_self" class="waves-effect"><i class="material-icons">videocam</i>Videos</a></li>
						{:else}
							<li><a href={`https://${organization.orgname}.tubenomy.com`} target="_self" class="waves-effect"><i class="material-icons">videocam</i>Videos</a></li>
						{/if}
					{/if}
					{#if organization.isDeskModule}
						{#if organization.deskHostname}
							<li><a href={`https://${organization.deskHostname}`} target="_self" class="waves-effect"><i class="material-icons">verified_user</i>Client Area</a></li>
						{:else}
							<li><a href={`https://${organization.orgname}.desknomy.com`} target="_self" class="waves-effect"><i class="material-icons">verified_user</i>Client Area</a></li>
						{/if}
					{/if}
					{#if organization.contactCenterEmail}
						<li><a href="/contact-center" target="_self" class="waves-effect"><i class="material-icons">local_phone</i>Contact Center</a></li>
					{/if}
				{/if}
				
				<li><div class="divider"></div></li>
				<li><a class="subheader">Extra</a></li>
				<li><a class="waves-effect" href="/privacy-policy" target="_self">Privacy Policy</a></li>
				<li><a class="waves-effect" href="/terms-and-conditions" target="_self">Terms & Conditions</a></li>
				<li class="black-text">
					<ul class="collapsible">
						<li>
							<div class="collapsible-header" style="padding: 0 2em;">Control Panels</div>
							<div class="collapsible-body">
								{#if organization.isHomeModule}
									<li><a class="waves-effect" href={`https://homenomy.subvind.com`} target="_self"><i class="material-icons">subdirectory_arrow_right</i>nomy.HOME</a></li>
								{/if}
								{#if organization.isErpModule}
									<li><a class="waves-effect" href={`https://erpnomy.subvind.com`} target="_self"><i class="material-icons">subdirectory_arrow_right</i>nomy.ERP</a></li>
								{/if}
								{#if organization.isTubeModule}
									<li><a class="waves-effect" href={`https://tubenomy.subvind.com`} target="_self"><i class="material-icons">subdirectory_arrow_right</i>nomy.TUBE</a></li>
								{/if}
								{#if organization.isDeskModule}
									<li><a class="waves-effect" href={`https://desknomy.subvind.com`} target="_self"><i class="material-icons">subdirectory_arrow_right</i>nomy.DESK</a></li>
								{/if}
							</div>
						</li>
					</ul>
				</li>			
			</ul>
			{#if organization}
				<a href="#" data-target="slide-out" class="brand-logo sidenav-trigger left"><i class="material-icons">menu</i>{organization.displayName}</a>
			{/if}

			<ul id="nav-mobile" class="right">
				<!-- Dropdown Trigger -->
				<li>
					<div class="logo">
						{#if organization}
							{#if organization.orgPhoto}
								<img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${organization.orgPhoto.bucket.name}/${organization.orgPhoto.filename}`} alt="logo" class="dropdown-trigger1" data-target='dropdown1'>
							{:else}
								<img src="/anchor.png" alt="logo" class="dropdown-trigger1" data-target='dropdown1'>
							{/if}
						{/if}
					</div>
				</li>
			</ul>

			<!-- Dropdown Structure -->
			<ul id='dropdown1' class='dropdown-content'>
				{#if organization}
					{#if organization.ebayUser}
						<li><a href={`https://www.ebay.com/usr/${organization.ebayUser}`} target="_blank">ebay.com/usr/{organization.ebayUser}</a></li>
					{/if}
					{#if organization.etsyShop}
						<li><a href={`https://www.etsy.com/shop/${organization.etsyShop}`} target="_blank">etsy.com/shop/{organization.etsyShop}</a></li>
					{/if}
					{#if organization.youtubeChannel}
						<li><a href={`https://www.youtube.com/${organization.youtubeChannel}`} target="_blank">youtube.com/{organization.youtubeChannel}</a></li>
					{/if}
				{/if}
			</ul>
		</div>
	</nav>
</header>

<style>
  header {
    position: relative;
  }

	.logo {
		max-height: 3.2em;
		width: 3.2em;
		margin: 0.5em 0.5em 0;
		border-radius: 10em;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
	}

	.logo img {
    width: auto;
    max-width: 100%;
    object-fit: contain;
	}

	nav .sidenav-trigger {
		display: initial !important;
	}
	
	.describe {
    margin: 0px 0.5em;
    color: rgb(17, 17, 17);
    line-height: 2em;
    text-align: center;
	}

</style>
