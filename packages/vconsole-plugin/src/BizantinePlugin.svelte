<script lang="js">
 export let server;
 export let projectName;
 let featureId = '12312';

 async function handleReport(event) {
		// alert(featureId);
      // console.log(window.__coverage__)
      const url = `${server}/report-cov`;
      const data = { featureId, data: window.__coverage__ };

      const response = await fetch(url, {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
 }


</script>
  
<div class="vc-table">
   <div>
      Report to project: {projectName}, Server: {server}
   </div>
   <div>
      <p>Input your Feature ID：</p>
      <input bind:value={featureId} />
   </div>
   <button on:click={handleReport}>
      Report
   </button>
   <div> Report Histroy:</div>
</div>