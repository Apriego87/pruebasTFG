<script>
	import Calendar from './Calendar.svelte';
	
	const today = new Date();
</script>

<Calendar {today}  />