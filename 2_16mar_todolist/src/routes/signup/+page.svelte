<script lang="ts">
	import { enhance } from '$app/forms'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
</script>

<form
	class="bg-base-200 mx-auto mt-20 flex max-w-sm flex-col items-center justify-center rounded-lg py-6"
	use:enhance
	method="post"
>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<Label class="label">
			<span class="label-text">Usuario</span>
		</Label>
		<Input
			type="text"
			autocomplete="off"
			placeholder="Username"
			class="input input-bordered w-full max-w-xs"
			name="username"
			required
		/>
	</div>

	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<Label class="label">
			<span class="label-text">Contraseña</span>
		</Label>
		<Input
			type="password"
			autocomplete="off"
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			name="password"
			required
		/>
	</div>

	<Button class="btn btn-primary mt-4 max-w-xs" type="submit">Crear cuenta</Button>
</form>
