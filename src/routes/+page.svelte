<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h1>Upload csv file</h1>

<form method="post" enctype="multipart/form-data">
  <input type="file" name="file" accept="text/csv" />
  <input type="submit" />
</form>

{#if form?.records}
  <pre>{JSON.stringify(form.records, null, 2)}</pre>
{/if}
