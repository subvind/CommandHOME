<script lang="ts">
  import { onMount } from "svelte";

  import Table from "$lib/Table.svelte"
  import * as gridjs from "gridjs";

  export let organization: any;
  let childOrganizations: any;
  let sort: boolean = true;
  let url: string = `https://api.subvind.com/organizations`;
  let limit: number = 25;
  let change: any;
  let changeId: any;
  let columns = [
    {
      id: 'id',
      name: 'Reference',
      width: '150px',
      sort: false,
      hidden: true,
      formatter: (cell: any, row: any) => {
        return gridjs.h('div', {
          style: 'width: 70px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
        }, row.cells[0].data);
      }
    },
    {
      id: 'orgname',
      name: 'Org. Name',
      width: '200px',
    },
    {
      id: 'displayName',
      name: 'Display Name',
      width: '200px',
    },
    {
      id: 'createdAt',
      name: 'Affiliate Status',
      width: '200px',
      formatter: (cell: any, row: any) => {
        return gridjs.h('div', {
          className: 'switch',
        }, [
          gridjs.h('label', {}, [
            'Off',
            gridjs.h('input', {
              type: 'checkbox',
              checked: isAffiliated(row.cells[0].data), // Assuming `createdAt` is a timestamp, check if it exists
              disabled: true, // You may want to enable/disable based on some logic
            }),
            gridjs.h('span', { className: 'lever' }),
            'Connected',
          ]),
        ]);
      }
    },
    { 
      id: 'view',
      name: '',
      width: '150px',
      sort: false,
      hidden: false,
      formatter: (cell: any, row: any) => {
        return gridjs.h('a', {
          href: `?changeId=${row.cells[0].data}`,
          target: "_self",
          className: 'btn btn-small grey right',
        }, 'CHANGE');
      }
    },
  ]
  function mapResultsFunc(value: any) {
    return [
      value.id,
      value.orgname,
      value.displayName,
      value.createdAt,
      value.homepageLink
    ]
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    changeId = urlParams.get('changeId');

    if (changeId) {
      /**
       * fetch change org
       */
      const responseChange = await fetch(`https://api.subvind.com/organizations/${changeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (responseChange.ok) {
        change = await responseChange.json();
  
      } else {
        const errorData = await responseChange.json();
        alert(errorData.error);
      }
    }

    /**
     * fetch org
     */
    const responseOrg = await fetch(`https://api.subvind.com/organizations/childRelated/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      childOrganizations = await responseOrg.json();
      console.log('childOrganizations', childOrganizations)
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }
  })

  const handleCheckboxChange = async () => {
    let results: any;

    if (isAffiliated(changeId)) {
      results = childOrganizations.subOrganizations.filter((org: any, index: number) => {
        return org.id !== changeId
      })
    } else {
      results = [...childOrganizations.subOrganizations]
      results.push({
        id: changeId
      })
    }

    console.log('update:', results)
    
    try {
      const response = await fetch(`https://api.subvind.com/organizations/childRelated/${organization.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          subOrganizations: results
        }),
      });

      if (response.ok) {
        organization = await response.json();
        console.log('organization', organization)
        window.location.reload()
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('An error occurred during submission.');
    }
  };

  function isAffiliated (id: string) {
    let check = childOrganizations.subOrganizations.some((subOrg: any) => {
      return subOrg.id === id
    });
    return check
  }

  let offText = "off";
  let connectedText = "connected";

  const handleMouseEnterOff = () => {
    offText = "connect";
  };
  const handleMouseEnterConnected = () => {
    connectedText = "disconnect";
  };
  const handleMouseLeaveOff = () => {
    offText = "off";
  };
  const handleMouseLeaveConnected = () => {
    connectedText = "connected";
  };
</script>

<br />
<br />

{#if childOrganizations}
  <Table url={url} columns={columns} limit={limit} mapResultsFunc={mapResultsFunc} sort={sort} />
  {#if change}
    <div class="card">
      <div class="card-content">
        {#if isAffiliated(change.id)}
          <a 
            href="#"
            on:click={handleCheckboxChange}
            class="btn right blue darken-2"
            on:mouseenter={handleMouseEnterConnected}
            on:mouseleave={handleMouseLeaveConnected}
          >
            {connectedText}
          </a>
        {:else}
          <a 
            href="#" 
            on:click={handleCheckboxChange} 
            class="btn right blue darken-2"
            on:mouseenter={handleMouseEnterOff}
            on:mouseleave={handleMouseLeaveOff}
          >
            {offText}
          </a>
        {/if}
        <h4 style="margin: 0;">{change.displayName}</h4>
        <p>{@html change.description}</p>
        <p>
          <a href={change.homepageLink}>{change.homepageLink}</a>
        </p>
      </div>
    </div>
  {/if}
{/if}

{#if childOrganizations}
  <a href={`https://${organization.homeHostname}/organizations`} target="_blank" class="btn blue darken-2">Organizations ({childOrganizations.subOrganizations.length})</a>
{/if}

<style>
  
</style>