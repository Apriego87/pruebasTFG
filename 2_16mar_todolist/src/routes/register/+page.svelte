<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import * as Card from '$lib/components/ui/card'
	import * as Select from '$lib/components/ui/select'

	import SuperDebug, { superForm } from 'sveltekit-superforms'
	import type { PageData } from '../$types'
	import * as Alert from '$lib/components/ui/alert'
	export let data: PageData

	const { form, errors, allErrors, constraints, message, enhance } = superForm(data.form, {
		onError({ result }) {
			$message = result.error.message || 'error desconocido'
		}
	})
</script>

<main class="flex items-center justify-center">
	<div class="w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-center underline">Registro de Usuarios</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" class="w-full" use:enhance>
					<div class="flex flex-row">
						<div class="m-2 w-1/2">
							<Label for="name">Nombre:</Label>
							<Input
								type="text"
								id="name"
								name="name"
								aria-invalid={$errors.name ? 'true' : undefined}
								bind:value={$form.name}
							/>
							{#if $errors.name}
								<small class="invalid">{$errors.name}</small>
							{/if}
						</div>

						<div class="m-2 w-1/2">
							<Label for="surname">Apellidos:</Label>
							<Input
								type="text"
								id="surname"
								name="surname"
								aria-invalid={$errors.surname ? 'true' : undefined}
								bind:value={$form.surname}
							/>
							{#if $errors.surname}
								<small class="invalid">{$errors.surname}</small>
							{/if}
						</div>
					</div>

					<div class="flex flex-row">
						<div class="m-2 w-1/2">
							<Label for="username">Usuario:</Label>
							<Input
								type="text"
								id="username"
								name="username"
								aria-invalid={$errors.username ? 'true' : undefined}
								bind:value={$form.username}
							/>
							{#if $errors.username}
								<small class="invalid">{$errors.username}</small>
							{/if}
						</div>

						<div class="m-2 w-1/2">
							<Label for="email">E-Mail:</Label>
							<Input
								type="email"
								id="email"
								name="email"
								aria-invalid={$errors.email ? 'true' : undefined}
								bind:value={$form.email}
							/>
							{#if $errors.email}
								<small class="invalid">{$errors.email}</small>
							{/if}
						</div>
					</div>

					<div class="flex flex-row">
						<div class="m-2 w-1/2">
							<Label for="password">Contraseña:</Label>
							<Input
								type="password"
								id="password"
								name="password"
								aria-invalid={$errors.password ? 'true' : undefined}
								bind:value={$form.password}
							/>
							{#if $errors.password}
								<small class="invalid">{$errors.password}</small>
							{/if}
						</div>

						<div class="m-2 w-1/2">
							<Label for="confirmPassword">Confirmar contraseña:</Label>
							<Input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								aria-invalid={$errors.confirmPassword ? 'true' : undefined}
								bind:value={$form.confirmPassword}
							/>
							{#if $errors.confirmPassword}
								<small class="invalid">{$errors.confirmPassword}</small>
							{/if}
						</div>
					</div>

					<div class="flex flex-row">
						<div class="m-2 w-1/3">
							<Label for="role">Rol:</Label>
							<!-- <Select.Root >
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Theme" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="light">Light</Select.Item>
									<Select.Item value="dark">Dark</Select.Item>
									<Select.Item value="system">System</Select.Item>
								</Select.Content>
							</Select.Root> -->
							<Input
								type="text"
								id="role"
								name="role"
								aria-invalid={$errors.role ? 'true' : undefined}
								bind:value={$form.role}
							/>
							{#if $errors.role}
								<small class="invalid">{$errors.role}</small>
							{/if}
						</div>

						<div class="m-2 w-1/3">
							<Label for="department">Departamento:</Label>
							<Input
								type="text"
								id="department"
								name="department"
								aria-invalid={$errors.department ? 'true' : undefined}
								bind:value={$form.department}
							/>
							{#if $errors.department}
								<small class="invalid">{$errors.department}</small>
							{/if}
						</div>

						<div class="m-2 w-1/3">
							<Label for="location">Ubicación:</Label>
							<Input
								type="text"
								id="location"
								name="location"
								aria-invalid={$errors.location ? 'true' : undefined}
								bind:value={$form.location}
							/>
							{#if $errors.location}
								<small class="invalid">{$errors.location}</small>
							{/if}
						</div>
					</div>

					<div class="w-full text-center">
						<Button class="mt-4" type="submit">Registrar</Button>
					</div>
				</form>
			</Card.Content>
			<Card.Footer>
				<div class="w-full text-center">
					<p>Ya tienes una cuenta? <a href="/login"><u>Inicia sesión</u></a></p>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</main>

<style>
	main {
		height: 100vh;
	}

	.invalid {
		color: red;
	}
</style>
