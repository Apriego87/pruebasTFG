<script>
	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import List from '@event-calendar/list';
	import DayGrid from '@event-calendar/day-grid';

	import * as Dialog from '$lib/components/ui/dialog';

	let ec;

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
				editable: true,
				extendedProps: { department: 'administración' }
			}
		],
		eventClick: function (info) {
			console.log(ec.getOption('date'));
		}
	};
</script>

<div id="cont" class="flex h-screen w-screen flex-row items-center justify-center">
	<div class="h-[90vh] w-[90vw] overflow-auto">
		<Calendar bind:this={ec} {plugins} {options} />
	</div>
</div>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
