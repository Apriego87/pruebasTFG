<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import List from '@event-calendar/list'
	import DayGrid from '@event-calendar/day-grid'
	import '@event-calendar/core/index.css';

	let plugins = [TimeGrid, List, DayGrid];
	let options = {
		view: 'dayGridMonth',
		events: [
			{
				id: 1,
				alldDay: false,
				start: '2024-04-07 9:00:00',
				end: '2024-04-07 10:00:00',
				title: 'prueba',
				backgroundColor: 'red',
				extendedProps: { department: 'informática' }
			},
			{
				id: 2,
				alldDay: false,
				start: '2024-04-07 10:00:00',
				end: '2024-04-07 11:00:00',
				title: 'prueba2',
				backgroundColor: 'blue',
				extendedProps: { department: 'rrhh' }
			},
			{
				id: 3,
				alldDay: false,
				start: '2024-04-07 11:00:00',
				end: '2024-04-07 12:00:00',
				title: 'prueba3',
				backgroundColor: 'green',
				extendedProps: { department: 'administración' }
			}
		],
		eventClick: function (info) {
			console.log(info);
		}
	};
</script>

<div id="cont" class="flex h-screen w-screen flex-row items-center justify-center">
	<div class="h-[90vh] w-[90vw] overflow-auto">
		<Calendar {plugins} {options} />
	</div>
</div>
