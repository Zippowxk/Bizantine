<script lang="js">
   export let server;
   export let projectName;
   let featureId = "";
   let cover = 0;

   async function handleReport(event) {
      
      const url = `${server}/report-cov`;
      const data = { featureId, projectName, data: window.__coverage__ , cover };

      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
   }
</script>

<div class="vc-table" style='padding: 10px;font-size: 20px;line-height:28px;'>
   <div >
      Report to project: {projectName}, Server: {server}
   </div>
   <div style='margin-top: 10px' class='line'>
      <input placeholder="Input your Feature ID" bind:value={featureId} />
   </div>
   <div style='margin-top: 10px'>
      <span>Merge</span>
      <input type="radio" bind:group={cover} value={0}/>
      <span>Cover</span>
      <input type="radio" bind:group={cover} value={1}/>
   </div>
   <div>
      <button style='padding:5px 10px;margin-top:10px' on:click={handleReport}> Report </button>
   </div>
   <!-- if cover is 1 show a note message -->
   {#if cover === 1}
   <div style='margin-top: 10px'>
      <span style='color:red'>Note: </span>
      <span style='color:red'>Cover mode will cover the coverage data to the server, and the server will cover the coverage data to the database.</span>
   </div>
   {/if}
   <!-- <div>Report Histroy:</div> -->
</div>


