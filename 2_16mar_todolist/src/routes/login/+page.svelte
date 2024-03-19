<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'

	let isLoadingSignIn = false

	const handleSubmit: SubmitFunction = () => {
		isLoadingSignIn = true

		return async ({ result }) => {
			if (result.type === 'error') {
				isLoadingSignIn = false
				return
			}
			await applyAction(result)
		}
	}
</script>

<form
	class="bg-base-200 mx-auto mt-20 flex max-w-sm flex-col items-center justify-center rounded-lg py-6"
	use:enhance={handleSubmit}
	method="post"
>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<Label class="label">
			<span class="label-text">Nombre de usuario</span>
		</Label>
		<Input
			type="text"
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
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			name="password"
			required
		/>
	</div>

	<Button class="btn btn-primary mt-4 max-w-xs" type="submit" disabled={isLoadingSignIn}>
		{#if isLoadingSignIn}
			<span class="loading loading-spinner loading-sm" />
		{:else}
			<p>Iniciar Sesión</p>
		{/if}
	</Button>

	<p class="pt-4">
		¿No tienes cuenta aún? <a href="/signup" class="link link-hover font-semibold">Regístrate</a>.
	</p>
</form>
